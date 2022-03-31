## Intro
Nous vous avions présenté la première version de l'application il y a deux semaines de cela. Elle nous a permis de d'acquérir des bases sur l'html, le css et le javascript. Nous allons nous présenté maintenant notre application avec nos nouvelles connaîssances.

(montrer application)

## Contenu

###
Conernant le front-end, l'application à entièrement été refaite avec la blibliothèque bootstrap ce qui nous simplifie l'implémentation et offre un meilleur rendu.

Nous avons ajouter, comme prévus une barre de navigation avec : 

Un bouton pour le menu principale (la maison) le choix de l'icon n'est pas définitif nous pourrions mettre par exempe un icon dit "hamburger".
Lorsque l'on clic sur le bouton menu nous avons la liste des villes sauvegardé par l'utilisateur.
Le clic sur le bouton menu doit être corriger, il créer un décalage de la fenêtre.

Il y a aussi une zone de recherche pour obtenir la météo d'une autre ville, l'information à entrée n'est pas définitif, ce n'est pas très user friendly.
Nous avons implémenter une première version pour la chercher de la météo d'une autre ville. Sans sécurité si l'utilisateur tape un nom non valide.

Puis nous avons un bouton de raccourci pour accèder au villes en favoris. Nous ne sommes pas encore certain concernant ce bouton.

A coté nous avons le boutons pour se connecter.
Nous avons utiliser une template boostrap pour la page de login et nous avons ajouter une vérification sur la forme de l'adresse mail. Nous devons ajouter le système de redirection une fois que nous aurons finis les recherches sur expressjs.

Enfin nous avons le bouton pour ajouter la ville en favoris.
Concernant le bouton pour ajouter en favoris, le code javascript n'est pas fait, il affiche juste le nom de la ville actuelle.

Après cela, la contenue de l'application ne change pas beaucoup, nous avons ajouté quelques détails sur la météo du jours, nous avons finis l'affichage de la météo en fonction des jours de la semaine.

Nous avons ajouté un fond qui change en fonction de la météo et du cycle jour/ nuit ainsi qu'un changement de couleur de texte et de fond pour les cases mais qui doit être amélioré, certain fond rend peu lisible les informations, les couleurs sont proches et peuvent être difficilement lisible pour des personnes avec des problèmes de vues.

### 
Parlons maintenant du back-end. Nous avons factoriser le code pour limite au maximum le nombre d'appels à l'api. Nous transformer les fonctions d'appels en asynchrone pour que l'affichage se fasse après avoir réçu les informations de l'api.


##
Nous avons aussi bien avancé sur la partie base de donnée, le stockage des utilisateurs est prêt, nous nous posons des questions concerntant la sécurité de la base de donnée, le mot de passe de doit pas être en clair, bien évidement.

##
Concernant le groupe, la communication s'améliore, un serveur discord à été créer par Gabriel nous avons créer des rôles que nous changerons, et toutes les discussions écrite ou vocal se font sur salon spécifique en fonction du sujet (les codeurs/ codeuses/ recherche/ général/ lien). La répartition des tâches doit être améliorer.