# Next Template Wrapt

This is a NextJS template meant to eliminate boilerplate for your apps. It is compatable with [Craftsman](https://github.com/pdevito3/craftsman) entity scaffolding and includes:

- OIDC support using [next-auth](https://next-auth.js.org/) and authZ handling
- [TailwindCSS](https://tailwindcss.com/) styling
- Custom styled [Mantine](https://mantine.dev/) controls
- Built with Typescript
- Toast notifications with [react hot toast](https://react-hot-toast.com/)
- Dark/light mode support
- Basic pages and suppoting plumbing for managing users and role permissions setup in a Craftsman backend

## Getting Started

1. Clone the repository and install dependencies

```shell
git clone https://github.com/pdevito3/next-template-wrapt
cd next-template-wrapt
pnpm install
```

2. First, you'll want to set up your auth server so you can authenticate into the app. For an easy plug and play experience, this can be any OIDC compliant provider. Below is an example for keycloak.

3. Update your `.env` file with a `NEXTAUTH_SECRET` and update `NEXTAUTH_URL` if needed (this should match your NextJS app url) `http://localhost:8582`.

   You'll also need to add your `AUTH_AUTHORITY` and `AUTH_CLIENT_ID` for the environment configuration to work properly. For example:

   ```env
   NEXTAUTH_URL=http://localhost:8582
   NEXTAUTH_SECRET=974d6f71-d41b-4601-9a7a-a33081f82188
   AUTH_AUTHORITY=http://localhost:3255/auth/realms/DevRealm
   AUTH_CLIENT_ID=recipe_management.next
   ```

4. If you want to use a separate api with your next app, you'll want to update `src/config/index` with an api client of your choice. For example, if i want to hit a recipe management api, my config might look like this:

   ```ts
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
         if (!env.auth.authority) throw "No authority provided";

         switch (_env) {
           case "development":
             return env.auth.authority;
           default:
             throw "Environment variable not set for 'authServer'";
         }
       },
     },
   };
   ```

5. And you'll need to register that client in the axios abstraction:

   ```tsx
   import { env } from "@/config";
   import Axios from "axios";
   import { getSession, signIn } from "next-auth/react";

   export const clients = {
     recipeManagement: (headers?: { [key: string]: string }) =>
       buildApiClient({
         baseURL: `${env.clientUrls.recipeManagement()}/api`,
         customHeaders: headers,
       }),
     // ...
   };
   ```

### Keycloak Example Setup

1. Install docker

2. Save the below and run `docker-compose up` to spin up a keycloak instance

   ```yaml
   version: "3.7"

   services:
     keycloakdb:
       image: postgres
       ports:
         - "54166:5432"
       environment:
         POSTGRES_DB: keycloak
         POSTGRES_USER: keycloak
         POSTGRES_PASSWORD: password
       volumes:
         - keycloak-data:/var/lib/postgresql/data

     keycloak:
       image: sleighzy/keycloak:latest
       environment:
         DB_VENDOR: POSTGRES
         DB_ADDR: keycloakdb
         DB_DATABASE: keycloak
         DB_USER: keycloak
         DB_PASSWORD: password
         DB_SCHEMA: public
         KEYCLOAK_USER: admin
         KEYCLOAK_PASSWORD: admin
         KEYCLOAK_HTTP_PORT: 8080
         # Uncomment the line below if you want to specify JDBC parameters. The parameter below is just an example,
         # and it shouldn't be used in production without knowledge. It is highly recommended that you read the
         # PostgreSQL JDBC driver documentation in order to use it.
         #JDBC_PARAMS: "ssl=true"
       ports:
         - 3255:8080
       depends_on:
         - keycloakdb

   volumes:
     keycloak-data:
   ```

3. Login to the realm at `localhost:3255/auth` with `admin` for username and password (if using the compose setup above)

4. Add a new client for your next app using a code flow. For example, if my nextjs app was running on `localhost:8582`:

   - ClientId: `recipe_management.next`
   - Secret: `974d6f71-d41b-4601-9a7a-a33081f82188`
   - Name: `RecipeManagement Next`
   - Base Url: http://localhost:8582
   - Standard flow: `true`
   - Enabled: `true`
   - Access Type: `CONFIDENTIAL`
   - PkceCodeChallengeMethod: `true`
   - BackchannelLogoutSessionRequired: `true`
   - BackchannelLogoutUrl: http://localhost:8582
   - Redirect Url: http://localhost:8582/\*
   - Web origins (for CORS):
     - https://localhost:5375 (this is an api i want to be able to hit)
     - https://localhost:8582
   - If you want to have an `audience` for an api you might be calling, you can add that as well
