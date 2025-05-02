import { serialize } from 'cookie';

export default async function callback(req, res) {
  const { code } = req.query;
  console.log('Authorization code:', code);

  // Exchange the authorization code for an access token
//   const tokenResponse = await fetch('YOUR_TOKEN_ENDPOINT', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: new URLSearchParams({
//       grant_type: 'authorization_code',
//       code,
//       client_id: process.env.CLIENT_ID,
//       client_secret: process.env.CLIENT_SECRET,
//       redirect_uri: process.env.REDIRECT_URI,
//     }),
//   });

//   const tokenData = await tokenResponse.json();

//   if (tokenResponse.ok) {
//     // Set the access token as an HTTP-only cookie
//     res.setHeader('Set-Cookie', serialize('accessToken', tokenData.access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV !== 'development',
//       sameSite: 'strict',
//       path: '/',
//     }));

//     // Redirect the user to the desired page
//     res.redirect('/dashboard');
//   } else {
//     // Handle error
//     res.status(500).send('Authentication failed');
//   }
}