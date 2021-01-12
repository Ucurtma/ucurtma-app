import React, { useState } from 'react';
import { Alert, AlertDescription, Box, CloseButton } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Topbar({ messageKey, redirectLink }) {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation('topbar');

  if (!isOpen) return null;

  return (
    <Alert
      data-testid="topbar-alert"
      justifyContent="center"
      bg="#fbde38"
      boxShadow="0 0 4px rgba(45, 55, 72, 0.2)"
      zIndex={1}
      fontSize={{ base: '1rem', md: '0.825rem' }}
    >
      <AlertDescription textAlign="center" maxW={{ base: '75%', md: 'full' }}>
        {messageKey && (
          <Box data-testid="topbar-message" ml={2} as="span">
            <Trans
              defaults={messageKey}
              t={t}
              components={{
                redirectLink: (
                  <Box fontWeight={600} as={Link} to={redirectLink} />
                ),
              }}
            />
          </Box>
        )}
      </AlertDescription>
      <CloseButton
        data-testid="topbar-close-button"
        onClick={() => setIsOpen(false)}
        position="absolute"
        right="8px"
        top="6px"
      />
    </Alert>
  );
}

export default Topbar;
