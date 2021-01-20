import {
  Box,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

function TransactionRenderer({ item, type, transactionList, range }) {
  const isIncoming = type === 'INCOMINGTX';
  const { t } = useTranslation('timeline');
  return (
    <>
      <Flex pos="relative" justify="space-between">
        <Stat>
          <StatLabel color="gray.700" fontWeight={600} fontSize="sm" mb={1}>
            {t('operationCount')}
          </StatLabel>
          <StatNumber color="gray.600" fontSize="sm">
            {item.content.length}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel color="gray.700" fontWeight={600} fontSize="sm" mb={1}>
            {t(`transaction.${isIncoming ? 'incoming' : 'outgoing'}`)}
          </StatLabel>
          <StatNumber color="gray.600" fontSize="sm">
            {Math.floor(
              item.content.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
            )}
            <Text ml={1} as="span" fontSize="xs">
              TRYB
            </Text>
          </StatNumber>
        </Stat>
      </Flex>
      {transactionList?.map((transaction, transactionIndex) => {
        const transactionType = isIncoming ? 'IN' : 'OUT';
        if (
          transaction.when === range.date &&
          transactionType === transaction.type
        ) {
          return (
            <Box
              key={transactionIndex.toString()}
              fontSize="xs"
              borderBottom="1px solid"
              borderColor="gray.200"
              py={2}
              _first={{ pt: 0 }}
              _last={{ borderBottom: 0 }}
            >
              <Flex justifyContent="space-between">
                <Box fontWeight={600} color="gray.500">
                  {t(`transaction.${isIncoming ? 'from' : 'to'}`)}
                </Box>
                <Popover trigger="hover">
                  <PopoverTrigger>
                    <Text maxW="200px" fontWeight={600} isTruncated>
                      {transaction.from}
                    </Text>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent
                      bg="gray.800"
                      color="gray.50"
                      wordBreak="break-all"
                      p={2}
                      fontSize={13}
                      textAlign="center"
                      width="auto"
                    >
                      {transaction.from}
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Flex>
              <Flex mt={1} justifyContent="space-between">
                <Box fontWeight={600} color="gray.500">
                  {t('transaction.amount')}
                </Box>
                <Flex fontWeight={600}>
                  {Math.floor(parseInt(transaction.amount, 10))}
                  <Text as="span" fontSize="xs" ml={1}>
                    TRYB
                  </Text>
                </Flex>
              </Flex>
            </Box>
          );
        }
        return null;
      })}
    </>
  );
}

export default TransactionRenderer;
