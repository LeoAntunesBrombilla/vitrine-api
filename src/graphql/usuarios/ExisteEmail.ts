import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Usuario } from '../../entity/Usuario';

@ValidatorConstraint({ async: true })
export class ExisteEmailConstraint implements ValidatorConstraintInterface {
  validate(email: string): Promise<boolean> {
    return Usuario.findOne({ where: { email } }).then((usuario) => {
      if (usuario) return false;
      return true;
    });
  }
}

export function ExisteEmail(validateOption?: ValidationOptions) {
  return function (
    object: Record<string, unknown>,
    propertyName: string,
  ): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validateOption,
      constraints: [],
      validator: ExisteEmailConstraint,
    });
  };
}
