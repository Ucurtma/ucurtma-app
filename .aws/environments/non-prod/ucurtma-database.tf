module "non-prod-app-profiles-database-table" {
  source            = "../../modules/dynamodb"
  namespace         = "uc"
  stage             = "non-prod"
  name              = "ucurtma-profiles-non-prod"
  hash_key          = "userId"
  hash_key_type     = "S"
  enable_autoscaler = false
}

module "non-prod-app-files-database-table" {
  source            = "../../modules/dynamodb"
  namespace         = "uc"
  stage             = "non-prod"
  name              = "ucurtma-files-non-prod"
  hash_key          = "fileId"
  hash_key_type     = "S"
  enable_autoscaler = false
}

module "non-prod-app-applications-database-table" {
  source            = "../../modules/dynamodb"
  namespace         = "uc"
  stage             = "non-prod"
  name              = "ucurtma-applications-non-prod"
  hash_key          = "applicationId"
  hash_key_type     = "S"
  enable_autoscaler = false
}
