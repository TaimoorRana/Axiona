# Setup

```
npm install
brew install mongodb
```

## Running locally
To run locally, we'll run MongoDB locally and then start the server

```
npm run start:db
npm run start:watch
```

Before using the web app, you'll need to create a user.
It's best to create an admin user locally so you can test things out properly.

```
./tasks/create-user.js --help
```

This application also hosts the static files from the Angular Client app.

The Angular Client app needs to be built at least once before you'll be able to visit
**http://localhost:3000** to engage with the client side application.