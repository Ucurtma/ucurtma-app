import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { User, DollarSign, CreditCard } from 'react-feather';
import { Box } from '@chakra-ui/core';
import Header from '../../components/header';
import Container from '../../components/ui/container';
import SidebarItem from '../../components/ui/sidebar-item';
import MyAccount from '../../components/view/my-account';

function AccountSettings() {
  const [page, setPage] = useState();
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

  useEffect(() => {
    const pathName = router.asPath;
    const path = pathName.split('/');
    setPage(path[path.length - 1]);
  });

  const changePage = (slug, href) => {
    router.push(Router.pathname, href, { shallow: 'true' });
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
        </Box>
      </Container>
    </>
  );
}

export default AccountSettings;
