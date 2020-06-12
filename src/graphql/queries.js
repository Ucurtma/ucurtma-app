import gql from 'graphql-tag';

export const GET_CAMPAIGN = gql`
  query campaign($campaignId: String!) {
    campaign(campaignId: $campaignId) {
      campaignId
      ethereumAddress
      campaignTitle
      supporterCount
      totalFunds
      campaignText
      campaignTarget
      minimumAmount
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
