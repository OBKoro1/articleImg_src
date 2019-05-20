# 确保脚本抛出遇到的错误
set -e

git add .

# npm run d '参数' $1 === '参数'
git commit -m $1

git push


