import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import axios from "axios";
import { setAuthCookies, createSession, setAuthCookies_Session, encrypt } from "@/app/lib/session";

// // THIS IS RESPONSE BACK from initial QB login
// https://www.developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0
// Look at Step 12
// Exchange the authorization code for an access token

// // Request interceptor // used for debugging -- DO NOT DELETE
// axios.interceptors.request.use(
//   config => {
//     // Log request details
//     console.log('Request:', {
//       method: config.method.toUpperCase(),
//       url: config.url,
//       headers: config.headers,
//       data: config.data,
//     });
//     return config;
//   },
//   error => {
//     // Log request error
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor // used for debugging -- DO NOT DELETE
// axios.interceptors.response.use(
//   response => {
//     // Log response details
//     console.log('Response:', {
//       status: response.status,
//       data: response.data,
//       headers: response.headers,
//       config: response.config
//     });
//     return response;
//   },
//   error => {
//     // Log response error
//     console.error('Response Error:', error.response ? error.response : error);
//     return Promise.reject(error);
//   }
// );

export async function GET(request, res) {
    const path = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const realmId = searchParams.get('realmId');

    console.log("Next URL from INTUIT: ", path);
    console.log("code: ", code?.trim());

    try {
      const tokenResponse = await axios({ 
          url: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer", 
          method: "POST",
          data: {
            grant_type: "authorization_code",
            code: `${code}`,
            redirect_uri: `${process.env.QB_REDIRECT_URI}`,
          },
          headers: {
            Authorization: `Basic ${Buffer.from(`${process.env.AUTH_QB_ID}:${process.env.AUTH_QB_SECRET}`).toString('base64')}`,
            // Authorization: "Basic QUJ2SjN0RnpvOFBZblh4VGV2aDY3cWcxZGdHNjRMRnFYNHI0ZTBxOW5yUVNmQjdZVG46cUxGRGlFeVlLanh3Z2dQZlVKemdQRURkdzBXeFRiNDlmQ0FSVWZrVA==",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

      console.log("REALMID at api/auth/intuit/route.js: ", realmId);  
      // createSession(realmId);                          // used for user access to pages within a session if authorized. See middleware.ts
      const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)  // 3 days
      const session = await encrypt({ realmId, expiresAt })
      const cookieStore = await cookies();
      cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        expires: expiresAt,
      });
      console.log("END createSession: ", session);
      
      const accessToken = tokenResponse.data.access_token;
      const refreshToken = tokenResponse.data.refresh_token;
      // setAuthCookies(accessToken, refreshToken);  // used to get qb api requests
      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
      });

      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
      });

      console.log("END setAuthCookies! in api/auth/intuit/route ");
    } catch (error) {
        console.log("tokenResponse ERROR: ",error);
      
    }
   
    return NextResponse.redirect(new URL('/', request.url));
}
