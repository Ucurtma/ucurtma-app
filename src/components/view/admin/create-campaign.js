import React from 'react';
import {
  Heading,
  Text,
  Box,
  useToast,
  Link,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Button,
  // Alert,
  // AlertIcon,
  // AlertDescription,
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Card from '../../ui/card';
import {
  getDeploymentManagerContract,
  getEtherscanAddressFor,
} from '../../../utils/contract-utils';
import 'easymde/dist/easymde.min.css';
import CreateCampaignForm from './campaign-form';

// $campaignTarget: Float
// $minimumAmount: Int
// $goals: [CampaignGoalInput]
// $documents: [CampaignDocumentsInput]

const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign(
    $campaignId: String!
    $campaignTitle: String!
    $campaignText: String
    $ethereumAddress: String!
    $student: Student
  ) {
    createCampaign(
      campaignId: $campaignId
      campaignTitle: $campaignTitle
      campaignText: $campaignText
      ethereumAddress: $ethereumAddress
      student: $student
    ) {
      campaignId
    }
  }
`;

function CreateCampaign({ walletState, isEdit }) {
  const location = useLocation();
  const [initialValues, setInitialValues] = React.useState(null);
  const [
    createCampaign,
    {
      data: createCampaignData,
      error: createCampaignError,
      loading: createCampaignLoading,
    },
  ] = useMutation(CREATE_CAMPAIGN, { onError: err => err }); // { loading, error, data }
  const toast = useToast();
  const { t } = useTranslation('createCampaign');
  // const isMainNetwork = parseInt(walletState.chainId, 16) === 1;
  const commonToastProps = {
    duration: null,
    isClosable: true,
    position: 'top-right',
  };

  React.useEffect(() => {
    if (isEdit && location.state?.campaign) {
      setInitialValues(location.state?.campaign);
    }
    if (!location.state) {
      setInitialValues(null);
    }
  }, [isEdit, location]);

  const createCampaignCommand = async (values, deployedAddress) => {
    const metamaskToken = localStorage.getItem('signedToken');

    createCampaign({
      variables: {
        campaignId: values.campaignId,
        campaignTitle: values.campaignTitle,
        campaignText: window.editor.value(),
        campaignTarget: values.campaignTarget,
        campaignType: values.campaignType,
        goals: values.goals,
        ethereumAddress: deployedAddress || '',
        student: {
          name: values.student.name,
          school: values.student.school,
          department: values.student.department,
          profilePhoto: values.student.profilePhoto,
        },
      },
      context: {
        headers: {
          authorization: `Bearer ${metamaskToken}`,
        },
      },
    });
  };

  const deployContract = (values, setSubmitting) => {
    const deploymentManager = getDeploymentManagerContract();
    const eventFilter = deploymentManager.NewFundingContract({
      __owner: values.owner,
    });

    eventFilter.watch((error, event) => {
      if (error) {
        toast({
          title: t('deployErrorTitle'),
          description: t('deployErrorDesc'),
          status: 'error',
          ...commonToastProps,
        });
        // eslint-disable-next-line no-console
        console.error(`Error: ${error}`);
        setSubmitting(false);
      } else {
        toast({
          title: t('deploySuccessTitle'),
          description: (
            <Link
              href={getEtherscanAddressFor({
                type: 'address',
                hash: event.args.deployedAddress,
              })}
            >
              {t('deploySuccessDesc')}
            </Link>
          ),
          status: 'success',
          ...commonToastProps,
        });
        createCampaignCommand(values, event.args.deployedAddress);
        setSubmitting(false);
      }
    });

    deploymentManager.deploy(
      values.numberOfPlannedPayouts,
      parseInt(values.withdrawPeriod, 10) * 60 * 60 * 60 * 24,
      parseInt(values.campaignEndTime, 10) * 60 * 60 * 60 * 24,
      0,
      values.owner,
      values.tokenAddress,
      async (err, result) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log(
            `Transaction hash: '${result}'. Click here: ${getEtherscanAddressFor(
              { hash: result }
            )}`
          );
          toast({
            title: t('deployStartedTitle'),
            description: (
              <Link href={getEtherscanAddressFor({ hash: result })}>
                {t('deployStartedDesc')}
              </Link>
            ),
            status: 'warning',
            ...commonToastProps,
          });
        } else {
          // todo: web3 can't catch error if deployment reverted with message.
          // find a solution.
          toast({
            title:
              err.code === 4001
                ? "MetaMask'tan izin alınamadı."
                : 'Bir hata oluştu.',
            description:
              err.code === 4001
                ? 'Bu işlem için MetaMask uygulamasından izin vermeniz gerekmektedir.'
                : `Hata kodu: ${err.code}`,
            status: 'error',
            ...commonToastProps,
          });
          // eslint-disable-next-line no-console
          console.log(err);
          setSubmitting(false);
        }
      }
    );
  };

  return (
    <Card paddingType="default">
      <Helmet>
        <title>{`${isEdit ? t('Edit') : t('Deploy')} - Uçurtma Projesi`}</title>
      </Helmet>
      <Heading mb={4} size="sm" color="gray.600">
        {isEdit ? t('Edit') : t('Deploy')}
      </Heading>
      <Text color="gray.400">
        {isEdit ? t('EditDescription') : t('DeployDescription')}
      </Text>
      {/* {isMainNetwork ? ( */}
      <Box mt={4}>
        <CreateCampaignForm
          loading={createCampaignLoading}
          initialValues={initialValues}
          walletState={walletState}
          onDraftSubmit={values => console.log(values)}
          onSubmit={(values, setSubmitting) => {
            setSubmitting(true);

            if (!values.owner) {
              createCampaignCommand(values);
              setSubmitting(createCampaignLoading);
            } else {
              deployContract(values, setSubmitting);
            }
          }}
        />
        {(createCampaignData || createCampaignError) && (
          <Alert status={createCampaignData ? 'success' : 'error'} mt={4}>
            <AlertIcon />
            <AlertTitle>
              {t(
                createCampaignData ? 'deploySuccessTitle' : 'deployErrorTitle'
              )}
            </AlertTitle>
            {createCampaignData && (
              <AlertDescription>
                Kampanyayı görüntülemek için{' '}
                <Button
                  as={Link}
                  variant="link"
                  color="linkBlue.400"
                  to={`campaign/${createCampaignData?.createCampaign?.campaignId}`}
                >
                  buraya tıkla.
                </Button>
              </AlertDescription>
            )}
          </Alert>
        )}
      </Box>
      {/* ) : (
        <Alert status="error" bg="gray.100" color="gray.500" mt={4}>
          <AlertIcon color="gray.500" />
          <AlertDescription>{t('notMainNetwork')}</AlertDescription>
        </Alert>
      )} */}
    </Card>
  );
}

export default CreateCampaign;
