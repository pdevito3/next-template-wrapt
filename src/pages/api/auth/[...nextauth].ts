import { env } from "@/config";
import { clients } from "@/lib/axios";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import path from "path";
import querystring from "query-string";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
      id: env.auth.nextAuthId,
      name: "OIDC",
      type: "oauth",
      wellKnown: path.join(
        env.auth.authority ?? "",
        `/.well-known/openid-configuration`
      ),
      authorization: {
        params: { scope: "openid email profile recipe_management" },
      },
      idToken: true,
      checks: ["pkce", "state"],
      clientId: env.auth.clientId,
      clientSecret: env.auth.secret,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
  events: {
    async signOut({ token }) {
      const refreshToken = token.refreshToken;
      let headers = { "Content-Type": "application/x-www-form-urlencoded" };
      try {
        await clients.authServer.post(
          `/protocol/openid-connect/logout`,
          querystring.stringify({
            refresh_token: refreshToken,
            client_secret: env.auth.secret,
            client_id: env.auth.clientId,
          }),
          { headers }
        );
      } catch (e) {}
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        const decodedAccessToken = parseJwt(account.access_token);
        const nextAuthToken = {
          accessToken: account.access_token,
          accessTokenExpires: decodedAccessToken.exp * 1000,
          refreshToken: account.refresh_token,
          user,
        };
        return nextAuthToken;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < Number(token.accessTokenExpires)) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user as User;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: env.isDevelopment ? "lax" : "strict",
        path: "/",
        secure: true,
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: env.isDevelopment ? "lax" : "strict",
        path: "/",
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: env.isDevelopment ? "lax" : "strict",
        path: "/",
        secure: true,
      },
    },
  },
};

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
  try {
    const params = {
      client_secret: env.auth.secret,
      client_id: env.auth.clientId,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    } as {
      [key: string]: string;
    };

    const url = path.join(
      env.auth.authority ?? "",
      "/protocol/openid-connect/token"
    );

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: new URLSearchParams(params),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth(authOptions);
