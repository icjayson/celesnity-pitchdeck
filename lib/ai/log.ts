/** Nhật ký câu hỏi (tắt mặc định). CHAT_LOG=on: ghi {t, deck, q} vào .data/<deck>/chat-log.jsonl, mỗi deck một tệp. Không lưu IP. */
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export function chatLogEnabled(): boolean {
  return (process.env.CHAT_LOG ?? "off").toLowerCase() === "on";
}

export async function logQuestion(deck: string, q: string): Promise<void> {
  if (!chatLogEnabled()) return;
  try {
    const dir = path.join(process.cwd(), ".data", deck.replace(/[^a-z0-9-]/g, ""));
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "chat-log.jsonl"), JSON.stringify({ t: new Date().toISOString(), deck, q }) + "\n", "utf8");
  } catch {
    // Không để lỗi ghi nhật ký làm hỏng câu trả lời
  }
}
