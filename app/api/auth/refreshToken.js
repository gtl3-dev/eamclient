import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import axios from "axios";
import { setAuthCookies, createSession, setAuthCookies_Session, encrypt } from "@/app/lib/session";
import { getRefreshToken } from "@/app/lib/qbapis";

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

export async function handler(request, res) {
    const path = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const realmId = searchParams.get('realmId');
    const state = searchParams.get('state');
    const refreshT = getRefreshToken();

    // https://www.developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-2.0
    // Look at Step 15
    try {
      const tokenResponse = await axios({ 
          url: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer", 
          method: "POST",
          data: {
            grant_type: "refresh_token",
            refesh_token: `${refreshT}`,
          },
          headers: {
            Authorization: `Basic ${Buffer.from(`${process.env.AUTH_QB_ID}:${process.env.AUTH_QB_SECRET}`).toString('base64')}`,
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

      console.log("refreshTOekn.js REALMID: ", realmId);  
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

      console.log("END refreshToken.js! ");
    } catch (error) {
        console.log("tokenResponse ERROR: ",error);
      
    }
   
    return NextResponse.redirect(new URL('/', request.url));
}
