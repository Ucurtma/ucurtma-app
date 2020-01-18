import React from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Box,
  Heading,
  Divider,
  Grid,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionPanel,
  RadioButtonGroup,
  Button,
} from '@chakra-ui/core';
import Container from '../../ui/container';
import FAQ from './faq.json';

const { studentQuestions, donatorQuestions } = FAQ;

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;
  return (
    <Button
      ref={ref}
      bg={isChecked ? 'linkBlue' : 'gray.200'}
      color={isChecked ? 'white' : 'gray.900'}
      _hover={{ bg: isChecked ? 'blue.400' : 'gray.100' }}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      {...rest}
    />
  );
});

CustomRadio.propTypes = {
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  value: PropTypes.any,
};

function Faq() {
  const [activeFaq, setActiveFaq] = React.useState('student');
  const questionType =
    activeFaq === 'student' ? studentQuestions : donatorQuestions;
  return (
    <Flex id="faq" bg="gray.50" py={24} px={4}>
      <Container mt={0}>
        <Box width="full" mb={12} textAlign="center" color="gray.700">
          <Heading size="xl">Sıkça Sorulan Sorular</Heading>
          <RadioButtonGroup
            mt={4}
            defaultValue="student"
            onChange={val => setActiveFaq(val)}
            isInline
          >
            <CustomRadio value="student">Öğrenciyim</CustomRadio>
            <CustomRadio value="investor">Destekçiyim</CustomRadio>
          </RadioButtonGroup>
          <Divider maxW={24} borderColor="gray.700" marginX="auto" mt={8} />
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
            {questionType.map((questions, i) => (
              <AccordionItem border="0" key={i.toString()}>
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
                  }}
                  _focus={{
                    boxShadow: '0',
                  }}
                >
                  <Box flex="1" textAlign="left">
                    {questions.question}
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
                  {questions.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Grid>
        </Accordion>
      </Container>
    </Flex>
  );
}

export default Faq;
