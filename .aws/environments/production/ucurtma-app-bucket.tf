module "prod-app-static-deployment" {
  source        = "../../modules/s3/web_hosting_s3_bucket"
  bucket        = "ucurtmaprojesi.com"
  region        = "eu-west-2"
  remote_state  = "${var.remote_state}"
  web_page_user = "prod-static-app-deployment-user"
}
