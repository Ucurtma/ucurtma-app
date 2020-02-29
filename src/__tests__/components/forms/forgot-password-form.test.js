/* eslint-env jest */
import React from 'react';
import { render, fireEvent, wait } from 'test-utils';
import userEvent from '@testing-library/user-event';
import ForgotPasswordForm from '../../../components/forms/forgot-password-form';

describe('Forgot Password Form Tests', () => {
  test('Renders Form', () => {
    const { getByText } = render(<ForgotPasswordForm />);
    expect(getByText('Email')).toBeInTheDocument();
  });

  test('Reset Password button should disabled after onBlur', async () => {
    const { getByText, getByLabelText } = render(<ForgotPasswordForm />);
    const button = getByText('Reset Password');
    const inputNode = getByLabelText('Email');
    expect(button).toBeInTheDocument();
    await fireEvent.blur(inputNode);
    await wait();
    expect(button).toHaveAttribute('disabled', '');
  });

  test('Reset Password button shouldnt disabled after user entries inputs right', async () => {
    const onSubmit = jest.fn();
    const { getByText, getByLabelText } = render(
      <ForgotPasswordForm onSubmit={onSubmit} />
    );

    const email = getByLabelText('Email');
    const button = getByText('Reset Password');

    await userEvent.type(email, 'harry@potter.com');
    await wait();

    expect(button).not.toHaveAttribute('disabled');
    userEvent.click(button);
    await wait();
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('Reset Password button shouldnt call func if onSubmit didnt defined', async () => {
    const onSubmit = jest.fn();
    const { getByText, getByLabelText } = render(<ForgotPasswordForm />);

    const email = getByLabelText('Email');
    const button = getByText('Reset Password');

    await userEvent.type(email, 'harry@potter.com');
    await wait();

    userEvent.click(button);
    await wait();
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  test('Renders Title', () => {
    const { queryByText } = render(<ForgotPasswordForm withTitle />);
    expect(queryByText('Forgot Password')).toBeInTheDocument();
  });

  test('Renders nothing as a title if there is no withTitle props', () => {
    const { queryByText } = render(<ForgotPasswordForm />);
    expect(queryByText('Forgot Password')).not.toBeInTheDocument();
  });
});
