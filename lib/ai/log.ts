/** Nhật ký câu hỏi (tắt mặc định). CHAT_LOG=on: ghi {t, q} vào .data/chat-log.jsonl. Không lưu IP. */
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export function chatLogEnabled(): boolean {
  return (process.env.CHAT_LOG ?? "off").toLowerCase() === "on";
}

export async function logQuestion(q: string): Promise<void> {
  if (!chatLogEnabled()) return;
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "chat-log.jsonl"), JSON.stringify({ t: new Date().toISOString(), q }) + "\n", "utf8");
  } catch {
    // Không để lỗi ghi nhật ký làm hỏng câu trả lời
  }
}
