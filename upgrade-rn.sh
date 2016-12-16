
#Download the patch
curl https://github.com/ncuillery/rn-diff/compare/rn-0.38.0...rn-0.39.0.diff > upgrade-rn.patch

# Replace RnDiffApp occurences
appNameCamelCase=todo_today
appNameLowerCase=todo_today
sed -i "" "s-ios/RnDiffApp-ios/${appNameCamelCase}-" upgrade-rn.patch
sed -i "" "s-java/com/rndiffapp-java/com/${appNameLowerCase}-" upgrade-rn.patch

# Set up the 3-way merge
git remote add rn-diff https://github.com/ncuillery/rn-diff.git
git fetch rn-diff

# Run the apply command
git apply upgrade-rn.patch --exclude=package.json -p 2 --3way
