import React, { Suspense, lazy } from 'react';
import { Link, ModalBody, Box } from '@chakra-ui/react';
import { useTranslation, Trans } from 'react-i18next';
import Checkbox from './checkbox';
import Loader from './loader';
import { useStore } from '../../context/global-state';

const ClarificationText = lazy(() =>
  import('../pages/legal/clarification-text')
);
const DirectConsent = lazy(() => import('../pages/legal/direct-consent'));
const UserAgreement = lazy(() => import('../pages/legal/user-agreement'));

function Agreements({ kvkkName, agreementName }) {
  const { t } = useTranslation('agreements');
  const { dispatch } = useStore();

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
