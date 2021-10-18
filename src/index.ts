import 'reflect-metadata';
import Express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schemas from './graphql/schemas';
import { createConnection } from 'typeorm';
import router from './storage/rotas';

const app = Express();

app.use('/', router);

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

  apolloServer.applyMiddleware({ app });
};

main();

app.listen(4000, () => console.log(`GraphQL Server running`));

export default app;
