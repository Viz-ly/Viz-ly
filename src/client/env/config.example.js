//create a config.js file in the env folder that includes the following code
//expose our config directly to our application using module.exports

module.exports = {
  'facebookAuth': {
    'clientID': 'your-secret-clientID-here', //your App ID
    'clientSecret': 'your-client-secret-here', //your APP secret
    'callbackURL': 'http://localhost:3000/auth/facebook/callback'
  }
};