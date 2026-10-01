/** Định dạng số theo kiểu Việt Nam: dấu chấm hàng nghìn, dấu phẩy thập phân */
export function vnNumber(n: number, digits = 0): string {
  return n.toLocaleString("vi-VN", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

/** Định dạng tiền đồng gọn: "80 triệu đ", "1,7 tỷ đ" */
export function vnMoney(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `${vnNumber(n / 1_000_000_000, n % 1_000_000_000 === 0 ? 0 : 1)} tỷ đ`;
  if (abs >= 1_000_000) return `${vnNumber(Math.round(n / 1_000_000))} triệu đ`;
  return `${vnNumber(Math.round(n))} đ`;
}
