variable "remote_state" {
  default = {
    bucket = "ucurtma-app-state"
    key    = "terraform/dev/terraform_dev.tfstate"
    region = "eu-west-2"
  }
}
