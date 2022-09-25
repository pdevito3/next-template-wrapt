const _env = process.env.NODE_ENV;
export const env = {
  environment: _env,
  isDevelopment: _env === "development",
  auth: {
    nextAuthId: "oidc",
    secret: process.env.NEXTAUTH_SECRET,
    authority: process.env.AUTH_AUTHORITY,
    clientId: process.env.AUTH_CLIENT_ID,
  },
  clientUrls: {
    recipeManagement: () => {
      switch (_env) {
        case "development":
          return "https://localhost:5375";
        default:
          throw "Environment variable not set for 'recipeManagement'";
      }
    },
    authServer: () => {
      switch (_env) {
        case "development":
          return env.auth.authority;
        default:
          throw "Environment variable not set for 'authServer'";
      }
    },
  },
};
