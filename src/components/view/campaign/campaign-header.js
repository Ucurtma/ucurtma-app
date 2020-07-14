import React from 'react';
import {
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Image,
  Divider,
  PseudoBox,
  Button,
  Icon,
  Link,
} from '@chakra-ui/core';
import Skeleton from 'react-loading-skeleton';
import { Award } from 'react-feather';
import CampaignContentBox from '../../ui/campaign-content-box';

function CampaignHeader({ data, loading, onClickDonate }) {
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
            <Skeleton width={72} height={72} circle />
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
                <Skeleton width={200} />
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
          borderY={{ base: '1px solid', md: 0 }}
          borderColor="gray.300"
          borderTopColor="gray.300"
          p={{ base: 4, lg: 0 }}
          bg={{ base: 'gray.100', md: 'inherit' }}
        >
          {!loading && data?.campaign?.supporterCount > 0 && (
            <>
              <Box pr={6} borderRight={{ md: '1px solid #CBD5E0' }}>
                <Heading size="sm" color="gray.400">
                  Destekçi Sayısı
                </Heading>
                <Text
                  fontSize="1.5rem"
                  textAlign={{ base: 'center', md: 'left' }}
                  fontWeight={400}
                >
                  {data?.campaign?.supporterCount}
                </Text>
              </Box>
              <Box pl={6}>
                <Heading size="sm" color="gray.400">
                  Toplam Destek
                </Heading>
                <Box
                  fontSize="1.5rem"
                  fontWeight={400}
                  textAlign={{ base: 'center', md: 'left' }}
                  color="#1E284C"
                >
                  <Flex align="center">
                    <Image
                      maxW="14px"
                      width="full"
                      height="full"
                      src={`${process.env.PUBLIC_URL}/images/bilira-icon.svg`}
                      mr={1}
                    />
                    {Math.floor(data.campaign?.totalFunds)}
                  </Flex>
                </Box>
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
              Bu kampanyaya hiç destek gelmemiş. İlk destek veren kişi olmak{' '}
              <Link
                as="button"
                fontWeight={600}
                onClick={() => onClickDonate()}
                variant="link"
              >
                ister misin?
              </Link>
            </CampaignContentBox>
          )}
        </Flex>
      </Flex>
      <Divider my={4} display={{ base: 'none', md: 'block' }} />
      <Flex justify="space-between" align="center" mx={{ base: 4, lg: 0 }}>
        {loading ? (
          <Box flex={1}>
            <Skeleton height={72} />
          </Box>
        ) : (
          <>
            <Heading
              width="full"
              color="gray.700"
              fontSize={{ base: '2xl', lg: '3xl' }}
            >
              {data.campaign?.campaignTitle}
            </Heading>
            <PseudoBox
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
              ml={4}
              disabled={!data.campaign?.isActive}
              _disabled={{ bg: 'gray.400', borderColor: 'gray.500' }}
              flexDir={!data.campaign?.isActive && 'column'}
              justifyContent={
                !data.campaign?.isActive ? 'center' : 'space-between'
              }
              whiteSpace={!data.campaign?.isActive ? 'break-spaces' : 'nowrap'}
            >
              <span>
                {data.campaign?.isActive
                  ? 'Destek Ol'
                  : 'Bu kampanya sona ermiştir.'}
              </span>
              {!data.campaign?.isActive && (
                <Box as="span" fontSize="12px" mt={1}>
                  Toplanılan paralar bağışçılara geri gönderilmektedir.
                </Box>
              )}
              {data.campaign?.isActive && <Icon as={Award} size="28px" />}
            </PseudoBox>
          </>
        )}
      </Flex>
    </>
  );
}

export default CampaignHeader;
