# PrawieTwitter

## How to run:

1. Install all dependencies by running: `npm run install-all` in root directory.
2. Run `npm run dev` to start both client and server in debug mode. 

## Additional commands:
- `npm run client` runs client server only
- `npm run server` runs server only
- `cd client && npm run lint` runs eslint for client files
- `npm test` runs server's vitest tests


### Endpoints
- Register user account
  - **\[POST\] /register**
  - mandatory fields:
    - email
    - username
    - password
    - password2
- Login
  - **\[POST\] /auth/login**
    - mandatory fields:
        - email
        - password
- Create Post
  - **\[POST\] /posts**
    - mandatory fields:
      - owner_id
      - content
    - possible fields:
      - photo (image)