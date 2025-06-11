import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";


export const {signIn, signOut, signUp, useSession, getSession } = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXTAUTH_URL,
    plugins: [
        genericOAuthClient()
    ]
});

