/**
 * Trần chi phí theo ngày (ước tính từ usage). Bộ đếm trong bộ nhớ tiến trình, đặt lại mỗi ngày (giờ Việt Nam).
 * CHAT_DAILY_BUDGET: USD/ngày (mặc định 10). Giá ước tính theo Claude Opus 5.5.
 */
const PRICE_PER_MTOK = {
  input: 4,
  output: 20,
  cacheRead: 0.2,
  cacheWrite: 5, // ~1,25× input
};

type UsageLike = {
  input_tokens?: number | null;
  output_tokens?: number | null;
  cache_read_input_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
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

export function estimateCostUsd(u: UsageLike): number {
  return (
    ((u.input_tokens ?? 0) * PRICE_PER_MTOK.input +
      (u.output_tokens ?? 0) * PRICE_PER_MTOK.output +
      (u.cache_read_input_tokens ?? 0) * PRICE_PER_MTOK.cacheRead +
      (u.cache_creation_input_tokens ?? 0) * PRICE_PER_MTOK.cacheWrite) /
    1_000_000
  );
}

/** Còn ngân sách hôm nay không */
export function budgetAvailable(): boolean {
  roll();
  return state.spent < dailyBudgetUsd();
}

/** Ghi nhận chi phí của một lần gọi API */
export function recordUsage(u: UsageLike): number {
  roll();
  const c = estimateCostUsd(u);
  state.spent += c;
  return c;
}

export function spentToday(): number {
  roll();
  return state.spent;
}
