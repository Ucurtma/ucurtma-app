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

// todo: move editorjs to another file
// editorjs
import EditorJS from '@editorjs/editorjs';
import EditorHeader from '@editorjs/header';
import EditorDelimiter from '@editorjs/delimiter';
import EditorList from '@editorjs/list';
import EditorImage from '@editorjs/image';

import { withApollo } from '../utils/apollo';
import Header from '../components/ui/header';
import Container from '../components/ui/container';
import SidebarItem from '../components/ui/sidebar-item';
import ContractActions from '../components/view/admin/contract-actions';
import ContractList from '../components/view/admin/contract-list';
import './admin.css';
import { WalletContext } from '../App';

function Admin() {
  const { state: walletState } = useContext(WalletContext);
  const isWalletExist = walletState.wallet;
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['admin', 'editor']);

  const navItems = [
    { href: 'deploy', icon: User, label: t('ContractActions') },
    { href: 'campaigns', icon: List, label: t('CampaignsActions') },
  ];

  useEffect(() => {
    if (isWalletExist) {
      window.editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: EditorHeader,
          delimiter: EditorDelimiter,
          list: EditorList,
          image: EditorImage,
        },
        data: {
          time: 1590507482120,
          blocks: [
            {
              type: 'header',
              data: { text: t('editor:welcome'), level: 2 },
            },
            {
              type: 'paragraph',
              data: { text: t('editor:description') },
            },
            {
              type: 'header',
              data: { text: t('editor:createList'), level: 3 },
            },
            {
              type: 'list',
              data: {
                style: 'unordered',
                items: [
                  t('editor:list.polarBears'),
                  t('editor:list.beeEyes'),
                  t('editor:list.catTaste'),
                ],
              },
            },
            {
              type: 'header',
              data: { text: t('editor:addImages'), level: 3 },
            },
            {
              type: 'image',
              data: {
                file: {
                  url:
                    'https://live.staticflickr.com/5824/21232621921_004b69900d_b.jpg',
                },
                caption: t('editor:imageCaption'),
                withBorder: false,
                stretched: false,
                withBackground: false,
              },
            },
          ],
          version: '2.17.0',
        },
      });
    } else {
      window.editor = undefined;
    }

    return () => {
      window.editor = undefined;
    };
  }, [walletState.wallet, isWalletExist, t]);

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
              element={<ContractActions walletState={walletState} />}
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
