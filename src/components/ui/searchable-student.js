import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
} from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Search } from 'react-feather';
import CampaignError from '../view/campaign/campaign-error';
// import Input from './input';

function SearchableStudent({ data, loading, error, onSelect }) {
  const [foundStudents, setFoundStudents] = useState();
  const [selectedStudent, setSelectedStudent] = useState();

  useEffect(() => {
    if (data?.campaigns) {
      setFoundStudents(data.campaigns.campaigns);
    }
  }, [data]);

  if (loading) {
    return (
      <Box>
        <Skeleton w="100%" height={45} mt={4} />
        <Flex mt={4} justifyContent="space-between">
          <Skeleton w="30%" height={45} />
          <Skeleton w="30%" height={45} />
          <Skeleton w="30%" height={45} />
        </Flex>
      </Box>
    );
  }

  if (error) {
    return <CampaignError message="Bir sorun oluştu." />;
  }

  return (
    <Box>
      <FormControl width="100%" mb={4}>
        <FormLabel color="gray.600" htmlFor="select-student">
          Select Student
        </FormLabel>
        <InputGroup>
          <Input
            name="select-student"
            controlProps={{ mb: 2 }}
            label="Select Student"
            onChange={e => {
              const filterStudents = data.campaigns.campaigns.filter(
                campaign => {
                  const checkForCampaignId = campaign.campaignId
                    .toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase());

                  const checkForName = campaign.student.name
                    .toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase());

                  return checkForCampaignId || checkForName;
                }
              );

              setFoundStudents(filterStudents);
            }}
          />
          <InputRightElement width="4.5rem">
            <Box h="1.75rem" as={Search} />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {foundStudents?.map(campaign => {
        return (
          <Button
            key={campaign.campaignId}
            d="inline-flex"
            flexDir="column"
            alignItems="flex-start"
            type="button"
            variant="ghost"
            height="auto"
            mr={4}
            mb={2}
            whiteSpace="break-spaces"
            textAlign="left"
            p={4}
            border="1px solid"
            borderColor="gray.100"
            onClick={() => {
              setSelectedStudent(campaign.campaignId);
              if (onSelect) onSelect(campaign.campaignId);
            }}
            isActive={selectedStudent === campaign.campaignId}
            _active={{
              bg: 'green.50',
              borderColor: 'gray.200',
            }}
          >
            <Box as="span">{campaign.student.name}</Box>
            <Box as="span" d="inline-block" fontWeight={400} mt={2}>
              {campaign.campaignId}
            </Box>
          </Button>
        );
      })}
    </Box>
  );
}

export default SearchableStudent;
