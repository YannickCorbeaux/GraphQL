export default {
  // Dans le premier paramètre il ranvoi l'objet de l'élément parent
  async manager(parent/* (restaurant) */, _, { dataSources }) {
    const row = await dataSources
      .restoSQL
      .managerDatamapper
      .findByPkBatch
      .load(parent.manager_id);
    return row;
  },

  async city(parent, _, { dataSources }) {
    const row = await dataSources
      .restoSQL
      .cityDatamapper
      .findByPkBatch
      .load(parent.city_id);
    return row;
  },

  async restaurantHasCookingStyles(parent, _, { dataSources }) {
    const rows = await dataSources.restoSQL.restaurantHasCookingStyleDatamapper.findAll({
      where: { restaurant_id: parent.id },
    });
    return rows;
  },
};
