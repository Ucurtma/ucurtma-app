import { useQuery } from '@apollo/client';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { Edit, Plus, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { GET_CAMPAIGNS_WITH_LOWER_DETAIL } from '../../../graphql/queries';
import Card from '../../ui/card';
import SearchableStudent from '../../ui/searchable-student';

function ContentManagement() {
  const [studentSelected, setStudentSelected] = useState(false);
  const { loading, error, data } = useQuery(GET_CAMPAIGNS_WITH_LOWER_DETAIL, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('signedToken')}`,
      },
    },
  });
  const { t } = useTranslation('manager');

  const fetchStudentContent = campaignId => {
    setStudentSelected(campaignId);
    // todo: fetch data by using lazy query.
  };

  const columns = useMemo(() => {
    return [
      {
        key: 'title',
        label: t('ContentList.labels.title'),
      },
      {
        key: 'actions',
        label: t('ContentList.labels.actions'),
        width: 100,
        content: () => (
          <Flex>
            <Button aria-label="Edit" variant="ghost" p={2} mr={1} size="xs">
              <Box as={Edit} />
            </Button>
            <Button aria-label="Delete" variant="ghost" p={2} size="xs">
              <Box as={Trash} />
            </Button>
          </Flex>
        ),
      },
    ];
  }, [t]);

  const tableDatas = useMemo(() => {
    return [
      { title: 'Hayatımı nasıl baştan yarattım?', actions: 'x' },
      { title: 'Remote çalışmanın zorlukları' },
      {
        title: 'Nasıl flutter öğrenmeyi erteledim ve bir daha hiç öğrenemedim?',
      },
      { title: 'İnsan bir kez yaşar ama 5465486 kez ölür mü?' },
    ];
  }, []);

  return (
    <Card paddingType="default">
      <Helmet>
        <title>{`${t('PostContent.title')} - Uçurtma Projesi`}</title>
      </Helmet>
      <Heading mb={4} size="sm" color="gray.600">
        {t('PostContent.title')}
      </Heading>
      <Box mt={4}>
        <SearchableStudent
          loading={loading}
          error={error}
          data={data}
          onSelect={campaignId => {
            fetchStudentContent(campaignId);
          }}
        />
        {studentSelected && (
          <Box mt={4}>
            <Flex mb={4} alignItems="center">
              <Heading size="sm" color="gray.600">
                {t('ContentList.title')}
              </Heading>
              <Link to="./new-content">
                <Button
                  variant="outline"
                  colorScheme="gray"
                  color="gray.500"
                  size="xs"
                  ml={2}
                  fontWeight={500}
                >
                  <Box w={4} as={Plus} mr={1} />
                  {t('ContentList.addNew')}
                </Button>
              </Link>
            </Flex>
            <Box>
              <Flex>
                {columns.map(column => (
                  <Box
                    border="1px solid"
                    borderColor="gray.200"
                    w="full"
                    maxW={column.width}
                    px={4}
                    py={2}
                    bg="gray.100"
                    fontWeight={600}
                  >
                    {column.label}
                  </Box>
                ))}
              </Flex>
              <Flex flexDir="column">
                {tableDatas.map(tableData => (
                  <Flex>
                    {columns.map(column => (
                      <Box
                        px={4}
                        py={1}
                        w="full"
                        maxW={column.width}
                        border="1px solid"
                        borderColor="gray.200"
                      >
                        {column.key === 'actions'
                          ? column.content(tableData)
                          : tableData[column.key]}
                      </Box>
                    ))}
                  </Flex>
                ))}
              </Flex>
            </Box>
          </Box>
        )}
      </Box>
    </Card>
  );
}

export default ContentManagement;
