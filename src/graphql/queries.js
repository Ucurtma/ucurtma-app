import { gql } from '@apollo/client';

export const GET_CAMPAIGN = gql`
  query campaign($campaignId: String!) {
    campaign(campaignId: $campaignId) {
      campaignId
      ethereumAddress
      campaignTitle
      supporterCount
      campaignType
      totalFunds
      campaignText
      campaignTarget
      minimumAmount
      endDate
      isActive
      goals {
        description
      }
      documents {
        title
        link
        type
      }
      transactions {
        from
        amount
        when
        tokenName
        type
      }
      student {
        school
        name
        department
        profilePhoto
      }
      updates {
        date
        subItems {
          type
          content
        }
      }
    }
  }
`;

export const GET_CAMPAIGN_EXISTENCE = gql`
  query campaign($campaignId: String!) {
    campaign(campaignId: $campaignId) {
      campaignId
    }
  }
`;

export const GET_OAUTH_URL = gql`
  query biliraOAuthUrl($campaignId: String!) {
    biliraOAuthUrl(campaignId: $campaignId) {
      authorizationUri
    }
  }
`;

export const GET_BANKS = gql`
  {
    systemBankAccounts {
      id
      name
      iban
    }
  }
`;

export const GET_CAMPAIGNS = gql`
  query campaigns($start: Int, $end: Int, $campaignType: CampaignTypes) {
    campaigns(start: $start, end: $end, campaignType: $campaignType) {
      count
      campaigns {
        campaignId
        campaignTitle
        campaignType
        campaignTarget
        supporterCount
        ethereumAddress
        totalFunds
        endDate
        isActive
        student {
          name
          school
          department
          profilePhoto
        }
      }
    }
  }
`;

export const GET_CAMPAIGNS_WITH_LOWER_DETAIL = gql`
  query campaigns {
    campaigns {
      campaigns {
        campaignId
        isActive
        student {
          school
          name
          department
          profilePhoto
        }
      }
    }
  }
`;

export const GET_RANDOM_CAMPAIGNS = gql`
  query randomCampaigns($count: Int!, $listHash: String!) {
    randomCampaigns(count: $count, listHash: $listHash) {
      campaigns {
        campaignId
        campaignTitle
        campaignType
        campaignTarget
        supporterCount
        ethereumAddress
        totalFunds
        endDate
        isActive
        student {
          name
          school
          department
          profilePhoto
        }
      }
      listHash
    }
  }
`;

export const GET_ALL_CAMPAIGN_DETAILS = gql`
  query allCampaignDetails {
    allCampaignDetails {
      collectedAmount
      targetAmount
    }
  }
`;
