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
    - **\[POST\] /api/register**
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
#### Logout
- Logout
    - **\[POST\] /auth/logout**

#### Current User
- Current User
    - **\[GET\] /auth/current-user**
        - returns user: data, null otherwise


#### Posts
- Get all posts
  - **\[GET\] /api/posts**
- Get all user posts
  - **\[GET\] /api/posts**
  - mandatory fields:
    - owner_id
- Get a specific post
    - **\[GET\] /api/posts/{id}**
- Create Post
    - **\[POST\] /api/posts**
        - mandatory fields:
            - owner_id
            - content
        - possible fields:
            - photo (image)
- Update Post
    - **\[PUT\] /api/posts/{id}**
        - possible fields:
            - content
            - photo (image)
- Delete Post
  - **\[DELETE\] /api/posts/{id}**

#### Comments
- Get Comments for Post
  - **\[GET\] /api/comments/{post_id{**
- Create a Comment
  - User needs to be Log In
  - **\[POST\] /api/comments/{post_id}**
    - mandatory fields:
      - content
- Update Comment
  - **\[PUT\] /api/comments/{comment_id}**
      - mandatory fields:
        - content
- Delete Comment
  - **\[DELETE\] /api/comments/{comment_id}**

#### Followers
- Get Followers
    - **\[GET\] /api/followers/{user_id}**
- Get Following users
    - **\[GET\] /api/followers/following/{user_id}**
- Create Follow
  - User needs to be Log In
  - **\[POST\] /api/followers/{user_id}**
- Delete Comment
  - User needs to be Log In
  - **\[DELETE\] /api/followers/{user_id}**

#### CommentLikes
- Get comment likes
    - **\[GET\] /api/comment_likes/{comment_id}**
- Like comment
    - **\[POST\] /api/comment_likes/{comment_id}**
- Dislike comment
    - **\[POST\] /api/comment_likes/{comment_id}**

#### PostLikes
- Get post likes
    - **\[GET\] /api/post_likes/{post_id}**
- Like post
    - **\[POST\] /api/post_likes/{post_id}**
- Dislike post
    - **\[POST\] /api/post_likes/{post_id}**