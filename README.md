# CookTogether

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
```
Request body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
Response:
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

#### Login User
```http
POST /auth/login
```
Request body:
```json
{
  "email": "string",
  "password": "string"
}
```
Response:
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

### Recipe Endpoints

#### Get All Recipes
```http
GET /recipes
```
Response:
```json
{
  "recipes": [
    {
      "id": "string",
      "title": "string",
      "author": "string",
      "time": "string",
      "difficulty": "string",
      "ingredients": ["string"],
      "instructions": ["string"],
      "images": "string",
      "notes": "string"
    }
  ]
}
```

#### Get Recipe by ID
```http
GET /recipes/:id
```
Response:
```json
{
  "id": "string",
  "title": "string",
  "author": "string",
  "time": "string",
  "difficulty": "string",
  "ingredients": ["string"],
  "instructions": ["string"],
  "images": "string",
  "notes": "string"
}
```

#### Create Recipe
```http
POST /recipes
Authorization: Bearer <token>
```
Request body:
```json
{
  "title": "string",
  "time": "string",
  "difficulty": "string",
  "ingredients": ["string"],
  "instructions": ["string"],
  "images": "string",
  "notes": "string"
}
```

### Live Session Endpoints

#### Get All Sessions
```http
GET /sessions
```
Response:
```json
{
  "sessions": [
    {
      "id": "string",
      "title": "string",
      "host": "string",
      "startTime": "string",
      "participants": "number"
    }
  ]
}
```

#### Join Session
```http
POST /sessions/:id/join
Authorization: Bearer <token>
```
Response:
```json
{
  "sessionId": "string",
  "joinedAt": "string",
  "participantCount": "number"
}
```

### AI Assistant Endpoints

#### Get Cooking Assistance
```http
POST /ai/assist
Authorization: Bearer <token>
```
Request body:
```json
{
  "question": "string"
}
```
Response:
```json
{
  "answer": "string",
  "suggestions": ["string"]
}
```

### Error Responses

```json
{
  "error": {
    "code": "number",
    "message": "string"
  }
}
```

Common error codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

### Rate Limiting

- 100 requests per hour per IP
- 1000 requests per day per user

### Authentication

All protected endpoints require a JWT token in the Authorization header:
```http
Authorization: Bearer <token>
```
