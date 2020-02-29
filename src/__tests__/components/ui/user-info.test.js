/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import { CheckCircle } from 'react-feather';
import { UserInfo, UserInfoBadge } from '../../../components/ui/user-info';

describe('User Info Tests', () => {
  test('Renders User Info', () => {
    const { getByText } = render(
      <UserInfo name="Ash Ketchum" reputation="New User" />
    );
    expect(getByText('Ash Ketchum')).toBeInTheDocument();
    expect(getByText('New User')).toBeInTheDocument();
  });

  test('Renders User Badge', () => {
    const { getByText } = render(
      <UserInfoBadge icon={CheckCircle} label="Verificated User" />
    );
    expect(getByText('Verificated User')).toBeInTheDocument();
  });

  test('Should render count + label if count defined', () => {
    const { getByText } = render(
      <UserInfoBadge icon={CheckCircle} count="4" label="Sponsorship" />
    );
    expect(getByText('4 Sponsorship')).toBeInTheDocument();
  });

  test('Should render avatar if withAvatar defined', () => {
    const { getByTestId } = render(
      <UserInfo name="Ash Ketchum" reputation="New User" withAvatar />
    );
    expect(getByTestId('avatar')).toBeInTheDocument();
  });
});
