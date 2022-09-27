const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user-service');

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
    path: ['/users/authenticate', '/users/register'],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  if (!user) {
    return done(null, true);
  }

  done();
}
