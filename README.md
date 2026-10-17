# Les Voix d’Âme — interface front-end

Site statique en HTML5 et CSS3 pour le concours de poésie orale et d’art oratoire **Les Voix d’Âme**. Slogan : « Une plume. Une voix. Un impact. »

## Organisation et démarrage

Chaque page contient directement son contenu HTML et ses scripts JavaScript inline. Les styles partagés sont dans `css/variables.css` et `css/global.css`. Il n’y a pas de fichier JavaScript externe à charger ou à relier aux pages.

Ouvrir le dossier dans VS Code puis lancer `index.html` avec Live Server (ou un serveur HTTP statique équivalent). Google Fonts demande une connexion Internet ; des polices de remplacement sont prévues.

## Pages disponibles

- `index.html` : accueil, échéances, étapes, critères, récompenses, FAQ et compte à rebours.
- `concours.html` : présentation, conditions, phases, calendrier et critères.
- `candidats.html` et `candidat.html` : annuaire et profil public sans faux candidat.
- `auth.html` : formulaires candidat/votant, connexion et réinitialisation.
- `vote.html` : sélection et recherche parmi les packs annoncés ; aucun paiement réel.
- `informations.html` : projet de règlement en 14 articles, confidentialité, coordonnées et éléments à confirmer.
- `espace-candidat/index.html`, `espace-votant/index.html`, `jury/index.html`, `admin/index.html` : tableaux de bord de démonstration.

## Interactions et limites

Les menus mobiles, onglets, messages de formulaire, affichage du mot de passe, compte à rebours, filtre et sélection de packs ainsi que l’aperçu local de vidéo sont implémentés par JavaScript inline dans les pages concernées. Les contrôles des formulaires signalent les champs obligatoires, les formats d’e-mail, la longueur minimale des mots de passe et la tranche d’âge annoncée. Les données de formulaires et le fichier vidéo ne sont pas transmis ou conservés. Les confirmations indiquent explicitement que le serveur n’est pas connecté.

Le formulaire d’inscription candidat contient une case d’acceptation obligatoire et un montant de 2 500 FCFA en lecture seule. Le formulaire votant demande prénom, nom, pays africain, e-mail, téléphone/indicatif, mot de passe et confirmation. Les contrôles sont côté navigateur uniquement : aucune inscription ne crée un compte.

Les dispositions juridiques et opérationnelles suivantes restent à valider par l’organisation : admissibilité et justificatifs complémentaires éventuels (notamment pour les mineurs), procédures de vérification et de réclamation, règles de départage, annulation ou report, mesures éventuelles en cas d’incident, consentements liés aux textes/vidéos/images, politique de confidentialité et conservation des données, barème complet, périodes et règles de vote, paiements et remboursement. Le projet de règlement les signale sans les présenter comme des décisions déjà approuvées.

Les pieds de page ne donnent pas d’accès direct aux espaces de rôle. Le formulaire de connexion offre une saisie par e-mail ou téléphone, mais refuse explicitement de simuler une connexion tant que le serveur n’est pas raccordé. Les espaces jury et administration ne sont pas proposés au public.

Les contrôles d’accès d’interface ne sont pas une authentification ni une protection de sécurité : ils peuvent être contournés dans le navigateur. Les identifiants ne sont pas vérifiés et aucun rôle n’est attribué par le site statique. Il n’y a ni comptes réels, ni sessions serveur, ni statistiques, ni votes, ni transactions enregistrés. Avant la mise en production, le backend devra authentifier les utilisateurs, attribuer les rôles côté serveur et refuser lui-même chaque requête non autorisée. Les paiements, l’attribution de points, la validation des candidatures, l’envoi de vidéos et les résultats devront aussi être implémentés côté backend.

### Références et limites officielles

- Le brief actuellement appliqué indique Junior 12–18 ans et Senior 19–30 ans, avec autorisation du parent/représentant légal pour les candidats mineurs. Le formulaire valide l’âge total 12–30 et affiche aux candidats juniors une confirmation qu’ils fourniront cette autorisation ; le justificatif réel et sa vérification restent à définir.
- La vidéo de présélection est indiquée comme 1 min 30 à 2 min, sur le thème général de l’éducation et un sous-thème libre, avec texte personnel. Elle est à envoyer au +229 01 61 05 40 84. Le formulaire ne la téléverse pas. Le PowerPoint fourni décrit plutôt une vidéo de 3–5 minutes sur un thème libre : cette contradiction doit être arbitrée par l’organisation avant publication définitive.
- La pondération annoncée dans le brief actuel est 80 points jury et 20 points public. La formule de transformation des votes commerciaux en score sur 20 n’est pas fournie.
- Le projet `informations.html` contient actuellement un règlement de démonstration en 14 articles, pas le texte officiel de 24 articles cité dans la demande. Ce texte intégral n’est présent ni dans les fichiers du workspace ni dans le PowerPoint. Il n’a pas été inventé ou réécrit comme officiel. Aucun bouton ni fichier PDF de règlement officiel n’est donc proposé ; il faudra recevoir le texte officiel avant de produire une version HTML/PDF fidèle.
- Aucun fichier PDF, SQL, logo de paiement ou service backend n’est présent dans le workspace. Trois photos JPG sont présentes dans `img/`, mais aucune attribution ni autorisation de publication n’est fournie ; elles ne sont donc pas associées au promoteur et l’emplacement prévu sur l’accueil reste neutre jusqu’à confirmation.

## Informations à confirmer

- Le calendrier est affiché selon le brief : clôture le 31 décembre 2026, résultats le 8 janvier 2027, phases en présentiel les 23 janvier et 6 février, finale le 20 février 2027 à 16 h. La correspondance des dates en présentiel avec les phases n’est pas connue. Le contenu de ce brief prévaut ici ; une ancienne date de finale, telle que le 14 février, doit être arbitrée avant publication.
- Le fichier `LVA.1nouveau.pptx` a été analysé : son texte confirme l’approche plume-voix-impact, le Passeport de la Voix, les catégories 12–18 et 19–30 ans et l’épreuve signature « L’Inattendu ». Le PowerPoint donne toutefois une durée d’audition de 3–5 minutes, contradictoire avec la consigne la plus récente de 1 min 30 à 2 min. À confirmer avec l’organisation.
- Aucun fichier SQL n’était présent. La comparaison des packs avec un schéma MySQL existant n’est donc pas possible.
- Les prix historiques des packs restent inchangés dans `vote.html`. La consigne actuelle demande 100 FCFA = 1 point ; les points sont calculés dynamiquement comme estimations. Plusieurs prix historiques (dont 525 et 1 250 FCFA) ne produisent pas un nombre entier de points. Aucun arrondi ou fraction définitive n’est présumé. Les anciens textes 125 FCFA/point ont été retirés des interfaces.
- Les seuils évoqués de 800–1 500 points pour accéder à la finale et d’au moins 2 000 points pour gagner sont ambigus et ne sont pas appliqués.
- Les achats de points par les candidats sont désactivés faute de confirmation.
- Les récompenses détaillées, le montant du chèque, les partenaires, sponsors, membres du jury, lieux et canal officiel sont à confirmer ; aucune information inventée n’est publiée.
- Les coordonnées e-mail et téléphones actuelles sont dans le bloc `footer-contact` de chaque page HTML. Les réseaux sociaux sont des libellés sans lien ; ajouter les URL vérifiées manuellement dans ce même bloc.
- Les dates de compte à rebours sont les attributs `data-date` de `index.html`; la date limite du formulaire est `data-registration-deadline` dans `auth.html`. Modifier aussi les attributs `datetime` du calendrier public après validation officielle. Les heures de référence utilisent UTC+01:00 et les textes de date sont rendus selon le fuseau local du navigateur.
- La règle des points est à 100 FCFA par point dans le script inline de `vote.html`. Les devises africaines et indicatifs sont inscrits dans les options HTML de `auth.html`. Les calculs en devise autre que XOF restent bloqués faute d’un service de change ; XAF n’est pas assimilé à XOF.
- Le Passeport de la Voix est décrit dans le PowerPoint comme un outil de progression couvrant notamment la plume, la diction et l’expression vocale, le stress, l’argumentation, la construction des idées, la présence scénique, l’improvisation et l’impact. Le workflow, la confidentialité, les personnes pouvant consulter le passeport et les structures de stockage restent à définir.
- Le support de présentation évoque « L’Inattendu », exercice d’intégration d’un élément imprévu dans une prise de parole. Son éventuelle intégration au règlement et à une phase reste à confirmer.
- Le PowerPoint présente une proposition de visibilité des partenaires sur les plateformes du concours ; aucun partenaire n’étant identifié, aucun logo ou nom de partenaire n’est affiché.
- Le barème d’évaluation n’a pas de pondération individuelle fixée.

## Futur backend et sécurité

Il n’existe pas d’API dans ce prototype. Pour l’intégrer à Laravel, définir les routes et méthodes, la gestion des erreurs, l’authentification, les protections CSRF, la validation serveur et les réponses attendues, puis ajouter les appels `fetch()` directement aux scripts inline des pages concernées (ou décider ultérieurement de les extraire dans des modules). Ne jamais placer de secrets dans le navigateur.

Le serveur devra vérifier les rôles, les autorisations et les données soumises ; traiter de manière sécurisée les auditions ; confirmer les paiements auprès du prestataire avant tout crédit de points ; enregistrer et calculer les votes ; préserver les données des votants et les évaluations confidentielles du jury. Les prix, points, notes et résultats transmis par le navigateur ne sont jamais fiables.

Sans schéma MySQL consultable, aucune correspondance de tables ne peut être certifiée. Prévoir des structures backend pour les évaluations et affectations du jury, les historiques/audits et le Passeport de la Voix, en contrôlant strictement les accès aux informations individuelles.

### Contrats d’intégration à définir (propositions, non implémentés)

- Inscription : le formulaire candidat recueille identité, e-mail, date de naissance, pays, téléphone optionnel et consentement ; le formulaire votant recueille prénom, nom, pays, e-mail, téléphone avec indicatif, mot de passe, confirmation et consentement. Le montant d’inscription affiché est 2 500 FCFA ; il ne doit pas être accepté comme montant faisant autorité depuis le navigateur.
- Authentification : prévoir un endpoint de connexion qui accepte soit e-mail + mot de passe, soit pays/indicatif + téléphone + mot de passe, et résout le même compte. Le serveur émet une session protégée et retourne le rôle autorisé. La récupération de mot de passe et les vérifications e-mail/SMS exigent les services correspondants.
- Inscriptions : le serveur vérifie âge/catégorie, fermeture à la date officielle, consentement légal, unicité e-mail et téléphone, ainsi que le statut du paiement. Il ne confirme le compte ou le dossier qu’après les validations effectivement réussies.
- Paiement/vote : le serveur fournit les candidats publics et périodes ouvertes, recalcule le montant et les points, vérifie le taux et sa date si une devise autre que XOF est acceptée, crée une intention de paiement, puis crédite les points uniquement après confirmation signée du prestataire. Les points achetés restent distincts du score public sur 20.
- Résultats : des réponses distinctes sont nécessaires pour résultats publics publiés, détails du candidat authentifié, et administration autorisée. Les permissions et la publication programmée doivent être vérifiées côté serveur ; masquer le contenu en CSS ou JavaScript n’est pas un contrôle.
- Routes/API : aucune route réelle n’existe encore. Les routes Laravel, formats JSON, erreurs, protection CSRF, limites de téléversement, politiques de conservation, statuts de paiement, périodicité des taux, règles de remboursement et journal d’audit doivent être spécifiés avec le backend avant raccordement.
