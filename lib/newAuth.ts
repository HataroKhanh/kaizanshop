import { google } from "googleapis";

const oauth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT,
  process.env.GOOGLE_SECRET,
  process.env.GOOGLE_REDIRECT_URI 
);

oauth.setCredentials({
  access_token: process.env.ACCESS_TOKEN,
  refresh_token: process.env.REFRESH_TOKEN, 
});

export default oauth;
