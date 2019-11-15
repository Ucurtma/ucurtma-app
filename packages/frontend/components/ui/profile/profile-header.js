import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, DollarSign, Umbrella } from 'react-feather';
import { Flex, Box } from '@chakra-ui/core';
import { UserInfo, UserInfoBadge } from '../user-info';

function ProfileHeader({ isVerified, user, count }) {
  return (
    <Flex
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="divider"
      pb={4}
      flexWrap="wrap"
    >
      <Box
        w={{
          base: '100%',
          lg: '60%',
        }}
        justifyContent="flex-end"
      >
        <UserInfo
          withAvatar
          name={user.name}
          reputation={user.reputation}
          avatarURL={user.avatarURL}
        />
      </Box>
      <Box
        w={{
          base: '100%',
          lg: '40%',
        }}
        justifyContent="flex-end"
        mt={{
          base: 4,
          lg: 0,
        }}
      >
        <Box display="flex">
          <UserInfoBadge
            icon={CheckCircle}
            label={
              isVerified
                ? 'Verificated User'
                : 'To create a campaign, you should become a verified user.'
            }
            color={isVerified ? 'linkBlue' : 'passiveParagraph.300'}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <UserInfoBadge
            icon={DollarSign}
            count={count.sponsorship}
            label="Sponsorship"
          />
          <UserInfoBadge
            icon={Umbrella}
            count={count.campaign}
            label="Campaign"
          />
        </Box>
      </Box>
    </Flex>
  );
}

ProfileHeader.defaultProps = {
  isVerified: false,
  count: {
    sponsorship: '0',
    campaign: '0',
  },
  user: {
    name: '',
    reputation: '',
    avatarURL: '',
  },
};

ProfileHeader.propTypes = {
  isVerified: PropTypes.bool,
  count: PropTypes.shape({
    sponsorship: PropTypes.string,
    campaign: PropTypes.string,
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    reputation: PropTypes.string,
    avatarURL: PropTypes.string,
  }),
};

export default ProfileHeader;
