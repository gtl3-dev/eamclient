import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import { cookies } from 'next/headers';

// declare module "next-auth" {
//   interface Session {
//     error?: "RefreshTokenError"
//   }
// }
// declare module "next-auth/jwt" {
//    interface JWT {
//     access_token: string
//     expires_at: number
//     refresh_token?: string
//     error?: "RefreshTokenError"
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt"},
  providers: [
    Google,
    {                 // INTUIT Provider
      id: "intuit",
      name: "intuit",
      type: "oauth",
      authorization: {
        url: "https://appcenter.intuit.com/connect/oauth2",
        params: {
          scope: "com.intuit.quickbooks.accounting openid",
          state: "newstate",
          redirect_uri: process.env.QB_REDIRECT_URI,
          revocation_endpoint: "https://developer.API.intuit.com/v2/oauth2/tokens/revoke",
          response_type: "code",
          jwks_uri:"https://oauth.platform.intuit.com/op/v1/jwks",
          // id_token_signing_alg_values_supported:[ "RS256" ],
        }
      },
      token: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
      userinfo: process.env.QB_USERINFO_URL, 
      issuer: "https://oauth.platform.intuit.com/op/v1",
      clientId: process.env.AUTH_QB_ID,
      clientSecret: process.env.AUTH_QB_SECRET,
      // checks: ["none"],
      // profile(profile: any) {
      //   console.log('profile ', profile)
      //   return {
      //     id: profile.id,
      //     name: profile?.name,
      //   }
      // },
      // style: {
      //   logo: "/QBSymbol.png",
      //   text: "#fff"
      // },
    }    // END custom Intuit provider
  ],
  // debug: true,
  // https://www.youtube.com/watch?v=95fuP8jpWlk&t=4s  @22min about callbacks
  callbacks: {
    async jwt({token}) {
      console.log("JWT: ", token);
      const cookieStore = await cookies();
      const accessT = cookieStore.get("accessToken");
      console.log("accessT in auth.ts: ", accessT);
      return token;
    },            // end jwt                                      // https://authjs.dev/guides/extending-the-session
    async session({session, token}) {
      console.log("SESSION: ", session);
      return session;
    }
  },      // END callbacks
})
