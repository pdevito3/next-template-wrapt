import { env } from "@/config";
import Axios from "axios";
import { getSession, signIn } from "next-auth/react";

export const clients = {
  recipeManagement: (headers?: { [key: string]: string }) =>
    buildApiClient({
      baseURL: `${env.clientUrls.recipeManagement()}/api`,
      customHeaders: headers,
    }),
  authServer: Axios.create({
    baseURL: env.clientUrls.authServer(),
  }),
};

interface ApiClientProps {
  baseURL?: string;
  customHeaders?: {
    [key: string]: string;
  };
}

async function buildApiClient({ baseURL, customHeaders }: ApiClientProps) {
  const session = await getSession();
  const token = session?.accessToken;

  const client = Axios.create({
    baseURL,
    withCredentials: true,
    timeout: 30_000, // If you want to increase this, do it for a specific call, not the global app API.
    headers: {
      "X-CSRF": "1",
      Authorization: `Bearer ${token}`,
      ...customHeaders,
    },
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(
          error.response.status,
          error.response.data,
          error.response.headers
        );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request);
      }

      if (error && error.response && error.response.status === 401) {
        signIn(env.auth.nextAuthId, { callbackUrl: "/" });
      }
      console.log((error && error.toJSON && error.toJSON()) || undefined);

      return Promise.reject(error);
    }
  );

  return client;
}
