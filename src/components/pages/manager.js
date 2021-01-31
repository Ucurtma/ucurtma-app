import React, { lazy, Suspense, useEffect } from 'react';
import {
  useParams,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, List, Loader, Share } from 'react-feather';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../ui/header';
import Container from '../ui/container';
import SidebarItem from '../ui/sidebar-item';
import CreateCampaign from './manager/create-campaign';
import './manager.css';
import Footer from '../ui/footer';
import { useStore } from '../../context/global-state';

const ContractList = lazy(() => import('./manager/created-campaign-list'));
const ContentManagement = lazy(() => import('./manager/content-management'));
const NewContent = lazy(() => import('./manager/new-content'));

function Manager() {
  const { state: mainState } = useStore();
  const isWalletExist = mainState.wallet;
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['manager', 'editor']);

  const navItems = [
    { href: 'create-campaign', icon: User, label: t('CreateCampaign') },
    {
      href: 'campaigns',
      subHrefs: ['edit-campaign'],
      icon: List,
      label: t('CampaignsActions'),
      disabled: !isWalletExist,
    },
    {
      href: 'content-management',
      icon: Share,
      label: t('PostContent.title'),
      disabled: !isWalletExist,
    },
  ];

  const changePage = href => {
    navigate(href);
  };

  useEffect(() => {
    const metamaskToken = localStorage.getItem('signedToken');
    if (!metamaskToken) {
      navigate('create-campaign');
    }
  }, [navigate]);

  return (
    <>
      <main data-testid="manager-main">
        <Header isManager />
        <Container pt={32}>
          <Flex
            w="full"
            transform="none"
            flexDir={{ base: 'column', md: 'row' }}
            mt={4}
          >
            <Box w="full" maxW={{ base: '100%', md: '276px' }} flexShrink={0}>
              {navItems.map((navItem, i) => (
                <SidebarItem
                  icon={navItem.icon}
                  key={i.toString()}
                  label={navItem.label}
                  active={
                    params['*']?.startsWith(navItem.href) ||
                    params['*']?.startsWith(
                      navItem.subHrefs?.map(subHref => subHref)
                    )
                  }
                  onClick={() => changePage(navItem.href)}
                  disabled={navItem.disabled}
                />
              ))}
            </Box>
            <Box w="full">
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route
                    path="content-management"
                    element={<ContentManagement />}
                  />
                  <Route
                    path="content-management/new-content"
                    element={<NewContent />}
                  />
                  <Route
                    path="create-campaign"
                    element={<CreateCampaign walletState={mainState} />}
                  />
                  <Route
                    path="edit-campaign/:campaignId"
                    element={<CreateCampaign isEdit walletState={mainState} />}
                  />
                  <Route path="campaigns" element={<ContractList />} />
                  <Route
                    path="*"
                    element={<Navigate to="create-campaign" replace />}
                  />
                </Routes>
              </Suspense>
            </Box>
          </Flex>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Manager;
