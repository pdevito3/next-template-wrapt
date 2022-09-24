import { Notifications } from "@/components/notifications";
import { useAuthUser } from "@/domain/auth";
import Login from "@/domain/auth/components/Login";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <title>New Wrapt App in Next</title>

      <SessionProvider session={session} refetchInterval={0}>
        <QueryClientProvider client={new QueryClient()}>
          <RouteGuard isPublic={Component.isPublic}>
            <MantineProvider>
              <ModalsProvider>
                <Component {...pageProps} />
              </ModalsProvider>
              <ReactQueryDevtools initialIsOpen={false} />
              <Notifications />
            </MantineProvider>
          </RouteGuard>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

interface RouteGuardProps {
  children: React.ReactNode;
  isPublic: boolean;
}
function RouteGuard({ children, isPublic }: RouteGuardProps) {
  const { isLoggedIn, isLoading } = useAuthUser();

  if (isPublic) return <>{children}</>;

  if (typeof window !== undefined && isLoading) return null;
  if (!isLoggedIn) return <Login />;

  // TODO try when loading from server
  // if (!isLoggedIn) signIn(env.auth.nextAuthId, { callbackUrl: "/" });

  return <>{children}</>;
}

export default MyApp;
