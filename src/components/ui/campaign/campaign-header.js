import React from 'react';
import {
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Divider,
  Button,
  Icon,
  Link,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import { useTranslation, Trans } from 'react-i18next';
import { Award } from 'react-feather';
import CampaignContentBox from '../campaign-content-box';
import CampaignSupportInfo from '../campaign-support-info';

function CampaignHeader({ data, loading, onClickDonate }) {
  const { t } = useTranslation('campaignHeader');
  return (
    <>
      <Flex
        mt={{ base: 2, md: 8 }}
        mb={{ base: 4, md: 0 }}
        justifyContent="space-between"
        alignItems="center"
        width="full"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Flex mx={{ base: 4, lg: 0 }} alignItems="flex-end" flexShrink="0">
          {loading ? (
            <SkeletonCircle width="72px" height="72px" />
          ) : (
            <Avatar
              size="lg"
              src={data.campaign?.student?.profilePhoto}
              name={data.campaign?.student?.name}
            />
          )}
          <Box ml={4}>
            <Heading size="sm" color="gray.600">
              {loading ? (
                <Skeleton width="200px" />
              ) : (
                data.campaign?.student?.name
              )}
            </Heading>
            <Text color="gray.500">
              {loading ? (
                <Skeleton width={260} />
              ) : (
                <>
                  {data.campaign?.student?.school}
                  {data.campaign?.student?.department !== '-' &&
                    ` / ${data.campaign?.student?.department}`}
                </>
              )}
            </Text>
          </Box>
        </Flex>
        <Flex
          width={{ base: 'full', md: 'unset' }}
          justify={{ base: 'space-around', md: 'inherit' }}
          mt={{ base: 8, md: 0 }}
          border={{ base: '1px', lg: 0 }}
          borderColor={{ base: 'gray.200', lg: 'unset' }}
          p={{ base: 4, lg: 0 }}
          borderRadius="11px"
          bg={{ base: 'gray.50', md: 'inherit' }}
        >
          {!loading && data?.campaign?.supporterCount > 0 && (
            <>
              <Box pr={6}>
                <CampaignSupportInfo
                  title={t('supporterCount')}
                  value={data?.campaign?.supporterCount}
                />
              </Box>
              <Box pl={6}>
                <CampaignSupportInfo
                  title={t('totalFund')}
                  value={Math.floor(data.campaign?.totalFunds)}
                  hasCurrency
                />
              </Box>
            </>
          )}
          {!loading && data?.campaign?.supporterCount <= 0 && (
            <CampaignContentBox
              bg="lime.50"
              borderColor="lime.200"
              w="full"
              maxW="416px"
              mb={0}
              mt={0}
            >
              <Trans
                defaults="noSupporterFound"
                t={t}
                components={{
                  redirectLink: (
                    <Link
                      as="button"
                      fontWeight={600}
                      onClick={() => onClickDonate()}
                      variant="link"
                    />
                  ),
                }}
              />
            </CampaignContentBox>
          )}
        </Flex>
      </Flex>
      <Divider my={4} display={{ base: 'none', md: 'block' }} />
      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        justify="space-between"
        align="center"
      >
        {loading ? (
          <Box flex={1}>
            <Skeleton height="72px" />
          </Box>
        ) : (
          <>
            <Heading
              width="full"
              color="gray.700"
              fontSize={{ base: '2xl', lg: '3xl' }}
              mt={{ base: 4, lg: 0 }}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              {data.campaign?.campaignTitle}
            </Heading>
            <Box
              as={Button}
              variant="solid"
              bg="lime.400"
              h={!data.campaign?.isActive ? '90px' : '64px'}
              w="full"
              maxW="416px"
              border="1px solid"
              borderColor="lime.500"
              boxShadow="0 0 3px rgba(45,55,72,0.1)"
              onClick={() => onClickDonate()}
              _hover={{ bg: 'lime.500' }}
              ml={{ base: 0, lg: 4 }}
              isDisabled={!data.campaign?.isActive}
              _disabled={{ bg: 'gray.400', borderColor: 'gray.500' }}
              flexDir={!data.campaign?.isActive && 'column'}
              justifyContent={
                !data.campaign?.isActive ? 'center' : 'space-between'
              }
              whiteSpace={!data.campaign?.isActive ? 'break-spaces' : 'nowrap'}
            >
              <span>
                {t(data.campaign?.isActive ? 'support' : 'campaignEnded')}
              </span>
              {!data.campaign?.isActive && (
                <Box as="span" fontSize="12px" mt={1}>
                  Toplanılan paralar destekçilere geri gönderilmektedir.
                </Box>
              )}
              {data.campaign?.isActive && <Icon as={Award} boxSize="28px" />}
            </Box>
          </>
        )}
      </Flex>
    </>
  );
}

export default CampaignHeader;
