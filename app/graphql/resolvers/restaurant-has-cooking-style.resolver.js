export default {

  async cookingStyle(parent, _, { dataSources }) {
    const row = await dataSources
      .restoSQL
      .cookingStyleDatamapper
      .findByPkBatch
      .load(parent.cooking_style_id);
    return row;
  },

};
