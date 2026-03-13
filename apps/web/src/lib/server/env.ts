// env.ts
import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  NEXT_PUBLIC_APP_NAME: z.string(),
  NEXT_PUBLIC_NUMBER: z.coerce.number().int(),
  DATABASE_URL: z.string(),
  VERCEL_OIDC_TOKEN: z.string(),
  INTERNAL_CONFIG: z.string(),
});

export const env = schema.parse(process.env);
