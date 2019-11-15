import React, { useState } from 'react';
import Card from '../ui/card';
import ProfileHeader from '../ui/profile/profile-header';
import ChangeProfilePicture from '../ui/settings/change-profile-pic';
import ChangePassword from '../ui/settings/change-password';
import ChangeProfileInfo from '../ui/settings/change-profile-info';
import SocialLinkSettings from '../ui/settings/social-links';
import VerificationSettings from '../ui/settings/verification-settings';

function MyAccount() {
  // todo: we will get user from state management library
  const [user, setUser] = useState({
    name: 'Rocksteady',
    reputation: 'New User',
    avatarURL: null,
  });
  const verificatedAccount = false; // todo: this will come from server, define it from graphql query when backend is ready.

  const onAvatarChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      // now, we are settings our avatar locally which isn't ok because it is temporary.
      // todo: add user to state management because we should change this avatar in everywhere
      // todo: run change avatar query in here.
      const url = URL.createObjectURL(e.target.files[0]);
      setUser({ ...user, avatarURL: url });
    }

    if (type === 'delete') {
      setUser({ ...user, avatarURL: null });
    }
  };

  return (
    <Card paddingType="default">
      <ProfileHeader isVerified={verificatedAccount} user={user} />
      <ChangeProfilePicture
        onChange={(e, type) => onAvatarChange(e, type)}
        isAvatarExist={!!user.avatarURL}
      />
      <ChangePassword />
      <ChangeProfileInfo />
      <SocialLinkSettings />
      <VerificationSettings isVerified={verificatedAccount} />
    </Card>
  );
}

export default MyAccount;
