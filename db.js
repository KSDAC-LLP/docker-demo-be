const fp = require("fastify-plugin");
const mongoose = require("mongoose");

class Database {
  #db;

  constructor() { }

  async _connect(options) {
    const mcs = `mongodb://localhost:27017/docker-test`;

    /**
     * Default connection options for mongoose
     */
    const defaultOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      autoIndex: true,
      useCreateIndex: true,
      poolSize: 10,
      authSource: "admin"
    };
    this.#db = await mongoose.createConnection(mcs, { ...defaultOptions, ...options });
    this.#db.set("toJSON", {
      virtuals: true,
    });
    await this.LoadModels();
  }

  /**
   * Autoload models from the models folder
   */
  async LoadModels() {
    require("./schemas/candies")(this.#db)
  }

  Connection() {
    return this.#db.connection;
  }

  Close() {
    return this.#db.close();
  }

  Models() {
    return this.#db.models;
  }

  async Clear() {
    return Promise.all(
      Object.keys(this.#db.models).map((m) => {
        return this.#db.models[m].deleteMany({});
      })
    );
  }
}

const db = new Database();

module.exports = fp(async function (fastify) {
  try {
    await db._connect();
    fastify.decorate("db", db);
  } catch (error) {
    console.log(error);
    process.nextTick(() => process.exit(-1));
  }
});