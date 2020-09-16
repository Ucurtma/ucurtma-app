/* eslint-env jest */
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import langEn from '../../../../intl/en-US.json';
import { render, waitFor, fireEvent } from '../../../../utils/test-utils';
import Campaigns from '../../../../components/view/campaigns/campaigns';
import { GET_CAMPAIGNS } from '../../../../graphql/queries';

const mocks = [
  {
    request: {
      query: GET_CAMPAIGNS,
      variables: { start: 0, end: 8 },
    },
    result: {
      data: {
        campaigns: {
          count: 11,
          campaigns: [
            {
              campaignId: 'test-y-3',
              campaignTitle: 'asldad',
              campaignType: 'LongTerm',
              campaignTarget: 12000,
              supporterCount: null,
              ethereumAddress: '0x731c7304c97352defb9a59076eb279935ac2dd50',
              totalFunds: null,
              endDate: null,
              isActive: true,
              student: {
                name: 'asdad',
                school: 'asdad',
                department: 'asdad',
                profilePhoto: '',
                __typename: 'StudentDetails',
              },
              __typename: 'CampaignDetails',
            },
            {
              campaignId: 'test-y-4',
              campaignTitle: 'asda',
              campaignType: 'LongTerm',
              campaignTarget: 12000,
              supporterCount: null,
              ethereumAddress: '0xfe9c789b0a93c890e9d9f5dd14f51bead7bd30d8',
              totalFunds: null,
              endDate: null,
              isActive: true,
              student: {
                name: 'asdlakd',
                school: 'asdlkaldk',
                department: 'lklklk',
                profilePhoto: '',
                __typename: 'StudentDetails',
              },
              __typename: 'CampaignDetails',
            },
            {
              campaignId: 'test-y-2',
              campaignTitle: 'l',
              campaignType: 'LongTerm',
              campaignTarget: 12000,
              supporterCount: null,
              ethereumAddress: '0xdb7717cb7c27bc33d5a125cd3ab2d9f7f4502868',
              totalFunds: null,
              endDate: null,
              isActive: true,
              student: {
                name: 'klklk',
                school: 'klklk',
                department: 'lklkl',
                profilePhoto: '',
                __typename: 'StudentDetails',
              },
              __typename: 'CampaignDetails',
            },
            {
              campaignId: 'tester-234',
              campaignTitle: 'asdlakd',
              campaignType: 'LongTerm',
              campaignTarget: 12000,
              supporterCount: null,
              ethereumAddress: '0x832dadde147a184743300094cc4adf6d2b52d3fa',
              totalFunds: null,
              endDate: null,
              isActive: true,
              student: {
                name: 'laksdlakd',
                school: 'asldkaldk',
                department: 'asdkaldk',
                profilePhoto: '',
                __typename: 'StudentDetails',
              },
              __typename: 'CampaignDetails',
            },
            {
              campaignId: 'tester-236',
              campaignTitle: 'lkaslkdfalkdf',
              campaignType: 'LongTerm',
              campaignTarget: 12000,
              supporterCount: null,
              ethereumAddress: '0x716834c5e5d4268454ca7813570b308035fa61a7',
              totalFunds: null,
              endDate: null,
              isActive: true,
              student: {
                name: 'lkaslkaflka',
                school: 'alsdkaldka',
                department: 'aslkdlakd',
                profilePhoto: '',
                __typename: 'StudentDetails',
              },
              __typename: 'CampaignDetails',
            },
            {
              campaignId: 'test-y-5',
              campaignTitle: 'asdadlk',
              campaignType: 'LongTerm',
              campaignTarget: 12000,
              supporterCount: null,
              ethereumAddress: '0x57f0f330ffc33f6dc8ba8cecacdf7b2b39b2af69',
              totalFunds: null,
              endDate: null,
              isActive: true,
              student: {
                name: 'lk',
                school: 'lklklk',
                department: 'lk',
                profilePhoto: '',
                __typename: 'StudentDetails',
              },
              __typename: 'CampaignDetails',
            },
            {
              campaignId: 'test-y-1',
              campaignTitle: 'asasda',
              campaignType: 'LongTerm',
              campaignTarget: 12000,
              supporterCount: null,
              ethereumAddress: '0xea734d84d932ac843c5bb2e9b3c4d0b56dc62506',
              totalFunds: null,
              endDate: null,
              isActive: true,
              student: {
                name: 'alskdalk',
                school: 'asdkad',
                department: 'asdad',
                profilePhoto: '',
                __typename: 'StudentDetails',
              },
              __typename: 'CampaignDetails',
            },
            {
              campaignId: 'test-campaign',
              campaignTitle: 'Test Kampanyasi - Edited',
              campaignType: 'LongTerm',
              campaignTarget: 12000,
              supporterCount: null,
              ethereumAddress: '',
              totalFunds: null,
              endDate: null,
              isActive: true,
              student: {
                name: 'Mustafa Turhan',
                school: 'Uludağ Üniversitesi',
                department: 'Ziraat Mühendisliği',
                profilePhoto: '',
                __typename: 'StudentDetails',
              },
              __typename: 'CampaignDetails',
            },
          ],
          __typename: 'CampaignsList',
        },
      },
    },
  },
];

describe('Campaigns tests', () => {
  test('Campaigns should be rendered', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Campaigns />
      </MockedProvider>
    );
    expect(getByTestId('campaigns-container')).toBeInTheDocument();
  });

  test('Loading skeletons and errors should be shown if they are exist', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Campaigns />
      </MockedProvider>
    );

    expect(getByTestId('loading-skeleton')).toBeInTheDocument();
    await waitFor(() => {});
    expect(getByTestId('campaign-error')).toBeInTheDocument();
  });

  test('Filter buttons should be rendered after data fetching', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Campaigns />
      </MockedProvider>
    );
    await waitFor(() => {});
    const allButton = getByText(langEn.campaignList.filter.all);
    expect(allButton).toBeInTheDocument();
    expect(allButton.getAttribute('data-active')).toBeTruthy();
  });

  test('Filter should be changed after click one of them', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Campaigns />
      </MockedProvider>
    );

    await waitFor(() => {});

    const allButton = getByText(langEn.campaignList.filter.all);
    const longTermButton = getByText(
      langEn.campaignList.filter.LongTerm_plural
    );

    fireEvent.click(longTermButton);
    await waitFor(() => {});
    expect(allButton.getAttribute('data-active')).toBeFalsy();
    expect(longTermButton.getAttribute('data-active')).toBeTruthy();
  });

  test('Campaigns should be rendered after data fetch', async () => {
    const { getByText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Campaigns />
      </MockedProvider>
    );

    await waitFor(() => {});
    expect(getByText('Test Kampanyasi - Edited')).toBeInTheDocument();
    expect(queryByText('Undefined Campaign')).not.toBeInTheDocument();
  });

  test('Error should be shown if there is no campaign in that filter', async () => {
    const { getByText, getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Campaigns />
      </MockedProvider>
    );

    await waitFor(() => {});

    const shortTermButton = getByText(
      langEn.campaignList.filter.ShortTerm_plural
    );

    fireEvent.click(shortTermButton);

    await waitFor(() => {});

    expect(getByTestId('campaign-error')).toBeInTheDocument();
  });
});
