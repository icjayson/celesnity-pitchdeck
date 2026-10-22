/**
 * Dữ liệu module của deck Siam Cement Group (M1, M3, M13, M15, M16).
 * Khớp docs/scg-content-v1.md. Lộ trình 22 tháng: một dây chuyền lò → toàn nhà máy → các nhà máy tại Việt Nam → một nhà máy tại Thái Lan.
 * Số nhân sự, ngưỡng và mốc tháng là đề xuất, chốt sau khảo sát; mọi kịch bản là minh họa.
 */
import type { DeckData, StaffRow } from "../../types";
import { PILOT, PILOT_SHORT, THAI, VN_NEXT } from "./places";

type Scenarios = Required<DeckData["scenarios"]>;

// ───────────── M16: Nhân sự ─────────────
const staffRows: StaffRow[] = [
  {
    team: "Celesnity",
    tone: "blue",
    cells: [
      { count: 3, roles: ["Quản lý triển khai 1", `Kỹ sư hiện trường tại ${PILOT_SHORT} 1`, "Kỹ sư AI 1"] },
      { count: 3, roles: ["Quản lý ½", "Kỹ sư hiện trường 1", "Kỹ sư AI 1", "Kỹ sư điều khiển ½"] },
      { count: 4, roles: ["Quản lý 1", "Kỹ sư hiện trường tại nhà máy mới 2", "Kỹ sư AI 1"] },
      { count: 5, roles: ["Quản lý 1", "Kỹ sư hiện trường tại nhà máy mới 2", "Kỹ sư AI 1", "Kỹ sư dữ liệu 1"] },
    ],
  },
  {
    team: "Kỹ sư vận hành và chuyên gia Siam Cement Group",
    note: "Dùng Minder trong công việc tại nhà máy",
    tone: "orange",
    cells: [
      { count: null, roles: ["Trưởng ca, Công nghệ lò, Chất lượng ~4 giờ/tuần mỗi người", "Đầu mối dữ liệu ~2 giờ/tuần"] },
      { count: null, roles: ["Như cũ", "+ Bảo trì, Năng lượng ~2 giờ/tuần"] },
      { count: null, roles: ["Chuyên gia của từng nhà máy mới"] },
      { count: null, roles: ["Chuyên gia tại nhà máy mới"] },
    ],
  },
];

export const staffing: Scenarios["staffing"] = {
  phases: [
    { name: "Thử nghiệm", months: "T+1–T+4" },
    { name: "Toàn nhà máy", months: "T+5–T+10" },
    { name: "Nhân rộng, đợt 1", months: "T+11–T+16" },
    { name: "Nhân rộng, đợt 2", months: "T+17–T+22" },
  ],
  rows: staffRows,
  leaders: { team: "Lãnh đạo Siam Cement Group", text: "Lãnh đạo phụ trách cấp Tập đoàn: họp tháng · Đầu mối các nhà máy và Tài chính: tại mỗi cổng" },
};

// ───────────── M13, M3, M1 ─────────────
export const m13: Scenarios["m13"] = {
  foundingNote: "Siam Cement Group cùng xây mô hình nền cho ngành vật liệu xây dựng, giữ quyền dùng lâu dài và dẫn dắt hướng phát triển.",
  environments: ["Siam Cement Group · Việt Nam", "Siam Cement Group · Thái Lan"],
};

export const m3: Scenarios["m3"] = {
  captions: {
    A: "Mỗi nhà máy một công cụ thuê ngoài; dữ liệu đi ra hệ thống của nhà cung cấp; mô hình và kinh nghiệm thuộc nhà cung cấp.",
    B: "Một Mô hình AI Thế giới thực riêng của Siam Cement Group; dữ liệu ở lại môi trường riêng của Siam Cement Group tại từng nhà máy; kinh nghiệm của một nhà máy đi sang nhà máy tiếp theo.",
  },
};

export const m1: Scenarios["m1"] = {
  captions: [
    `Minh họa: ba đảo ${PILOT_SHORT}, các nhà máy Siam Cement Group tại Việt Nam và nhà máy tại Thái Lan, phía trên là lõi Mô hình AI Thế giới thực phát sáng, nối với từng đảo bằng đường mảnh.`,
    "Tự học: mỗi thay đổi điểm đặt, mỗi kết quả phòng thí nghiệm và mỗi lần dừng lò quay về mô hình; độ chính xác dự báo tăng dần từ tháng thứ 1.",
    "Dự báo trước: trước khi đổi điểm đặt, mô hình vẽ ba nhánh nhiệt tiêu hao cho ba phương án kèm dải độ chắc chắn; phương án phối hợp cấp liệu và nhiên liệu giảm nhiều nhất mà vẫn giữ vôi tự do trong ngưỡng.",
    `Nhân rộng: kinh nghiệm của dây chuyền lò tại ${PILOT_SHORT} được mang sang nghiền xi măng, các nhà máy khác tại Việt Nam và nhà máy tại Thái Lan, không bắt đầu lại từ 0.`,
  ],
  foresight: {
    axis: "NHIỆT TIÊU HAO (kcal/kg clinker)",
    options: ["Giữ nguyên", "Chỉ giảm nhiên liệu", "Phối hợp cấp liệu và nhiên liệu"],
    pickTitle: "Giảm nhiệt tiêu hao, giữ chất lượng clinker",
    pickNote: "Độ chắc chắn: cao",
  },
  replicate: {
    sourceTitle: "Dây chuyền lò nung",
    sourceSub: PILOT_SHORT,
    targets: ["Nghiền xi măng", VN_NEXT[0], VN_NEXT[1], THAI],
    more: "… và các nhà máy Siam Cement Group tiếp theo",
  },
  learn: {
    badge: "Thông minh hơn sau mỗi ca",
    curve: [0.3, 0.31, 0.33, 0.35, 0.38, 0.42, 0.47, 0.53, 0.6, 0.68, 0.78, 0.9],
  },
};
