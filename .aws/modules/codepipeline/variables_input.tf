variable "aws_region" {
  type        = "string"
  default     = "eu-west-2"
  description = "(Optional) AWS Region, e.g. us-east-1. Used as CodeBuild ENV variable when building Docker images. For more info: http://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker.html"
}

variable "namespace" {
  type        = "string"
  default     = "global"
  description = "Namespace, which could be your organization name, e.g. 'cp' or 'wonga'"
}

variable "stage" {
  type        = "string"
  default     = "default"
  description = "Stage, e.g. 'prod', 'staging', 'dev', or 'test'"
}

variable "name" {
  type        = "string"
  default     = "codebuild"
  description = "Solution name, e.g. 'app' or 'jenkins'"
}

variable "build_image" {
  type        = "string"
  default     = "aws/codebuild/docker:1.12.1"
  description = "Docker image for build environment, e.g. 'aws/codebuild/docker:1.12.1' or 'aws/codebuild/eb-nodejs-6.10.0-amazonlinux-64:4.0.0'. For more info: http://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref.html"
}

variable "build_compute_type" {
  type        = "string"
  default     = "BUILD_GENERAL1_SMALL"
  description = "Instance type of the build instance"
}

variable "privileged_mode" {
  type        = "string"
  default     = "true"
  description = "(Optional) If set to true, enables running the Docker daemon inside a Docker container on the CodeBuild instance. Used when building Docker images"
}

variable "github_username" {
  type    = "string"
  default = ""
}

variable "github_repo" {
  type    = "string"
  default = ""
}

variable "github_token" {
  type        = "string"
  default     = ""
  description = "GitHub auth token environment variable (`GITHUB_TOKEN`)"
}

variable "target_bucket" {
  type = "string"
  default = ""
  description = "The target S3 Bucket to deploy the output artifacts"
}
