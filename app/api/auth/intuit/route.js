import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as AxiosLogger from 'axios-logger';

const instance = axios.create();
instance.interceptors.request.use(AxiosLogger.requestLogger);

export async function GET(request, res) {
    const path = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const realmId = searchParams.get('realmId');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // https://www.developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0
    // Look at Step 12
    // Exchange the authorization code for an access token
    console.log("Next URL from INTUIT: ", path);
    console.log("code: ", code?.trim());

    try {
      const tokenResponse = axios({ 
          url: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer", 
          method: "POST",
          params: {
            grant_type: "authorization_code",
            code: `${code}`,
            redirect_uri: "http://localhost:3000/api/auth/intuit",
          },
          headers: {
            // Authorization: `Basic ${Buffer.from(`${process.env.AUTH_QB_ID}:${process.env.AUTH_QB_SECRET}`).toString('base64')}`,
            Authorization: "Basic QUJ2SjN0RnpvOFBZblh4VGV2aDY3cWcxZGdHNjRMRnFYNHI0ZTBxOW5yUVNmQjdZVG46cUxGRGlFeVlLanh3Z2dQZlVKemdQRURkdzBXeFRiNDlmQ0FSVWZrVA==",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });
      console.log("tokenResponse: ", tokenResponse);
    } catch (error) {
        console.log("tokenResponse ERROR: ",error);
    }
   
    //   // Redirect the user to the desired page
    //   res.redirect('/dashboard');
    // } else {
    //   // Handle error
    //   res.status(500).send('Authentication failed');


    return NextResponse.redirect(new URL('/', request.url));
}
