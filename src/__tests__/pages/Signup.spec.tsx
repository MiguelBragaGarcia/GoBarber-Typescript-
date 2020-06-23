import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

import SignUp from '../../pages/SignUp';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/Toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

const apiMock = new AxiosMock(api);

describe('SignUp page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to signup', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    apiMock.onPost('users').reply(200, {
      id: 1,
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      avatar: null,
    });

    await wait(() => {
      expect(mockedHistoryPush).toBeCalledWith('/');
      expect(mockedAddToast).toBeCalledWith(
        expect.objectContaining({
          type: 'success',
        })
      );
    });
  });

  it('should not be able to signup with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: '' } });
    fireEvent.change(emailField, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordField, { target: { value: '' } });

    fireEvent.click(buttonElement);

    // TODO
    // Ideia que estou trabalhando como solução é usar a mudança de cor como indicativo de sucesso.
    // expect(nameField).toHaveStyle('border-color: #c53030');
  });

  it('should not be able to signup (Server/Client Error)', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Cadastrar');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    apiMock.onPost('users').reply(500, {
      id: 1,
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      avatar: null,
    });

    await wait(() => {
      expect(mockedAddToast).toBeCalledWith(
        expect.objectContaining({
          type: 'error',
        })
      );
    });
  });
});
