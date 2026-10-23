/**
 * Use case của deck Siam Cement Group (M18 variant "features"). 35 ứng dụng thực tế tại Xi măng Sông Gianh, xếp theo 5 tính năng
 * nền tảng Minder đang có; không ứng dụng nào cần Dự báo hay ghi điểm đặt xuống máy. Khớp docs/scg-content-v1.md mục #use-case
 * và bảng "version 3" trong tài liệu nghiên cứu Sông Gianh. Tín hiệu cụ thể chốt trong khảo sát với danh sách tín hiệu của Siam Cement Group.
 */
import { featureVideos } from "../shots";
import type { Phase, UseCase } from "../../types";
import { PILOT_SHORT, THAI, VN_NEXT } from "./places";

export const sectorLabels: Record<string, string> = {
  "lo-nung": "Dây chuyền lò nung",
  "nha-may": `Toàn ${PILOT_SHORT}`,
  "khu-vuc": "Mạng lưới Siam Cement Group",
};

export const phaseLabels: Record<Phase, string> = {
  pilot: "Thử nghiệm",
  "dung-that": "Toàn nhà máy",
  "nhan-rong": "Nhân rộng, đợt 1",
  "nam-2": "Nhân rộng, đợt 2",
};

/** 5 tính năng nền tảng Minder, theo thứ tự luồng dữ liệu; phần trong ngoặc là phụ đề trên sơ đồ */
export const FEATURES = [
  { name: "Kết nối dữ liệu theo thời gian thực (Minder hardware, data pipeline)", from: 1 },
  { name: "Theo dõi và đo lường theo thời gian thực (dashboard, mô hình nhà máy 3D)", from: 1 },
  { name: "Cảnh báo và phát hiện bất thường (fault detection)", from: 2 },
  { name: "Trợ lý AI chủ động (AI chat, tạo biểu đồ, tạo báo cáo)", from: 2 },
  { name: "Tạo báo cáo tự động (Routine)", from: 3 },
] as const;

const S = {
  quarry: "Khai thác và đập",
  lab: "Silo đồng nhất và phòng thí nghiệm",
  preheater: "Tháp trao đổi nhiệt và calciner",
  kilnTower: "Tháp trao đổi nhiệt và lò quay",
  kiln: "Lò quay",
  cooler: "Làm nguội và phát điện nhiệt thừa",
  fuel: "Nghiền than và nhiên liệu",
  grinding: "Nghiền liệu, nghiền xi măng, làm nguội",
  dispatch: "Đóng bao, xuất hàng và cảng",
  energy: "Năng lượng",
  env: "Môi trường",
  plant: "Toàn nhà máy",
  line: "Toàn dây chuyền",
  maintenance: "Toàn nhà máy: bảo trì",
  shift: "Lò quay · khai thác và đập",
};
const KILN_LINE = new Set<string>([S.preheater, S.kilnTower, S.kiln, S.cooler]);

/** f = chỉ số trong FEATURES; name = tên ngắn trong danh sách; detail = ứng dụng thực tế đầy đủ */
const rows: { f: 0 | 1 | 2 | 3 | 4; name: string; detail: string; stage: string }[] = [
  // Kết nối dữ liệu theo thời gian thực
  { f: 0, name: "Nối hệ thống điều khiển ABB (chỉ đọc)", detail: "Nối hệ thống điều khiển ABB ở chế độ chỉ đọc: hơn 1.000 tín hiệu lò, tháp, nghiền và quạt vào Minder theo thời gian thực", stage: S.line },
  { f: 0, name: "Cảm biến cho máy đập và băng tải", detail: "Lắp Minder tại máy và cảm biến rung, dòng động cơ cho máy đập, băng tải chưa có tín hiệu", stage: S.quarry },
  { f: 0, name: "Nối XRF và phòng thí nghiệm", detail: "Đưa kết quả XRF tự động và phòng thí nghiệm vào cùng dòng dữ liệu với tín hiệu lò", stage: S.lab },
  { f: 0, name: "Nối nhiên liệu và chất thải đồng xử lý", detail: "Nối phiếu nhận chất thải, tồn kho nhiên liệu và nhiệt trị", stage: S.fuel },
  { f: 0, name: "Nối điện năng và điện phát nhiệt thừa", detail: "Nối công tơ điện, công suất động cơ và điện phát nhiệt thừa", stage: S.energy },
  { f: 0, name: "Nối hệ quan trắc khí thải và camera ống khói", detail: "Nối 4 hệ quan trắc khí thải và camera ống khói", stage: S.env },
  { f: 0, name: "Nối xuất hàng, cân xe và cảng", detail: "Nối dữ liệu xuất hàng, cân xe, cảng và hệ thống Auto Truck", stage: S.dispatch },
  // Theo dõi và đo lường theo thời gian thực
  { f: 1, name: "Mô hình nhà máy 3D", detail: "Mô hình nhà máy 3D Sông Gianh: từ mỏ đá đến cảng, trạng thái từng thiết bị theo thời gian thực", stage: S.plant },
  { f: 1, name: "Bảng sản lượng và dừng máy", detail: "Bảng sản lượng: clinker tấn/ngày, xi măng tấn/ngày, giờ chạy, nguyên nhân dừng máy và hiệu suất thiết bị tổng thể", stage: S.plant },
  { f: 1, name: "Bảng lò và tháp trao đổi nhiệt", detail: "Bảng lò: nhiệt độ, áp suất cyclone hai nhánh, O₂, CO, mô-men lò, cấp liệu, nhiệt vỏ lò", stage: S.kilnTower },
  { f: 1, name: "Bảng chất lượng", detail: "Bảng chất lượng: LSF, SM, AM, vôi tự do, Blaine, cường độ theo ca", stage: S.lab },
  { f: 1, name: "Bảng nhiên liệu thay thế", detail: "Bảng nhiên liệu thay thế: lượng chất thải đồng xử lý, tỷ lệ thay thế nhiệt", stage: S.fuel },
  { f: 1, name: "Bảng năng lượng nghiền và nhiệt thừa", detail: "Bảng năng lượng: kWh/tấn nghiền liệu và nghiền xi măng, điện phát nhiệt thừa", stage: S.grinding },
  { f: 1, name: "Bảng xuất hàng và tồn silo", detail: "Bảng xuất hàng: mức 4 silo xi măng, xe và sà lan trong ngày", stage: S.dispatch },
  // Cảnh báo và phát hiện bất thường
  { f: 2, name: "Máy đập, băng tải bất thường", detail: "Phát hiện máy đập, băng tải rung hoặc tải bất thường", stage: S.quarry },
  { f: 2, name: "XRF, vôi tự do lệch mục tiêu", detail: "Cảnh báo XRF, vôi tự do lệch mục tiêu", stage: S.lab },
  { f: 2, name: "Cảnh báo sớm tắc cyclone", detail: "Cảnh báo sớm tắc cyclone khi nhiệt độ, áp suất bắt đầu lệch", stage: S.preheater },
  { f: 2, name: "Điểm nóng vỏ lò", detail: "Phát hiện điểm nóng vỏ lò khác thường so với lịch sử", stage: S.kiln },
  { f: 2, name: "Quạt làm nguội, lò hơi bất thường", detail: "Cảnh báo quạt làm nguội và lò hơi nhiệt thừa chạy bất thường", stage: S.cooler },
  { f: 2, name: "CO máy nghiền than", detail: "Cảnh báo CO, nhiệt độ đầu ra máy nghiền than tăng nhanh", stage: S.fuel },
  { f: 2, name: "Máy tiêu thụ điện bất thường", detail: "Phát hiện máy tiêu thụ điện bất thường so với sản lượng", stage: S.energy },
  { f: 2, name: "Phát thải tiến gần giới hạn", detail: "Cảnh báo bụi, SO₂, NOx tiến gần giới hạn 2026", stage: S.env },
  // Trợ lý AI chủ động
  { f: 3, name: "Hỏi xu hướng, nhận biểu đồ", detail: "Hỏi bằng tiếng Việt \"nhiệt độ cyclone nhánh A 24 giờ qua\"; Minder dựng biểu đồ và đưa lên bảng", stage: S.preheater },
  { f: 3, name: "Giao ca và báo dừng máy bằng giọng nói", detail: "Giao ca, báo dừng máy bằng giọng nói; trợ lý lập hồ sơ gắn thiết bị và nguyên nhân", stage: S.shift },
  { f: 3, name: "Lần trước xử lý thế nào?", detail: "\"Lần trước tắc cyclone xử lý thế nào?\": cách xử lý từ nhật ký ca và cẩm nang", stage: S.kiln },
  { f: 3, name: "Báo cáo sự cố dừng lò", detail: "Soạn báo cáo sự cố dừng lò từ dữ liệu và lời kể của ca", stage: S.kiln },
  { f: 3, name: "Máy nào làm tăng tiền điện?", detail: "\"Máy nào làm tăng tiền điện tuần này?\": biểu đồ điện năng theo máy và khung giờ", stage: S.energy },
  { f: 3, name: "So sánh ca ngày và ca đêm", detail: "So sánh ca ngày và ca đêm: sản lượng, dừng máy, chất lượng", stage: S.plant },
  // Tạo báo cáo tự động (Routine)
  { f: 4, name: "Báo cáo ca và ngày", detail: "Báo cáo ca và ngày gửi trưởng ca, giám đốc nhà máy: sản lượng, dừng máy, chất lượng", stage: S.plant },
  { f: 4, name: "Báo cáo chất lượng theo ca và lô", detail: "Báo cáo chất lượng theo ca và theo lô", stage: S.lab },
  { f: 4, name: "Báo cáo nhiên liệu và chất thải tuần", detail: "Báo cáo tồn kho nhiên liệu và chất thải đồng xử lý hằng tuần", stage: S.fuel },
  { f: 4, name: "Báo cáo năng lượng tuần", detail: "Báo cáo năng lượng hằng tuần: kWh/tấn, điện phát nhiệt thừa", stage: S.energy },
  { f: 4, name: "Báo cáo bảo trì tuần", detail: "Báo cáo bảo trì hằng tuần: cảnh báo thiết bị và việc còn tồn", stage: S.maintenance },
  { f: 4, name: "Báo cáo môi trường tháng", detail: "Báo cáo môi trường hằng tháng từ hệ quan trắc khí thải", stage: S.env },
  { f: 4, name: "Báo cáo xuất hàng ngày", detail: "Báo cáo xuất hàng hằng ngày: xe, sà lan, tồn silo", stage: S.dispatch },
];

/** Video demo Minder theo tính năng (chỉ số trong FEATURES) */
const videos = featureVideos("Demo trên Minder · dữ liệu mô phỏng · tốc độ 2×", {
  0: "Luồng dữ liệu theo dõi hệ thống điều khiển lò và làm mới các bảng dữ liệu mỗi 30 giây.",
  1: "Sơ đồ sản xuất trực tiếp, bảng điều khiển cho ban lãnh đạo và lò nung, mô hình 3D dây chuyền lò 1.",
  2: "Lò lệch khỏi vận hành ổn định sau lô than mới, cảnh báo chỉ ra tín hiệu nào thay đổi và tự đóng khi lò ổn định lại.",
  3: "Hỏi về cảnh báo, điện năng máy nghiền, biểu đồ hay báo cáo giao ca, mọi con số đều kèm nguồn.",
  4: "Báo cáo bảo trì hằng tuần do Minder viết, kèm file Excel các lần dừng lò còn thiếu nguyên nhân.",
});

const nn = (i: number) => String(i + 1).padStart(2, "0");

export const useCases: UseCase[] = [
  ...rows.map(
    (r, i): UseCase => ({
      id: `UC${i}`,
      code: `Ứng dụng ${nn(i)}`,
      name: r.name,
      question: r.detail,
      liveFrom: `T+${FEATURES[r.f].from}`,
      sectors: KILN_LINE.has(r.stage) ? ["lo-nung", "nha-may", "khu-vuc"] : ["nha-may", "khu-vuc"],
      phase: "pilot",
      card: {
        opportunity: r.detail,
        aiDoes: r.detail,
        decides: "",
        pass: "",
        stage: r.stage,
        minder: FEATURES[r.f].name,
        // video demo Minder gắn vào use case đầu tiên của mỗi tính năng
        video: rows.findIndex((x) => x.f === r.f) === i ? videos(r.f) : undefined,
      },
    }),
  ),
  {
    id: "nhan-rong-vn",
    code: "Nhân rộng",
    name: "Các nhà máy Siam Cement Group tiếp theo",
    question: `${VN_NEXT[0]} (T+11–T+13) → ${VN_NEXT[1]} (T+14–T+16)`,
    liveFrom: "T+11–T+16",
    sectors: ["khu-vuc"],
    phase: "nhan-rong",
  },
  {
    id: "thai-lan",
    code: "Thái Lan",
    name: `Nhân rộng sang ${THAI}`,
    question: `Khảo sát ${THAI} (T+17) → các ứng dụng phù hợp dùng thật (T+19–T+22), dữ liệu ở lại nhà máy`,
    liveFrom: "T+17–T+22",
    sectors: ["khu-vuc"],
    phase: "nam-2",
    note: "Hướng đề xuất",
  },
];

export const appCount = rows.length;

export const expansionMap: [string, string][] = [
  ["Khai thác và đập", "Cảm biến máy đập, băng tải; cảnh báo bất thường; giao ca bằng giọng nói"],
  ["Phòng thí nghiệm", "XRF và kết quả thí nghiệm trong cùng dòng dữ liệu; bảng và báo cáo chất lượng"],
  ["Tháp trao đổi nhiệt và lò quay", "Bảng lò, cảnh báo tắc cyclone, điểm nóng vỏ lò, hỏi đáp xu hướng"],
  ["Nhiên liệu", "Chất thải đồng xử lý, tỷ lệ thay thế nhiệt, CO máy nghiền than"],
  ["Năng lượng và môi trường", "Điện năng theo máy, nhiệt thừa, hệ quan trắc khí thải và báo cáo môi trường"],
  ["Đóng bao, xuất hàng và cảng", "Tồn silo, xe, sà lan, báo cáo xuất hàng hằng ngày"],
  ["Nhà máy vật liệu khác của Siam Cement Group", "Lò nung gạch ốp lát, máy giấy: cùng 5 tính năng Minder"],
];

/** Trước/sau không dùng ở variant "features"; giữ để M18 nhận đủ use case (bộ lọc cần beforeAfter) */
export const beforeAfter: Record<string, { before: string; after: string }> = Object.fromEntries(
  rows.map((r, i) => [`UC${i}`, { before: "", after: r.detail }]),
);
