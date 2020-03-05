/* eslint-env jest */
import React from 'react';
import { render } from '../../../../utils/test-utils';
import AccountFormTemplate from '../../../../components/ui/templates/account-form-template';
import ForgotPasswordForm from '../../../../components/forms/forgot-password-form';
import MyPassword from '../../../../components/illustrations/my-password';

describe('Input Tests', () => {
  test('Should render defined Form', () => {
    const { getByText, getByLabelText } = render(
      <AccountFormTemplate form={<ForgotPasswordForm withTitle />} />
    );
    expect(getByText('Forgot Password')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
  });

  test('Should render defined children', () => {
    const { getByText } = render(
      <AccountFormTemplate form={<ForgotPasswordForm withTitle />}>
        Did you remember?
      </AccountFormTemplate>
    );
    expect(getByText('Did you remember?')).toBeInTheDocument();
  });

  test('Should render illustration', () => {
    const { getByTestId } = render(
      <AccountFormTemplate
        form={<ForgotPasswordForm withTitle />}
        illustration={<MyPassword />}
      />
    );
    expect(getByTestId('my-password-svg')).toBeInTheDocument();
  });
});
