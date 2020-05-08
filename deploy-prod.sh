 #!/bin/bash
git pull upstream master
echo 'window.app_env = "production";' > ./public/configuration.js

VERSION=`git describe --abbrev=0 --tags`

VERSION_BITS=(${VERSION//./ })

VNUM1=${VERSION_BITS[0]}
VNUM2=${VERSION_BITS[1]}
VNUM3=${VERSION_BITS[2]}
VNUM3=$((VNUM3+1))

NEW_TAG="${VNUM1}.${VNUM2}.${VNUM3}"

GIT_COMMIT=`git rev-parse HEAD`
CURRENT_COMMIT_TAG=`git describe --contains $GIT_COMMIT 2>/dev/null`

if [ -z "$CURRENT_COMMIT_TAG" ]; then
    echo "Updating $VERSION to $NEW_TAG"
    git tag $NEW_TAG
    git push --tags
    echo "Tag created and pushed: $NEW_TAG"
else
    echo "This commit is already tagged as: $CURRENT_COMMIT_TAG"
fi

yarn && yarn build
aws s3 sync ./build s3://ucurtmaprojesi.com --delete
aws cloudfront create-invalidation --distribution-id E3BBA49PSH0YZ1 --paths "/*"