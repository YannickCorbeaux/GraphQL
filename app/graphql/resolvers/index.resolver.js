import Restaurant from './restaurant.resolver.js';
import City from './city.resolver.js';
import Manager from './manager.resolver.js';
import CookingStyle from './cooking-style.resolver.js';
import CookingStyleHasRestaurant from './cooking-style-has-restaurant.resolver.js';
import RestaurantHasCookingStyle from './restaurant-has-cooking-style.resolver.js';
import Query from './query.resolver.js';
import Mutation from './mutation.resolver.js';

const resolvers = {
  Query,
  Mutation,
  Restaurant,
  Manager,
  City,
  CookingStyle,
  RestaurantHasCookingStyle,
  CookingStyleHasRestaurant,
};

export default resolvers;
