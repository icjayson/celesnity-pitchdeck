/**
 * Deck Hòa Phát (/hoa-phat): gom toàn bộ dữ liệu trang thành một DeckData.
 * Chỉ import ở server (app/[deck], lib/ai qua decks/registry.ts); component đọc qua useDeck().
 */
import type { DeckData } from "../types";
import { acts, appendix, benefits, closing, costShift, labels, meta, packageParts, parkedSections, sections } from "./content.vi";
import { faq } from "./faq";
import { expansionMap, phaseLabels, sectorLabels, useCases } from "./usecases";
import { beforeAfter } from "./scenarios/usecase-before-after";
import { m5Events } from "./scenarios/m5";
import { m6Fallback, m6PlanTemplate, m6Ranking, m6Samples } from "./scenarios/m6";
import { m10Finale, m10Gates, m10Months } from "./scenarios/m10";
import { itSteps, phaseEndMonth, roadmapPhases } from "./scenarios/roadmap";
import { staffingLeaders, staffingPhases, staffingRows } from "./scenarios/staffing";
import { m4Options, m4Score } from "./scenarios/m4";
import { breakEvenGrid, calcDefaults } from "./scenarios/m12-defaults";

export const hoaPhatDeck: DeckData = {
  slug: "hoa-phat",
  basePath: "/hoa-phat",
  meta,
  acts,
  labels,
  sections,
  parkedSections,
  appendix,
  closing,
  benefits,
  quickLink: { label: "Lợi ích hợp tác", section: "hai-ben" },
  packageParts,
  costShift,
  faq,
  quickFaqIds: ["khi-nao-thep", "du-lieu-roi-vn", "so-huu-mo-hinh", "sau-12-thang"],
  useCases,
  sectorLabels,
  phaseLabels,
  expansionMap,
  beforeAfter,
  party: { name: "Hòa Phát", short: "Hòa Phát", team: "IT Hòa Phát", environment: "Môi trường Hòa Phát" },
  brand: { partnerLogo: "/decks/hoa-phat/logo-white.png", partnerWordmark: "HÒA PHÁT", partnerLogoHeight: 28 },
  islands: [
    { id: "gia-dung", label: "Nhà máy gia dụng", art: "gia-dung" },
    { id: "dien-lanh", label: "Nhà máy điện lạnh", art: "dien-lanh" },
    { id: "thep", label: "Nhà máy thép", art: "thep" },
  ],
  scenarios: {
    m5: { events: m5Events },
    m6: {
      kind: "case",
      samples: m6Samples,
      fallback: m6Fallback,
      ranking: m6Ranking,
      planTemplate: m6PlanTemplate,
      copy: {
        channel: "Kênh báo lỗi · trạm kiểm tra",
        prompt: "Nói vào bộ đàm hoặc gõ lời báo lỗi",
        promptNoSpeech: "Gõ lời báo lỗi như công nhân nói",
        placeholder: "Ví dụ: Trạm test 3, bếp lô 2409 lại nhảy bảo vệ nhiệt…",
        submit: "Lập hồ sơ",
        micLabel: "Bấm để nói lời báo lỗi",
        steps: ["Nói hoặc gõ lời báo lỗi", "AI lập thẻ hồ sơ", "Mô hình nối dữ liệu, xếp hạng lô", "Trưởng ca duyệt kế hoạch"],
        idleTitle: "Thẻ hồ sơ sẽ hiện ở đây",
        loading: "Đang lập hồ sơ từ lời báo lỗi…",
        notFaultTitle: "Chưa nhận ra đây là báo lỗi, Quý vị thử lại",
        notFaultHint: "Hãy nói như công nhân báo lỗi: trạm nào, sản phẩm hoặc lô nào, hiện tượng gì. Hoặc chạm một câu mẫu.",
        aiLabel: "AI thật: trích xuất hồ sơ từ lời nói",
      },
    },
    m10: {
      months: m10Months,
      gates: m10Gates,
      finale: m10Finale,
      chips: [
        { id: "UC0", short: "Hồ sơ khách hàng" },
        { id: "UC1", short: "Lô hàng rủi ro cao" },
        { id: "UC2", short: "So sánh phương án" },
        { id: "UC3", short: "Bảo hành sớm" },
        { id: "UC4", short: "Tối ưu đề xuất AI" },
        { id: "UC5", short: "Chẩn đoán trước" },
      ],
      lane: {
        title: "Làn thép",
        opensAt: 8,
        openNote: "mở từ T+8",
        closedNote: "xuất hiện từ T+8",
        pending: "Sau Cổng 3, mô hình bắt đầu bước sang thép.",
      },
      partnerShareNote: "phần vận hành của Hòa Phát",
    },
    roadmap: { phases: roadmapPhases, itSteps, phaseEndMonth, noGateNote: "Ban chỉ đạo duyệt khảo sát và phạm vi thử nghiệm thép" },
    staffing: { phases: staffingPhases, rows: staffingRows, leaders: staffingLeaders },
    m17: [
      {
        name: "Vận hành",
        when: "T+4–T+8",
        can: "Chạy luồng dữ liệu, giám sát mô hình, quản trị người dùng, xử lý sự cố thường gặp",
        test: "Tự chạy 1 vòng (T+4) → tự vận hành 4 tuần (T+8)",
      },
      {
        name: "Tự huấn luyện lại",
        when: "T+12",
        can: "Cập nhật mô hình riêng bằng dữ liệu mới, chấm trên bộ đề, quyết định phát hành phiên bản",
        test: "Tự huấn luyện lại không cần hỗ trợ, kết quả không kém phiên bản trước",
      },
      {
        name: "Đồng huấn luyện",
        when: "Năm thứ 2",
        can: "Đóng góp vào mô hình nền chung, cùng thiết kế bộ đề thi, đồng tác giả báo cáo kỹ thuật, dẫn dắt mở rộng sang thép",
        test: "Một vòng đóng góp qua kiểm thử bảo mật",
      },
    ],
    m13: { foundingNote: "Hòa Phát cùng xây mô hình nền, giữ quyền dùng lâu dài và dẫn dắt hướng phát triển." },
    m3: {
      captions: {
        A: "Dữ liệu đi ra hệ thống của nhà cung cấp; mô hình thuộc nhà cung cấp.",
        B: "Dữ liệu ở lại Việt Nam, trong môi trường Hòa Phát; mô hình và đội kỹ sư là của Hòa Phát.",
      },
    },
    m1: {
      captions: [
        "Minh họa: ba đảo nhà máy Gia dụng, Điện lạnh và Thép, phía trên là lõi Mô hình AI Thế giới thực phát sáng, nối với từng đảo bằng đường mảnh.",
        "Tự học: vòng quyết định, kết quả, học thêm quay quanh mô hình; độ chính xác dự báo tăng theo cấp số nhân từ tháng thứ 1 đến tháng thứ 12.",
        "Dự báo trước: từ hôm nay, mô hình vẽ ba nhánh tỉ lệ lỗi cho ba phương án (giữ nguyên, hiệu chỉnh máy móc, đổi linh kiện) kèm dải độ chắc chắn; đổi linh kiện giảm lỗi nhiều nhất.",
        "Nhân rộng: kinh nghiệm của dây chuyền bếp từ Hòa Mạc được mang sang dây chuyền mới, nhà cung cấp mới, model mới, sang đến nhà máy thép và nhiều hơn nữa, không bắt đầu lại từ 0.",
      ],
      foresight: {
        axis: "TỈ LỆ LỖI",
        options: ["Giữ nguyên", "Hiệu chỉnh máy móc", "Đổi linh kiện"],
        pickTitle: "Giảm lỗi nhiều nhất",
        pickNote: "Độ chắc chắn: cao",
      },
      replicate: {
        sourceTitle: "Dây chuyền bếp từ",
        sourceSub: "Hòa Mạc",
        targets: ["Dây chuyền mới", "Nhà cung cấp mới", "Model mới", "Nhà máy thép"],
        more: "… và nhiều hơn nữa",
      },
      learn: {
        badge: "Thông minh hơn theo cấp số nhân",
        // tăng nhanh dần, khớp "thông minh hơn theo cấp số nhân theo thời gian"
        curve: [0.3, 0.31, 0.33, 0.35, 0.38, 0.42, 0.47, 0.53, 0.6, 0.68, 0.78, 0.9],
      },
    },
    m4: { title: "Buồng mô phỏng · bếp từ · bảo vệ nhiệt", options: m4Options, score: m4Score },
    m12: { defaults: calcDefaults, breakEvenGrid },
  },
};
