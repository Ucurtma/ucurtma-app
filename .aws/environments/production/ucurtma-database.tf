module "prod-app-profiles-database-table" {
  source            = "../../modules/dynamodb"
  namespace         = "uc"
  stage             = "prod"
  name              = "ucurtma-profiles-prod"
  hash_key          = "userId"
  hash_key_type     = "S"
  enable_autoscaler = false
}

module "prod-app-files-database-table" {
  source            = "../../modules/dynamodb"
  namespace         = "uc"
  stage             = "prod"
  name              = "ucurtma-files-prod"
  hash_key          = "fileId"
  hash_key_type     = "S"
  enable_autoscaler = false
}
