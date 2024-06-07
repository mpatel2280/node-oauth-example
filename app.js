const express = require('express');
const utils = require('./utils');
const app = express();
const PORT = 4000;

app.get('/auth', async (req, res) => {
    try {
        res.redirect(utils.request_get_auth_code_url);
    } catch (error) {
        res.sendStatus(500);
        console.log(error.message);
    }
});


app.get (process.env.REDIRECT_URI, async (req, res) => {
    const authorization_token = req.query;
    try {
      // get access token using authorization token
      const response = await utils.get_access_token (authorization_token.code);

    // get access token from payload
      const {access_token} = response.data;
      // get user profile data
      const user = await utils.get_profile_data (access_token);
      const user_data = user.data;
      console.log('USER DATA ====', user_data)
      res.send (`
        <h1> welcome ${user_data.name}</h1>
        <img src="${user_data.picture}" alt="user_image" />
      `);
      console.log (user_data);
    } catch (error) {
      console.log ('Error ==== ', error.message);
      res.sendStatus (500);
    }
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on port ===== ${PORT}`);
});
