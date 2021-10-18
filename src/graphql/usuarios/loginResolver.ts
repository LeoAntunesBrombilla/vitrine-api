import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { Usuario } from '../../entity/Usuario';
import { isAuth } from './isAuth';
import { MyContext } from './MyContext';
import { LoginInput } from './loginInput';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class LoginResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  async Me(@Ctx() { payload }: MyContext): Promise<string> {
    return payload!.userId;
  }

  @Mutation(() => LoginResponse)
  async Login(
    @Arg('data')
    { email, senha }: LoginInput,
  ): Promise<{
    accessToken: string;
  }> {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const verify = await compare(senha, usuario.senha);

    if (!verify) {
      throw new Error('Senha ruim');
    }

    return {
      accessToken: sign({ userId: usuario.id }, 'MySecretKey', {
        expiresIn: '60m',
      }),
    };
  }
}
