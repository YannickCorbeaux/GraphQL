# Rest'O GraphQL

## Installation

1. Créez une base de données du nom désiré. Par exemple `resto`
2. Copiez le fichier `.env.example` dans un fichier `.env`. Puis supprimer/modifier les informations en fonction de votre BDD.
3. Installez les dépendance en lançant cette commande : `npm i`
4. Executez le script npm : `npm run resetDB`

Une fois les différentes actions effectuées, vous pouvez développer votre application.

## Découverte de l'existant

Dans le repertoire [`./docs`](./docs) se trouve le MCD de la BDD, ainsi qui rapide comparatif entre une API RESTful et une API GraphQL.

Le module de création du client DB `pg` est déjà créé à cet endroit : [`./app/db/pg/js`](./app/db/pg/js).
Et les dataMappers sont également prêt à l'emploi dans le répertoire [`./app/datamappers`](./app/datamappers)

Bon code !
