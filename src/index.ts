import "reflect-metadata";
import Express from "express";
import { ApolloServer } from "apollo-server-express";

import schemas from "./graphql/schemas";
import { createConnection } from "typeorm";
import router from "./storage/rotas";

import cors from "cors";

const app = Express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use("/", router);

const main = async () => {
  try {
    await createConnection();
  } catch (err) {
    console.error(err);
  }

  const schema = await schemas();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: corsOptions });
};

main();

app.use(cors());

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`GraphQL Server running`)
);

export default app;
