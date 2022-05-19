# User API - Photo API - Product API - Film API

## Scripts

```bash
# run localhost:3000
$ npm run dev
```

## Routes

API: https://cms-film-albums-api.herokuapp.com

### USERS

https://cms-film-albums-api.herokuapp.com/api/users

```bash
# GET LIST
GET     /api/users

# GET SINGE USER
GET {{baseUrl}}/users/:id

# Register (Add)
POST    /api/users/register

{
      "_id": "6208b5d7c156a063646b9152",
      "userName": "long thai",
      "email": "long159a@gmail.com",
      "password": "$2b$10$7s7.ugobbGxAVw63nEbqwuLk4L5FSbrD0gbuoU1j2LiTQSmd8M9mu",
      "createdDate": "2022-02-13T07:40:07.949Z",
      "updatedDate": "2022-02-13T07:40:07.949Z",
      "createdAt": "2022-02-13T07:40:07.953Z",
      "updatedAt": "2022-02-13T07:40:07.953Z",
      "__v": 0
}

# Login
POST    /api/users/login

{
      "email": "long159a@gmail.com",
      "password": "$2b$10$7s7.ugobbGxAVw63nEbqwuLk4L5FSbrD0gbuoU1j2LiTQSmd8M9mu",
},

if user login successfully. Then backend response a token, you will take token call api to get user infomation


### Films

https://cms-film-albums-api.herokuapp.com

```bash
# GET LIST FILM
GET     /api/film

# GET SINGE FILM
GET {{baseUrl}}/todos/:id

# PAGINATION
GET     /api/film?_page=1&_limit=10

# DELETE
DELETE  /api/film/{id}
header: {
'x-auth-token': token
}

# UPDATE
PUT   /api/film/{id}
{
  "title": "Spider man",
  "quote": "Spider man",
  "description": "nihil aut laudantium",
  "banner": "url image",
}

# ADD NEW
POST    /api/film
header: {
'x-auth-token': token
}

{
  "title": "Spider man",
  "quote": "Spider man",
  "description": "nihil aut laudantium",
  "banner": "url image",
}
```

### Auth

https://cms-film-albums-api.herokuapp.com/api/auth

```bash
# POST
header: {
'x-auth-token': token (token when user login)
}

```
