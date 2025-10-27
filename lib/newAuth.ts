import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://kaizan.site/api/auth/callback/google" // Redirect URI này thực ra ko quan trọng lắm cho server
);

// Dòng quan trọng nhất
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

export default drive;
