# chat-app
Small chat app being developed as a personal project.

See https://lucasolal-chat-app.herokuapp.com/ for an example of the deployed app.

Uses Auth0 to authenticate users and a Postgres database to persist messages. You will need to set up an Auth0 single page application and provide your client ID and Auth0 domain to the env variables as described below.

**Environment Variables**

  * REACT_APP_SERVER_URL: URL of the application
  * REACT_APP_AUTH0_DOMAIN: domain of the Auth0 application
  * REACT_APP_AUTH0_CLIENT_ID: Client ID of the Auth0 Application


