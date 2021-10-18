import { Connection } from 'typeorm';
import faker from 'faker';

import { gCall } from '../../test-utils/gCall';
import { testConn } from '../../test-utils/testConn';
import { Usuario } from '../../entity/Usuario';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const adicionarUsuarioMutation = `
mutation($data: AdicionarUsuarioInput!) {
  adicionarUsuario(data: $data) {
    email
    senha
    isAdmin
  }
}`;

describe('Registro de usuário', () => {
  it('cria usuário', async () => {
    const usuario = {
      email: faker.internet.email(),
      senha: faker.internet.password(),
      isAdmin: faker.datatype.boolean(),
    };

    const resposta = await gCall({
      source: adicionarUsuarioMutation,
      variableValues: {
        data: usuario,
      },
    });

    expect(resposta).toMatchObject({
      data: {
        adicionarUsuario: {
          email: usuario.email,
          senha: usuario.senha,
          isAdmin: usuario.isAdmin,
        },
      },
    });

    const dbUser = await Usuario.findOne({ where: { email: usuario.email } });

    expect(dbUser).toBeDefined();
    expect(dbUser!.isAdmin).toBe(usuario.isAdmin);
    expect(dbUser!.email).toBe(usuario.email);
    expect(dbUser!.senha).toBe(usuario.senha);
  });
});
