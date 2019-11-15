/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import ProfileHeader from '../../../../components/ui/profile/profile-header';

describe('Profile Header Tests', () => {
  const user = {
    name: 'Mustafa Turhan',
    reputation: 'New User',
    avatarURL: null,
  };

  test('Renders Component', () => {
    const { getByText } = render(<ProfileHeader user={user} />);
    expect(getByText('Someone Random')).toBeInTheDocument();
    expect(getByText('New User')).toBeInTheDocument();
  });

  test('Should render Verificated User if isVerified prop defined true', () => {
    const { getByText } = render(<ProfileHeader user={user} isVerified />);
    expect(getByText('Verificated User')).toBeInTheDocument();
  });

  test('Should render contribute counts', () => {
    const { getByText } = render(<ProfileHeader user={user} isVerified />);
    expect(getByText('0 Sponsorship')).toBeInTheDocument();
    expect(getByText('0 Campaign')).toBeInTheDocument();
  });

  test('Should render defined contribute counts', () => {
    const { getByText } = render(
      <ProfileHeader
        user={user}
        count={{ sponsorship: '4', campaign: '5' }}
        isVerified
      />
    );
    expect(getByText('4 Sponsorship')).toBeInTheDocument();
    expect(getByText('5 Campaign')).toBeInTheDocument();
  });
});
