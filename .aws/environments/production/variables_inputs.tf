variable "remote_state" {
  default = {
    bucket = "ucurtma-app-state"
    key    = "terraform/prod/terraform_prod.tfstate"
    region = "eu-west-2"
  }
}
