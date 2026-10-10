# Landing deck · Celesnity

Thư mục chung cho các landing deck tương tác gửi khách hàng. Mỗi khách hàng một đường dẫn con, một bộ nội dung, một trợ lý AI và một mã truy cập riêng.

| Đường dẫn | Deck |
|---|---|
| `/hoa-phat` (+ `/phu-luc`, `/ban-in`, `/v1`) | Nhà máy siêu thông minh · Hòa Phát × Celesnity |
| `/nestle-vietnam` (+ `/phu-luc`, `/ban-in`) | Nhà máy siêu thông minh · Nestlé Trị An × Celesnity |
| `/` | Tạm chuyển tới `/hoa-phat` (giữ đường dẫn đã gửi). Thư viện deck làm sau |

Đường dẫn cũ `/phu-luc`, `/ban-in`, `/v1` tự chuyển về `/hoa-phat/...`.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · API tương thích OpenAI (proxy LiteLLM, `gpt-5-mini`) · Vitest · Playwright.

Tài liệu: `docs/content-v4.md` (nội dung Hòa Phát) · `docs/nestle-content-v2.md` (nội dung Nestlé) · `docs/nestle-implementation-plan.md` (kiến trúc nhiều deck) · `docs/minder-design-system.md` · `docs/BUILD_BRIEF.md`.

## Cấu trúc

```
app/
  [deck]/                 trang của từng deck: page, phu-luc, ban-in, v1; layout nạp đúng deck vào DeckProvider
  api/chat · api/extract  trợ lý và trích xuất M6, bắt buộc gửi `deck`
decks/
  types.ts                hợp đồng dữ liệu DeckData (gửi xuống trình duyệt) và DeckAssistant (chỉ ở server)
  all.ts                  bảng tất cả deck (script, evals), tệp nội dung gốc, tên riêng cấm lẫn giữa deck
  registry.ts             bảng deck cho ứng dụng (server-only)
  hoa-phat/               nội dung, câu hỏi thường gặp, use case, kịch bản, trợ lý, hồ sơ tri thức
  nestle-vietnam/         như trên
components/
  deck/DeckProvider.tsx   useDeck(): component đọc deck hiện tại, không import trực tiếp từ decks/
  modules/M1…M18          module tương tác dùng chung, chữ lấy từ deck
  art/                    cảnh "Nhà máy sống" (ba đảo; hình vẽ từng đảo theo deck)
  shared/ presenter/ assistant/
lib/ai/                   trợ lý: ngữ cảnh dựng riêng cho từng deck (prompt.ts), trích xuất case/incident
public/decks/<slug>/      ảnh, logo, bản PDF của từng deck
evals/<slug>/             bộ kiểm thử trợ lý và trích xuất của từng deck
```

## Tách biệt giữa khách hàng

- **Trang:** mỗi `/<slug>` chỉ nhận dữ liệu deck của mình (server → DeckProvider). Bundle JS dùng chung không chứa câu chữ khách hàng.
- **Trợ lý AI:** mỗi deck có system prompt, gói tri thức, câu hỏi thường gặp, tool, trích xuất, nhật ký, trần chi phí và giới hạn tần suất riêng. Trợ lý từ chối nói về khách hàng khác.
- **Truy cập:** mọi deck mở công khai theo đường dẫn (không còn mã truy cập). Trợ lý chỉ trả lời theo đúng deck được gửi kèm.
- **Kiểm tra:** `npm run leak:check` (và `-- --build` sau khi build).

## Cài đặt và chạy

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000/hoa-phat · /nestle-vietnam
npm run build && npm start
```

Để trống `OPENAI_API_KEY` thì trợ lý và M6 chạy bằng câu trả lời soạn sẵn của từng deck (chế độ offline).

## Biến môi trường

| Biến | Dùng cho |
|---|---|
| `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `CHAT_MODEL` | Trợ lý và M6 (chỉ ở server) |
| `CHAT_DAILY_BUDGET`, `CHAT_DAILY_BUDGET_<SLUG>` | Trần chi phí theo ngày, tính riêng từng deck |
| `CHAT_LOG` | `on`: lưu câu hỏi vào `.data/<slug>/chat-log.jsonl` |
| `SITE_URL` | Địa chỉ trang, dùng cho `npm run pdf` và Playwright |

## Scripts

| Lệnh | Việc |
|---|---|
| `npm run check` | typecheck, content:check, terms:check, knowledge:check, leak:check, test |
| `npm run content:check [-- --deck=<slug>]` | So nội dung deck với tệp markdown gốc |
| `npm run terms:check` | Thuật ngữ cấm trong `decks/ components/ app/ lib/` |
| `npm run knowledge:check` | Hồ sơ tri thức của trợ lý: có nguồn, không giá, không ghi chú khảo sát nội bộ |
| `npm run leak:check [-- --build]` | Nội dung khách hàng không lẫn sang deck khác hay sang code dùng chung |
| `npm run eval -- --deck=<slug> [--http]` | Bộ kiểm thử trợ lý và trích xuất của một deck (gọi API thật) |
| `npm run pdf -- --deck=<slug>` | Xuất `public/decks/<slug>/nha-may-sieu-thong-minh.pdf` từ `/<slug>/ban-in` |
| `npm run e2e` | Playwright cho mọi deck (smoke, ảnh chụp từng section) |

## Thêm khách hàng mới

1. Viết nội dung gốc `docs/<slug>-content.md` theo cấu trúc section của deck hiện có.
2. Tạo `decks/<slug>/` (sao chép `decks/nestle-vietnam/` làm mẫu): `content.vi.ts`, `usecases.ts`, `scenarios.ts`, `faq.ts`, `knowledge.ts`, `assistant.ts`, `index.ts`.
3. Thêm deck vào `decks/all.ts` (allDecks, allAssistants, deckSources, forbiddenTerms) và ảnh vào `public/decks/<slug>/`.
4. Chạy `npm run check`, `npm run eval -- --deck=<slug>`, `npm run e2e`, rồi `npm run pdf -- --deck=<slug>`.

## Chế độ trình chiếu và bản in

Bấm `P` để trình chiếu (→ ↓ PageDown Space: section kế · ← ↑ PageUp: trước · Home/End · D: lớp chi tiết · Esc: thoát). `/<slug>/ban-in` hiển thị toàn bộ nội dung với mọi lớp chi tiết mở sẵn; `?print=1` tự mở hộp thoại in.

## Nguyên tắc nội dung

- Câu chữ nằm trong `decks/<slug>/`; component không viết cứng câu chữ hay tên khách hàng.
- Thuật ngữ chuẩn: **Tự học · Dự báo trước · Nhân rộng** · "Mô hình AI Thế giới thực" · "trí thông minh vận hành" · "Tác nhân AI".
- Không nói điểm yếu của khách hàng. Mọi dữ liệu kịch bản mang nhãn "Mô phỏng minh họa".
