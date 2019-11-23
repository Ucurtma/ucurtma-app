module "non-prod-app-files-storage" {
  source      = "../../modules/s3/bucket"
  region      = "eu-west-2"
  bucket      = "non-prod.files.ucurtmaprojesi.com"
  bucket_user = "non-prod-app-files-storage-deployment-user"
}
