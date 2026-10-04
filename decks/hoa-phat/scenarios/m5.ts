/** Một ngày trong Nhà máy siêu thông minh (M5). Lấy nguyên văn từ docs/content-v4.md. */
import type { M5Event } from "../../types";
export type { M5Event };
export type Island = "gia-dung" | "dien-lanh" | "thep" | "all";


export const m5Events: M5Event[] = [
  {
    time: "07:40",
    place: "Xưởng gia dụng, Hòa Mạc",
    island: "gia-dung",
    text: "Công nhân báo một lỗi kiểm tra bằng giọng nói. AI tự lập hồ sơ; mô hình chỉ ra những lô cùng rủi ro trong vài phút. Kỹ sư chất lượng duyệt kế hoạch kiểm tra",
    approve: "Duyệt kế hoạch kiểm tra",
  },
  {
    time: "10:00",
    place: "Nhà máy thép, Dung Quất",
    island: "thep",
    text: "Một tác nhân AI đề xuất dời lịch bảo trì. Trước khi đến người duyệt, mô hình kiểm tra hệ quả lên sản lượng và chất lượng. Người phụ trách quyết định với đầy đủ dự báo",
    approve: "Quyết định lịch bảo trì",
  },
  {
    time: "14:00",
    place: "R&D, Hòa Mạc",
    island: "gia-dung",
    text: "Hai phương án sửa một bo mạch được so sánh trước khi làm khuôn hay thử nghiệm. R&D chọn phương án có dự báo tốt hơn, rồi thử để xác nhận",
    approve: "Chọn phương án",
  },
  {
    time: "16:30",
    place: "Dây chuyền tủ lạnh mới, Phú Mỹ",
    island: "dien-lanh",
    text: "Trong giai đoạn tăng công suất, mô hình mang kinh nghiệm từ các dây chuyền điện lạnh hiện có, chỉ ra những công đoạn cần theo dõi sát",
    approve: "Xác nhận công đoạn theo dõi",
  },
  {
    time: "Cuối ngày",
    place: "Toàn Tập đoàn",
    island: "all",
    text: "Mọi quyết định trong ngày và kết quả của chúng quay về mô hình. **Ngày mai, cả Tập đoàn thông minh hơn hôm nay**",
  },
];
