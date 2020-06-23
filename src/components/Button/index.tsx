import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" data-testid="button-container" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;

// O React controla o tipo do botão que será passado pelo ultimo
// atributo passado a ele. Ou seja ele sobreescreve  o tipo do botão
