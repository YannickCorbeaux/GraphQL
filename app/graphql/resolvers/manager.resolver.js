export default {
  async restaurants(parent, _, { dataSources }) {
    const rows = await dataSources.restoSQL.restaurantDatamapper.findAll({
      where: { manager_id: parent.id },
    });
    return rows;
  },
};
