# Sign up
POST /api/auth/signup

### Request
```
{ 
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
Sends not only the most recently saved page but also all previous pages to store in local memory. Returns null for a page the user has not saved (see example).

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
        null,
        {
            "_id": "5e3acbcc6cd4b510e48023d5",
            "userId": "5e3984ad65a9a01a9874bbbc",
            "pageNo": 3,
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


# Save page
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


# Save or update page
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

# Save feedback

POST api/feedback/save

### Request
Include valid jwt

```$xslt
{ 
	"q1Check" : string, REQUIRED 
	"q1Text" : string,
	"q2Check" : string, REQUIRED 
	"q2Text" : string,
	"q3Check" :string, REQUIRED 
	"q3Text" : string,
	"job" : string, REQUIRED 
	"jobText" : string,
	"device" :string, REQUIRED 
	"deviceText" : string,
 }
```

### Success

```
201 CREATED
{
   "message": "Feedback saved"
} 
```    

### Failure
see jwt failures

```$xslt
400 BAD REQUEST
{
    "message": "Missing required fields"
}
```

# Admin endpoints
Currently not protected by jwt or by other means.

# Reset Password
api/auth/reset

### Request
```
{ 
	"email": string, 
	"password" : string
}
```

### Success
```
200 OK

{
    "message": "Password updated"
}
```

### Failure

```$xslt
400 BAD REQUEST

{
    "message": "Email not in use"
}
```
or
```$xslt
400 BAD REQUEST

{
    "message": "Please provide email and new password"
}
```

or
```$xslt
500 INTERNAL SERVER ERROR

{
    "message": "Problem hashing password"
}
```

# Get all feedbacks
GET api/feedback/all

### Success

``` 
200 OK

[
    {
        "_id": "5e455545029fc652b0520bf6",
        "userId": "5e4554f2a0b6d2019c22f184",
        "q1Check": "yes",
        "q1Text": "comments",
        "q2Check": "yes",
        "q2Text": "comments",
        "q3Check": "yes",
        "q3Text": "comments",
        "job": "Other",
        "jobText": "Another job",
        "device": "Other",
        "deviceText": "other device",
        "timestamp": "2020-02-13T13:55:17.083Z",
        "__v": 0
    },
    {
        "_id": "5e4555e29b791858ac012ccb",
        "userId": "5e4554f2a0b6d2019c22f184",
        "q1Text": "comments",
        "q2Check": "yes",
        "q2Text": "comments",
        "q3Check": "yes",
        "q3Text": "comments",
        "job": "Other",
        "jobText": "Another job",
        "device": "Other",
        "deviceText": "other device",
        "timestamp": "2020-02-13T13:57:54.384Z",
        "__v": 0
    }
]
```



