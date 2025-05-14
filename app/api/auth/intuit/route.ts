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
    // Look at Step 12
    // Exchange the authorization code for an access token
    console.log("code: ", code?.trim());
    console.log("Basic: ", `Basic ${Buffer.from(`${process.env.AUTH_QB_ID}:${process.env.AUTH_QB_SECRET}`).toString('base64')}`);
    const tokenResponse = await fetch("https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer", {
      method: "POST",
      headers: {
        "Accept": "application/json;charset=utf-8",
        "Content-Type": "application/x-www-form-urlencoded",
        // Authorization: `Basic ${Buffer.from(`${process.env.AUTH_QB_ID}:${process.env.AUTH_QB_SECRET}`).toString('base64')}`,
        Authorization: "Basic QUJ2SjN0RnpvOFBZblh4VGV2aDY3cWcxZGdHNjRMRnFYNHI0ZTBxOW5yUVNmQjdZVG46cUxGRGlFeVlLanh3Z2dQZlVKemdQRURkdzBXeFRiNDlmQ0FSVWZrVA=="
        // Host: "oauth.platform.intuit.com"
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/api/auth/intuit",
      }),
    });
  
    const tokenData = await tokenResponse;
      
    if (tokenData){ 
      console.log("tokenData Received: ");
      console.log("tokenData: ", tokenData);
    }
  
    //   // Redirect the user to the desired page
    //   res.redirect('/dashboard');
    // } else {
    //   // Handle error
    //   res.status(500).send('Authentication failed');


    return NextResponse.redirect(new URL('/', request.url));
}
