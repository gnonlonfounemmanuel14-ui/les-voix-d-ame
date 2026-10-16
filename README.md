# Les Voix d’Âme — interface front-end

Site statique en HTML5 et CSS3 pour le concours de poésie orale et d’art oratoire **Les Voix d’Âme**. Slogan : « Une plume. Une voix. Un impact. »

## Organisation et démarrage

Chaque page contient directement son contenu HTML et le JavaScript d’interaction, dans une balise `<script>` à la fin du document. Les styles partagés sont dans `css/variables.css` et `css/global.css`. Il n’y a pas de fichier JavaScript externe à charger ou à relier aux pages.

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

Le formulaire d’inscription candidat contient une case d’acceptation du règlement obligatoire, non cochée par défaut. Le lien ouvre le projet de règlement dans `informations.html#reglement`. Il doit être revu et officiellement validé avant de servir de règlement définitif.

Le montant de 2 500 FCFA est affiché en lecture seule dans le formulaire candidat, car il s’agit des frais annoncés et non d’un montant à saisir librement. Aucun moyen de paiement n’est encore raccordé : le paiement réel nécessitera un prestataire, une confirmation serveur et une interface de paiement intégrée.

Les dispositions juridiques et opérationnelles suivantes restent à valider par l’organisation : admissibilité et justificatifs complémentaires éventuels (notamment pour les mineurs), procédures de vérification et de réclamation, règles de départage, annulation ou report, mesures éventuelles en cas d’incident, consentements liés aux textes/vidéos/images, politique de confidentialité et conservation des données, barème complet, périodes et règles de vote, paiements et remboursement. Le projet de règlement les signale sans les présenter comme des décisions déjà approuvées.

Les pieds de page publics ne donnent pas d’accès direct aux espaces de rôle. La connexion de démonstration propose seulement les espaces candidat et votant, puis mémorise temporairement le rôle dans `sessionStorage` pour simuler leur redirection et bloquer la navigation ordinaire vers ces pages sans connexion. Les espaces jury et administration ne sont pas proposés dans le formulaire public.

Cette barrière JavaScript n’est pas une authentification ni une protection de sécurité : elle peut être contournée dans le navigateur. Les identifiants ne sont pas vérifiés, les inscriptions ne créent aucun compte, et aucun rôle jury/administrateur n’est attribué par le site statique. Il n’y a ni comptes réels, ni sessions serveur, ni participants connectés, ni statistiques, ni votes, ni transactions enregistrés. Avant la mise en production, le backend devra authentifier les utilisateurs, attribuer les rôles côté serveur et refuser lui-même chaque requête non autorisée, y compris pour les pages candidat, votant, jury et administration. Les paiements, l’attribution de points, la validation des candidatures, l’envoi de vidéos et les résultats doivent également être implémentés côté backend.

## Informations à confirmer

- Le calendrier est affiché selon le brief : clôture le 31 décembre 2026, résultats le 8 janvier 2027, phases en présentiel les 23 janvier et 6 février, finale le 20 février 2027 à 16 h. La correspondance des dates en présentiel avec les phases n’est pas connue. Le contenu de ce brief prévaut ici ; une ancienne date de finale, telle que le 14 février, doit être arbitrée avant publication.
- Le fichier `LVA.1nouveau.pptx` a été analysé : son texte de diapositives confirme l’approche plume-voix-impact, l’ambition de progression, le calendrier, les critères en trois piliers (écriture, technique vocale, impact) et décrit le Passeport de la Voix comme outil d’identification des qualités et axes d’amélioration. Il présente aussi une épreuve signature appelée « L’Inattendu » (intégrer un élément découvert sur le moment) et des bénéfices possibles pour les partenaires. Ces propositions ne sont pas affectées à une phase dans les consignes récentes et ne sont pas présentées comme modalités définitives. Le contenu textuel des notes de diapositives n’a pas révélé de notes exploitables.
- Le PowerPoint contient des catégories historiques « Juniors 12–18 ans » et « Seniors 19–30 ans ». Elles sont en contradiction avec la tranche récente de 15–35 ans du brief ; le site retient 15–35 ans.
- Aucun fichier SQL n’était présent. La comparaison des packs avec un schéma MySQL existant n’est donc pas possible.
- Packs affichés : 5 points/525 FCFA, 10/1 250, 100/11 000, 200/23 000, 300/33 000, 400/43 000, 500/53 000, 600/63 000, 700/73 000, 800/83 000, 900/93 000, 1 000/103 000, 2 000/203 000, 3 000/303 000, 4 000/403 000, 5 000/503 000, 10 000/600 000 et 20 000/700 000 FCFA. La référence de 125 FCFA par point est également annoncée ; règles de bonus à confirmer.
- Les seuils évoqués de 800–1 500 points pour accéder à la finale et d’au moins 2 000 points pour gagner sont ambigus et ne sont pas appliqués.
- Les achats de points par les candidats sont désactivés faute de confirmation.
- Les récompenses détaillées, le montant du chèque, les partenaires, sponsors, membres du jury, lieux, coordonnées et canal officiel sont à confirmer ; aucune information inventée n’est publiée.
- Le Passeport de la Voix est décrit dans le PowerPoint comme un outil de progression couvrant notamment la plume, la diction et l’expression vocale, le stress, l’argumentation, la construction des idées, la présence scénique, l’improvisation et l’impact. Le workflow, la confidentialité, les personnes pouvant consulter le passeport et les structures de stockage restent à définir.
- Le support de présentation évoque « L’Inattendu », exercice d’intégration d’un élément imprévu dans une prise de parole. Son éventuelle intégration au règlement et à une phase reste à confirmer.
- Le PowerPoint présente une proposition de visibilité des partenaires sur les plateformes du concours ; aucun partenaire n’étant identifié, aucun logo ou nom de partenaire n’est affiché.
- Le barème d’évaluation n’a pas de pondération individuelle fixée.

## Futur backend et sécurité

Il n’existe pas d’API dans ce prototype. Pour l’intégrer à Laravel, définir les routes et méthodes, la gestion des erreurs, l’authentification, les protections CSRF, la validation serveur et les réponses attendues, puis ajouter les appels `fetch()` directement aux scripts inline des pages concernées (ou décider ultérieurement de les extraire dans des modules). Ne jamais placer de secrets dans le navigateur.

Le serveur devra vérifier les rôles, les autorisations et les données soumises ; traiter de manière sécurisée les auditions ; confirmer les paiements auprès du prestataire avant tout crédit de points ; enregistrer et calculer les votes ; préserver les données des votants et les évaluations confidentielles du jury. Les prix, points, notes et résultats transmis par le navigateur ne sont jamais fiables.

Sans schéma MySQL consultable, aucune correspondance de tables ne peut être certifiée. Prévoir des structures backend pour les évaluations et affectations du jury, les historiques/audits et le Passeport de la Voix, en contrôlant strictement les accès aux informations individuelles.
