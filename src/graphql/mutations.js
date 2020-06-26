import gql from 'graphql-tag';

export const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign(
    $campaignId: String!
    $campaignTitle: String!
    $campaignText: String
    $ethereumAddress: String!
    $campaignType: CampaignTypes!
    $student: Student
    $campaignTarget: Float
    $minimumAmount: Int
    $goals: [CampaignGoalInput]
    $documents: [CampaignDocumentsInput]
  ) {
    createCampaign(
      campaignId: $campaignId
      campaignTitle: $campaignTitle
      campaignText: $campaignText
      ethereumAddress: $ethereumAddress
      campaignType: $campaignType
      student: $student
      campaignTarget: $campaignTarget
      minimumAmount: $minimumAmount
      goals: $goals
      documents: $documents
    ) {
      campaignId
    }
  }
`;

export const UPDATE_CAMPAIGN = gql`
  mutation UpdateCampaign(
    $campaignId: String!
    $campaignTitle: String
    $campaignText: String
    $ethereumAddress: String
    $campaignType: CampaignTypes
    $student: Student
    $campaignTarget: Float
    $minimumAmount: Int
    $isActive: Boolean
    $goals: [CampaignGoalInput]
    $documents: [CampaignDocumentsInput]
  ) {
    updateCampaign(
      campaignId: $campaignId
      campaignTitle: $campaignTitle
      campaignText: $campaignText
      ethereumAddress: $ethereumAddress
      campaignType: $campaignType
      student: $student
      campaignTarget: $campaignTarget
      minimumAmount: $minimumAmount
      goals: $goals
      isActive: $isActive
      documents: $documents
    ) {
      campaignId
      isActive
    }
  }
`;
