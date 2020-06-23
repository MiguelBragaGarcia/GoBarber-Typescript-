import React from 'react';

import { render } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button component', () => {
  it('should be able to render the button component', () => {
    const { getByText } = render(<Button type="button">test-button</Button>);

    expect(getByText('test-button')).toBeTruthy();
  });

  it('should be loading', () => {
    const { getByTestId } = render(
      <Button loading type="button">
        test-button
      </Button>
    );

    expect(getByTestId('button-container')).toHaveTextContent('Carregando...');
  });
});
