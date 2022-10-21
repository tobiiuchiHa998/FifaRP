const Express = require('express');
const { URLSearchParams } = require('url'); // can also use form-data
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const client_id = '997870494005088297'; // Paste your bot's ID here (in between the apostrophes)
const client_secret = 'RP1lZUTJnIXWAl5hnALdPPNchuO59-nl'; // Paste your bot's secret here (in between the apostrophes).

const app = Express(); // Create a web app
//const port = 80; // Port to host on
/* Make a function to give us configuration for the Discord API */
function make_config(authorization_token) { // Define the function
  data = { // Define "data"
    headers: { // Define "headers" of "data"
      "authorization": `Bearer ${authorization_token}` // Define the authorization
    }
  };
  return data; // Return the created object
};

app.use(Express.urlencoded({ extended: false })); // configure the app to parse requests with urlencoded payloads
app.use(Express.json()); // configure the app to parse requests with JSON payloads
app.use(bodyParser.text());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html')); // Send the index.html file
});

app.post('/user', (req, res) => {
  const data_1 = new URLSearchParams();
  data_1.append('client_id', client_id);
  data_1.append('client_secret', client_secret);
  data_1.append('grant_type', 'authorization_code');
  data_1.append('redirect_uri', `https://Ayuza-Website-V2.cronegames.repl.co/`);
  data_1.append('scope', 'identify');
  data_1.append('code', req.body);
});

axios.get("https://discord.com/api/users/@me", make_config(data.access_token)).then(response => {
  res.status(200).send(response.data.username);
 }).catch(err => {
  console.log(err);
  res.sendStatus(500);
});

app.listen(port, function() {
  console.log(`App listening! Link: https://Ayuza-Website-V2.cronegames.repl.co`);
});
