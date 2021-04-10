const fastify = require('fastify')({ logger: { prettyPrint: true } });

fastify.register(require("./db.js"));

fastify.get('/', async () => {
  return { name: "Simple Microservice", uptime: process.uptime() };
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3001, "0.0.0.0")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start().catch(console.error);