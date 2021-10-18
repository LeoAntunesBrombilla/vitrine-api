import { Connection } from 'typeorm';
import faker from 'faker';

import { gCall } from '../../test-utils/gCall';
import { testConn } from '../../test-utils/testConn';
import { Campanha } from '../../entity/Campanha';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const adicionarCampanhaMutation = `
mutation($data: AdicionarCampanhaInput!) {
  adicionarCampanha(data: $data) {
    categoria
    createdAt
    dataFim
    dataInicio
    descricao
    imagem
    nome
    updatedAt
  }
}
`;

const exclusaoCampanhaMutation = `
mutation($id: String!){
  deletarCampanha(id: $id) {
    nome
  }
}
`;

const atualizarCampanhaMutation = `
mutation($data: AdicionarCampanhaInput!, $id: String!){
  atualizarCampanha(data: $data, id: $id) {
    nome
    categoria
    createdAt
    dataFim
    dataInicio
    descricao
    imagem
    nome
    updatedAt
  }
}
`;

describe('Registro de campanha', () => {
  it('mantem campanha', async () => {
    const campanha = {
      nome: faker.name.firstName(),
      categoria: faker.commerce.department(),
      dataInicio: `${faker.date.recent()}`,
      dataFim: `${faker.date.future()}`,
      descricao: faker.company.catchPhraseAdjective(),
      imagem: faker.image.business(),
      createdAt: `${faker.date.past()}`,
      updatedAt: `${faker.date.soon()}`,
    };

    const resposta = await gCall({
      source: adicionarCampanhaMutation,
      variableValues: {
        data: campanha,
      },
    });

    expect(resposta).toMatchObject({
      data: {
        adicionarCampanha: {
          nome: campanha.nome,
          categoria: campanha.categoria,
          dataInicio: campanha.dataInicio,
          dataFim: campanha.dataFim,
          descricao: campanha.descricao,
          imagem: campanha.imagem,
          createdAt: campanha.createdAt,
          updatedAt: campanha.updatedAt,
        },
      },
    });

    const dbUser = await Campanha.findOne({ where: { nome: campanha.nome } });

    expect(dbUser).toBeDefined();
    expect(dbUser!.id).toBeDefined();
    expect(dbUser!.nome).toBe(campanha.nome);
    expect(dbUser!.categoria).toBe(campanha.categoria);
    expect(dbUser!.dataInicio).toBe(campanha.dataInicio);
    expect(dbUser!.dataFim).toBe(campanha.dataFim);
    expect(dbUser!.descricao).toBe(campanha.descricao);
    expect(dbUser!.imagem).toBe(campanha.imagem);
    expect(dbUser!.createdAt).toBe(campanha.createdAt);
    expect(dbUser!.updatedAt).toBe(campanha.updatedAt);

    const campanhaEditada = {
      nome: faker.name.firstName(),
      categoria: faker.commerce.department(),
      dataInicio: `${faker.date.recent()}`,
      dataFim: `${faker.date.future()}`,
      descricao: faker.company.catchPhraseAdjective(),
      imagem: faker.image.business(),
      createdAt: `${faker.date.past()}`,
      updatedAt: `${faker.date.soon()}`,
    };

    const atualizarResposta = await gCall({
      source: atualizarCampanhaMutation,
      variableValues: {
        id: `${dbUser?.id}`,
        data: campanhaEditada,
      },
    });

    expect(atualizarResposta).toMatchObject({
      data: {
        atualizarCampanha: {
          categoria: campanhaEditada.categoria,
          dataInicio: campanhaEditada.dataInicio,
          dataFim: campanhaEditada.dataFim,
          descricao: campanhaEditada.descricao,
          imagem: campanhaEditada.imagem,
          createdAt: campanhaEditada.createdAt,
          updatedAt: campanhaEditada.updatedAt,
          nome: campanhaEditada.nome,
        },
      },
    });

    const dbUserEditado = await Campanha.findOne({
      where: { nome: campanhaEditada.nome },
    });

    expect(dbUserEditado).toBeDefined();
    expect(dbUserEditado!.id).toBeDefined();
    expect(dbUserEditado!.nome).toBe(campanhaEditada.nome);
    expect(dbUserEditado!.categoria).toBe(campanhaEditada.categoria);
    expect(dbUserEditado!.dataInicio).toBe(campanhaEditada.dataInicio);
    expect(dbUserEditado!.dataFim).toBe(campanhaEditada.dataFim);
    expect(dbUserEditado!.descricao).toBe(campanhaEditada.descricao);
    expect(dbUserEditado!.imagem).toBe(campanhaEditada.imagem);
    expect(dbUserEditado!.createdAt).toBe(campanhaEditada.createdAt);
    expect(dbUserEditado!.updatedAt).toBe(campanhaEditada.updatedAt);

    const deletarResposta = await gCall({
      source: exclusaoCampanhaMutation,
      variableValues: {
        id: `${dbUserEditado?.id}`,
      },
    });

    expect(deletarResposta).toMatchObject({
      data: {
        deletarCampanha: { nome: campanhaEditada.nome },
      },
    });
  });
});
