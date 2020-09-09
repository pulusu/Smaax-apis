const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = jwt;
function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/countries',
            '/campaign/create',
            '/campaign/5f58aba2c261454684aa6d7f',
            '/campaign',
            '/users',
            '/users/checkOtp',
            '/countries/create',
            '/attachments',
            '/attachments/create',
            '/locations/create',
            '/postTypes/create',
            '/postTypes',
            '/socialPlatforms',
            '/socialPlatforms/create',
            '/language/create',
            '/campaign/dropdowns',
            '/locations',
            '/topics',
            '/uploads',
            '/topics/create',
            '/language',
            '/otp_history',
            '/otp_history/create',
            '/nationalities/create',
            '/nationalities',
            '/nationalities/:id',
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};