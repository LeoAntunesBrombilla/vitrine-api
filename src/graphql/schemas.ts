import { buildSchema } from 'type-graphql';
import { CampanhaResolver } from './campanhas/resolvers';
import { UsuarioResolver } from './usuarios/resolvers';
import { LoginResolver } from './usuarios/loginResolver';

const Schema = async () =>
  await buildSchema({
    resolvers: [CampanhaResolver, UsuarioResolver, LoginResolver],
  });

export default Schema;
