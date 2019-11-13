import React from 'react';
import Card from '../ui/card';
import ProfileHeader from '../ui/profile/profile-header';

function MyAccount() {
  const verificatedAccount = false; // todo: this will come from server, define it from graphql query when backend is ready.
  const user = {
    name: 'Mustafa Turhan',
    reputation: 'New User',
    avatarURL: null,
  };
  return (
    <Card paddingType="default">
      <ProfileHeader isVerified={verificatedAccount} user={user} />
    </Card>
  );
}

export default MyAccount;
