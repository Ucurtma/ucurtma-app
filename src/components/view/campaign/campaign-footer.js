import React, { Suspense, lazy, useState } from 'react';
import { Flex, Button, Collapse } from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import Loader from '../../ui/loader';

const ReportCampaignForm = lazy(() => import('./report-campaign-form'));

function CampaignFooter({ campaignId }) {
  const [reportCampaignView, setReportCampaignView] = useState(false);
  const { t } = useTranslation('campaignFooter');

  return (
    <Flex mb={8} flexDir="column" px={{ base: 4, lg: 0 }}>
      <Button
        variant="ghost"
        variantColor="red"
        ml="auto"
        onClick={() => setReportCampaignView(!reportCampaignView)}
      >
        {t('createReport')}
      </Button>
      <Suspense fallback={<Loader />}>
        <Collapse maxW="600px" ml="auto" isOpen={reportCampaignView}>
          {reportCampaignView && <ReportCampaignForm campaignId={campaignId} />}
        </Collapse>
      </Suspense>
    </Flex>
  );
}

export default CampaignFooter;
