#Présentation#
Cette application météo a été créée dans le cadre d'un test technique.

Il fallait utiliser les informations envoyées par l'API d'OpenWeatherApp, et un fichier .json comprenant les informations des villes françaises.

Je devais afficher la météo du jour et des trois jours suivants.
Pour les températures minimum et maximum des trois prochains jours, j'ai pris la plus basse et la plus haute de chaque jour. Pour l'icône de météo j'ai choisi de montrer celui qui correspond à la météo à midi..

#Problèmes à résoudre#
Je suis consciente que si la date du jour est le 31 août, par exemple, ça n'affichera pas la météo des trois prochains jours. J'ai essayé d'écrire une fonction qui vérifie la date et change le mois et le jour si on est à la fin du mois, mais sans succès. J'ai cherché des solutions sur internet mais pour l'instant je n'en ai pas trouvé qui fonctionne avec mon code.