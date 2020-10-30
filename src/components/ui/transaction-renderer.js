import {
  Box,
  Flex,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

function TransactionRenderer({ item, type, transactionList, range }) {
  const isIncoming = type === 'INCOMINGTX';
  const { t } = useTranslation('timeline');
  return (
    <>
      <Flex pos="relative" justify="space-between">
        <Stat>
          <StatLabel color="gray.400" fontWeight={600} fontSize={14}>
            {t('operationCount')}
          </StatLabel>
          <StatNumber color="gray.700" fontSize={18}>
            {item.content.length}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel color="gray.400" fontWeight={600} fontSize={14}>
            {t(`transaction.${isIncoming ? 'incoming' : 'outgoing'}`)}
          </StatLabel>
          <StatNumber
            display="flex"
            alignItems="center"
            color="gray.700"
            fontSize={18}
          >
            <Image
              maxW="10px"
              width="full"
              height="full"
              src={`${process.env.PUBLIC_URL}/images/bilira-icon.svg`}
              mr={1}
            />
            {Math.floor(
              item.content.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
            )}
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
              fontSize={14}
              borderBottom="1px solid"
              borderColor="gray.200"
              py={2}
              _first={{ pt: 0 }}
              _last={{ borderBottom: 0 }}
            >
              <Flex justifyContent="space-between">
                <Box as="strong" color="gray.400">
                  {t(`transaction.${isIncoming ? 'from' : 'to'}`)}
                </Box>
                <Popover trigger="hover">
                  <PopoverTrigger>
                    <Text maxW="200px" isTruncated>
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
                <Box as="strong" color="gray.400">
                  {t('transaction.amount')}
                </Box>
                <Flex fontWeight={600}>
                  <Image
                    maxW="8px"
                    width="full"
                    height="full"
                    src={`${process.env.PUBLIC_URL}/images/bilira-icon.svg`}
                    mr={1}
                  />
                  {Math.floor(parseInt(transaction.amount, 10))}
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
