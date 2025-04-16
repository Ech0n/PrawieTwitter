# PrawieTwitter

## How to run:

#### development build:
1. Install all dependencies by running: `npm run install-all` in root directory.
2. Run `npm run dev` to start both client and server in debug mode. 
#### production build:

requirements:  
- docker  

Linux:

`startProductionServer.sh`  

Windows:
1. `docker buildx build -t <your_image_name> .`
2. `docker run -p 3000:3000 --rm <your_image_name>`


## Additional commands:
- `npm run client` runs client server only
- `npm run server` runs server only
- `cd client && npm run lint` runs eslint for client files
- `npm test` runs server's vitest tests