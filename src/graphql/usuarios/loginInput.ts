import { Field, InputType } from 'type-graphql';
import { Senha } from './Senha';

@InputType()
export class LoginInput extends Senha(class {}) {
  @Field()
  email: string;

  @Field()
  senha: string;
}
