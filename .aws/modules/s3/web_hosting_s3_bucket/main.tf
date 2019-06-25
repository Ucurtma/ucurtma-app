data "aws_iam_policy_document" "policy" {
  statement {
    effect = "Allow"

    actions = [
      "s3:DeleteObject",
      "s3:GetObject",
      "s3:GetObjectAcl",
      "s3:PutObject",
      "s3:PutObjectAcl",
    ]

    resources = [
      "arn:aws:s3:::${var.bucket}/*",
    ]

    principals {
      type        = "AWS"
      identifiers = ["${aws_iam_user.user.arn}"]
    }
  }

  statement {
    effect = "Allow"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "arn:aws:s3:::${var.bucket}/*",
    ]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.bucket}"
  region = "${var.region}"
  acl    = "public-read"
  policy = "${data.aws_iam_policy_document.policy.json}"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}
output "user_access_key" {
  value = "${aws_iam_access_key.access_key.id}"
}

output "user_access_secret" {
  value     = "${aws_iam_access_key.access_key.secret}"
  sensitive = true
}
