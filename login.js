const { login } = require('fb-chat-api');
const config = require('./config.json');

login({ email: config.email, password: config.password }, (err, api) => {
  if (err) return console.error("Login failed:", err);

  console.log('Logged in successfully!');
  require('./index.js')(api);
});