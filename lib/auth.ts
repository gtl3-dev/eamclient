import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma";
import { genericOAuth } from "better-auth/plugins";

const prisma = new PrismaClient(); 

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    session: {
      cookieCache: {
          enabled: true,
          maxAge: 20 * 60 // Cache duration in seconds
      },
    },
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      autoSignIn: true,
    },
    account: {
      accountLinking: {
        enabled: true,
      }
    },
    socialProviders: { 
        google: { 
           clientId: process.env.AUTH_GOOGLE_ID as string, 
           clientSecret: process.env.AUTH_GOOGLE_SECRET as string, 
        }, 
    }, 
    plugins: [
        genericOAuth({ 
            config: [ 
                { 
                    providerId: "intuit-id", 
                    clientId: process.env.AUTH_QB_ID as string, 
                    clientSecret: process.env.AUTH_QB_SECRET as string, 
                    userInfoUrl: process.env.QB_USERINFO_URL as string,
                    authorizationUrl: "https://appcenter.intuit.com/connect/oauth2",
                    scopes: ["com.intuit.quickbooks.accounting", "openid"],
                    authorizationUrlParams: {
                        scope: "com.intuit.quickbooks.accounting openid",
                        state: "newstate",
                        redirect_uri: process.env.QB_REDIRECT_URI as string,
                        revocation_endpoint: "https://developer.API.intuit.com/v2/oauth2/tokens/revoke",
                        response_type: "code",
                        jwks_uri:"https://oauth.platform.intuit.com/op/v1/jwks",
                        // id_token_signing_alg_values_supported:[ "RS256" ],
                      },
                    tokenUrl: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
                    // ... other config options
                }, 
                // Add more providers as needed
            ] 
        }) 
    ]  // END plugins
})