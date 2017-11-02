const    express = require('express'),
         request = require('request'),
          router = express.Router(),

  mailgunAPI_KEY = require('./../data/api.json').mailgun.API_KEY,
   mailgunDOMAIN = require('./../data/api.json').mailgun.DOMAIN,
      mailgunURL = `https://api:${mailgunAPI_KEY}@api.mailgun.net/v3/${mailgunDOMAIN}/messages`,

 sendgridAPI_KEY = require('./../data/api.json').sendgrid.API_KEY,
 sendgridHeaders = {
   'content-type': 'application/json',
    authorization: `Bearer ${sendgridAPI_KEY}`
 },
     sendgridURL = 'https://api.sendgrid.com/v3/mail/send';

router.get('/', (req, res) => { res.render('index.pug'); });

//Primary posting route (SENDGRID)
router.post('/', (req, res, next) => {

  let data = {
    personalizations:
    [ { to: [ { email: `${req.body.to}` } ],
        subject: `${req.body.subject}` } ],
        from: { email: `${req.body.from}` },
   content:
    [ { type: 'text/plain',
        value: `${req.body.text}` } ]
  };

  if (req.body.cc !== '') {
    data.personalizations[0].cc = [ { email: `${req.body.cc}` } ];
  }

  if (req.body.bcc !== '') {
    data.personalizations[0].bcc = [ { email: `${req.body.bcc}` } ];
  }

  let sendgridOptions = {
    method: 'POST',
    url: sendgridURL,
    headers: sendgridHeaders,
    body: data,
    json: true
  };

  let sendgridCallback = (error, response, body) => {

    //SendGrid API passes '202' if successful
    if (response.statusCode !== 202) {

      console.log(`SendGrid ERROR: Status Code - ${response.statusCode}`);
      console.log('Attempting to use Mailgun...');
      next();

    } else {

      console.log('SendGrid SUCCESS');
      res.render('index.pug', { success: 'success' });
    }
  };

  request(sendgridOptions, sendgridCallback);

}); //app.post request (SENDGRID)

//Backup posting / error notification route (MAILGUN)
router.post('/', (req, res) => {

  let data = {
    'from': req.body.from,
    'to': [req.body.to],
    'subject': req.body.subject,
    'text': req.body.text,
  }

  if (req.body.cc !== '') {
    data['cc'] = [req.body.cc];

  }

  if (req.body.bcc !== '') {
    data['bcc'] = [req.body.bcc];

  }

  let mailgunCallback = (error, response, body) => {

    //Mailgun API passes '200' if successful
    if (response.statusCode !== 200) {

      //Mailgun API passes '400' if user error
      if (response.statusCode === 400) {

        let errorReport = body.slice(16, -30);

        console.log(`MESSAGE FAILURE: ${errorReport}`);
        res.render('index.pug', { errorReport });

      } else {

        let serverReport = response.statusCode;

        console.log(`Mailgun ERROR: Status Code - ${serverReport}`);
        res.render('index.pug', { serverReport });
      }
    } else {

      console.log(response.statusCode);
      res.render('index.pug', { success: 'success' });
    }
  };

  request.post({url: mailgunURL, form: data}, mailgunCallback);

}); //app.post request (MAILGUN)

module.exports = router;
