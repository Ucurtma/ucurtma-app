import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Divider,
  Grid,
  Accordion,
  RadioButtonGroup,
  Button,
} from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import Container from '../../ui/container';
import QuestionList from '../../ui/questions-list';
import FAQ from './faq.json';

const { studentQuestions, donatorQuestions } = FAQ;

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;
  return (
    <Button
      ref={ref}
      bg={isChecked ? 'linkBlue.400' : 'gray.200'}
      color={isChecked ? 'white' : 'gray.900'}
      _hover={{ bg: isChecked ? 'blue.400' : 'gray.100' }}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      {...rest}
    />
  );
});

function Faq() {
  const [activeFaq, setActiveFaq] = React.useState('student');
  const { t } = useTranslation(['faq', 'titles']);
  const questionType =
    activeFaq === 'student' ? studentQuestions : donatorQuestions;
  return (
    <Flex id="faq" bg="gray.700" py={16} px={4}>
      <Container mt={0}>
        <Box width="full" mb={12} textAlign="center" color="gray.100">
          <Heading size="xl">{t('titles:FAQ')}</Heading>
          <RadioButtonGroup
            mt={4}
            defaultValue="student"
            onChange={val => setActiveFaq(val)}
            isInline
          >
            <CustomRadio value="student">{t('I am student')}</CustomRadio>
            <CustomRadio value="investor">{t('I am supporter')}</CustomRadio>
          </RadioButtonGroup>
          <Divider maxW={24} borderColor="gray.100" marginX="auto" mt={8} />
        </Box>
        <Accordion width="full" allowMultiple>
          <Grid
            templateColumns={{
              base: 'inherit',
              md: '50% auto',
              lg: '40% auto',
              xl: 'repeat(2, 1fr)',
            }}
            width="full"
            columnGap={8}
            rowGap={4}
          >
            <QuestionList
              questions={questionType.filter((question, i) => i % 2 === 0)}
            />
            <QuestionList
              questions={questionType.filter((question, i) => i % 2 !== 0)}
            />
          </Grid>
        </Accordion>
      </Container>
    </Flex>
  );
}

export default Faq;
