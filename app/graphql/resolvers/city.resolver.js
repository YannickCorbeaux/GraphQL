export default {
  async restaurants(parent, _, { dataSources }) {
    const rows = await dataSources.restoSQL.restaurantDatamapper.findAll({
      where: { city_id: parent.id },
    });
    return rows;
  },

  /**
   *
   * @param {object} parent
   * @param {object} args
   * @param {object} contextValue
   * @returns {object} weather
   */
  async weather(parent, _, { dataSources }) {
    const row = await dataSources.weatherAPI.current(parent.geopos);
    return row;
  },
};
