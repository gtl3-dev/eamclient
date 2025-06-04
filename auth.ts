import NextAuth from "next-auth"
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError"
  }
}
 declare module "next-auth/jwt" {
   interface JWT {
    access_token: string
    expires_at: number
    refresh_token?: string
    error?: "RefreshTokenError"
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt'},
  providers: [
            // Google,
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
                  id_token_signing_alg_values_supported:[ "RS256" ],
                }
              },
              token: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
              userinfo: process.env.QB_USERINFO_URL, 
              issuer: "https://oauth.platform.intuit.com/op/v1",
              clientId: process.env.AUTH_QB_ID,
              clientSecret: process.env.AUTH_QB_SECRET,
              // checks: ["none"],
              profile(profile: any) {
                console.log('profile ', profile)
                return {
                  id: profile.id,
                  name: profile?.name,
                }
              },
              style: {
                logo: "/QBSymbol.png",
                text: "#fff"
              },
           }    // END custom Intuit provider
  ],
  // debug: true,
  // https://www.youtube.com/watch?v=95fuP8jpWlk&t=4s  @22min about callbacks
  callbacks: {
    jwt: async ({ token, profile, account }) => {
      console.log("auth.ts jwt token: ", JSON.stringify(token));           // OK
      // console.log("jwt user", user);             //undefined
      console.log("jwt acct", account);          //undefined
      console.log("jwt profile", profile);       //undefined
      return token
    },            // end jwt                                      // https://authjs.dev/guides/extending-the-session
    session: async ({ session, token }) => {
      // session.user.id = token.id as string
      // session.user.name = token.name as string
      // session.user.email = token.email as string
      // session.user.image = token.picture as string
      // session.user.role = token.role as string
      // session.user.username = token.username as string
      console.log("auth.ts session: ", session);
      console.log("auth.ts token: ", token);
      return session
    },      // end session   
  },      // END callbacks
})
