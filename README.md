# validation-api
Server for registering, and authenticating users using JWTs. User names and passwords are stored using mongodb.

The server requires a .env file that the defines the following variables:
  URI: <uri to mongoDB server>
  PRIVATE_KEY: <private key for https>
  CERTIFICATE: <certificate for https>
  SECRET: <secret for signing and verifying JWTs>
  
Also the server uses swagger ui, so a verbose and graphical explanation can be accessed via a web browser at the root of the server URI.
