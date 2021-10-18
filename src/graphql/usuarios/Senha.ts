import { MinLength } from 'class-validator';
import { Field, InputType, ClassType } from 'type-graphql';

export const Senha = <T extends ClassType>(BaseClass: T): ClassType => {
  @InputType()
  class SenhaInput extends BaseClass {
    @Field()
    @MinLength(5)
    senha: string;
  }
  return SenhaInput;
};
