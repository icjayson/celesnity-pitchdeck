# Nhà máy siêu thông minh · Hòa Phát × Celesnity

Landing page tương tác trình bày đề xuất hợp tác, pilot và lộ trình use case giữa Hòa Phát và Celesnity. Trang kể câu chuyện qua 19 section chia 3 hồi, có 14 module tương tác (M1–M14), trợ lý AI "Hỏi về đề xuất", chế độ trình chiếu, trang phụ lục và bản in/PDF.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · `@anthropic-ai/sdk` · Vitest · Playwright.

Tài liệu gốc trong `docs/`: `content-v4.md` (nội dung), `implementation-plan.md` (kế hoạch), `minder-design-system.md` (quy ước thiết kế), `BUILD_BRIEF.md` (quy tắc khi code).

## Cấu trúc thư mục

```
app/
  page.tsx              trang chính, 19 section
  phu-luc/              phụ lục
  ban-in/               bản in, nguồn cho PDF (?print=1 tự mở hộp thoại in)
  truy-cap/             trang nhập mã truy cập (khi đặt ACCESS_CODE)
  api/chat/             trợ lý: streaming + tool
  api/extract/          M6: trích xuất có cấu trúc
  api/access/           kiểm tra mã truy cập, đặt cookie
  globals.css           token màu, theme section, CSS trình chiếu và in
components/
  modules/M1…M14        module tương tác
  art/FactoryScene.tsx  cảnh "Nhà máy sống" dùng chung
  shared/               Section, Blocks, RichText, Label, DataTable, Details, SiteChrome, ModuleSlot
  presenter/            chế độ trình chiếu
  assistant/            trợ lý AI
content/
  content.vi.ts         toàn bộ câu chữ (một nguồn duy nhất)
  types.ts, usecases.ts
  scenarios/*.ts        dữ liệu kịch bản mô phỏng
lib/                    actions (điều phối hành động), hooks, định dạng số
scripts/                content-check, terms-check, export-pdf
evals/                  bộ kiểm thử trợ lý
tests/unit, tests/e2e   Vitest, Playwright
proxy.ts                khóa trang bằng mã truy cập (tùy chọn)
```

## Cài đặt

```bash
npm install
cp .env.example .env.local
```

Để trống `ANTHROPIC_API_KEY` thì trợ lý và M6 chạy bằng câu trả lời soạn sẵn (chế độ offline).

## Chạy

```bash
npm run dev          # http://localhost:3000
```

## Build

```bash
npm run build && npm start
```

## Biến môi trường

Xem `.env.example`.

| Biến | Dùng cho |
|---|---|
| `ANTHROPIC_API_KEY` | Gọi API Claude (chỉ ở server). Trống: chế độ offline |
| `CHAT_MODEL` | Model cho trợ lý và M6 (mặc định `claude-opus-5-5`) |
| `CHAT_DAILY_BUDGET` | Trần chi phí theo ngày (USD); chạm trần thì chuyển sang câu trả lời soạn sẵn |
| `CHAT_LOG` | `on` / `off`: lưu câu hỏi chat vào `.data/chat-log.jsonl` |
| `ACCESS_CODE` | Mã truy cập tùy chọn. Trống: không khóa. Có mã: mọi trang chuyển về `/truy-cap` tới khi nhập đúng (cookie `ld_access`, httpOnly, 30 ngày) |
| `SITE_URL` | Địa chỉ trang, dùng cho `npm run pdf` và Playwright |

## Scripts

| Lệnh | Việc |
|---|---|
| `npm run check` | Gộp: typecheck, content:check, terms:check, test |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest (công thức M12, dữ liệu kịch bản) |
| `npm run content:check` | So `content/content.vi.ts` với `docs/content-v4.md`: đủ section, tiêu đề khớp, đủ mục phụ lục, mọi ô bảng v4 (≥ 12 chữ cái) có trên trang |
| `npm run terms:check` | Quét `content/ components/ app/ lib/` tìm thuật ngữ cấm ("Mô hình Thế giới" thiếu "AI … thực", "trí tuệ vận hành", "tác tử", "biết trước", "không bị khóa"). Bỏ qua một dòng bằng chú thích `terms-check-ignore` |
| `npm run eval` | Chạy bộ kiểm thử trợ lý (`evals/`) |
| `npm run pdf` | Xuất `public/nha-may-sieu-thong-minh.pdf` từ `/ban-in` (cần server đang chạy và `npx playwright install chromium`) |
| `npm run e2e` | Playwright: `tests/e2e/smoke.spec.ts` (tải trang, 19 section, module, trình chiếu, phụ lục, bản in, lỗi console) và `visual.spec.ts` (ảnh chụp từng section ở 375 / 768 / 1280 / 1920px; tạo ảnh gốc bằng `--update-snapshots`) |

## Chế độ trình chiếu

Bấm `P` (hoặc "Chế độ trình chiếu" trong mục lục). Mỗi section thành một khung toàn màn hình, chữ lớn hơn, ẩn mục lục và trợ lý. Góc phải dưới có số trang, phím gợi ý và mã QR dẫn tới trang.

| Phím | Việc |
|---|---|
| `P` | Bật / tắt |
| `→` `↓` `PageDown` `Space` | Section kế tiếp |
| `←` `↑` `PageUp` | Section trước |
| `Home` / `End` | Section đầu / cuối |
| `D` | Mở / đóng lớp "Xem chi tiết" của section hiện tại |
| `Esc` | Thoát |

Phím không hoạt động khi đang gõ trong ô nhập.

## Bản in và PDF

`/ban-in` hiển thị toàn bộ nội dung, mọi lớp chi tiết mở sẵn, nền sáng. Nút "Tải bản PDF" ở cuối trang mở `/ban-in?print=1` (tự mở hộp thoại in). Bản PDF tĩnh tạo bằng `npm run pdf`.

## Nguyên tắc nội dung

- **Một nguồn duy nhất:** mọi câu chữ nằm trong `content/content.vi.ts`; component không viết cứng câu chữ (trừ vi-copy cho tương tác).
- Sửa nội dung xong chạy `npm run content:check` và `npm run terms:check`.
- Thuật ngữ chuẩn: **Tự học · Dự báo trước · Nhân rộng** · "Mô hình AI Thế giới thực" · "trí thông minh vận hành" · "Tác nhân AI".
- Mọi dữ liệu kịch bản mang nhãn "Mô phỏng minh họa".

## Deploy

Code sẵn sàng deploy lên Vercel (đặt biến môi trường trong dự án Vercel). Việc deploy làm sau.

## Điểm lệch so với kế hoạch

| Kế hoạch | Bản dựng | Lý do |
|---|---|---|
| PixiJS cho hạt và tia sáng | Canvas 2D tự viết | Nhẹ hơn, không thêm thư viện |
| GSAP + ScrollTrigger, Framer Motion | IntersectionObserver + CSS transition | Đủ cho chuyển động theo cuộn, giảm JavaScript ban đầu |
| Font Be Vietnam Pro | Font hệ thống theo Minder Design System | SF Pro / Segoe UI / Noto đủ dấu tiếng Việt, không tải font |
| `scenarios/*.json` | `scenarios/*.ts` | Có kiểu TypeScript, kiểm tra lúc build |
| `middleware.ts` | `proxy.ts` | Next.js 16 đổi tên Middleware thành Proxy |
