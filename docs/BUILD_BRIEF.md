# Build brief (đọc trước khi code)

Dự án: landing page tương tác **"Nhà máy siêu thông minh"** (Hòa Phát × Celesnity), Next.js 16 App Router + TypeScript + Tailwind v4.
Thư mục: `/Users/jaysonjew/Documents/Celesnity/Landing Deck`

## Tài liệu nguồn (đọc phần liên quan đến việc của bạn)
- `docs/implementation-plan.md`: kế hoạch. **Mục 2 = đặc tả từng module (M1–M14)**, mục 4 = trợ lý AI, mục 5 = thiết kế hình ảnh (bảng màu, chữ, chuyển động, kiểm tra chất lượng).
- `docs/content-v4.md`: nội dung gốc.
- `docs/minder-design-system.md`: quy ước Minder (font hệ thống, đậm tối đa 600, Lucide 1.5 stroke, sentence case, không emoji, chuyển động tùy chọn).
- **Next.js 16 khác bản bạn biết**: trước khi dùng API Next nào, đọc `node_modules/next/dist/docs/` (ví dụ middleware nay là `proxy.ts`).

## Đã có sẵn (CHỈ ĐỌC, không sửa; cần đổi thì ghi vào báo cáo cuối)
- `content/content.vi.ts` (toàn bộ câu chữ: `sections`, `appendix`, `labels`, `closing`, `benefits`, `packageParts`, `costShift`, `meta`, `acts`), `content/types.ts`
- `content/scenarios/m4.ts`, `m5.ts`, `m6.ts`, `m10.ts`, `m12-defaults.ts`, `content/usecases.ts`: dữ liệu kịch bản. **Dùng đúng dữ liệu này**, không tự bịa số.
- `components/shared/*`: `RichText` (`**đậm**`, `*nghiêng*`; `plainText()`), `Label` (nhãn trung thực: `sim` | `ai` | `future` | `proposal`), `DataTable`, `Blocks`, `DetailsPanel`, `Section`, `SiteChrome`, `ModuleSlot`
- `lib/actions.ts`: bộ điều phối hành động (`onAction(name, handler)`, `dispatchAction`, `scrollToSection`). Trợ lý AI phát: `run_simulation` (M4), `open_use_case` (M9), `set_timeline_month` (M10), `set_calculator` (M12), `scroll_to_section`.
- `lib/useReducedMotion.ts`, `lib/useInView.ts`, `lib/format.ts` (`vnNumber`, `vnMoney`)
- `components/art/FactoryScene.tsx`: **kiểu props đã chốt** (`FactorySceneProps`), bản dựng thật do nhóm A1 làm. Nhóm khác dùng component này theo đúng props; trong lúc chờ nó là khung tạm.
- `app/globals.css`: token màu Tailwind (`navy-950/900/800/700`, `blue-600/500/400/300/100`, `mist-50`, `line-200`, `ink-500`, `orange-500/600/700/100`, `white`), lớp `theme-dark` / `theme-navy` / `theme-light` / `theme-mist`, `.muted`, `.tabular`, `.grain`, biến `--radius-control` (10px), `--radius-card` (16px), `--ease-brand`.

## Mỗi module
- File `components/modules/Mx.tsx`, `"use client"`, `export default function Mx({ variant }: { variant?: string })`. Được phép tạo thêm file con trong `components/modules/Mx/` (hoặc `components/art/` cho nhóm A1).
- Section chứa module và nền của nó:

| Module | Section | Nền |
|---|---|---|
| M1 hero | `#mo-dau` | tối (navy-950) |
| M1 story | `#sieu-thong-minh` | tối |
| M2 | `#ky-nguyen` | sáng (white) |
| M3 | `#hai-con-duong` | mist |
| M4 | `#mo-phong` | tối |
| M5 | `#mot-ngay` | navy-900 |
| M6 | `#thu-ngay` | mist |
| M7 | `#ba-lop` | sáng |
| M8 | `#ban-do` | sáng |
| M9 | `#use-case` | sáng |
| M10 | `#lo-trinh` | mist |
| M11 | `#phong-thi` | tối |
| M12 | `#gia-tri` | sáng |
| M13 | `#kiem-soat` | sáng |
| M14 benefits | `#hai-ben` | mist |
| M14 package | `#hop-tac` | mist |
| M14 closing | `#loi-moi` | sáng → khối đoạn kết nền tối |

- Section đã hiển thị eyebrow, tiêu đề và các khối chữ quanh module (xem `content.vi.ts`). Module **không lặp lại** tiêu đề section; chỉ thêm vi-copy cần cho tương tác (nhãn nút, chú thích).
- Bảng đầy đủ đã nằm trong lớp "Xem chi tiết" của section; module trình bày **trực quan**, không dán lại bảng thô.

## Quy tắc thiết kế (bắt buộc, mục 5 của kế hoạch)
- **Đẹp ở mức sản phẩm cao cấp**: sang, tĩnh, chính xác. Không để giao diện mặc định của trình duyệt hay thư viện. Có đủ trạng thái hover, focus, trống, đang tải, lỗi.
- **Nghĩa màu cố định**: navy = nền và cấu trúc · **blue = AI và mô hình** · white = không gian · **orange = Hòa Phát và con người quyết định** (nút "Duyệt", phần của Hòa Phát, đích đến thép). Orange chiếm không quá ~10% mỗi màn hình.
- **Tương phản**: nút orange dùng **chữ navy-900**, không bao giờ chữ trắng. Chữ orange cỡ nhỏ trên nền trắng dùng `orange-700`. Trên nền tối: chữ chính `white`, chữ phụ `blue-300`.
- **Chữ**: font hệ thống (đã đặt ở body), **đậm tối đa 600** (`font-semibold`), con số lớn dùng `tabular`. Sentence case cho nhãn và nút. **Không emoji.**
- **Bo góc**: control `rounded-[var(--radius-control)]` (10px), thẻ `rounded-[var(--radius-card)]` (16px), pill `rounded-full`. Viền 1px (`border-line-200` trên nền sáng, `border-navy-700` trên nền tối). Bóng đổ ngả navy, ví dụ `shadow-[0_20px_50px_-24px_rgba(10,31,68,0.45)]`; không dùng bóng đen.
- **Icon**: `lucide-react`, `strokeWidth={1.5}`, cỡ 16–24, `aria-hidden` khi trang trí; nút chỉ có icon thì cần `aria-label`.
- **Minh họa**: SVG isometric tối giản trên lưới 30°, nét 1,5px. Chiều sâu tạo bằng quầng sáng `blue-500` mờ. Vân hạt dùng lớp `.grain` (đã có trên section tối).
- **Chuyển động**: 300–600 ms, easing `var(--ease-brand)`. Mỗi màn hình chỉ một chuyển động chính. **Tôn trọng `useReducedMotion()`**: khi bật, bỏ hoạt ảnh và hiện trạng thái tĩnh. Canvas và vòng `requestAnimationFrame` **tạm dừng khi ngoài khung nhìn** (`useInView`), devicePixelRatio tối đa 2.
- **Trợ năng**: mọi tương tác dùng được bằng bàn phím (Tab, Enter/Space, mũi tên cho slider/tab). Biểu đồ có mô tả bằng chữ (`<figcaption>` hoặc `sr-only`). Không dùng màu làm tín hiệu duy nhất: phần của Hòa Phát luôn có nhãn chữ.
- **Responsive**: đẹp ở 375 / 768 / 1280 / 1920px; **không gây cuộn ngang trang** ở 375px.
- **Trung thực**: mọi dữ liệu kịch bản hiển thị nhãn `<Label variant="sim" text={labels.simShort} />` (hoặc biến thể phù hợp). Không vẽ "giống thật" nhà máy Hòa Phát; không dùng logo hay ảnh Hòa Phát.

## Thuật ngữ (kiểm tra tự động sẽ báo lỗi)
- Dùng: **Tự học · Dự báo trước · Nhân rộng** · "Mô hình AI Thế giới thực" · "trí thông minh" (vận hành) · "Tác nhân AI".
- Cấm: "Mô hình Thế giới" khi thiếu "AI … thực" · "trí tuệ vận hành" · "tác tử" · "biết trước" · "không bị khóa". (Riêng "Luật Trí tuệ nhân tạo" và "sở hữu trí tuệ" là tên pháp lý, được phép.)
- Không bao giờ nói điểm yếu của Hòa Phát.

## Cách làm việc
- **Chỉ sửa và tạo các file thuộc phần việc của bạn.** Nhiều agent đang làm song song trong cùng thư mục.
- **Không** chạy `npm install`, `npm run dev`, `npm run build`, và không xóa `.next`. Dev server đã chạy sẵn ở http://localhost:3000 (tự nạp lại khi file đổi). Có thể dùng `curl -s http://localhost:3000/ | head` để xem có lỗi lúc chạy không.
- **Kiểm tra kiểu:** `npx tsc --noEmit`. Phải sạch lỗi trong các file của bạn; lỗi ở file của người khác thì bỏ qua.
- Thư viện có sẵn: react 19, next 16, zod 4, lucide-react, qrcode, @anthropic-ai/sdk. Cần thư viện khác thì **không cài**, tự viết hoặc ghi vào báo cáo.
- **Báo cáo cuối (ngắn):** file đã tạo/sửa · điều gì đã làm và chưa làm · đề xuất thay đổi file dùng chung (nếu có) · cách bạn đã kiểm tra.
