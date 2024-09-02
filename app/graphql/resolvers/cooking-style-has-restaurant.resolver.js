export default {

  async restaurant(parent, _, { dataSources }) {
    const row = await dataSources
      .restoSQL
      .restaurantDatamapper
      .findByPkBatch
      .load(parent.restaurant_id);
    return row;
  },

};
