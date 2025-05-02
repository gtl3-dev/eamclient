import NextAuth from "next-auth"
import Google from "next-auth/providers/google";

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
  callbacks: {
    jwt({ token, user, account, profile }) {
      // console.log("jwt token", token);           // OK
      // console.log("jwt user", user);             //undefined
      // console.log("jwt acct", account);          //undefined
      // console.log("jwt profile", profile);       //undefined
      if (profile) {  
        token.id = profile.id;
        token.name = profile.givenName as string || profile.name;
        token.email = profile.email;
        token.picture = profile.picture;
        token.role = profile.role;
        token.username = profile.username;
      }
      return token;
    },            // end jwt                                      // https://authjs.dev/guides/extending-the-session
    session({ session, token }) {
      // console.log("session token: ", token);
      session.user.id = token.id as string
      session.user.name = token.name as string
      session.user.email = token.email as string
      session.user.image = token.picture as string
      session.user.role = token.role as string
      session.user.username = token.username as string
      console.log("session session: ", session);
      return session
    },      // end session
    // async redirect({ url, baseUrl }) {
    //       console.log("redirect url", url );
    //       console.log("redirect baseUrl", baseUrl);
    //       // Allows relative callback URLs
    //       if (url.startsWith("/")) return `${baseUrl}`
    //       // Allows callback URLs on the same origin
    //       else if (new URL(url).origin === baseUrl) return url
    //       return baseUrl
    // },
    
  },      // END callbacks
})





