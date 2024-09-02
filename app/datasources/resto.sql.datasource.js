import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import City from '../datamappers/city.js';
import CookingStyle from '../datamappers/cookingStyle.js';
import Manager from '../datamappers/manager.js';
import Restaurant from '../datamappers/restaurant.js';
import RestaurantHasCookingStyle from '../datamappers/restaurantHasCookingStyle.js';

export default class RestoSQLDataSource extends BatchedSQLDataSource {
  constructor(config) {
    super(config);
    this.cityDatamapper = new City(this.db);
    this.cookingStyleDatamapper = new CookingStyle(this.db);
    this.managerDatamapper = new Manager(this.db);
    this.restaurantDatamapper = new Restaurant(this.db);
    this.restaurantHasCookingStyleDatamapper = new RestaurantHasCookingStyle(this.db);
  }
}
