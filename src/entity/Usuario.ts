import { ObjectType, Field, ID } from 'type-graphql';

import { Entity, BaseEntity, ObjectIdColumn, Column, ObjectID } from 'typeorm';

@ObjectType()
@Entity()
export class Usuario extends BaseEntity {
  @Field(() => ID, { nullable: false })
  @ObjectIdColumn()
  id: ObjectID;

  @Field({ nullable: false })
  @Column()
  email: string;

  @Field({ nullable: false })
  @Column()
  senha: string;

  @Field({ nullable: false })
  @Column()
  isAdmin: boolean;
}
