/** Khởi tạo client Anthropic (một lần). Trả về null khi không có ANTHROPIC_API_KEY. */
import Anthropic from "@anthropic-ai/sdk";

let cached: Anthropic | null = null;

export function hasApiKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export function getClient(): Anthropic | null {
  if (!hasApiKey()) return null;
  if (!cached) cached = new Anthropic({ maxRetries: 1, timeout: 60_000 });
  return cached;
}

export { Anthropic };
