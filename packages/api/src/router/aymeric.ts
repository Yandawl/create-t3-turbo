import type { TRPCRouterRecord } from "@trpc/server";
import { APIApplicationCommand } from "discord-api-types/v9";
import { z } from "zod";

import { locale } from "@webmeric/validators";

import { protectedProcedure } from "../trpc";

export const aymericRouter = {
  commands: protectedProcedure
    .input(
      z.object({
        locale: locale,
      }),
    )
    .query(async ({ ctx, input: { locale } }) => {
      const applicationId = process.env.DISCORD_CLIENT_ID!;

      const commands = (await ctx.rest.get(
        `/applications/${applicationId}/commands?with_localizations=true`,
      )) as APIApplicationCommand[];

      return commands
        .filter((x) => x.type === 1)
        .map((command) => {
          return {
            name: command.name_localizations?.[locale] ?? command.name,
            type: command.type,
            description:
              command.description_localizations?.[locale] ??
              command.description,

            options: command.options?.map((option) => {
              return {
                ...option,
                name: option.name_localizations?.[locale] ?? option.name,
                description:
                  option.description_localizations?.[locale] ??
                  option.description,
              };
            }),
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    }),
} satisfies TRPCRouterRecord;
