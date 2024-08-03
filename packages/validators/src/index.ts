import { z } from "zod";

export const locale = z.enum(["en-GB", "fr", "de", "ja"]);

export type Locale = z.infer<typeof locale>;
