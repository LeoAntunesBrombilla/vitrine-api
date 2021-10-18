import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { ExisteEmail } from './ExisteEmail';
import { Senha } from './Senha';

@InputType()
export class AdicionarUsuarioInput extends Senha(class {}) {
  @Field()
  isAdmin: boolean;

  @Field()
  @IsEmail()
  @ExisteEmail({ message: 'email ja esta em uso, tente outro' })
  email: string;
}
