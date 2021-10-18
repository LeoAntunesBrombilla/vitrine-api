import { createConnection } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const testConn = (drop: boolean = false) => {
  return createConnection({
    type: 'mongodb',
    url: 'mongodb+srv://admin:admin@cluster0.ybymc.mongodb.net/typegraphql-teste?retryWrites=true&w=majority',
    database: 'typegraphql-teste',
    useNewUrlParser: true,
    synchronize: drop,
    dropSchema: drop,
    entities: ['../../**/src/entity/*{.ts,.js}'],
  });
};
