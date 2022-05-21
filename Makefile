server:
	cd api
	npm install
	npm run dev

client: 
	cd client 
	npm install
	npm run start


modules: 
	npm install
	cd client
	npm install
	cd api
	npm install

start: client server

dev: 
	cd api
	npm run dev
	cd ../client/
	npm run build
