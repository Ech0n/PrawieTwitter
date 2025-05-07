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
  - **\[GET\] /comments/{post_id{**
- Create a Comment
  - User needs to be Log In
  - **\[POST\] /comments/{post_id}**
    - mandatory fields:
      - content
- Update Comment
  - **\[PUT\] /comments/{comment_id}**
      - mandatory fields:
        - content
- Delete Comment
  - **\[DELETE\] /comments/{comment_id}**

#### Followers
- Get Followers
    - **\[GET\] /followers/{user_id}**
- Get Following users
    - **\[GET\] /followers/following/{user_id}**
- Create Follow
  - User needs to be Log In
  - **\[POST\] /followers/{user_id}**
- Delete Comment
  - User needs to be Log In
  - **\[DELETE\] /followers/{user_id}**

#### CommentLikes
- Get comment likes
    - **\[GET\] /comment_likes/{comment_id}**
- Like comment
    - **\[POST\] /comment_likes/{comment_id}**
- Dislike comment
    - **\[POST\] /comment_likes/{comment_id}**

#### PostLikes
- Get post likes
    - **\[GET\] /post_likes/{post_id}**
- Like post
    - **\[POST\] /post_likes/{post_id}**
- Dislike post
    - **\[POST\] /post_likes/{post_id}**