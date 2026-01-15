import z from "zod";

export const superHeroSchema = z.object({
  real_name: z.string().min(2, "Real name must be at least 2 characters."),
  nickname: z.string().min(2, "Nickname must be at least 2 characters."),
  superpowers: z.string().min(3, "Superpowers must be at least 3 characters."),
  catch_phrase: z.string().min(3, "Catch phrase must be at least 3 characters."),
  origin_description: z.string().min(5, "Origin description must be at least 5 characters."),
});

export type FormValues = z.infer<typeof superHeroSchema>;