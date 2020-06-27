import gql from 'graphql-tag';

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

export const GET_CAMPAIGNS = gql`
  query campaigns {
    campaigns {
      campaignId
      campaignTitle
      student {
        name
        school
        department
        profilePhoto
      }
    }
  }
`;

export const GET_CAMPAIGNS_WITH_LOWER_DETAIL = gql`
  query campaigns {
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
`;
