import React from 'react';
import {
  Box,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';

function QuestionList({ questions }) {
  const { t } = useTranslation(['faq', 'titles']);

  return (
    <Box>
      {questions.map((question, i) => (
        <AccordionItem border="0" marginBottom="20px" key={i.toString()}>
          <AccordionHeader
            bg="gray.200"
            p={5}
            fontWeight="bold"
            border="1px solid"
            borderColor="transparent"
            borderRadius="4px"
            _expanded={{
              bg: 'white',
              border: '1px solid',
              borderColor: 'gray.200',
              borderBottom: '0',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
            _focus={{ boxShadow: '0' }}
            _hover={{ bg: 'gray.400' }}
          >
            <Box flex="1" textAlign="left">
              {t(question.question)}
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel
            border="1px solid"
            borderColor="gray.200"
            borderTop="0"
            bg="white"
            fontSize="16px"
            pb={4}
          >
            {t(question.answer)}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Box>
  );
}

export default QuestionList;
