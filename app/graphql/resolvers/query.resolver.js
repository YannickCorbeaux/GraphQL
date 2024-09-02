import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

export default {
  async restaurants(_, __, { dataSources }) {
    const rows = await dataSources.restoSQL.restaurantDatamapper.findAll();
    return rows;
  },
  // args est un objet qui contient l'ensemble des arguments de la requête utilisateur
  async restaurant(_, args, { dataSources }) {
    const row = await dataSources.restoSQL.restaurantDatamapper.findByPkBatch.load(args.id);
    return row;
  },
  async cities(_, __, { dataSources }) {
    const rows = await dataSources.restoSQL.cityDatamapper.findAll();
    return rows;
  },
  async cookingStyles(_, __, { dataSources }) {
    const rows = await dataSources.restoSQL.cookingStyleDatamapper.findAll();
    return rows;
  },
  // args est un objet qui contient l'ensemble des arguments de la requête utilisateur
  async cookingStyle(_, args, { dataSources }) {
    const row = await dataSources.restoSQL.cookingStyleDatamapper.findByPkBatch.load(args.id);
    return row;
  },

  async signin(_, args, { dataSources, ip, userAgent }) {
    const { email, password } = args;
    const [manager] = await dataSources.restoSQL.managerDatamapper.findAll({ where: { email } });

    const errorMessage = 'Authentication failed';
    const errorInfos = {
      extensions: {
        code: 'AUTHENTICATION_FAILED',
      },
    };

    if (!manager) {
      throw new GraphQLError(errorMessage, errorInfos);
    }

    const isPasswordCorrect = await bcrypt.compare(password, manager.password);

    if (!isPasswordCorrect) {
      throw new GraphQLError(errorMessage, errorInfos);
    }

    // Contrairement a une application monolithique, on va créer un token (String chiffré contenant
    // les information provement d'un objet)

    // Pour cela on utilise un module qu'il va se charger le faire pour nous (JSON Web Token ou JWT)
    // Ce token aura une durée de vie limité. Pour prévenir tout vol. Les dégâts seront limités.

    // Si jamais ce token arrive a expiration. Il faudra alors se reconnecter, pour en obtenir un
    // nouveau.
    const { password: dontKeep, ...data } = manager;
    const expiresIn = parseInt(process.env.JWT_EXPIRE_IN, 10) || 60;
    // On fourni la date d'expiration au front plutot que le temps, car on ne maitrise pas le temps
    // de réponse à la requête utilisateur.
    const expiresAt = Math.round((new Date().getTime() / 1000) + expiresIn);

    const token = jwt.sign({ ...data, ip, userAgent }, process.env.JWT_PRIVATE_KEY, { expiresIn });

    return {
      token,
      expiresAt,
    };
  },

  profile(_, __, { user }) {
    if (!user) {
      throw new GraphQLError('Access Forbidden', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    return user;
  },
};
