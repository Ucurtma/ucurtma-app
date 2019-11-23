import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { User, DollarSign, CreditCard } from 'react-feather';
import { Box } from '@chakra-ui/core';
import Header from '../../components/header';
import Container from '../../components/ui/container';
import SidebarItem from '../../components/ui/sidebar-item';
import MyAccount from '../../components/view/my-account';
import Verification from '../../components/view/verification';

// todo: i have some questions about imports that we use above.
// i guess, people are downloading verification page if they are not in verification page which they shouldn't.
// can we use something like dynamic import for that? lets investigate it later.

function AccountSettings({ query }) {
  const [page, setPage] = useState(query.slug);
  const router = useRouter();
  const navItems = [
    {
      slug: 'my-account',
      icon: User,
      label: 'My Account',
      href: '/account/my-account',
    },
    {
      slug: 'sponsored-campaigns',
      icon: DollarSign,
      label: 'Sponsored Campaigns',
      href: '/account/sponsored-campaigns',
    },
    {
      slug: 'billing-methods',
      icon: CreditCard,
      label: 'Billing Methods',
      href: '/account/billing-methods',
    },
  ];

  const changePage = (slug, href) => {
    router.push(Router.pathname, href, { shallow: 'true' });
    setPage(slug);
  };

  return (
    <>
      <Header loggedIn />
      <Container>
        <Box
          w={{
            base: '100%',
            lg: '30%',
          }}
        >
          {navItems.map(navItem => (
            <SidebarItem
              icon={navItem.icon}
              key={Math.random()}
              label={navItem.label}
              active={navItem.slug === page}
              onClick={() => changePage(navItem.slug, navItem.href)}
            />
          ))}
        </Box>
        <Box
          w={{
            base: '100%',
            lg: '70%',
          }}
        >
          {page === 'my-account' && <MyAccount />}
          {page === 'sponsored-campaigns' && <span>sponsored campaigns</span>}
          {page === 'billing-methods' && <span>billing-methods</span>}
          {page === 'verification' && <Verification />}
        </Box>
      </Container>
    </>
  );
}

AccountSettings.getInitialProps = ({ query }) => {
  return { query };
};

AccountSettings.propTypes = {
  query: PropTypes.shape({
    slug: PropTypes.oneOf([
      'my-account',
      'sponsored-campaigns',
      'billing-methods',
      'verification',
    ]),
  }),
};

export default AccountSettings;
