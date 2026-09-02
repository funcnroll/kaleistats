import { createAuthClient } from "better-auth/react";

import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  refetchOnWindowFocus: true,
  refetchInterval: 60,
  refetchWhenOffline: false,

  plugins: [nextCookies()],
});

export const { useSession, signIn, signUp, signOut } = authClient;
