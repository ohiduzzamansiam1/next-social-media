import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  description: z.string().optional(),
  city: z.string().optional(),
  school: z.string().optional(),
  work: z.string().optional(),
  website: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value || value.startsWith("http://") || value.startsWith("https://"),
      {
        message:
          "Website must be a valid URL starting with http:// or https://",
      }
    ),
});
