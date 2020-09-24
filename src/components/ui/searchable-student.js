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
import { searchStudent } from '../../utils/utils';
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
    <>
      <FormLabel color="gray.600">Select Student</FormLabel>
      <Box border="1px solid" borderColor="gray.200" p={4}>
        <FormControl width="full">
          <InputGroup>
            <Input
              variant="filled"
              borderRadius="full"
              placeholder="Search Student"
              name="select-student"
              onChange={e => {
                const filteredStudents = data.campaigns.campaigns.filter(
                  campaign => {
                    const checkForCampaignId = searchStudent(
                      campaign.campaignId,
                      e
                    );

                    const checkForName = searchStudent(
                      campaign.student.name,
                      e
                    );

                    return checkForCampaignId || checkForName;
                  }
                );

                setFoundStudents(filteredStudents);
              }}
            />
            <InputRightElement>
              <Box as={Search} size="16px" />
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
              mt={2}
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
                borderColor: 'green.200',
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
    </>
  );
}

export default SearchableStudent;
