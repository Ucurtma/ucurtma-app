module "non-prod-app-profiles-database-table" {
  source            = "../../modules/dynamodb"
  namespace         = "uc"
  stage             = "non-prod"
  name              = "ucurtma-profiles-non-prod"
  hash_key          = "UserId"
  hash_key_type     = "S"
  range_key         = "RangeKey"
  enable_autoscaler = false

  dynamodb_attributes = [
    {
      name = "Email"
      type = "S"
    },
    {
      name = "Timestamp",
      type = "S"
    }
  ]

  local_secondary_index_map = [
    {
      name               = "TimestampSortIndex"
      range_key          = "Timestamp"
      projection_type    = "INCLUDE"
      non_key_attributes = ["UserId", "Email"]
    },
    {
      name               = "EmailIndex"
      range_key          = "Timestamp"
      projection_type    = "INCLUDE"
      non_key_attributes = ["UserId", "RangeKey"]
    }
  ]

  global_secondary_index_map = [
    {
      name               = "DailyAverageIndex"
      hash_key           = "Email"
      range_key          = "RangeKey"
      write_capacity     = 5
      read_capacity      = 5
      projection_type    = "INCLUDE"
      non_key_attributes = ["UserId", "Email"]
    }
  ]
}
