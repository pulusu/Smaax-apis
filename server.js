require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
var path = require('path');
const serveIndex = require('serve-index');
app.use('/uploads', express.static('uploads'), serveIndex('uploads', {'icons': true})); 
// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/nationalities', require('./nationalities/nationalities.controller'));
app.use('/countries', require('./countries/countries.controller'));
app.use('/language', require('./language/language.controller'));
app.use('/locations', require('./locations/locations.controller'));
app.use('/otp_history', require('./otp_history/otp_history.controller'));
app.use('/campaign', require('./campaign/campaign.controller'));
app.use('/attachments', require('./attachments/attachments.controller'));
app.use('/postTypes', require('./postTypes/postTypes.controller'));
app.use('/socialPlatforms', require('./socialPlatforms/socialPlatforms.controller'));
app.use('/topics', require('./topics/topics.controller'));
app.use('/userroles', require('./userroles/userroles.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
}); 
