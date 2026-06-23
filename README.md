A RESTful URL Shortening Service built using Node.js, Express.js, MongoDB, and Mongoose. The service allows users to create short URLs, redirect to original URLs, and view URL statistics.

Live API URL:  https://url-shortner-production-5b09.up.railway.app/

Features -

Create short URLs
Redirect to original URLs
Track URL access count
Retrieve URL statistics
Input validation
Error handling


Authentication

This API uses JWT (JSON Web Token) based authentication.

Obtain Access Token

Authenticate using the login endpoint and use the returned access token for all protected routes.

Authorization Header

Include the JWT token in the Authorization header:

Authorization: Bearer <ACCESS_TOKEN>

Example:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...




API Endpoints
Create Short URL
Endpoint
POST /api/url
Request Body

{
  "originalUrl": "https://www.example.com"
}


# Authentication

This API uses JWT (JSON Web Token) based authentication.

## Obtain Access Token

Authenticate using the login endpoint and use the returned access token for all protected routes.

## Authorization Header

Include the JWT token in the Authorization header:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

# Create Short URL

## Endpoint

```http
POST /api/url
```

## Headers

```http
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json
```

## Request Body

```json
{
  "originalUrl": "https://www.example.com"
}
```

## Success Response

```json
{
  "status": "success",
  "data": {
    "id": "685b1234567890",
    "originalUrl": "https://www.example.com",
    "shortCode": "abc123",
    "shortUrl": "https://your-domain.com/abc123",
    "createdAt": "2026-06-15T10:00:00.000Z",
    "updatedAt": "2026-06-15T10:00:00.000Z"
  }
}
```

## Error Response

```json
{
  "status": "Failed",
  "message": "Unauthorized"
}
```
2. Redirect URL

Redirects the user to the original URL and increments the click count.

Endpoint
GET /api/url/:shortCode
Authentication

Not Required

Example
GET /api/url/abc123
Success Response

HTTP 302 Redirect

Redirects to:

https://www.google.com
Error Response

Status Code: 404

{
  "status": "Failed",
  "message": "URL not found"
}

3. Get URL Statistics

Retrieves statistics for a shortened URL.

Endpoint
GET /api/url/stats/:shortCode
Authentication

Required

Headers
Authorization: Bearer <ACCESS_TOKEN>
Example
GET /api/url/stats/abc123
Success Response
{
  "status": "success",
  "data": {
    "originalUrl": "https://www.google.com",
    "shortCode": "abc123",
    "clicks": 15,
    "createdAt": "2026-06-15T10:00:00.000Z",
    "updatedAt": "2026-06-15T10:30:00.000Z"
  }
}
Error Response
{
  "status": "Failed",
  "message": "URL not found"
}




