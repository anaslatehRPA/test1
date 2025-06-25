rm -rf _site
rmdir /s /q _site


npm install @11ty/eleventy --save-dev(การติดตั้ง Eleventy แบบ dev dependency ใ)

npx eleventy --serve
http://localhost:8080/


ดูโครงโปรเจค ด้วย power shell (tree /f)


npx eleventy (buld)

npx @11ty/eleventy --serve



git init(ครั้แรกเท่านั้น)
git add .
git commit -m "First commit"
git remote add origin https://github.com/anaslatehRPA/test1.git
git branch -M main
git push -u origin main


rm -rf docs     # หรือ _site

set ELEVENTY_ENV=github && npx eleventy  (buld git)
npx eleventy  (buld)


//อัปเดต/แก้ไขโค้ดในเครื่อง แล้วใช้
git add .
git commit -m "ข้อความอธิบาย"
git push

set ELEVENTY_ENV=github && npx eleventy
ถ้าเตรียม deploy GitHub Pages
set ELEVENTY_ENV=github && npx eleventy --serve

ถ้าเน้นเทสสำหรับ Netlify/local
npx eleventy --serve

set ELEVENTY_ENV=github && set GITHUB_REPOSITORY=anaslateh2/anaslatehRPA && npx eleventy
npx serve docs
   - Local:    http://localhost:3000     │
   - Network:  http://10.16.108.2:3000 

https://sotrad.netlify.app/
https://anaslatehrpa.github.io/test1/