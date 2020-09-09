const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Nationalities: require('../nationalities/nationalities.model'),
    Language: require('../language/language.model'),
    Locations: require('../locations/locations.model'), 
    Countries: require('../countries/countries.model'),
    otp_history: require('../otp_history/otp_history.model'),
    Campaign: require('../campaign/campaign.model'),
    Attachments: require('../attachments/attachments.model'),
    PostTypes: require('../postTypes/postTypes.model'),
    Topics: require('../topics/topics.model'),
    SocialPlatforms: require('../socialPlatforms/socialPlatforms.model')
};  