import { URL_MONGODB } from './src/utils/dotEnvConfig';

module.exports = {
  type: 'mongodb',
  url: URL_MONGODB,
  useNewUrlParser: true,
  synchronize: true,
  entities: ['**/src/entity/*{.ts,.js}'],
};
