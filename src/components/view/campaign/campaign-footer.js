import React, { Suspense, lazy } from 'react';
import { Flex, Button, Collapse } from '@chakra-ui/core';
import Loader from '../../ui/loader';

const ReportCampaignForm = lazy(() =>
  import('../../forms/report-campaign-form')
);

function CampaignFooter({ campaignId }) {
  const [reportCampaignView, setReportCampaignView] = React.useState(false);

  return (
    <Flex mb={8} flexDir="column" px={{ base: 4, lg: 0 }}>
      <Button
        variant="ghost"
        variantColor="red"
        ml="auto"
        onClick={() => setReportCampaignView(!reportCampaignView)}
      >
        Şikayet Oluştur
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
