import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import { redirect } from "next/dist/server/api-utils";

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
              userinfo: "https://kapi.kakao.com/v2/user/me",
              clientId: process.env.QB_CLIENT_ID,
              clientSecret: process.env.QB_CLIENT_SECRET,
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
})




// export const AuthProviderOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!
//     }),
//     // {
//     //   id: "intuit",
//     //   name: "intuit",
//     //   type: "oauth",
//     //   authorization: "https://appcenter.intuit.com/connect/oauth2",
//     //   token: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
//     //   userinfo: "https://kapi.kakao.com/v2/user/me",
//     //   clientId: process.env.QB_CLIENT_ID,
//     //   clientSecret: process.env.QB_CLIENT_SECRET,
//     //   profile(profile: any) {
//     //     console.log('profile ', profile)
//     //     return {
//     //       id: profile.id,
//     //       name: profile?.name,
//     //     }
//     //   },
//     // }
//   ]
// };


