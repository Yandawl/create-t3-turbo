import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Navigation } from "@components/navigation";
import { ThemeProvider } from "@components/providers/ThemeProvider";
import { Container } from "@mantine/core";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ser Aymeric",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout(props: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang={props.params.locale} suppressHydrationWarning>
        <body>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <TRPCReactProvider>
                <Navigation />
                <main>
                  <Container my="md">{props.children}</Container>
                </main>
              </TRPCReactProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
