module "non-prod-app-storybook-deployment" {
  source        = "../../modules/s3/web_hosting_s3_bucket"
  bucket        = "components.ucurtmaprojesi.com"
  region        = "eu-west-2"
  remote_state  = "${var.remote_state}"
  web_page_user = "non-prod-storybook-deployment-user"
}

