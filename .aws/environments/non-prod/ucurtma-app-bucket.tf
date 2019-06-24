module "non-prod-app-deployment" {
  source       = "../../modules/s3/web_hosting_s3_bucket"
  bucket       = "non-prod-ucurtma-app"
  region       = "eu-west-2"
  remote_state = "${var.remote_state}"
  web_page_user = "deployment-user"
}

variable "remote_state" {
  default = {
    bucket = "ucurtma-app-state"
    key    = "terraform/dev/terraform_dev.tfstate"
    region = "eu-west-2"
  }
}
