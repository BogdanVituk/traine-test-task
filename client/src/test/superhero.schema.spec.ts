import { superHeroSchema } from "@/shemas/shema";
import { describe, it, expect } from 'vitest';

describe("superHeroSchema", () => {
  it("passes validation with valid data", () => {
    const data = {
      real_name: "Clark Kent",
      nickname: "Superman",
      superpowers: "Flying",
      catch_phrase: "Up!",
      origin_description: "Krypton",
    };

    const result = superHeroSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("fails validation when required fields are missing", () => {
    const data = {
      real_name: "",
      nickname: "",
      superpowers: "",
      catch_phrase: "",
      origin_description: "",
    };

    const result = superHeroSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("fails validation when fields exceed limits", () => {
    const data = {
      real_name: "A".repeat(256),
      nickname: "B".repeat(256),
      superpowers: "Flying",
      catch_phrase: "Up!",
      origin_description: "Krypton",
    };

    const result = superHeroSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
