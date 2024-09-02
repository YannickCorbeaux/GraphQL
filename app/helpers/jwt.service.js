import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

export default {

  getUser(req) {
    if (!req.header('authorization')) {
      return null;
    }

    // Bearer HDYUGDNhbfsdjh!7897çsdf
    const [, token] = req.header('authorization').split(' ');

    let data;
    try {
      data = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    } catch (err) {
      throw new GraphQLError('Invalid Token', {
        extensions: {
          code: 'INVALID_TOKEN',
        },
      });
    }

    if (!data) {
      return null;
    }

    const { ip, userAgent, ...user } = data;

    if (ip !== req.ip || userAgent !== req.headers['user-agent']) {
      throw new GraphQLError('Security Alert', {
        extensions: {
          code: 'SECURITY_ALERT',
        },
      });
    }
    return user;
  },

};
