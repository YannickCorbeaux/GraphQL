export default {

  async cookingStyleHasRestaurants(parent, _, { dataSources }) {
    const rows = await dataSources.restoSQL.restaurantHasCookingStyleDatamapper.findAll({
      where: {
        cooking_style_id: parent.id,
      },
    });
    return rows;
  },

};
