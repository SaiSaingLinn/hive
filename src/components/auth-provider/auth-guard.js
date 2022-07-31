import React, { useEffect } from "react";
import { useAuth } from "./auth-provider";
import { useRouter } from "next/router";
import { authStore } from "service";

export function AuthGuard({ children }) {
  const { setRedirect } = useAuth();
  const router = useRouter();
  const user = authStore.getAuth()
  
  useEffect(() => {
    if (!user) {
      // remember the page that user tried to access
      setRedirect(router.route);
      router.push("/login");
    }
  }, [router, user, setRedirect]);
  /* show loading indicator while the auth provider is still initializing */
  // if (initializing) {
  //   return React.createElement("h1", null, "Application Loading");
  // }
  // if auth initialized with a valid user show protected page
  if (user) {
    return React.createElement(React.Fragment, null, children);
  }
  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}