# Weather App

## Présentation

Cette application météo a été créée dans le cadre d'un test technique.

Il fallait utiliser les informations envoyées par l'API d'OpenWeatherMap, et un fichier .json comprenant les informations des villes françaises.

Je devais afficher la météo du jour et des trois jours suivants.
Pour les températures minimum et maximum des trois prochains jours, j'ai pris la plus basse et la plus haute de chaque jour. Pour l'icône de météo j'ai choisi de montrer celui qui correspond à la météo à midi..

## Utilisation
Pour l'instant mon code fonctionne seulement si on utilise l'extension Live Server de VS Code ou si on installe http-server : depuis le terminal, "npm install http-server", puis depuis le dossier weather-app : "http-server" et cliquer sur un des liens proposés.
Je travaille à l'améliorer en utilisant express.