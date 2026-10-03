/**
 * Trần chi phí theo ngày (ước tính từ usage). Bộ đếm trong bộ nhớ tiến trình, đặt lại mỗi ngày (giờ Việt Nam).
 * CHAT_DAILY_BUDGET: USD/ngày (mặc định 10).
 * Giá ước tính theo gpt-5-mini (USD / 1 triệu token), đổi được bằng CHAT_PRICE_IN / CHAT_PRICE_OUT / CHAT_PRICE_CACHED.
 */
import type { OaiUsage } from "./openai";

function price(name: string, fallback: number): number {
  const v = Number(process.env[name]);
  return Number.isFinite(v) && v >= 0 ? v : fallback;
}

const PRICE_PER_MTOK = {
  input: price("CHAT_PRICE_IN", 0.25),
  output: price("CHAT_PRICE_OUT", 2),
  cached: price("CHAT_PRICE_CACHED", 0.025),
};

const state = { day: "", spent: 0 };

function today(): string {
  // Ngày theo giờ Việt Nam (UTC+7)
  return new Date(Date.now() + 7 * 3600_000).toISOString().slice(0, 10);
}

function roll() {
  const d = today();
  if (state.day !== d) {
    state.day = d;
    state.spent = 0;
  }
}

export function dailyBudgetUsd(): number {
  const v = Number(process.env.CHAT_DAILY_BUDGET);
  return Number.isFinite(v) && v >= 0 ? v : 10;
}

export function estimateCostUsd(u: OaiUsage | null | undefined): number {
  if (!u) return 0;
  const cached = u.prompt_tokens_details?.cached_tokens ?? 0;
  const fresh = Math.max(0, (u.prompt_tokens ?? 0) - cached);
  return (fresh * PRICE_PER_MTOK.input + cached * PRICE_PER_MTOK.cached + (u.completion_tokens ?? 0) * PRICE_PER_MTOK.output) / 1_000_000;
}

/** Còn ngân sách hôm nay không */
export function budgetAvailable(): boolean {
  roll();
  return state.spent < dailyBudgetUsd();
}

/** Ghi nhận chi phí của một lần gọi API */
export function recordUsage(u: OaiUsage | null | undefined): number {
  roll();
  const c = estimateCostUsd(u);
  state.spent += c;
  return c;
}

export function spentToday(): number {
  roll();
  return state.spent;
}
