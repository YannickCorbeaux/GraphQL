import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import './app/helpers/env.load.js';
import typeDefs from './app/graphql/schema.loader.js';
import resolvers from './app/graphql/resolvers/index.resolver.js';
import WeatherAPI from './app/datasources/weather.api.datasource.js';
import RestoSQL from './app/datasources/resto.sql.datasource.js';
import jwtService from './app/helpers/jwt.service.js';

const knexConfig = {
  client: 'pg',
  connection: {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    user: process.env.PGUSER || 'oresto',
    database: process.env.PGDATABASE || 'oresto',
    password: process.env.PGPASSWORD,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

// Le serveur Appolo est la pour interpréter, la requête GraphQL fourni dans le body de la requête
// HTTP
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 3000;

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

// Ici c'est le serveur web, qui se charge d'interpréter la requête HTTP
const { url } = await startStandaloneServer(
  // 1er middleware
  server,
  {
  // On fourni au context une fonction qui sera exécuter à chaque requête HTTP
  // Une sorte de middleware
    context: async ({ req }) => {
    // On récupère le cache depuis le server Apollo
      const { cache } = server;
      const { ip, headers } = req;
      return {
        dataSources: {
          weatherAPI: new WeatherAPI({ cache }),
          restoSQL: new RestoSQL({ knexConfig, cache }),
        },
        ip,
        userAgent: headers['user-agent'],
        user: jwtService.getUser(req),
      };
    },
    listen: { port: PORT },
  },
);

console.log(`🚀  Server ready at: ${url}`);
