@REM echo "# scripts" >> README.md
git init
git add .
git config --global user.email "daisukeland4@gmail.com"
git config --global user.name "daisukeland"
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/daisukeland/scripts.git
git push -u origin main
git pull origin main --allow-unrelated-histories
