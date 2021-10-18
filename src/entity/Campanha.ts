import { Entity, BaseEntity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Campanha extends BaseEntity {
  @Field(() => ID, { nullable: false })
  @ObjectIdColumn()
  id: ObjectID;

  @Field({ nullable: false })
  @Column()
  nome: string;

  @Field({ nullable: false })
  @Column()
  descricao: string;

  @Field({ nullable: false })
  @Column()
  categoria: string;

  @Field({ nullable: false })
  @Column()
  urlDestino: string;

  @Field({ nullable: false })
  @Column()
  imagem: string;

  @Field({ nullable: false })
  @Column()
  dataInicio: string;

  @Field({ nullable: false })
  @Column()
  dataFim: string;

  @Field({ nullable: true })
  @Column()
  createdAt: Date;

  @Field({ nullable: true })
  @Column()
  updatedAt: Date;
}

export default Campanha;
