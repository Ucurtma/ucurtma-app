import React from 'react';
import {
  Heading,
  Text,
  Box,
  Button,
  Flex,
  RadioGroup,
  Radio,
  FormLabel,
  useToast,
  Link,
  // Alert,
  // AlertIcon,
  // AlertDescription,
} from '@chakra-ui/core';
import gql from 'graphql-tag';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import EasyMDE from 'easymde';
import Card from '../../ui/card';
import Input from '../../ui/input';
import NumberInput from '../../ui/numeric-input';
import {
  getDeploymentManagerContract,
  getEtherscanAddressFor,
} from '../../../utils/contract-utils';
import config from '../../../config';
import { uuidv4 } from '../../../utils/utils';
import 'easymde/dist/easymde.min.css';

const deployContractSchema = t => {
  const { web3 } = window;
  return Yup.object().shape({
    numberOfPlannedPayouts: Yup.string().required(t('validations.required')),
    withdrawPeriod: Yup.string().required(t('validations.required')),
    campaignTitle: Yup.string().required(t('validations.required')),
    campaignEndTime: Yup.string().required(t('validations.required')),
    owner: Yup.string().test(
      'Check Address',
      t('validations.incorrectAddress'),
      value => (value ? web3.utils.isAddress(value) : true)
    ),
    tokenAddress: Yup.string().required(t('validations.required')),
    name: Yup.string().required(t('validations.required')),
    school: Yup.string().required(t('validations.required')),
    department: Yup.string().required(t('validations.required')),
    profilePhoto: Yup.string().url(t('validations.link')),
  });
};

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

const markdown = `## Merhaba

Editörümüz markdown ile çalışmaktadır. Markdown ile şekillendirmenin nasıl yapıldığını bilmiyorsanız sağ üstteki soru işareti butonuna tıklayarak öğrenebilirsiniz.

#### İçerik, sayfamda nasıl gözükecek?

Eğer içeriğinizin sayfanızda nasıl gözükeceğini merak ediyorsanız yine yukarıda bulunan butonlardan göz butonuna tıklayabilirsiniz.
`;

function ContractActions({ walletState }) {
  const [
    createCampaign,
    { loading: createCampaignLoading },
  ] = useMutation(CREATE_CAMPAIGN, { onError: err => err }); // { loading, error, data }
  const toast = useToast();
  const { t } = useTranslation('contractActions');
  const editorRef = React.useRef(null);
  const isWalletExist = walletState.wallet;
  // const isMainNetwork = parseInt(walletState.chainId, 16) === 1;
  const commonToastProps = {
    duration: null,
    isClosable: true,
    position: 'top-right',
  };

  React.useEffect(() => {
    if (editorRef.current) {
      window.editor = new EasyMDE({
        element: editorRef.current,
        autoDownloadFontAwesome: undefined, // change with our icon package, react-feather.
        spellChecker: false,
        nativeSpellcheck: false,
        status: false,
        initialValue: markdown,
        promptURLs: true,
        promptTexts: {
          image: "Resim URL'ini giriniz:",
          link: "Eklemek istediğiniz linkin URL'ini giriniz:",
        },
      });

      if (!isWalletExist) {
        window.editor.codemirror.setOption('readOnly', true);
      } else {
        window.editor.codemirror.setOption('readOnly', false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createCampaignCommand = (values, deployedAddress) => {
    const metamaskToken = localStorage.getItem('signedToken');

    createCampaign({
      variables: {
        campaignId: values.campaignId,
        campaignTitle: values.campaignTitle,
        campaignText: window.editor.value(),
        ethereumAddress: deployedAddress || '',
        student: {
          name: values.name,
          school: values.school,
          department: values.department,
          profilePhoto: values.profilePhoto,
        },
      },
      context: {
        headers: {
          authorization: `Bearer ${metamaskToken}`,
        },
      },
    });
  };

  return (
    <Card paddingType="default">
      <Heading mb={4} size="sm" color="gray.600">
        {t('Deploy')}
      </Heading>
      <Text color="gray.600">{t('DeployDescription')}</Text>
      {/* {isMainNetwork ? ( */}
      <Box mt={4}>
        <Formik
          initialValues={{
            numberOfPlannedPayouts: 48, // how much donation can be taken from this contract
            withdrawPeriod: 28, // donation per second. 28 days
            campaignEndTime: 30, // when will campaign end after started in seconds?
            owner: '', // the ethereum address of student
            tokenAddress: config.ethereum.biliraTokenAddress, // the ethereum address of biLira,
            adminAddress: walletState.wallet, // the ethereum address of user who make action with metamask
            campaignId: uuidv4(),
            campaignTitle: '',
            name: '',
            school: '',
            department: '',
            profilePhoto: '',
          }}
          validationSchema={deployContractSchema(t)}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            const deploymentManager = getDeploymentManagerContract();
            const eventFilter = deploymentManager.NewFundingContract({
              __owner: values.owner,
            });

            if (!values.owner) {
              createCampaignCommand(values);
              setSubmitting(createCampaignLoading);
            } else {
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
                    console.log(err);
                    setSubmitting(false);
                  }
                }
              );
            }
          }}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form>
              <Input
                label={t('campaignId')}
                disabled
                readonly
                name="campaignId"
              />
              <Input
                label={t('campaignTitle')}
                disabled={!isWalletExist}
                name="campaignTitle"
              />
              <Input
                label={t('namesurname')}
                disabled={!isWalletExist}
                name="name"
              />

              <Flex flexDir={{ base: 'column', md: 'row' }}>
                <Input
                  label={t('school')}
                  name="school"
                  controlProps={{ mr: 4 }}
                />
                <Input label={t('department')} name="department" />
              </Flex>

              <Input
                label={t('profilePhoto')}
                disabled={!isWalletExist}
                name="profilePhoto"
              />

              <Flex flexDir={{ base: 'column', md: 'row' }}>
                <NumberInput
                  label={t('numberOfPlannedPayouts')}
                  name="numberOfPlannedPayouts"
                  type="number"
                  controlProps={{ mr: 4 }}
                  disabled={!isWalletExist}
                />
                <NumberInput
                  label={t('withdrawPeriod')}
                  name="withdrawPeriod"
                  type="number"
                  addon={{ right: 'Gün' }}
                  disabled={!isWalletExist}
                />
              </Flex>
              <NumberInput
                label={t('campaignEndTime')}
                name="campaignEndTime"
                type="number"
                addon={{ right: 'Gün' }}
                disabled={!isWalletExist}
              />
              <Input
                label={t('owner')}
                description={t('aboutOwner')}
                disabled={!isWalletExist}
                name="owner"
              />
              <Box mb={4}>
                <FormLabel color="gray.600">{t('tokenAddress')}</FormLabel>
                <RadioGroup defaultValue="biLira" isInline>
                  <Radio value="biLira" isDisabled key="biLira">
                    BiLira
                  </Radio>
                </RadioGroup>
              </Box>
              <Input
                label={t('adminAddress')}
                value={walletState.wallet}
                disabled
                name="adminAddress"
              />

              <Box id="editorjs" mb={4}>
                <FormLabel color="gray.600">{t('campaignDetails')}</FormLabel>
                <Box
                  border="1px solid"
                  borderColor="#e2e8f0"
                  borderRadius="4px"
                  as="textarea"
                  ref={editorRef}
                />
              </Box>

              <Flex justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="outline"
                  color="linkBlue"
                  isLoading={createCampaignLoading}
                  disabled={isSubmitting || !dirty || !isValid}
                  width="full"
                  maxW="200px"
                  ml="auto"
                >
                  {t('DeployAction')}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
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

export default ContractActions;
