#!/usr/bin/env sh

# 發生錯誤時終止腳本
set -e

# 構建
npm run build

# cd 到構建輸出的目錄下
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:jayredk/Vue3-Bootcamp-week6.git master:gh-pages

cd -
