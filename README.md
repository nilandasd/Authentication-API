# validation-api
Server for registering, and authenticating users using JWTs. User names and passwords are stored using mongodb.

The server requires a .env file that the defines the following variables:
  URI: uri to mongoDB server\n
  PRIVATE_KEY: private key for https\n
  CERTIFICATE: certificate for https\n
  SECRET: secret for signing and verifying JWTs\n
  
Also the server uses swagger ui, so a verbose and graphical explanation can be accessed via a web browser at the root of the server URI.
