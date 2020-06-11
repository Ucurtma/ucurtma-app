import React, { useContext, Suspense, lazy } from 'react';
import { Link, ModalBody } from '@chakra-ui/core';
import Checkbox from './checkbox';
import { MainContext } from '../../context/main-context';
import Loader from './loader';

const ClarificationText = lazy(() => import('../view/clarification-text'));
const DirectConsent = lazy(() => import('../view/direct-consent'));

function Agreements({ name }) {
  const { dispatch } = useContext(MainContext);

  const setModalOpen = type => {
    const isClarificationText = type === 'clarificationText';

    dispatch({
      type: 'SET_MODAL',
      payload: {
        isOpen: true,
        otherProps: { size: '6xl' },
        content: (
          <>
            <Suspense fallback={<Loader />}>
              <ModalBody p={{ base: 4, md: 12 }}>
                {isClarificationText ? (
                  <ClarificationText />
                ) : (
                  <DirectConsent />
                )}
              </ModalBody>
            </Suspense>
          </>
        ),
      },
    });
  };

  return (
    <Checkbox name={name}>
      Kişisel verileri koruma kapsamında{' '}
      <Link color="blue.400" onClick={() => setModalOpen('clarificationText')}>
        aydınlatma metnini
      </Link>{' '}
      ve{' '}
      <Link color="blue.400" onClick={() => setModalOpen('directConsent')}>
        açık rıza beyan formunu
      </Link>{' '}
      okudum, anladım ve onaylıyorum.
    </Checkbox>
  );
}

export default Agreements;
