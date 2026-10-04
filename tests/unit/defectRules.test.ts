import { describe, expect, it } from "vitest";
import { defectByRules, defectOffline } from "@/lib/ai/defectRules";
import { m6 } from "@/decks/isuzu-vietnam/scenarios";

const [s1, s2, s3] = m6.samples;

describe("defectByRules", () => {
  it("mẫu 1: BODY-08, đủ VIN, lô, đồ gá, ca", () => {
    const c = defectByRules(s1);
    expect(c.la_bao_loi).toBe(true);
    expect(c).toMatchObject({ vin: "QKR-00182", model: "QKR", cong_doan: "BODY", tram: "BODY-08", lo: "LOT-2938", do_ga: "JIG-04", ca: "Ca đêm" });
    expect(c.linh_kien).toMatch(/bản lề/i);
    expect(c.trieu_chung).toMatch(/lệch/i);
    expect(c.thong_tin_con_thieu).not.toContain("VIN");
  });

  it("mẫu 2: PAINT, không bịa VIN hay lô, liệt kê thông tin thiếu", () => {
    const c = defectByRules(s2);
    expect(c.la_bao_loi).toBe(true);
    expect(c).toMatchObject({ vin: "", model: "NQR", cong_doan: "PAINT", lo: "", do_ga: "", ca: "" });
    expect(c.trieu_chung).toMatch(/chảy sơn/i);
    expect(c.linh_kien).toMatch(/cửa trái/i);
    expect(c.thong_tin_con_thieu).toContain("VIN");
    expect(c.thong_tin_con_thieu.length).toBeLessThanOrEqual(4);
  });

  it("mẫu 3: QC, đèn phanh, lô BR-292, mức Cao", () => {
    const c = defectByRules(s3);
    expect(c.la_bao_loi).toBe(true);
    expect(c).toMatchObject({ vin: "FRR-00419", model: "FRR", cong_doan: "QC", lo: "BR-292", muc_do: "Cao" });
    expect(c.linh_kien).toMatch(/đèn phanh/i);
    expect(c.trieu_chung).toMatch(/không sáng/i);
  });

  it("câu không phải báo lỗi → la_bao_loi false, các trường rỗng", () => {
    for (const t of ["Chào bạn, hôm nay trời đẹp quá.", "Asakai sáng nay mọi người đều đúng giờ."]) {
      const c = defectByRules(t);
      expect(c.la_bao_loi).toBe(false);
      expect(c.vin).toBe("");
      expect(c.thong_tin_con_thieu).toEqual([]);
    }
  });

  it("lực siết thấp ở CHASSIS và VIN 17 ký tự", () => {
    const c = defectByRules("Trạm CHASSIS-03 siết bu lông cầu sau lực siết thấp trên xe FVR-00412, ca 1.");
    expect(c).toMatchObject({ cong_doan: "CHASSIS", tram: "CHASSIS-03", vin: "FVR-00412", trieu_chung: "Lực siết thấp", muc_do: "Cao" });
    expect(defectByRules("Xe JAA1KR77HR7100182 cửa phải bị kêu khi đóng.").vin).toBe("JAA1KR77HR7100182");
  });
});

describe("defectOffline", () => {
  it("câu mẫu → kết quả soạn sẵn; câu khác → quy tắc", () => {
    expect(defectOffline(`  ${s1}  `, m6.kind === "defect" ? m6.fallback : {}).mode).toBe("sample");
    expect(defectOffline("Xe NQR-00233 kính chắn gió bị nứt.", {}).mode).toBe("rules");
  });
});
