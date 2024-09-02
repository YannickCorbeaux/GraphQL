class CoreDatamapper {
  tableName;

  constructor(client) {
    this.client = client;
    // On implémente une méthode particulère issue de la méthode batch de BatchedSQLDatasource La
    // méthode batch va nous founir un objet qui nous donnera accès a une méthode .load() Cette
    // méthode load nous permettra de fournir au fil de l'eau les ids de l'entité à récupérer Et il
    // n'exécutera la requête SQL qu'après avoir récupérer tous les ids. Pour au final nous renvoyer
    // la liste coimplète des enregistrement ; et cela en une seule requête SQL
    this.findByPkBatch = this.client.query
      .select('*')
      .batch(async (query, batchIds) => {
        const rows = await query
          .from(this.tableName)
          .whereIn('id', batchIds).cache(process.env.CACHE_TTL);
        // Pour que les enregistrements du résultat de requête se retrouvent à la bonne place, c'est
        // à dire dans le même ordre que les demandes graphQL. On créer un traitement de
        // réorganisation par correspondance d'id
        return batchIds.map((batchId) => rows?.find((row) => row.id === batchId));
      });
  }

  /**
     * Récupération par identifiant
     * @param {number|number[]} id identifiant ou liste d'identifiants
     * @returns un enregistrement ou une liste d'enregistrement
     */
  async findByPk(id) {
    const rows = await this.client.query
      .from(this.tableName)
      .where({ id })
      .first()
      // Une fois mis en place la nouvelle technique avec BatchedSQLDatasource il suffit d'ajouter
      // la méthode cache en precisant le nombre de secondes de durrée de vie, et il se charge de
      // tout le reste
      .cache(process.env.CACHE_TLL);
    return rows;
  }

  async findAll(params) {
    const query = this.client.query
      .from(this.tableName);

    if (params?.where) {
      query.where(params.where);
    }

    // A partir du moment ou je fais await il fabrique et execute la requête et retourne les
    // résultat
    const rows = await query.cache(process.env.CACHE_TLL);

    return rows;
  }

  async create(inputData) {
    const row = await this.client.query
      .into(this.tableName)
      .insert(inputData)
      .returning('*');
    return row;
  }

  async update({ id }, inputData) {
    const row = await this.client.query
      .from(this.tableName)
      .update(inputData)
      .where({ id })
      .returning('*');
    return row;
  }

  async delete(id) {
    const rowCount = await this.client.query
      .from(this.tableName)
      .where({ id })
      .del();
    return !!rowCount;
  }
}

export default CoreDatamapper;
