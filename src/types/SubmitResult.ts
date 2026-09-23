export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "already_used" | "not_found" | "error" };
