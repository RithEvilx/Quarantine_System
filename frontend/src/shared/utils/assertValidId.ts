export default function assertValidId(id: number | undefined | null): asserts id is number {
  if (id === null || id === undefined) {
    throw new Error("Missing ID");
  }

  if (typeof id !== "number" || isNaN(id)) {
    throw new Error("Invalid ID");
  }
}
