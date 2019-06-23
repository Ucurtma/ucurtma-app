locals {
  id = "codepipeline-${var.namespace}-${var.stage}-${var.name}"
}

# CodePipeline resources
resource "aws_s3_bucket" "build_artifact_bucket" {
  bucket = "${local.id}-artifacts-bucket"
  acl    = "private"
}

data "aws_iam_policy_document" "codepipeline_assume_policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["codepipeline.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "codepipeline_role" {
  name               = "${local.id}-codepipeline-role"
  assume_role_policy = "${data.aws_iam_policy_document.codepipeline_assume_policy.json}"
}

# CodePipeline policy needed to use CodeCommit and CodeBuild
resource "aws_iam_role_policy" "attach_codepipeline_policy" {
  name = "${local.id}-codepipeline-policy"
  role = "${aws_iam_role.codepipeline_role.id}"

  policy = <<EOF
{
    "Statement": [
        {
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion",
                "s3:GetBucketVersioning",
                "s3:PutObject"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Action": [
                "cloudwatch:*",
                "iam:PassRole"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Action": [
                "codebuild:BatchGetBuilds",
                "codebuild:StartBuild"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ],
    "Version": "2012-10-17"
}
EOF
}

# CodeBuild IAM Permissions
resource "aws_iam_role" "codebuild_assume_role" {
  name = "${local.id}-codebuild-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "codebuild_policy" {
  name = "${local.id}-codebuild-policy"
  role = "${aws_iam_role.codebuild_assume_role.id}"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
       "s3:PutObject",
       "s3:GetObject",
       "s3:GetObjectVersion",
       "s3:GetBucketVersioning"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Effect": "Allow",
      "Resource": [
        "${aws_codebuild_project.build_project.id}"
      ],
      "Action": [
        "codebuild:*"
      ]
    },
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    }
  ]
}
POLICY
}

# CodeBuild Section for the Package stage
resource "aws_codebuild_project" "build_project" {
  name = "${local.id}-build"
  description = "The CodeBuild project for ${local.id}"
  service_role = "${aws_iam_role.codebuild_assume_role.arn}"
  build_timeout = "60"

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type = "${var.build_compute_type}"
    image = "${var.build_image}"
    type = "LINUX_CONTAINER"
    privileged_mode = "${var.privileged_mode}"
  }

  source {
    type = "CODEPIPELINE"
    buildspec = "buildspec.yml"
  }
}

# Full CodePipeline
resource "aws_codepipeline" "codepipeline" {
  name = "${local.id}-codepipeline"
  role_arn = "${aws_iam_role.codepipeline_role.arn}"

  artifact_store {
    location = "${aws_s3_bucket.build_artifact_bucket.bucket}"
    type = "S3"
  }

  stage {
    name = "Source"

    action {
      name = "Source"
      category = "Source"
      owner = "ThirdParty"
      provider = "GitHub"
      version = "1"
      output_artifacts = ["code"]

      configuration = {
        Owner = "${var.github_username}"
        OAuthToken = "${var.github_token}"
        Repo = "${var.github_repo}"
        Branch = "master"
        PollForSourceChanges = "true"
      }
    }
  }

  stage {
    name = "BuildTestPackage"

    action {
      name = "BuildTestPackage"
      category = "Test"
      owner = "AWS"
      provider = "CodeBuild"
      input_artifacts = ["code"]
      output_artifacts = ["build"]
      version = "1"

      configuration = {
        ProjectName = "${aws_codebuild_project.build_project.name}"
      }
    }
  }

  stage {
    name = "DeployPackage"

    action {
      name = "Deploy"
      category = "Deploy"
      owner = "AWS"
      provider = "Amazon S3"
      input_artifacts = ["build"]
      version = "1"

      configuration = {
        S3Bucket = "${var.target_bucket}"
        S3ObjectKey = ""
      }
    }
  }
}

output "aws_code_pipeline_build_artifact_bucket_arn" {
  value = "${aws_s3_bucket.build_artifact_bucket.arn}"
}
