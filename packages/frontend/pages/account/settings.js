import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { User, DollarSign, CreditCard } from 'react-feather';
import { Box } from '@chakra-ui/core';
import Header from '../../components/header';
import Container from '../../components/ui/container';
import SidebarItem from '../../components/ui/sidebar-item';
import MyAccount from '../../components/view/my-account';

function AccountSettings() {
  const [page, setPage] = useState('my-account');
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
    const contentIndex = navItems.findIndex(navItem =>
      path.find(pathItem => pathItem === navItem.slug)
    );
    setPage(navItems[contentIndex].slug);
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
          {/*
              todo: find a better way to render these things.
              what is the problem? glad to ask.
              there is no problem if user goes to http://url/account/my-account/
              'cause defined "page" state is "my-account". but let think about something else.

              if user goes to http://url/account/sponsored-campaigns/ in first place, our js is
              rendering my-account.  we're setting our state after one or two second,
              i mean, after component mounted. so, there is little waiting time for user which is bad.

              there is a way to do that in react-router but i can't found how to do that in nextjs.
              so, lets create a todo in here. we will make it happen later.
           */}
          {page === 'my-account' && <MyAccount />}
          {page === 'sponsored-campaigns' && <span>sponsored campaigns</span>}
          {page === 'billing-methods' && <span>billing-methods</span>}
        </Box>
      </Container>
    </>
  );
}

export default AccountSettings;
