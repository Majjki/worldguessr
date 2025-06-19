export default class User {
  static async findOne(query) {
    const db = global.mongoClient.db(process.env.DB_NAME);
    return await db.collection('users').findOne(query);
  }

  static async find(query, projection = {}) {
    const db = global.mongoClient.db(process.env.DB_NAME);
    return await db.collection('users').find(query).project(projection).toArray();
  }

  static async insertOne(data) {
    const db = global.mongoClient.db(process.env.DB_NAME);
    return await db.collection('users').insertOne(data);
  }

  static async updateOne(query, update) {
    const db = global.mongoClient.db(process.env.DB_NAME);
    return await db.collection('users').updateOne(query, update);
  }
}
