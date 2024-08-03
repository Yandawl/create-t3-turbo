"use client";

import type { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";

import "@mantine/core/styles.layer.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";

export const ThemeProvider = ({
  children,
  scheme,
}: {
  children: ReactNode;
  scheme?: "dark" | "light";
}) => {
  return (
    <MantineProvider defaultColorScheme="auto" forceColorScheme={scheme}>
      <NavigationProgress />
      <Notifications />
      {children}
    </MantineProvider>
  );
};
