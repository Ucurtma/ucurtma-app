import React from 'react';
import {
  Box,
  Heading,
  Divider,
  Grid,
  Accordion,
  Button,
  HStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Container from '../../ui/container';
import QuestionList from '../../ui/questions-list';
import FAQ from './faq.json';

const { studentQuestions, donatorQuestions } = FAQ;
const options = ['student', 'supporter'];

function Faq() {
  const [activeFaq, setActiveFaq] = React.useState('student');
  const { t } = useTranslation(['faq', 'titles']);
  const questionType =
    activeFaq === 'student' ? studentQuestions : donatorQuestions;

  return (
    <Container
      py={{ base: 12, lg: 36 }}
      px={{ base: 8, lg: 36 }}
      bg="gray.900"
      borderRadius={{ base: 22, lg: 139 }}
      mt={0}
    >
      <Box width="full" mb={12} textAlign="center" color="white">
        <Heading size="xl">{t('titles:FAQ')}</Heading>
        <HStack spacing={4} my={10} justify="center">
          {options.map(option => (
            <Button
              key={option}
              onClick={() => setActiveFaq(option)}
              isActive={activeFaq === option}
              bg="gray.200"
              color="gray.900"
              _active={{ bg: 'blue.700', color: 'white' }}
              _hover={{
                bg: 'gray.100',
                _active: { bg: 'blue.600' },
              }}
            >
              {t(`I am ${option}`)}
            </Button>
          ))}
        </HStack>

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
  );
}

export default Faq;
