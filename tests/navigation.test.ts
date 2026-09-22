import { describe, expect, it } from "vitest";
import { mainNavigation } from "@/data/navigation";

describe("navigation", () => {
  it("contains the public primary routes", () => {
    expect(mainNavigation.map((item) => item.href)).toEqual([
      "/",
      "/about",
      "/services",
      "/solutions",
      "/products",
      "/work",
      "/contact"
    ]);
  });

  it("does not promote careers before real career information is configured", () => {
    expect(mainNavigation.some((item) => item.href === "/careers")).toBe(false);
  });
});
