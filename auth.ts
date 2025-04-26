import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import { redirect } from "next/dist/server/api-utils";
import type { NextAuthConfig } from 'next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google,
            {
              id: "intuit",
              name: "Intuit",
              type: "oauth",
              authorization: {
                url: "https://appcenter.intuit.com/connect/oauth2",
                params: {
                  scope: "com.intuit.quickbooks.accounting openid profile email",
                  state: "eamlite",
                  redirect_uri: process.env.QB_REDIRECT_URI,
                }
              },
              token: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
              userinfo: "https://sandbox-accounts.platform.intuit.com/v1/openid_connect/userinfo", 
              // OAuthClient.userinfo_endpoint_production = 'https://accounts.platform.intuit.com/v1/openid_connect/userinfo';
              // Found in : https://github.com/intuit/oauth-jsclient/blob/master/src/OAuthClient.js
              issuer: "https://oauth.platform.intuit.com/op/v1",
              clientId: process.env.AUTH_QB_ID,
              clientSecret: process.env.AUTH_QB_SECRET,
              profile(profile: any) {
                console.log('profile ', profile)
                return {
                  id: profile.id,
                  name: profile?.name,
                }
              },
              style: {
                logo: "/QBSymbol.png",
                bg: "#1da1f2",
                text: "#fff"
              },
            }
  ],
  callbacks: {
    jwt({ token, user, account, profile }) {
      console.log("jwt token", token);
      console.log("jwt user", user);
      console.log("jwt acct", account);
      console.log("jwt profile", profile);
      console.log("jwt profile", profile?.email);
      if (profile) {  
        token.id = profile.id;
        token.name = profile.givenName as string || profile.name;
        token.email = profile.email;
        token.picture = profile.picture;
        token.role = profile.role;
        token.username = profile.username;
      }
      return token;
    },                                                  // https://authjs.dev/guides/extending-the-session
    session({ session, token }) {
      console.log("session token: ", token);
      session.user.id = token.id as string
      session.user.name = token.name as string
      session.user.email = token.email as string
      session.user.image = token.picture as string
      session.user.role = token.role as string
      session.user.username = token.username as string
      console.log("session session: ", session);
      return session
    },
    // authorized({ auth, request: { nextUrl } }) {
    //   console.log('Auth: ', auth);
    //   console.log('Request nextUrl: ', nextUrl);
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith('/');
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL('/', nextUrl));
    //   }
    //   return true;
    // },
  },
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     console.log("redirect url", url;
  //     console.log("redirect baseUrl", baseUrl);
  //     // Allows relative callback URLs
  //     if (url.startsWith("/")) return `${baseUrl}`
  //     // Allows callback URLs on the same origin
  //     else if (new URL(url).origin === baseUrl) return url
  //     return baseUrl
  //   }
  // }
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     console.log('Auth: ', auth);
  //     console.log('Request nextUrl: ', nextUrl);
  //     const isLoggedIn = !!auth?.user;
  //     const isOnDashboard = nextUrl.pathname.startsWith('/');
  //     if (isOnDashboard) {
  //       if (isLoggedIn) return true;
  //       return false; // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       return Response.redirect(new URL('/', nextUrl));
  //     }
  //     return true;
  //   },
  // },
})





