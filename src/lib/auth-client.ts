import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  refetchOnWindowFocus: true,
  refetchInterval: 60,
  refetchWhenOffline: false,

  plugins: [usernameClient(), nextCookies()],
});
