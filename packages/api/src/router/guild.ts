import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { db } from "@webmeric/db/client";
import { Guild } from "@webmeric/db/schema";

import { protectedProcedure } from "../trpc";

export const guildRouter = {
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      await db();
      return await Guild.findOne({ SERVER_ID: id });
    }),

  // create: protectedProcedure
  //   .input(CreatePostSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(Post).values(input);
  //   }),

  // delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(Post).where(eq(Post.id, input));
  // }),
} satisfies TRPCRouterRecord;
