module "non-prod-app-deployment" {
  source       = "../../modules/s3/web_hosting_s3_bucket"
  bucket       = "prod-ucurtma-app"
  region       = "eu-west-2"
  remote_state = "${var.remote_state}"
}

variable "remote_state" {
  default = {
    bucket = "ucurtma-app-state-production"
    key    = "terraform/dev/terraform_dev.tfstate"
    region = "eu-west-2"
  }
}
