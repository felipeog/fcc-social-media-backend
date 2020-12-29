# Free Code Camp Social Media App - Backend

## [React / GraphQL Course - Build a social media app (MERNG Stack)](https://www.youtube.com/watch?v=n1mdAPFq2Os)

Simple social media app using **MongoDB**, **Express**, **React**, **Node** and **GraphQL**, the "**MERNG**" stack.

```json
{
  "dependencies": {
    "apollo-server": "^2.19.0",
    "bcryptjs": "^2.4.3",
    "graphql": "^15.4.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.11.8",
    "node-fetch": "^2.6.1",
    "validator": "^13.5.2"
  },
  "devDependencies": {
    "dotenv": "^8.2.0",
    "nodemon": "^2.0.6"
  }
}
```

## How to run

- Clone the repo
- `npm i`
- Create a `.env` file:

```
MONGODB=[mongodb-connection-string]
MONGODB_SECRET_KEY=[mongodb-secret-key]
RECAPTCHA_SECRET_KEY=[recaptcha-secret-key]
CORS_ORIGIN=[optional-cors-origin]
```

- `npm run dev`

## [Frontend repo](https://github.com/felipeog/fcc-social-media-frontend)
