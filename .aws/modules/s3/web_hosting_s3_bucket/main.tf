resource "aws_s3_bucket" "bucket" {
  bucket = "${var.bucket}"
  region = "${var.region}"
  acl    = "public-read"

  website {
    index_document = "index.html"
  }
}
