# ChatApp Backend
This is the backend of the project using Node.js, Express.js, Socket.io, Google Gemini ,Mongoose, MongoDB, Cloudinary, Multer, JWT and bcrypt . It consist of User Authentication, JWT tokenization, Protection middlewares, File Handling and Cloud Uploading. 

## Architecture
- fundamentally backend Works on MVC(Model-View-Controller) Architecture 

- **Diagram of Models connections**
![image](https://github.com/Prathamesh18X/ChatApp/assets/109477390/30e2b790-28fe-4740-bed0-824c78c7f80c)

- **Controller Structure Diagram** 
![image](https://github.com/Prathamesh18X/ChatApp/assets/109477390/48bad86c-94c2-4e1c-8d68-81ec0a928ce8)



## API Endpoints:

# Auth API
### (/api/users)
<br />


#### POST /auth

Authenticate a user based on provided credentials.

**Request:**
- Method: POST
- Endpoint: `/api/users/auth`
- Body:
  ```json
  {
  "name": "User Name",
  "email": "user@example.com",
  "userName": "username",
  "password": "userpassword"
  }
  ```
**Response:**
- 200 OK: Returns user authentication status and user details.
- 500 Internal Server Error: An error occurred on the server.

#### GET /details

Get details about all users, orders, and other relevant statistics.

**Request:**
- Method: GET
- Endpoint: `/api/admin/details`

**Response:**
- 200 OK:  Returns details about all users, orders, and statistics
- 500 Internal Server Error: An error occurred on the server.Authentication API
(/api/auth)

### POST /login
Login user with provided credentials.

**Request:**

- Method: POST
- Endpoint: `/api/auth/login`
- Body:
```json
{
  "email": "user@example.com",
  "password": "password"
}
```
**Response:**

- 200 OK: Returns user data and authentication token.
- 401 Unauthorized: Invalid credentials.
- 500 Internal Server Error: An error occurred on the server.

### POST /signup
Register a new user.

**Request:**

- Method: POST
- Endpoint: `/api/auth/signup`
- Body:
```json
{
  "email": "user@example.com",
  "password": "password",
  "name": "User Name",
  "profilePic" : "FORM FILE"
}
```
**Response:**

- 200 OK: Returns user data and authentication token.
- 500 Internal Server Error: An error occurred on the server.

### POST /update
Update user data.

**Request:**

- Method: POST
- Endpoint: `/api/auth/update`
- Body:
```json
{
  "name": "New Name",
  "email": "new@example.com"
}
```
**Response:**

- 200 OK: Returns updated user data.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.

### POST /logout
Logout user.

**Request:**

- Method: POST
- Endpoint: `/api/auth/logout`

**Response:**

- 200 OK: User successfully logged out.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.

### DELETE /deleteAccount/:id
Delete user account.

**Request:**

- Method: DELETE
- Endpoint: `/api/auth/deleteAccount/:id`

**Response:**
- 200 OK: User account deleted successfully.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.

# Group API
### (/api/groups)
GET /
Get all groups.

**Request:**

- Method: GET
- Endpoint: `/api/groups/`

**Response:**

- 200 OK: Returns all groups.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.

### POST /create
Create a new group.

**Request:**

- Method: POST
- Endpoint: `/api/groups/create`
- Body:
```json
{
  "name": "Group Name"
}
```
**Response:**

- 200 OK: Returns the created group.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.

### POST /add/:groupId
Add member to a group.

**Request:**

- Method: POST
- Endpoint: `/api/groups/add/:groupId`
- Body:
```json
{
  "userId": "user_id"
}
```
**Response:**

- 200 OK: Member added successfully.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.


### POST /remove/:groupId
Remove member from a group.

**Request:**

- Method: POST
- Endpoint: `/api/groups/remove/:groupId`
- Body:
```json
{
  "userId": "user_id"
}
```
**Response:**

- 200 OK: Member removed successfully.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.


# Message API
(/api/messages)
### GET /:id
Get messages with a specific user.

**Request:**

Method: GET
- Endpoint: `/api/messages/:id`

**Response:**

- 200 OK: Returns messages.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.

### POST /send/:id
Send a message to a specific user.

**Request:**

- Method: POST
- Endpoint:  `/api/messages/send/:id`
- Body:
```json
{
  "message": "Message content"
}
```
**Response:**

- 200 OK: Message sent successfully.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.

### GET /groups/:id
Get messages from a specific group.

**Request:**

- Method: GET
- Endpoint: /api/messages/groups/:id


**Response:**

- 200 OK: Returns group messages.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.

### POST /groups/send/:id
Send a message to a specific group.

**Request:**

- Method: POST
- Endpoint:  `/api/messages/groups/send/:id`
- Body:
```json
{
  "message": "Message content"
}
```

**Response:**

- 200 OK: Message sent successfully.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.

### POST /clear/:id
Clear chat with a specific user or group.

**Request:**

- Method: POST
- Endpoint:  `/api/messages/clear/:id`

**Response:**

- 200 OK: Chat cleared successfully.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.

# User API
(/api/users)
### GET /
Get all users.

**Request:**

- Method: GET
- Endpoint: `/api/users/`

**Response:**

- 200 OK: Returns all users.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server Error: An error occurred on the server.

### GET /block/:id
Check if a user is blocked.

**Request:**

- Method: GET
- Endpoint: `/api/users/block/:id`

**Response:**

- 200 OK: Returns blocked status.
- 401 Unauthorized: User not authenticated.
- 500 Internal Server