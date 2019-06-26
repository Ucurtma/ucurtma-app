module "non-prod-app-deployment" {
  source       = "../../modules/s3/web_hosting_s3_bucket"
  bucket       = "non-prod-ucurtma-app"
  region       = "eu-west-2"
  remote_state = "${var.remote_state}"
  web_page_user = "deployment-user"
}

module "non-prod-app-static-deployment" {
  source       = "../../modules/s3/web_hosting_s3_bucket"
  bucket       = "non-prod.ucurtmaprojesi.com"
  region       = "eu-west-2"
  remote_state = "${var.remote_state}"
  web_page_user = "non-prod-static-app-deployment-user"
}

