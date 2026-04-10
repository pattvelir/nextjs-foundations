import { z } from "zod";

export const AuthorSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().min(1),
});

export type Author = z.infer<typeof AuthorSchema>;
