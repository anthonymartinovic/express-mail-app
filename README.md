# express-mail-app

PROJECT: A Node mail sending service application, powered by Mailgun API and SendGrid API.

TECHNOLOGIES USED:
- Node.js
- Express.js
- Pug - templating engine
- CSS3
- JavaScript (ES6 compiled to ES5)

('request' used as HTTP client of choice.)

# BUILD & DEPLOYMENT (localhost)

PLEASE NOTE:
- This application was built for testing purposes only. If you are using a sandbox domain from Mailgun, you will have to authorise each recipient in your Mailgun account for them to be able to receive emails.
- Installation of Node.js is required for this project.

1. ESP Signup
- Sign up for both services (Mailgun & SendGrid) and create API keys for each service. You will also need a domain name for the Mailgun API (Mailgun provides a sandbox domain for testing purposes, which is enough for this project).

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
3. Install package.json dependencies (devDependencies are only for compiling ES6 to ES5).

4. Run `node app.js`
