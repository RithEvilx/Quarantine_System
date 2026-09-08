import { compareTwoStrings } from "string-similarity";

export type ParsedPayment = {
  amount: number;
  payerName: string;
  maskedAccount: string;
  paidAt: Date;
  paymentMethod: string;
  trxId: string;
  apv: string;
};

export type MatchCandidate = {
  id: string;
  orderNumber?: string;
  customerName: string;
  amount: number;
  createdAt: Date | string;
  status: string;
};

type MatchResult =
  | { kind: "match"; order: MatchCandidate; similarity: number }
  | { kind: "flagged"; candidates: Array<MatchCandidate & { similarity: number }> }
  | { kind: "no-match"; reason: string };

function cents(value: number) {
  return Math.round(value * 100);
}

function normalizeName(value: string) {
  return value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function matchPayment(
  payment: ParsedPayment,
  candidates: MatchCandidate[],
  options: { now?: Date; windowMinutes?: number; similarityThreshold?: number } = {},
): MatchResult {
  const now = options.now ?? new Date();
  const windowMs = (options.windowMinutes ?? 20) * 60 * 1000;
  const threshold = options.similarityThreshold ?? 0.8;
  const eligible = candidates.filter((candidate) => {
    const age = now.getTime() - new Date(candidate.createdAt).getTime();
    return candidate.status === "pending" && age >= 0 && age <= windowMs && cents(candidate.amount) === cents(payment.amount);
  });

  if (!eligible.length) return { kind: "no-match", reason: "No pending order matches the amount and time window." };

  const scored = eligible
    .map((order) => ({ ...order, similarity: compareTwoStrings(normalizeName(payment.payerName), normalizeName(order.customerName)) }))
    .filter((order) => order.similarity >= threshold)
    .sort((left, right) => right.similarity - left.similarity);

  if (!scored.length) return { kind: "no-match", reason: "No pending order has a sufficiently similar customer name." };
  if (scored.length > 1 && scored[0].similarity - scored[1].similarity < 0.05) return { kind: "flagged", candidates: scored };
  return { kind: "match", order: scored[0], similarity: scored[0].similarity };
}

export type { MatchResult };
