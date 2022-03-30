# Applications Web et Sécurité - Groupe 2 - Application Météo

## Répartition des rôles
- Mickaël Le Denmat : Responsable.
- Gabriel Scrève : Chercheur.
- Alloua Melissa et Hasnae Gaizi : Codeuses.

## Résumé du planning du travail
- 18/03 : Recherche d'idées et de nouvelles technologies.
- 22/03 : Réunion pour définir les objectifs et les rôles de chacun des membres.
- 24/03 : Séance de travail entre les codeuses.
- 25-26/03 : Recherche sur les technologies pour utiliser une base de données et création de la base de données par le chercheur.
- 26/03 : Séance de travail entre les codeuses.
- 28/03 : Réunion pour faire un point sur le travail effectué et sur qu'il reste à faire.

***

## Détails du travail effectué
### Mickaël Le Denmat : Responsable
- Suivi régulier de l'avancement du travail de chacun.
- A aidé pour debugger le code avec les codeuses.
- Ajout de petites parties de code :
	- Template navbar en header,
	- Template pour login page,
	- Ajout système fond évolutif en fonction de la météo,
	- Système recherche nouvelle ville, avec chargement météo.
-  Aidé à concevoir la base de données avec le chercheur.

### Gabriel Scrève : Chercheur
- Recherche sur nodejs et expressjs.
- Recherche sur la base de données :
	- Quel langage,
	- Quel table (pour stocker les données),
	- Comment la connecter avec le site,
	- Création.

### Alloua Melissa & Hasnae Gaizi : codeuses
- Modification des fonctions qui font des appels aux APIs en fonctions asynchrones.
- Ajout de la météo pour les jours de la semaine.
- Refonte totale du projet avec la bibliothèque bootstrap.
- Ajout d'un bouton pour mettre la ville actuelle en favoris.

### Alloua Melissa : Codeuse
- Ajout informations supplémentaires (uv, vitesse du vent, humidité, % de vent).


### Hasnae Gaizi : Codeuse
- Ajout d'une barre de navigation avec:
	- Un bouton menu (caché) affichant les listes des villes en favoris par l'utilisateur,
	- une zone de recherche pour avoir la météo d'une autre ville,
	- un bouton pour se connecter.

***

## Recherches effectuées
- [bootstrap](https://getbootstrap.com.).
- [nodejs](https://nodejs.org/en/).
- [expressjs](http://expressjs.com).
- [mysql](https://www.mysql.com/fr/).
- [openweathermap geocoding](https://openweathermap.org/api/geocoding-api).

## Travail à faire pour la prochaine fois
- Corriger affichage fond et couleur police.
- Bug avec écran en vertical.
- Bug avec hover sur petit écran.
- Finir le bouton menu (affichage villes en favoris).
- Finir partie javascript pour rechercher météo d'une ville.
- Finir système de connexion.
- Transformer le projet avec expressjs avec des routes pour avoir le système de redirection.
- Finir la base de données et l'intégrer au projet.
- Intégrer système changement de clé pour l'api si le nombre d'appels [maximal](https://openweathermap.org/full-price#current) à été atteint.
- Intégrer sauvegarde de la météo pour ne faire des demandes à l'api que toutes les 2h (temps entre les [MAJ](https://openweathermap.org/full-price#current) sur l'api).

## Difficultées rencontrées
- L'utilisation de nodejs (technologie pas maîtrisé à 100%).
- Trop grands nombres d'appels à l'api lors de la production, création de 2 clés supplémentaires.
