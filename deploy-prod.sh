 #!/bin/bash
yarn && yarn build export
aws s3 sync ./packages/frontend/out/ s3://ucurtmaprojesi.com --delete
aws cloudfront create-invalidation --distribution-id E3BBA49PSH0YZ1 --paths "/*"