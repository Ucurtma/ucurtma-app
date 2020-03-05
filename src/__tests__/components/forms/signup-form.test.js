/* eslint-env jest */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, wait } from '../../../utils/test-utils';
import SignupForm from '../../../components/forms/signup-form';

describe('Signup Form Tests', () => {
  test('Renders Form', () => {
    const { getByText } = render(<SignupForm />);
    expect(getByText('Email')).toBeInTheDocument();
  });

  test('Create account button should disabled after onBlur', async () => {
    const { getByText, getByLabelText } = render(<SignupForm />);
    const button = getByText('Create Account');
    const inputNode = getByLabelText('Email');
    expect(button).toBeInTheDocument();
    expect(inputNode).toBeInTheDocument();
    await fireEvent.blur(inputNode);
    await wait();
    expect(button).toHaveAttribute('disabled', '');
  });

  test('Create account button shouldnt disabled after user entries inputs right', async () => {
    const onSubmit = jest.fn();
    const { getByText, getByLabelText } = render(
      <SignupForm onSubmit={onSubmit} />
    );

    const button = getByText('Create Account');

    const inputs = [
      { item: getByLabelText('Name'), value: 'Harry Potter' },
      { item: getByLabelText('Email'), value: 'harry@potter.com' },
      { item: getByLabelText('Password'), value: '123456' },
      { item: getByLabelText('Password Confirmation'), value: '123456' },
    ];

    inputs.forEach(input => {
      userEvent.type(input.item, input.value);
    });

    expect(button).not.toHaveAttribute('disabled');
    userEvent.click(button);
    await wait(() => {
      expect.assertions(2);
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test('Renders Title', () => {
    const { queryByText } = render(<SignupForm withTitle />);
    expect(queryByText('Sign up')).toBeInTheDocument();
  });

  test('Renders nothing as a title if there is no withTitle props', () => {
    const { queryByText } = render(<SignupForm />);
    expect(queryByText('Sign up')).not.toBeInTheDocument();
  });
});
