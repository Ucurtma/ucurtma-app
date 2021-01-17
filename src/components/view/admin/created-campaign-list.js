import React, { useEffect, useState } from 'react';
import {
  Heading,
  Text,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { Search, Edit } from 'react-feather';
import { Link } from 'react-router-dom';
import Card from '../../ui/card';
import CampaignList from '../campaigns/campaign-list';
import { GET_CAMPAIGNS_WITH_LOWER_DETAIL } from '../../../graphql/queries';
import { searchStudent } from '../../../utils/utils';

function ContractList() {
  const [foundCampaigns, setFoundCampaigns] = useState([]);
  const { loading, error, data } = useQuery(GET_CAMPAIGNS_WITH_LOWER_DETAIL, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('signedToken')}`,
      },
    },
  });
  const { t } = useTranslation('contractList');

  useEffect(() => {
    if (data?.campaigns) {
      setFoundCampaigns(data);
    }
  }, [data]);

  return (
    <Card paddingType="default">
      <Helmet>
        <title>{`${t('List')} - Uçurtma Projesi`}</title>
      </Helmet>
      <Heading mb={4} size="sm" color="gray.600">
        {t('List')}
      </Heading>
      <Text color="gray.600">{t('ListDescription')}</Text>
      <InputGroup ml="auto" mt={4} maxW="400px" w="full">
        <Input
          variant="filled"
          borderRadius="full"
          placeholder={t('search')}
          onChange={e => {
            const filteredCampaigns = data.campaigns.campaigns.filter(
              campaign => {
                const checkForCampaignId = searchStudent(
                  campaign.campaignId,
                  e
                );

                const checkForName = searchStudent(campaign.student.name, e);

                return checkForCampaignId || checkForName;
              }
            );

            setFoundCampaigns({ campaigns: { campaigns: filteredCampaigns } });
          }}
        />
        <InputRightElement>
          <Box as={Search} boxSize="16px" />
        </InputRightElement>
      </InputGroup>

      <Box mt={4}>
        <CampaignList
          error={error}
          data={foundCampaigns}
          loading={loading}
          hideTitle
          wrapperProps={{ boxShadow: '0' }}
          showId
          customButton={campaign => (
            <>
              <Link to={`/manager/edit-campaign/${campaign?.campaignId}`}>
                <Button
                  variant="outline"
                  colorScheme="red"
                  width="full"
                  mt={4}
                  size="sm"
                >
                  <Box as={Edit} mr={2} boxSize="16px" />
                  Kampanyayı Düzenle
                </Button>
              </Link>
              {!campaign.isActive && (
                <Box
                  color="red.400"
                  fontSize="0.75rem"
                  textAlign="center"
                  mt={1}
                >
                  Bu kampanya henüz aktif değil.
                </Box>
              )}
            </>
          )}
        />
      </Box>
    </Card>
  );
}

export default ContractList;
