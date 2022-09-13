server:
	cd api
	npm install
	npm run dev

client: 
	cd client 
	npm install
	npm run start


install: 
	npm run install-modules-full

remove:
	npm run remove-modules-full

start: client server

dev: 
	npm run dev

dev-full:
	npm run dev-full