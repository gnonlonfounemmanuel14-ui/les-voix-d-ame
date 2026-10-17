(() => {
  const STORAGE_KEY = "lva-language";
  const CACHE_KEY = "lva-en-translation-cache-v1";
  const ENDPOINT = window.LVA_TRANSLATION_ENDPOINT || "https://translate.argosopentech.com/translate";
  const cache = (() => {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); }
    catch { return {}; }
  })();
  const units = [];
  const translatedTextNodes = new WeakMap();
  const translatedAttributes = new WeakMap();
  let activeLanguage = "fr";
  let desiredLanguage = "fr";
  let applyingTranslations = false;
  let scanTimer;

  function storedLanguage() {
    try { return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "fr"; }
    catch { return "fr"; }
  }

  function saveLanguage(language) {
    try { localStorage.setItem(STORAGE_KEY, language); }
    catch { /* The chosen language still applies for this page. */ }
  }

  function buildSwitcher() {
    const nav = document.querySelector(".nav-wrap");
    if (!nav || document.querySelector(".language-switcher")) return null;
    const wrapper = document.createElement("div");
    wrapper.className = "language-switcher";
    wrapper.dataset.i18nIgnore = "true";
    wrapper.innerHTML = '<label class="sr-only" for="site-language">Language / Langue</label><select id="site-language" aria-label="Language / Langue"><option value="fr">Français</option><option value="en">English</option></select><span class="language-status" role="status" aria-live="polite"></span>';
    const menu = nav.querySelector(".menu-toggle");
    nav.insertBefore(wrapper, menu || null);
    wrapper.querySelector("select").addEventListener("change", (event) => {
      const language = event.target.value === "en" ? "en" : "fr";
      saveLanguage(language);
      setLanguage(language);
    });
    return wrapper;
  }

  const switcher = buildSwitcher();
  const languageSelect = switcher?.querySelector("select");
  const status = switcher?.querySelector(".language-status");

  function setStatus(message, isError = false) {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  }

  function addTextUnit(node) {
    if (!node.nodeValue.trim()) return;
    const translatedValue = translatedTextNodes.get(node);
    if (translatedValue === node.nodeValue) return;
    if (translatedValue) translatedTextNodes.delete(node);
    const value = node.nodeValue;
    const leading = value.match(/^\s*/)?.[0] || "";
    const trailing = value.match(/\s*$/)?.[0] || "";
    const content = value.slice(leading.length, value.length - trailing.length || undefined);
    if (!content.trim()) return;
    const unit = {
      type: "text", node, original: value,
      content: content.trim(),
      leading, trailing,
      get() { return node.nodeValue; },
      set(translation) {
        const next = `${leading}${translation}${trailing}`;
        node.nodeValue = next;
        translatedTextNodes.set(node, next);
      }
    };
    units.push(unit);
  }

  function addAttributeUnit(element, name) {
    const value = element.getAttribute(name);
    if (!value || !value.trim()) return;
    let saved = translatedAttributes.get(element);
    if (!saved) { saved = new Map(); translatedAttributes.set(element, saved); }
    if (saved.has(name)) return;
    saved.set(name, { original: value, translated: null });
    units.push({
      type: "attribute", element, name, original: value, content: value.trim(),
      get() { return element.getAttribute(name); },
      set(translation) {
        const next = translation;
        element.setAttribute(name, next);
        saved.get(name).translated = next;
      }
    });
  }

  function collectUnits(root = document.body) {
    if (!root) return [];
    const start = units.length;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest('[data-i18n-ignore],script,style,noscript,svg,template')) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    let node;
    while ((node = walker.nextNode())) addTextUnit(node);
    root.querySelectorAll?.("*").forEach((element) => {
      if (element.closest('[data-i18n-ignore],script,style,noscript,svg,template')) return;
      ["placeholder", "title", "aria-label", "alt"].forEach((name) => addAttributeUnit(element, name));
      if (element.matches('input[type="button"],input[type="submit"],input[type="reset"]')) addAttributeUnit(element, "value");
    });
    const description = document.querySelector('meta[name="description"]');
    if (description && root === document.documentElement) addAttributeUnit(description, "content");
    return units.slice(start);
  }

  function cacheKey(text) { return `fr-en:${text}`; }

  function splitLongText(text, maxLength = 2200) {
    if (text.length <= maxLength) return [text];
    const lines = text.split(/(?<=\n)/);
    const pieces = [];
    let current = "";
    lines.forEach((line) => {
      if (line.length > maxLength) {
        if (current) pieces.push(current);
        current = "";
        for (let index = 0; index < line.length; index += maxLength) pieces.push(line.slice(index, index + maxLength));
      } else if (current.length + line.length > maxLength) {
        pieces.push(current);
        current = line;
      } else current += line;
    });
    if (current) pieces.push(current);
    return pieces;
  }

  async function translateBatch(batch) {
    const payload = batch.map((item) => item.text);
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: payload, source: "fr", target: "en", format: "text" })
    });
    if (!response.ok) throw new Error(`Translation service returned ${response.status}`);
    const data = await response.json();
    const results = Array.isArray(data.translatedText) ? data.translatedText : [data.translatedText];
    if (results.length !== batch.length || results.some((value) => typeof value !== "string")) throw new Error("Unexpected translation response");
    results.forEach((translation, index) => { cache[cacheKey(batch[index].text)] = translation; });
    return results;
  }

  async function translateUnits(pending) {
    if (!pending.length || desiredLanguage !== "en") return;
    const requests = [];
    pending.forEach((unit) => {
      const cached = cache[cacheKey(unit.content)];
      if (cached) {
        applyingTranslations = true;
        unit.set(cached);
        applyingTranslations = false;
        return;
      }
      splitLongText(unit.content).forEach((text) => requests.push({ unit, text }));
    });

    const groups = [];
    let group = [];
    let groupLength = 0;
    requests.forEach((request) => {
      if (group.length >= 35 || groupLength + request.text.length > 4200) {
        if (group.length) groups.push(group);
        group = [];
        groupLength = 0;
      }
      group.push(request);
      groupLength += request.text.length;
    });
    if (group.length) groups.push(group);

    for (const batch of groups) {
      if (desiredLanguage !== "en") return;
      try {
        const translations = await translateBatch(batch);
        applyingTranslations = true;
        batch.forEach((item, index) => {
          const parts = item.unit._parts || (item.unit._parts = splitLongText(item.unit.content));
          const translatedParts = parts.map((part) => cache[cacheKey(part)]);
          if (translatedParts.every(Boolean)) {
            const fullTranslation = translatedParts.join("");
            cache[cacheKey(item.unit.content)] = fullTranslation;
            item.unit.set(fullTranslation);
          }
        });
        applyingTranslations = false;
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch { /* Cache is optional. */ }
      } catch (error) {
        applyingTranslations = false;
        console.warn("Les Voix d’Âme: translation unavailable", error);
        applyingTranslations = true;
        units.forEach((unit) => {
          if (unit.type === "text") unit.node.nodeValue = unit.original;
          else unit.element.setAttribute(unit.name, unit.original);
        });
        applyingTranslations = false;
        desiredLanguage = "fr";
        activeLanguage = "fr";
        document.documentElement.lang = "fr";
        saveLanguage("fr");
        if (languageSelect) languageSelect.value = "fr";
        setStatus("English translation unavailable. Showing French.", true);
        return;
      }
    }
  }

  async function setLanguage(language) {
    desiredLanguage = language;
    if (languageSelect) languageSelect.value = language;
    if (language === "fr") {
      applyingTranslations = true;
      units.forEach((unit) => {
        if (unit.type === "text") unit.node.nodeValue = unit.original;
        else unit.element.setAttribute(unit.name, unit.original);
      });
      applyingTranslations = false;
      activeLanguage = "fr";
      document.documentElement.lang = "fr";
      setStatus("");
      return;
    }

    setStatus("Translating page…");
    const newUnits = collectUnits(document.documentElement);
    await translateUnits([...units, ...newUnits]);
    if (desiredLanguage !== "en" || !switcher) return;
    if (status?.classList.contains("is-error")) return;
    activeLanguage = "en";
    document.documentElement.lang = "en";
    setStatus("Automatic translation · French is the official text.");
  }

  function scheduleDynamicTranslation() {
    if (activeLanguage !== "en" || applyingTranslations) return;
    clearTimeout(scanTimer);
    scanTimer = setTimeout(() => {
      const pending = collectUnits(document.documentElement);
      if (pending.length) translateUnits(pending);
    }, 180);
  }

  document.body?.addEventListener("input", (event) => {
    if (event.target.matches("input,textarea")) return;
    scheduleDynamicTranslation();
  }, true);
  if (document.body) {
    new MutationObserver(scheduleDynamicTranslation).observe(document.body, { childList: true, characterData: true, subtree: true });
  }

  if (languageSelect) {
    const preferred = storedLanguage();
    languageSelect.value = preferred;
    if (preferred !== "fr") setLanguage(preferred);
  }
})();
