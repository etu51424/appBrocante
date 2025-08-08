# API
## node :
npm init -y
npm pkg set type=module
npm install
npm pkg set scripts.dev="nodemon server.js"
npm pkg set scripts.initDB="node scripts/JS/initDB.js"
npm pkg set scripts.genDoc="node ./swagger/swagger_jsdoc.js"

## Docker :
docker run --name AppBrocante -e POSTGRES_PASSWORD=LoveBrocante -e POSTGRES_USER=SA -e POSTGRES_DB=AppBrocante -p 5432:5432 --rm -d postgres

## Lancement :
npm run initDB --> initialiser la base de données
npm run dev --> run API

# Backoffice
node --version
npm create vite@latest backoffice -- --template react
npm install

## Lancement :
npm run dev