import React, { useContext, Suspense, lazy } from 'react';
import { Link, ModalBody, Box } from '@chakra-ui/core';
import { useTranslation, Trans } from 'react-i18next';
import Checkbox from './checkbox';
import { MainContext } from '../../context/main-context';
import Loader from './loader';

const ClarificationText = lazy(() => import('../view/clarification-text'));
const DirectConsent = lazy(() => import('../view/direct-consent'));
const UserAgreement = lazy(() => import('../view/user-agreement'));

function Agreements({ kvkkName, agreementName }) {
  const { t } = useTranslation('agreements');
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
        <Trans
          defaults="kvkk"
          t={t}
          components={{
            clarification: (
              <Link
                color="blue.400"
                onClick={() => setModalOpen('clarification')}
              />
            ),
            directConsent: (
              <Link
                color="blue.400"
                onClick={() => setModalOpen('directConsent')}
              />
            ),
          }}
        />
      </Checkbox>
      <Checkbox name={agreementName}>
        <Trans
          defaults="userAgreement"
          t={t}
          components={{
            comp: (
              <Link
                color="blue.400"
                onClick={() => setModalOpen('userAgreement')}
              />
            ),
          }}
        />
      </Checkbox>
    </Box>
  );
}

export default Agreements;
