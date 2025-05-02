import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { redirect } from "next/dist/server/api-utils";

export async function GET(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;
    console.log("Next URL from INTUIT: ", path);
    // // Iterate over all parameters
    // searchParams.forEach((value, name) => {
    //     console.log(`${name}: ${value}`);
    // });
    const code = searchParams.get('code');
    const realmId = searchParams.get('realmId');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
  
    // https://www.developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0
    // Look st Step 12
    // Exchange the authorization code for an access token
    console.log("code: ", code);
    console.log("Basic: ", `${Buffer.from(`${process.env.AUTH_QB_ID}:${process.env.AUTH_QB_SECRET}`).toString('base64')}`);
    const tokenResponse = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${process.env.AUTH_QB_ID}:${process.env.AUTH_QB_SECRET}`).toString('base64')}`,
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:3000/api/auth/intuit',
      }),
    });
  
    const tokenData = await tokenResponse;
    console.log("tokenData: ", tokenData);
  
    if (tokenData){ 
      console.log("tokenData Received: ");
    }


  
    //   // Redirect the user to the desired page
    //   res.redirect('/dashboard');
    // } else {
    //   // Handle error
    //   res.status(500).send('Authentication failed');


    return NextResponse.redirect(new URL('/', request.url));
}
