const _env = process.env.NODE_ENV;
export const env = {
  environment: _env,
  isDevelopment: _env === "development",
  auth: {
    nextAuthId: "oidc",
    secret: process.env.NEXTAUTH_SECRET,
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
          return "http://localhost:3255/auth/realms/DevRealm";
        default:
          throw "Environment variable not set for 'authServer'";
      }
    },
  },
};
