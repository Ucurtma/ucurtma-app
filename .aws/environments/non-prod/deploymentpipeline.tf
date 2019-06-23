module "codepipeline" {
  source = "../../modules/codepipeline"

  namespace       = "ucurtma"
  stage           = "test"
  name            = "ucurtma-pages"
  github_username = "ucurtma"
  github_repo     = "ucurtma-app"
  github_token    = "${var.github_token}"
  build_image     = "aws/codebuild/nodejs:10"
  target_bucket   = "non-prod-ucurtma-app"
}


variable "github_token" {
  type        = "string"
  default     = ""
  description = "GitHub auth token environment variable (`GITHUB_TOKEN`)"
}
