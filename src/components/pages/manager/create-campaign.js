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
  // Alert,
  // AlertIcon,
  // AlertDescription,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Card from '../../ui/card';
import {
  getDeploymentManagerContract,
  getEtherscanAddressFor,
} from '../../../utils/contract-utils';
import 'easymde/dist/easymde.min.css';
import useImperativeQuery from '../../../utils/use-imperative-query';
import { GET_CAMPAIGN } from '../../../graphql/queries';
import Loader from '../../ui/loader';
import { CREATE_CAMPAIGN, UPDATE_CAMPAIGN } from '../../../graphql/mutations';
import CampaignForm from '../../ui/manager/campaign-form';

function CreateCampaign({ walletState, isEdit }) {
  const params = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = React.useState(null);
  const [shouldShowLoader, setShouldShowLoader] = React.useState(false);
  const getCampaign = useImperativeQuery(GET_CAMPAIGN);
  const [
    createCampaign,
    {
      data: createCampaignData,
      error: createCampaignError,
      loading: createCampaignLoading,
    },
  ] = useMutation(isEdit ? UPDATE_CAMPAIGN : CREATE_CAMPAIGN, {
    onError: err => err,
  }); // { loading, error, data }
  const toast = useToast();
  const { t } = useTranslation('createCampaign');
  // const isMainNetwork = parseInt(walletState.chainId, 16) === 1;
  const commonToastProps = {
    duration: null,
    isClosable: true,
    position: 'top-right',
  };

  React.useEffect(() => {
    const showErrorToast = () => {
      toast({
        title: t('gettingCampaign.error.title'),
        description: t('gettingCampaign.error.description', {
          page: t('Deploy'),
        }),
        status: 'error',
        ...commonToastProps,
        duration: 5000,
      });
    };
    async function fetchData(campaignId) {
      setShouldShowLoader(true);
      const { data, loading, error } = await getCampaign({ campaignId });
      if (!loading) {
        setShouldShowLoader(false);
      } else {
        showErrorToast();
      }
      if (error || !data?.campaign) {
        showErrorToast();
        navigate('manager/create-campaign');
      } else {
        setInitialValues(data.campaign);
      }
    }

    if (isEdit) {
      const { campaignId } = params;

      if (campaignId) {
        fetchData(campaignId);
      }
    } else {
      setInitialValues(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  const createCampaignCommand = async (values, deployedAddress) => {
    const metamaskToken = localStorage.getItem('signedToken');

    const goals = values.goals.map(goal => ({
      description: goal.description,
    }));

    const documents = values.documents.map(document => ({
      link: document.link,
      title: document.title,
      type: document.type,
    }));

    createCampaign({
      variables: {
        campaignId: values.campaignId,
        campaignTitle: values.campaignTitle,
        campaignText: values.campaignText,
        campaignTarget: parseFloat(values.campaignTarget),
        campaignType: values.campaignType,
        goals: values.goals.length > 0 ? goals : undefined,
        documents: values.documents.length > 0 ? documents : undefined,
        ethereumAddress: deployedAddress || initialValues.ethereumAddress || '',
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

    const today = moment().utc().startOf('day').unix();

    deploymentManager.deploy(
      values.numberOfPlannedPayouts,
      parseInt(values.withdrawPeriod, 10) * 60 * 60 * 24,
      today + parseInt(values.campaignEndTime, 10) * 60 * 60 * 24,
      parseInt(values.amountPerPayment, 10) * 10 ** 6 || 0,
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
              <Link href={getEtherscanAddressFor({ hash: result })} isExternal>
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
    <Card paddingType="default" position="relative">
      <Helmet>
        <title>{`${isEdit ? t('Edit') : t('Deploy')} - Uçurtma Projesi`}</title>
      </Helmet>
      {shouldShowLoader && (
        <Loader
          isFull
          pos="absolute"
          left="0"
          top="0"
          zIndex={1}
          bg="gray.600"
          opacity={0.2}
          borderRadius="md"
        />
      )}
      <Heading mb={4} size="sm" color="gray.600">
        {isEdit ? t('Edit') : t('Deploy')}
      </Heading>
      <Text color="gray.400">
        {isEdit ? t('EditDescription') : t('DeployDescription')}
      </Text>
      {/* {isMainNetwork ? ( */}
      <Box mt={4}>
        <CampaignForm
          loading={createCampaignLoading}
          initialValues={initialValues}
          walletState={walletState}
          isEdit={isEdit}
          activateStatus={
            createCampaignData?.updateCampaign?.isActive ||
            initialValues?.isActive
          }
          onActivate={campaignId => {
            createCampaign({
              variables: {
                campaignId,
                isActive: !(
                  createCampaignData?.updateCampaign?.isActive ||
                  initialValues?.isActive
                ),
              },
              context: {
                headers: {
                  authorization: `Bearer ${localStorage.getItem(
                    'signedToken'
                  )}`,
                },
              },
            });
          }}
          onSubmit={(values, setSubmitting) => {
            setSubmitting(true);

            const saveCampaign = () => {
              createCampaignCommand(values);
              setSubmitting(createCampaignLoading);
            };

            if (isEdit) {
              if (values.owner) {
                deployContract(values, setSubmitting);
              } else {
                saveCampaign();
              }
            } else if (!values.owner) {
              saveCampaign();
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
                // eslint-disable-next-line no-nested-ternary
                createCampaignData
                  ? isEdit
                    ? 'campaignUpdate.success'
                    : 'deploySuccessTitle'
                  : 'deployErrorTitle'
              )}
            </AlertTitle>
            {createCampaignData && (
              <AlertDescription ml={2}>
                Kampanyayı görüntülemek için{' '}
                <Link
                  as={RouterLink}
                  color="blue.400"
                  to={`/campaign/${
                    createCampaignData?.createCampaign?.campaignId ||
                    createCampaignData?.updateCampaign?.campaignId
                  }`}
                >
                  buraya tıkla.
                </Link>
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
