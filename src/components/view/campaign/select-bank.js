import React from 'react';
import { SimpleGrid, Button, Image, Box, Heading, Text } from '@chakra-ui/core';

const SelectBank = ({ bankData, onSelect, selectedBank }) => {
  return (
    <Box>
      <Box mb={4}>
        <Heading as="p" mb={4} size="sm">
          Lütfen desteğinizi göndermek istediğiniz bankayı seçiniz.
        </Heading>
        <Text as="p">
          Listelenen banka hesapları, <strong>BiLira</strong> tarafından
          sağlanan ödeme kanallarıdır. Bu banka hesaplarından birinde hesabınız
          olmasa dahi <strong>EFT</strong> ile gönderme seçeneğiniz
          bulunmaktadır.
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
