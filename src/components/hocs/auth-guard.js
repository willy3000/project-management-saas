import React, { useEffect, useState } from "react";
import { fetchUser } from "../../slices/user";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function AuthGuard({ children }) {
  let initialUser = null;
  const router = useRouter();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(
    () => {
      try {
        initialUser = localStorage.getItem("user");
      } catch {}
      if (!router.isReady) {
        return;
      }

      if (!initialUser) {
        router
          .push({
            pathname: "/",
            query: { returnUrl: router.asPath },
          })
          .catch(console.error);
      } else {
        setIsAuthenticated(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady]
  );

  if (!isAuthenticated) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
}
