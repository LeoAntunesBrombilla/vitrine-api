import { Field, InputType } from 'type-graphql';

@InputType()
export class CampanhaForm {
  @Field({ nullable: false })
  nome: string;

  @Field({ nullable: false })
  descricao: string;

  @Field({ nullable: false })
  categoria: string;

  @Field({ nullable: false })
  urlDestino: string;

  @Field({ nullable: false })
  imagem: string;

  @Field({ nullable: false })
  dataInicio: string;

  @Field({ nullable: false })
  dataFim: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
