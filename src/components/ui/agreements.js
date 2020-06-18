import React, { useContext, Suspense, lazy } from 'react';
import { Link, ModalBody, Box } from '@chakra-ui/core';
import Checkbox from './checkbox';
import { MainContext } from '../../context/main-context';
import Loader from './loader';

const ClarificationText = lazy(() => import('../view/clarification-text'));
const DirectConsent = lazy(() => import('../view/direct-consent'));
const UserAgreement = lazy(() => import('../view/user-agreement'));

function Agreements({ kvkkName, agreementName }) {
  const { dispatch } = useContext(MainContext);

  const setModalOpen = type => {
    let Content = <ClarificationText />;
    if (type === 'directConsent') Content = <DirectConsent />;
    if (type === 'userAgreement') Content = <UserAgreement />;

    dispatch({
      type: 'SET_MODAL',
      payload: {
        isOpen: true,
        otherProps: { size: '2xl' },
        content: (
          <>
            <Suspense fallback={<Loader />}>
              <ModalBody p={{ base: 4, md: 12 }}>{Content}</ModalBody>
            </Suspense>
          </>
        ),
      },
    });
  };

  return (
    <Box>
      <Checkbox name={kvkkName}>
        Kişisel verileri koruma kapsamında{' '}
        <Link color="blue.400" onClick={() => setModalOpen('clarification')}>
          aydınlatma metnini
        </Link>{' '}
        ve{' '}
        <Link color="blue.400" onClick={() => setModalOpen('directConsent')}>
          açık rıza beyan formunu
        </Link>{' '}
        okudum ve onaylıyorum.
      </Checkbox>
      <Checkbox name={agreementName}>
        <Link color="blue.400" onClick={() => setModalOpen('userAgreement')}>
          Kullanıcı sözleşmesini
        </Link>{' '}
        okudum ve onaylıyorum.
      </Checkbox>
    </Box>
  );
}

export default Agreements;
