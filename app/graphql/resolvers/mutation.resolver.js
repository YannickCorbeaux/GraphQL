export default {
  async createRestaurant(_, args, { dataSources }) {
    const row = await dataSources.restoSQL.restaurantDatamapper.create(args.data);
    return row;
  },

  async updateRestaurant(_, args, { dataSources }) {
    const row = await dataSources.restoSQL.restaurantDatamapper.update(args.id, args.data);
    return row;
  },
};
