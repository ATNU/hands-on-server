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

# Protected roots
Require a valid jwt to be included in the header authorization. If this jwt is invalid or expired, these endpoints will return 400 
and contain a message describing the error.
i.e.
```
{
    "message": "jwt malformed"
}
```
or 

```
{
    "message": "Token is invalid, please sign in again"
}
```
or
```
{
    "message": "No bearer authorization in header"
}
```

# Resume
Returns the page object for the furthest page the logged in user has saved. 

GET api/page/resume

### Request
Requires a valid jwt to be sent in the header authorization

### Success
User has saved one or more pages:
```
{
    "page": {
        "_id": "5e3adaf0352bd556ac711302",
        "userId": "5e3984ad65a9a01a9874bbbc",
        "pageNo": 4,
        "svg": "svgString...",
        "json": "jsonString.....",
        "timestamp": "2020-02-05T15:10:40.131Z",
        "__v": 0
    }
}

```

User has not saved any pages, returns empty list and message:
```
{
    "page": [],
    "message": "no saved pages"
}
```

### Failure
See jwt error messages above

# Resume with previous pages
Sends not only the most recently saved page but also all previous pages to store in local memory.

GET api/page/resumeList

### Success
```
200 OK
{
    "pageList": [
        {
            "_id": "5e3ac2769e98093cfca2162d",
            "userId": "5e3984ad65a9a01a9874bbbc",
            "pageNo": 1,
            "svg": "svgString",
            "json": "jsonString",
            "timestamp": "2020-02-05T13:26:14.804Z",
            "__v": 0
        },
        {
            "_id": "5e3acbcc6cd4b510e48023d5",
            "userId": "5e3984ad65a9a01a9874bbbc",
            "pageNo": 2,
            "svg": "svgString",
            "json": "jsonString",
            "timestamp": "2020-02-05T14:06:04.632Z",
            "__v": 0
        }
    ]
}    
```

# Get page
api/page/:pageNo
e.g.
```api/page/2```

### Request
Include valid jwt

### Success

User has not saved anything for that page number yet:
```
{
    "page": [],
    "message": "user has not saved this page yet"
}
```

User has saved a page for that number (returns most recently saved version):
```
{
    "page": {
        "_id": "5e3acbcc6cd4b510e48023d5",
        "userId": "5e3984ad65a9a01a9874bbbc",
        "pageNo": 2,
        "svg": "svgString",
        "json": "jsonString",
        "timestamp": "2020-02-05T14:06:04.632Z",
        "__v": 0
    }
}
```
### Failure
see jwt failures


# Save
Saves each page as a new entry in the database, even if that user has already saved a version of that page number.

POST /api/page/save

### Request
Include valid jwt

### Success

```
201 CREATED
{
   "message": "Page saved"
} 
```    
    
### Failure
see jwt failures


# Save or update
Saves each page as a new entry in the database or updates the entry if the user has previously saved an entry for that page.

POST /api/page/sou

### Request
Include valid jwt

### Success

```
201 CREATED
{
   "message": "Page saved or updated"
} 
```    
    
### Failure
see jwt failures
