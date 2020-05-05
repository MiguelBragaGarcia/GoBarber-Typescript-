import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

// Quando precisamos de uma interface dinâmica usamos o seguinte padrão
// [qualquer nome : tipo ] : e o tipo que será passado para esse identificador do objeto
// Então basicamente estamos falando que o objetp pode receber qualquer coisa como parâmetro
// Sem acusar de erro, já que é dinâmico e poderia ser  diversos valores.
