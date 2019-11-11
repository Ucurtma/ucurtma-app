/* eslint-env jest */
import React from 'react';
import { render, fireEvent, wait } from 'test-utils';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../../components/forms/login-form';

describe('Login Form Tests', () => {
  test('Renders Form', () => {
    const { getByText } = render(<LoginForm />);
    expect(getByText('Email')).toBeInTheDocument();
  });

  test('Log in button should disabled after onBlur', async () => {
    const { getByText, getByLabelText } = render(<LoginForm />);
    const button = getByText('Log in');
    const inputNode = getByLabelText('Email');
    expect(button).toBeInTheDocument();
    await fireEvent.blur(inputNode);
    await wait();
    expect(button).toHaveAttribute('disabled', '');
  });

  test('Log in button shouldnt disabled after user entries inputs right', async () => {
    const onSubmit = jest.fn();
    const { getByText, getByLabelText } = render(
      <LoginForm onSubmit={onSubmit} />
    );
    const button = getByText('Log in');

    const inputs = [
      { item: getByLabelText('Email'), value: 'harry@potter.com' },
      { item: getByLabelText('Password'), value: '123456' },
    ];

    inputs.forEach(input => {
      userEvent.type(input.item, input.value);
    });

    expect(button).not.toHaveAttribute('disabled');
    userEvent.click(button);
    await wait();
    expect.assertions(2);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('Renders Title', () => {
    const { queryAllByText } = render(<LoginForm withTitle />);
    expect(queryAllByText('Log in')).toHaveLength(2);
  });

  test('Renders nothing as a title if there is no withTitle props', () => {
    const { queryAllByText } = render(<LoginForm />);
    expect(queryAllByText('Log in')).toHaveLength(1);
  });
});
