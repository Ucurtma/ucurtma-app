import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { User, DollarSign, CreditCard } from 'react-feather';
import Header from '../../components/header';
import Container from '../../components/ui/container';
import Column from '../../components/ui/column';
import SidebarItem from '../../components/ui/sidebar-item';

function MyAccount() {
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
      <Header />
      <Container>
        <Column colSize="30">
          {navItems.map(navItem => (
            <SidebarItem
              icon={navItem.icon}
              key={Math.random()}
              label={navItem.label}
              active={navItem.slug === page}
              onClick={() => changePage(navItem.slug, navItem.href)}
            />
          ))}
        </Column>
        <Column colSize="70">
          {page === 'my-account' && <span>my-account</span>}
          {page === 'sponsored-campaigns' && <span>sponsored campaigns</span>}
          {page === 'billing-methods' && <span>billing-methods</span>}
        </Column>
      </Container>
    </>
  );
}

export default MyAccount;
