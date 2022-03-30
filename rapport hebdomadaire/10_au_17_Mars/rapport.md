# Applications Web et Sécurité - Projet
Groupe 2

## Choix du sujet

Pour le sujet, nous sommes partis sur une application météo permettant de récupérer des données météo en temps réel à partir d'une API.
Cette application permettra le visionnage de la météo pour une ville donnée par l'utilisateur.rice, elle fournira par exemple comme informations :
- Température en °C/°F
- Température ressentie
- Description du temps actuel (Ensoleillé, pluvieux, nuageux, ...)
- Prévisions heure par heure ou par tranche de 3h
- Prévisions pour les jours à venir
- Pression atmosphérique en bar
- Humidité de l'air
- Indice UV
- Vitesse et direction du vent
- Lever et coucher du soleil

Certaines fonctionnalités peuvent être intéressantes pour notre application : 
- Avoir un site "responsive" (obligatoire)
- Récupération des coordonnées GPS de l'utilisateur.rice sur demande
- Ajout de favoris à l'aide d'une base de données permettant leur stockage
- Récupération de l'adresse IP de l'utilisateur.rice afin de "localiser" la connexion et afficher un bulletin météo en rapport avec la localisation obtenue
- Récupération de la langue du navigateur afin d'afficher une météo utilisant l'unité de température adéquate (°F si dans un pays anglo-saxon par exemple).

## Répartition des tâches

### Gabriel : Responsable
Gabriel s'est occupé de répartir le travail afin que chaque membre ait de quoi travailler cette semaine et de faire des vérifications sur le travail effectué afin d'y apporter des modifications potentielles.
Une esquisse de l'application a aussi été faite, ainsi que quelques recherches sur quelle API choisir ont été faites. Il a trouvé que l'API d'OpenWeatherMap fournissait les informations nécessaires à l'application.

### Hasnae : Chercheuse
Hasnae a cherché en parallèle avec Gabriel une API pour récupérer les données météo, elle a choisi l'API d'OpenWeatherMap, qui semblait être la plus pertinente.
Elle a aussi cherché comment demander à l'utilisateur.rice sa localisation, qu'elle envoie à l'API afin de récupérer toutes les données liées aux coordonnées GPS (Nom de ville, Pays, et données météo).

### Melissa : Codeuse
Mélissa a repris un tutoriel Youtube pour s'accoutumer avec le HTML/CSS/JavaScript. Elle a implémenté l'application du tutoriel et y a ajouté un menu latéral. Elle a aussi commencé à programmer l'interface du menu principal de l'application.

### Mickaël : Codeur
Mickaël a commencé à organiser la page de notre application, ainsi que de reprendre l'esquisse de Gabriel pour la refaire en JavaScript. 
Il a aussi repris les codes faits par Hasnae et Mélissa afin de les intégrer au sien.

## Recherches effectuées

- Recherche d'une API gratuite permettant de récupérer des données météo en temps réel
- Croquis de notre application finale
- Première ébauche de notre application 

## Ressources 

- https://www.tomorrow.io/blog/top-8-weather-apis-for-2022/ (Comparaison des APIs météo)
- https://www.webcomponents.org/element/@polymer/paper-tooltip (Icônes en libres droits)
- https://www.youtube.com/watch?v=5JHqEMGkHXY (Tutoriel suivi par Mélissa)
- https://www.iban.com/country-codes (Codes ISO internationaux)
- https://openweathermap.org (API utilisée actuellement)
- https://ip-api.com (API pour retranscrire l'IP en cooreonnées GPS)
- https://www.deepl.com/pro-api/ (API pour la traduction)


## Mises à jour à venir

- Ajout de la recherche de ville dans le menu latéral
- Ajout la fonctionnalité "Favoris"
- Ajout la récupération de localisation en fonction de l'IP
- Ajout d'un background variant en fonction de la météo actuelle