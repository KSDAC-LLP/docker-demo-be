const fastify = require('fastify')({ logger: { prettyPrint: true } });

fastify.register(require("./db.js"));

fastify.get('/candies', async () => {
  return await fastify.db.Models().Candies.find().lean();
});

fastify.post('/candies', {
  schema: {
    body: {
      type: "object",
      additionalProperities: false,
      props: {
        color: {
          type: "string",
        },
        flavor: {
          type: "string",
        },
        price: {
          type: "number",
        }
      },
      required: ["color", "flavour", "price"]
    },
  }
}, async ({ body }) => {
  return await fastify.db.Models().Candies.create(body);
});

fastify.patch("/candies/:id", async ({ params: { id }, body }) => {
  const oldCandy = await fastify.db.Models().Candies.findById(id).lean();
  let updatedCandy = { ...oldCandy, ...body };
  return await fastify.db.Models().Candies.findOneAndUpdate({ _id: id }, updatedCandy);
});

fastify.delete("/candies/:id", async ({ params: { id } }) => {
  return fastify.db.Models().Candies.deleteById(id);
});

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