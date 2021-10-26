# My first API !

Thanks to the technical test from [TicTacTrip](https://www.tictactrip.eu), I've finally got myself to create a node.js REST API.
The purpose is to provide a tool to justify text to text with 80 characters per line.

2 endpoints :

- `/api/token`
  Retrieve an access token to use the api with a POST request.
  Use the dummy emails `foo@bar.com` or `hello@mail.com` to get an accessToken.

- `/api/justify`
  Use the request header `x-access-token` to provide the accessToken you get from the token endpoint.
  Send `raw` text as body payload.
  There is a daily usage quota of 80000 words.
