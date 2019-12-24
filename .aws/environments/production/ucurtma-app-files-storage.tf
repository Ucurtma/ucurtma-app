module "prod-app-files-storage" {
  source      = "../../modules/s3/bucket"
  region      = "eu-west-2"
  bucket      = "prod.files.ucurtmaprojesi.com"
  bucket_user = "prod-app-files-storage-deployment-user"
}
