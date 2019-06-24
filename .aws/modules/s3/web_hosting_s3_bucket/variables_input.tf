variable "bucket" {}
variable "region" {
  default = "eu-west-2"
}

variable "remote_state" {
  default = {
    bucket   = {}
    key_base = {}
    region   = "eu-west-2"
  }
}
