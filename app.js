'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    mainRoute = require('./routes/index.js'),
    port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('static'));

app.set('view engine', 'pug');

app.use(mainRoute);

app.listen(port, function () {
   return console.log('Server successfully connected on 127.0.0.1:' + port);
});
//# sourceMappingURL=/Users/AnthonyMartinovic/Desktop/Software Development/My Software Projects/expressMailService/app.js.map