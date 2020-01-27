 #!/bin/bash
yarn && yarn build
aws s3 sync ./build s3://ucurtmaprojesi.com --delete
aws cloudfront create-invalidation --distribution-id E3BBA49PSH0YZ1 --paths "/*"
