"use client";
/**
 * M20 — Minder AI làm việc. Dữ liệu: deck.scenarios.m20 (kiểu FeedScenario trong decks/types.ts).
 * Biến thể: "cover" (trang bìa) · "rule" (quy tắc do quản lý đặt, đổi ngưỡng) · "feed" (một ngày, theo vai trò).
 * Khung giao diện lấy phong cách Minder Platform; câu chữ và tên gọi lấy từ deck. Bản in bỏ module, section in bảng trong details.
 */
import { useDeck } from "@/components/deck/DeckProvider";
import { Cover } from "./M20/Cover";
import { Feed } from "./M20/Feed";
import { RuleDemo } from "./M20/RuleDemo";

export default function M20({ variant }: { variant?: string }) {
  const { scenarios, labels } = useDeck();
  const data = scenarios.m20!;
  if (variant === "cover") return <Cover data={data} simLabel={labels.simShort} />;
  if (variant === "rule") return <RuleDemo data={data} simLabel={labels.simShort} />;
  return <Feed data={data} simLabel={labels.simShort} />;
}
