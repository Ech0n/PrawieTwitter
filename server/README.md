### Endpoints

#### Users
- Get all users
  - **\[GET\] /users**
- Get a specific users
  - **\[GET\] /users/{id}**
- Update user
  - **\[PUT\] /users/{id}**
  - possible fields:
    - name
    - surname
    - description
    - username
- Delete user
  - **\[DELETE\] /users/{id}**

#### Register
- Register user account
    - **\[POST\] /register**
    - mandatory fields:
        - email
        - username
        - password
        - password2
      
#### Login
- Login
    - **\[POST\] /auth/login**
        - mandatory fields:
            - email
            - password

#### Posts
- Get all posts
  - **\[GET\] /posts**
- Get all user posts
  - **\[GET\] /posts**
  - mandatory fields:
    - owner_id
- Get a specific post
    - **\[GET\] /posts/{id}**
- Create Post
    - **\[POST\] /posts**
        - mandatory fields:
            - owner_id
            - content
        - possible fields:
            - photo (image)
- Update Post
    - **\[PUT\] /posts/{id}**
        - possible fields:
            - content
            - photo (image)
- Delete Post
  - **\[DELETE\] /posts/{id}**

#### Comments
- Get Comments for Post
  - **\[GET\] /comments/{pot_id{**
- Create a Comment
    - **\[POST\] /comments/{post_id}**
        - mandatory fields:
            - content
- Update Comment
  - **\[PUT\] /comments/{comment_id}**
      - mandatory fields:
        - content
- Delete Comment
  - **\[DELETE\] /comments/{comment_id}**
