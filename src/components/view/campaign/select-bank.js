import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
  SimpleGrid,
  Button,
  Image,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

const SelectBank = ({ bankData, onSelect, selectedBank }) => {
  const { t } = useTranslation('bankTransferFlow');
  return (
    <Box>
      <Box mb={4}>
        <Heading as="p" mb={4} size="sm">
          {t('selectBank')}
        </Heading>
        <Text as="p">
          <Trans
            defaults="aboutBanks"
            t={t}
            components={{
              strong: <strong />,
            }}
          />
        </Text>
      </Box>
      <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4} mb={4}>
        {bankData?.systemBankAccounts?.map(bankAccount => (
          <Button
            key={bankAccount.id}
            variant="ghost"
            border="1px solid"
            borderColor="gray.100"
            onClick={() => onSelect(bankAccount.id)}
            bg={selectedBank === bankAccount.id ? 'gray.100' : 'transparent'}
          >
            <Image
              alt={bankAccount.name}
              src={`${process.env.PUBLIC_URL}/images/banks/${bankAccount.id}.png`}
            />
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SelectBank;
