/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import { fireEvent, wait } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import ChangePassword from '../../../../components/ui/settings/change-password';

describe('Change Password Tests', () => {
  test('Renders Component', () => {
    const { getByText } = render(<ChangePassword />);
    expect(getByText('Password Confirmation')).toBeInTheDocument();
    expect(getByText('Current Password')).toBeInTheDocument();
    expect(getByText('Update Password')).toBeInTheDocument();
  });

  test('Update Password button should disabled after onBlur', async () => {
    const { getByText, getByLabelText } = render(<ChangePassword />);
    const button = getByText('Update Password');
    const inputNode = getByLabelText('Current Password');
    fireEvent.blur(inputNode);
    await wait();
    expect(button).toHaveAttribute('disabled', '');
  });

  test('Update Password button shouldnt disabled after user entries inputs right', async () => {
    const { getByText, getByLabelText } = render(<ChangePassword />);

    const button = getByText('Update Password');

    const inputs = [
      { item: getByLabelText('Current Password'), value: 'Harry Potter' },
      { item: getByLabelText('Password'), value: '123456' },
      { item: getByLabelText('Password Confirmation'), value: '123456' },
    ];

    inputs.forEach(input => {
      userEvent.type(input.item, input.value);
    });

    await wait();

    expect(button).not.toHaveAttribute('disabled');
  });
});
