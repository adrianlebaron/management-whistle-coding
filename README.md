# Dynamic docs web application 
## Technologies:
1. Django and Django rest framework for the back-end
2. Next js for the front-end

## Some of the features it has:
1. Login authentication for internal super users only making it more private for the team access only using the `user model` from `Django` and using `obtain_auth_token` from rest framework.
2. Makes API calls to the backend to fetch the docs which support Mark down rendering `code blocks` for example.
3. Dynamic routing.
4. `react-linkify` to make external links for a domains model coming from the backend.
