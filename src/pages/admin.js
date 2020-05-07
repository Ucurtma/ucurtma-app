import React, { useState } from 'react';
import { useParams, Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User } from 'react-feather';
import { Box } from '@chakra-ui/core';
import Header from '../components/ui/header';
import Container from '../components/ui/container';
import SidebarItem from '../components/ui/sidebar-item';
import ContractActions from '../components/view/admin/contract-actions';

function Admin() {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation('admin');

  const [page] = useState(params.slug || 'deploy');

  React.useEffect(() => {
    if (!params.slug) {
      navigate('deploy', { replace: true });
    }
  });

  const navItems = [
    { slug: 'deploy', icon: User, label: t('ContractActions') },
  ];

  return (
    <>
      <Header withLogo hideMenu mb={8} />
      <Container>
        <Box w={{ base: '100%', lg: '30%' }}>
          {navItems.map((navItem, i) => (
            <SidebarItem
              icon={navItem.icon}
              key={i.toString()}
              label={navItem.label}
              active={navItem.slug === page}
              // onClick={() => changePage(navItem.slug, navItem.href)}
            />
          ))}
        </Box>
        <Box w={{ base: '100%', lg: '70%' }}>
          <Routes>
            <Route path="*" element={<ContractActions />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}

export default Admin;
