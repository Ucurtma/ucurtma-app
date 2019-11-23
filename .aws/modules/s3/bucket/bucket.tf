resource "aws_iam_user" "user" {
  name = "${var.bucket_user}"
}

resource "aws_iam_access_key" "access_key" {
  user = "${aws_iam_user.user.name}"
}

data "aws_iam_policy_document" "policy" {
  statement {
    effect = "Allow"

    actions = [
      "s3:ListBucket",
    ]

    resources = [
      "arn:aws:s3:::${var.bucket}",
    ]

    principals {
      type        = "AWS"
      identifiers = ["${aws_iam_user.user.arn}"]
    }
  }

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
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.bucket}"
  region = "${var.region}"
  policy = "${data.aws_iam_policy_document.policy.json}"
}
