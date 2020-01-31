# Sign up
POST /api/auth/signup

### Request
```
{ 
	"username" : string, 
	"email": string, 
	"password" : string
}
```

### Success

``` 
201 Created 

{
    "message": "User saved",
    "savedUser": {
        "_id": "5e34111153e1891300c8cef2",
        "username": "test9",
        "email": "email9@ncl.ac.uk",
        "furthestPage": 1,
        "__v": 0
    }
}
```

### Failure
```400 Bad Request``` 
```
{
       "message": "Please provide username, email and password to sign up"``` 
}
``` 
or 
```
{
       "message": "Username taken"
   }
```
or 
```
{
       "message": "Email taken"
}
```


```500 Internal Server Error 'Problem hashing password```

# Login
GET api/auth/

### Request
```
{ 
"username" : string, 
"password" : string 
}
```

### Success
```
200 OK

{
    "tokenData": {
        "expiresIn": int,
        "token": string
    }
}
```

### Failure
```
400 BAD REQUEST
{
    "message": "Username does not exist"
}
```

```
401 UNAUTHORIZED
{
    "message": "Password is not correct"
}
```
