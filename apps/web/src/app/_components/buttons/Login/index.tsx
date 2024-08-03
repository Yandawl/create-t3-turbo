"use client";

import { useCallback, useState } from "react";
import { SignedIn, SignedOut, useAuth, useSignIn } from "@clerk/nextjs";
import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";

export const Login = () => {
  const t = useTranslations();

  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signOut } = useAuth();

  const signInWithDiscord = useCallback(async () => {
    if (!signInLoaded) return;
    try {
      setIsLoading(true);
      await signIn.authenticateWithRedirect({
        strategy: "oauth_discord",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      setIsLoading(false);
      console.error("OAuth error", err);
    }
  }, [signIn, signInLoaded]);

  return (
    <>
      <SignedOut>
        <Button
          variant="default"
          onClick={signInWithDiscord}
          disabled={isLoading}
        >
          {t("navigation.login")}
        </Button>
      </SignedOut>
      <SignedIn>
        <Button
          variant="default"
          onClick={() => signOut()}
          disabled={isLoading}
        >
          {t("navigation.logout")}
        </Button>
      </SignedIn>
    </>
  );
};
