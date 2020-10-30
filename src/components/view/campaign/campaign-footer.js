import React, { Suspense, lazy, useState } from 'react';
import { Flex, Button, Collapse, Box } from '@chakra-ui/core';
import { Facebook, Twitter, Linkedin } from 'react-feather';
import { useTranslation } from 'react-i18next';
import Loader from '../../ui/loader';

const ReportCampaignForm = lazy(() => import('./report-campaign-form'));

function CampaignFooter({ campaignId, title, studentName }) {
  const [reportCampaignView, setReportCampaignView] = useState(false);
  const { t } = useTranslation('campaignFooter');
  const shareText = `${title} - ${studentName}. Uçurtma Projesi'ndeki bu kampanyaya destek olmak için sen de tıkla.`;

  const socialMedias = [
    {
      title: t('share.facebook'),
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&t=${shareText}`,
    },
    {
      title: t('share.twitter'),
      icon: Twitter,
      url: `http://www.twitter.com/intent/tweet?url=${window.location.href}&via=UcurtmaProjesi&text=${shareText}`,
    },
    {
      title: t('share.linkedin'),
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
    },
  ];

  return (
    <Flex
      mb={8}
      flexDir={{ base: 'column', md: 'row' }}
      justifyContent="space-between"
      px={{ base: 4, lg: 0 }}
    >
      <Flex>
        <Box mr={4}>{t('share.title')}</Box>
        <Flex>
          {socialMedias.map(media => (
            <Button
              display="flex"
              mx={1}
              size="sm"
              bg="gray.100"
              borderRadius="4px"
              _hover={{ bg: 'gray.300' }}
              isExternal
              title={media.title}
              onClick={() => {
                window.open(
                  media.url,
                  '',
                  'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'
                );

                return false;
              }}
            >
              <Box as={media.icon} boxSize="16px" />
            </Button>
          ))}
        </Flex>
      </Flex>
      <Flex
        justifyContent="flex-end"
        mt={{ base: 4, md: 0 }}
        flexDir="column"
        w={{ base: 'full', md: '50%' }}
      >
        <Button
          variant="ghost"
          colorScheme="red"
          ml="auto"
          onClick={() => setReportCampaignView(!reportCampaignView)}
        >
          {t('createReport')}
        </Button>
        <Suspense fallback={<Loader />}>
          <Collapse maxW="600px" ml="auto" isOpen={reportCampaignView}>
            {reportCampaignView && (
              <ReportCampaignForm campaignId={campaignId} />
            )}
          </Collapse>
        </Suspense>
      </Flex>
    </Flex>
  );
}

export default CampaignFooter;
