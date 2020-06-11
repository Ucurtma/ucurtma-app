import React, { useEffect, useContext } from 'react';
import {
  useParams,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, List } from 'react-feather';
import { Box } from '@chakra-ui/core';

import { withApollo } from '../utils/apollo';
import Header from '../components/ui/header';
import Container from '../components/ui/container';
import SidebarItem from '../components/ui/sidebar-item';
import ContractActions from '../components/view/admin/contract-actions';
import ContractList from '../components/view/admin/contract-list';
import './admin.css';
import { MainContext } from '../context/main-context';

function Admin() {
  const { state: mainState } = useContext(MainContext);
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['admin', 'editor']);

  const navItems = [
    { href: 'deploy', icon: User, label: t('ContractActions') },
    { href: 'campaigns', icon: List, label: t('CampaignsActions') },
  ];

  useEffect(() => {
    if (!params['*']) {
      navigate('deploy', { replace: true });
    }
  });

  const changePage = href => {
    navigate(href);
  };

  return (
    <>
      <Header withLogo hideMenu isManager mb={8} />
      <Container>
        <Box w={{ base: '100%', lg: '30%' }}>
          {navItems.map((navItem, i) => (
            <SidebarItem
              icon={navItem.icon}
              key={i.toString()}
              label={navItem.label}
              active={navItem.href === params['*']}
              onClick={() => changePage(navItem.href)}
            />
          ))}
        </Box>
        <Box w={{ base: '100%', lg: '70%' }}>
          <Routes>
            <Route
              path="deploy"
              element={<ContractActions walletState={mainState} />}
            />
            <Route path="campaigns" element={<ContractList />} />
            <Route path="*" element={<Navigate to="deploy" replace />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}

export default withApollo(Admin);
