module "non-prod-app-profiles-database-table" {
  source            = "../../modules/dynamodb"
  namespace         = "uc"
  stage             = "non-prod"
  name              = "ucurtma-profiles-non-prod"
  hash_key          = "userId"
  hash_key_type     = "S"
  enable_autoscaler = false
}
