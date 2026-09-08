export const slugify = (input: string) =>
  input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "") // remove quotes
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumeric -> "-"
    .replace(/-+/g, "-") // collapse multiple "-"
    .replace(/^-|-$/g, "");
