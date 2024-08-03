import { aymericRouter } from "./router/aymeric";
import { guildRouter } from "./router/guild";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  aymeric: aymericRouter,
  guild: guildRouter,
});

export type AppRouter = typeof appRouter;
