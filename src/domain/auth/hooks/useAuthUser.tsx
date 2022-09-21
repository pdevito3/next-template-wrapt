import { env } from "@/config";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useAuthUser() {
  const { data: session, status } = useSession();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!session);

    if (session?.error === "RefreshAccessTokenError")
      signIn(env.auth.nextAuthId); // Force sign in to hopefully resolve error
  }, [session]);

  return {
    user: session?.user ?? {},
    isLoggedIn,
    session,
    isLoading: status === "loading",
  };
}
