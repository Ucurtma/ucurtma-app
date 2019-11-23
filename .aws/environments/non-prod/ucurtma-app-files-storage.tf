module "non-prod-app-files-storage" {
  source        = "../../modules/s3/web_hosting_s3_bucket"
  bucket        = "non-prod.files.ucurtmaprojesi.com"
  region        = "eu-west-2"
  remote_state  = "${var.remote_state}"
  web_page_user = "non-prod-app-files-storage-deployment-user"
}
