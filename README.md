# express-mail-app

PROJECT: A Node mail sending service application, powered by Mailgun API and SendGrid API.

TECHNOLOGIES USED:
- Node.js
- Express.js
- Pug
- CSS3
- JavaScript (ES6 compiled to ES5 + ES5)

# BUILD & DEPLOYMENT (localhost)

PLEASE NOTE: This application was built for testing purposes only.

1. ESP Signup
- Sign up for both services (Mailgun & SendGrid) and create API keys for each service. You will also need a domain name for the Mailgun API (Mailgun provides sample domains for testing purposes, which is enough for this project).

2. INSERT API & DOMAIN INFO
- Once you have both API keys and a Mailgun domain, insert all this information in the `data/api.json` file, as shown below:

```elixir
{
  "mailgun": {
    "API_KEY": "ENTER MAILGUN API KEY HERE",
    "DOMAIN": "ENTER MAILGUN DOMAIN HERE"
  },
  "sendgrid": {
    "API_KEY": "ENTER SENDGRID API KEY HERE"
  }
}
```
