/* eslint-env jest */
import React from 'react';
import { render, fireEvent, wait } from 'test-utils';
import userEvent from '@testing-library/user-event';
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
    const nameInput = getByLabelText('Name');
    const email = getByLabelText('Email');
    const password = getByLabelText('Password');
    const passwordConfirmation = getByLabelText('Password Confirmation');
    const button = getByText('Create Account');

    await userEvent.type(nameInput, 'Mustafa Turhan');
    await userEvent.type(email, 'mustaphaturhan@gmail.com');
    await userEvent.type(password, '#49sd2YXBKX%XZ');
    await userEvent.type(passwordConfirmation, '#49sd2YXBKX%XZ');
    await wait();

    expect(button).not.toHaveAttribute('disabled');
    await userEvent.click(button);
    await wait();
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
