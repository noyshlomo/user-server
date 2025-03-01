# Server Launch Instructions for Linux

## Prerequisites

- Node.js and npm installed on your Linux machine

### Install Dependencies

Install the required dependencies:

```bash
npm install
```

## Running the Server

### Start the Server

To launch the server, run:

```bash
node server.js
```

Or use npm:

```bash
npm start
```

You should see: `Server running on http://localhost:4000`

## Testing the API

Once the server is running, you can test the endpoints:

### Get all users

```bash
curl http://localhost:4000/users
```

### Add a new user

```bash
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{"ID":"023456789","Name":"Test User","Phone":"054-1234567","Address":"Test"}'
```

### Get user by name

```bash
curl http://localhost:4000/users/Test
```
