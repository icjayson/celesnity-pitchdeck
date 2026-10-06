# Review deck Nestlé Trị An: giữ World Model là chủ đề chính, làm use case Dolce Gusto cụ thể hơn

Ngày 07/10/2026 · Đối chiếu: trang `/nestle-vietnam` (bản export 06/10, 14 section) · Feedback của anh Phương qua WhatsApp · Khảo sát dây chuyền · Demo Minder (Mô hình nhà máy, Tổng quan Site Manager, Phát hiện lỗi, Việc định kỳ)

**Nguyên tắc của bản sửa này:** Mô hình AI Thế giới thực (World Model) và quy trình vận hành liên kết toàn diện (Kế hoạch → Vận hành → Phục hồi) vẫn là chủ đề chính. Phần phải đổi là **use case**: ít hơn, bám đúng bài toán nhà máy đã chia sẻ, và mỗi use case phải chỉ rõ World Model làm gì trong đó, cần gì, không làm gì, đo bằng gì.

---

## 0. Vấn đề của phần use case hiện tại

Anh Phương không phản đối tầm nhìn. Anh phản đối việc tầm nhìn **không có khung triển khai đi kèm**. Anh hỏi 6 thứ, và phần use case hiện tại trả lời thiếu cả 6:

| Anh Phương yêu cầu | Phần use case hiện tại | Mức đáp ứng |
| --- | --- | --- |
| Use case ưu tiên | 6 ứng dụng ngang hàng, không ưu tiên cái nào; 3/6 không đến từ khảo sát | Yếu |
| Kiến trúc kỹ thuật | "Ba lớp" nói World Model *là gì*, không nói dữ liệu nào vào, mô hình học gì, kết quả ra màn hình nào | Yếu |
| Phạm vi và trách nhiệm | "Người quyết định" có trong M18; dữ liệu cần thì chỉ ghi chung chung "mở dữ liệu đã có" | Trung bình |
| Deliverables | Không có danh sách sản phẩm bàn giao theo use case | Thiếu |
| Giá trị đo được | Có tiêu chí "Đạt khi", nhưng không có baseline và không quy ra tiền | Yếu |
| "Không giải quyết gì" / "Cần gì để chạy" | Rải rác ở #hop-tac và phụ lục | Thiếu |

### Bốn lỗi cụ thể

1. **Use case không khớp khảo sát.** Ta biết 4 vấn đề thật: dừng máy do độ ẩm, hao hụt bột ghi tay, kế hoạch tuần mất 3 ngày, dữ liệu phân tán phải đi gom. Trong 6 ứng dụng, Định lượng (04), Dừng ngắn/chuyển đổi (05) và Sẵn sàng/bảo trì (06) đến từ research. **Hao hụt, vấn đề nhà máy kể rõ nhất, lại không có use case riêng.**
2. **Use case độ ẩm đặt sai vấn đề.** Nỗi đau của nhà máy là *dừng nguyên một ca*. Ứng dụng 02 và #thu-ngay lại kể chuyện *sau khi đã vượt ngưỡng*: truy vết lô, tính thiệt hại, phục hồi. World Model đáng giá nhất ở chỗ **dự báo trước** để không phải dừng. Câu chuyện "dự báo trước" vốn là một trong ba năng lực của deck, nhưng hero lại không dùng đến nó.
3. **World Model chỉ được mô tả trừu tượng, không được neo vào use case.** Mỗi ứng dụng ghi "mô hình dự báo..." nhưng không nói mô hình học từ dữ liệu nào, dự báo đại lượng gì, phần nào là tính toán hay bộ giải chứ không phải mô hình, và khi nào mô hình nói "không biết". Người đọc kỹ thuật sẽ thấy "magic wand" chính ở chỗ này, chứ không phải ở bản thân khái niệm World Model.
4. **Số liệu minh họa không khớp dây chuyền thật và demo.** Deck dùng "Line 3", "Phòng kiểm soát 2", "lô P102", 31.400 viên. Demo và dây chuyền thật là L1/L2, "Phòng chiết rót – Vùng L1/L2", AHU-01/02. Anh Phương sẽ thấy ngay: "Line 3" ở đâu?

---

## 1. Use case giai đoạn đầu: 3 bài toán trên một World Model, cộng nền dữ liệu

Bố cục mới khớp đúng với chủ đề của deck: mỗi use case là một khâu của quy trình vận hành liên kết toàn diện, và cả ba cùng chạy trên **một** World Model của dây chuyền Dolce Gusto.

| Khâu | Use case | Bài toán (từ khảo sát) | World Model làm gì | Màn hình demo đã có |
| --- | --- | --- | --- | --- |
| **Ghi lại** (nền) | Thu thập dữ liệu tự động, báo cáo ca/ngày/tuần | Dữ liệu phân tán, phải đi gom số mỗi tuần | Xây bản đồ dây chuyền; biến mọi kế hoạch, sự cố và kết quả thành dữ liệu học | Mô hình nhà máy (52 node), Tổng quan Site Manager, Việc định kỳ → Shift report |
| **Kế hoạch** | UC1 · Kế hoạch sản xuất tuần | Kế hoạch tuần ~3 ngày công, làm tay | Dự báo kết quả *thực tế* của từng phương án lịch: sản lượng, giờ chuyển đổi, rủi ro dừng | Việc định kỳ → "Lập kế hoạch sản xuất tuần" |
| **Vận hành** | UC2 · Hao hụt bột từ dữ liệu máy | Hao hụt ghi tay, thiếu và không đều | Học hao hụt "bình thường" theo SKU, lô bột và môi trường; phát hiện ca lệch và nguyên nhân | "Cân bằng nguyên liệu theo tuần (kg bột hao hụt)" |
| **Dự báo / Phục hồi** | UC3 · Chống dừng máy do môi trường phòng chiết rót | Độ ẩm vượt chuẩn → dừng cả ca | Dự báo RH vài giờ đến vài ngày tới từ trạng thái AHU, thời tiết và tải dây chuyền; khi vẫn vượt ngưỡng thì tính tác động và đẩy sang kế hoạch | Phát hiện lỗi; "Cảnh báo cần xử lý" (RH Vùng L1/L2, AHU-02 "~5 ngày tới ngưỡng") |

> Đánh số theo thứ tự của quy trình (Kế hoạch → Vận hành → Phục hồi) cho khớp chủ đề. **Hero vẫn là bài toán độ ẩm**, vì đó là câu chuyện cho thấy rõ nhất ba khâu nối vào nhau: dự báo trước → nếu vẫn xảy ra thì tính tác động → lập lại kế hoạch → người duyệt.

**Những ứng dụng cũ đi về đâu:**
- 01 Báo cáo ca → thành **nền**.
- 02 Truy vết sự cố môi trường → gộp vào UC3, làm nhánh "khi vẫn vượt ngưỡng".
- 03 Kế hoạch và phục hồi → tách: kế hoạch về UC1, phục hồi về UC3.
- 04 Định lượng chiết rót → gộp vào UC2, vì gram dư/viên là phần hao hụt lớn và đo được.
- 05 Dừng ngắn/chuyển đổi → phần ma trận chuyển đổi đi vào UC1; phần còn lại sang "mở rộng sau".
- 06 Sẵn sàng/bảo trì → phần AHU đi vào UC3; phần còn lại sang "mở rộng sau".

**Câu chốt của section use case** (ý của Jayson): *Nhanh hơn* (kế hoạch, báo cáo), *ít công sức hơn* (không nhập tay, không đi gom số), *kiểm soát chất lượng chặt hơn* (môi trường, hao hụt), và *con người vẫn ra quyết định*.

### Khuôn chung cho mỗi use case (9 dòng)

> Bài toán · **World Model học gì và dự báo gì** · Minder làm gì (từng bước) · **Không làm gì** · Cần gì từ nhà máy · Ai làm gì · Deliverable và thời điểm · KPI (baseline → mục tiêu → cách đo → ai xác nhận) · Giá trị quy ra tiền (công thức)

Dòng "World Model học gì và dự báo gì" giữ World Model ở trung tâm, đồng thời trả lời câu "technical architecture" của anh Phương cho từng use case.

---

### Nền: Thu thập dữ liệu tự động và báo cáo định kỳ (lớp ① của World Model)

- **Bài toán:** số sản lượng, dừng máy, hao hụt và môi trường nằm ở nhiều nơi (PLC, cảm biến, Excel, sổ ca). Mỗi tuần phải có người đi gom và tổng hợp.
- **World Model:** đây là lớp ghi lại. Bản đồ liên kết của dây chuyền nối nhu cầu → lệnh sản xuất → SKU → L1/L2 → thiết bị → phòng → lô → sản lượng. Mỗi ca, mỗi kế hoạch và mỗi sự cố thành một chuỗi "tình trạng → quyết định → kết quả" để mô hình học. Nếu không có nền này, ba use case còn lại không có dữ liệu để học.
- **Minder làm gì:**
  1. Kết nối chỉ đọc vào các nguồn của L1/L2.
  2. Dựng mô hình dây chuyền (như màn Mô hình nhà máy trong demo).
  3. Tác nhân AI tự lập báo cáo cuối mỗi ca (06:00/14:00/22:00), báo cáo ngày và báo cáo tuần: sản lượng so với kế hoạch, các lần dừng tốn thời gian nhất, cảnh báo còn mở, việc ca sau cần chú ý, so sánh với ca trước.
  4. Gửi bản PDF qua email hoặc Teams.
  5. Trưởng ca bổ sung ghi chú bằng giọng nói hoặc gõ ngắn bằng tiếng Việt.
- **Không làm:** không thay MES/SAP; không thay sổ ca hay hồ sơ GMP; không ghi ngược vào hệ thống nào.
- **Deliverable:**
  - Bản đồ dây chuyền Dolce Gusto L1/L2.
  - Dashboard Site Manager.
  - Báo cáo ca, ngày và tuần chạy tự động (dùng thật từ tháng thứ 1).
  - Danh mục dữ liệu đã được IT/OT ký.
- **KPI:**
  - Số giờ tổng hợp báo cáo mỗi tuần, trước và sau.
  - Tỷ lệ chỉ số tự động so với nhập tay.
  - Tỷ lệ báo cáo đúng giờ.

### UC1: Kế hoạch sản xuất tuần (khâu Kế hoạch)

- **Bài toán:** mỗi tuần 1–2 người nhận nhu cầu từ supply chain, rồi tính máy nào chạy bao nhiêu giờ, SKU nào, sản lượng bao nhiêu. Việc này mất khoảng 3 ngày, trước khi quản lý duyệt và chuyển xuống chuyền.
- **World Model học gì và dự báo gì:**
  - Học **năng lực thực tế** của L1/L2 theo SKU và ca, thay cho định mức.
  - Học **thời gian chuyển đổi thật của từng cặp SKU**.
  - Học **rủi ro dừng** theo mùa và theo trạng thái thiết bị (lấy từ UC3).
  - Với mỗi lịch khả thi, mô hình dự báo sản lượng thực tế, số giờ chuyển đổi và đơn hàng có rủi ro, kèm mức độ chắc chắn.
  - Mỗi tuần, dự báo được chấm so với kết quả thật, và mô hình học tiếp.
- **Phân vai công nghệ (nói thẳng trên trang):** *bộ giải tối ưu tạo các lịch thỏa ràng buộc; World Model dự báo kết quả của từng lịch; LLM đọc đầu vào và giải thích.* LLM không tự "nghĩ ra" lịch.
- **Minder làm gì:**
  1. Đọc nhu cầu tuần từ supply chain, tồn thành phẩm, tồn bột/vỏ viên/nắp/hộp, lịch ca, lịch bảo trì và vệ sinh.
  2. Tạo 2–3 kế hoạch nháp theo **đúng mẫu nhà máy đang dùng**, kèm dự báo kết quả và những thay đổi so với tuần trước.
  3. Người lập kế hoạch sửa trực tiếp; Minder kiểm tra lại ràng buộc và dự báo lại.
  4. Trưởng phòng Sản xuất duyệt.
  5. Trong tuần, khi có sự cố (từ UC3), Minder đề xuất điều chỉnh kế hoạch.
- **Không làm:**
  - Không thay dự báo nhu cầu của supply chain (chỉ dùng làm đầu vào).
  - Giai đoạn đầu không tự đẩy lệnh vào SAP hay MES: xuất file để người duyệt nhập.
  - Không thay người lập kế hoạch ra quyết định.
  - Không lập kế hoạch nửa năm.
- **Cần gì từ nhà máy:**
  - 8–12 kế hoạch tuần gần nhất và sản lượng thực tế tương ứng.
  - Mẫu kế hoạch đang dùng.
  - Lịch sử chuyển đổi SKU.
  - Danh sách ràng buộc cứng (vệ sinh, thời gian lưu bột, tương thích SKU–dây chuyền).
  - Người lập kế hoạch ~4 giờ/tuần để chấm kế hoạch nháp.
- **Deliverable:**
  - Tác nhân lập kế hoạch tuần.
  - Ma trận chuyển đổi học từ dữ liệu.
  - Báo cáo thi trên 8–12 tuần lịch sử: kế hoạch nháp so với kế hoạch đã chạy.
  - 4 tuần chạy song song với kế hoạch thật.
- **KPI (đề xuất, chốt sau khảo sát):**
  - Thời gian lập kế hoạch tuần từ ~3 ngày xuống ≤ ½ ngày.
  - 100% kế hoạch nháp thỏa ràng buộc cứng.
  - ≥70% dòng kế hoạch được giữ nguyên.
  - Sai số dự báo sản lượng tuần ≤ X%.
  - Trên dữ liệu lịch sử, kết quả không kém kế hoạch đã chạy.
- **Giá trị:** `~2,5 ngày công × số người × 52 tuần` + `giờ chuyển đổi giảm × sản lượng/giờ`.

### UC2: Hao hụt bột tính tự động từ dữ liệu máy (khâu Vận hành)

- **Bài toán:** hao hụt bột hiện được cân và ghi tay. Việc này tốn công, dễ bỏ sót, nên số liệu không đều giữa các ca.
- **Phần tính toán (không phải mô hình):** cân bằng vật chất theo ca và lô.
  - Công thức: `bột cấp vào − (số viên đạt × khối lượng chuẩn) − (viên loại × khối lượng) − tồn phễu = hao hụt`.
  - Tách theo nguyên nhân: định lượng dư (gram dư/viên), viên loại ở cân kiểm, xả khi chuyển đổi SKU, vệ sinh, phần không giải thích được.
- **World Model học gì và dự báo gì:**
  - Học mức hao hụt và gram dư/viên **bình thường** theo SKU, lô bột, độ ẩm phòng và tốc độ vít định lượng.
  - Dự báo hao hụt kỳ vọng của mỗi ca. Khi ca thực tế lệch, chỉ ra yếu tố đi kèm (lô bột, độ ẩm, chuyển đổi).
  - Dự báo xu hướng trôi của định lượng trước khi cân kiểm bắt đầu loại viên.
- **Minder làm gì:**
  1. Tự điền số hao hụt theo nguyên nhân vào báo cáo ca, thay cho dòng nhập tay.
  2. Cảnh báo ca hoặc lô có hao hụt bất thường.
  3. Đề xuất điều chỉnh định lượng trong giới hạn đã duyệt; Sản xuất và QA quyết định.
- **Không làm:**
  - Không thay cân kiểm kê cho mục đích kế toán. Vẫn cần cân đối chiếu định kỳ (ví dụ 1 lần/tuần) để hiệu chuẩn.
  - Không đo được bột rơi vãi ở chỗ không có điểm đo.
  - Không tự chỉnh vít định lượng.
  - Không ảnh hưởng tới khối lượng tịnh đã đăng ký.
- **Cần gì từ nhà máy:**
  - Dữ liệu vít định lượng L1/L2.
  - Cân kiểm viên: khối lượng từng viên và số viên loại.
  - Lượng bột cấp theo lô, từ SAP hoặc loadcell silo/phễu (**cần khảo sát xem có loadcell không**).
  - Sự kiện chuyển đổi SKU.
  - Số liệu hao hụt ghi tay 3–6 tháng gần nhất để đối chiếu.
- **Deliverable:**
  - Bảng cân bằng bột theo ca, tuần và nguyên nhân.
  - Báo cáo gram dư/viên theo SKU và dây chuyền.
  - Cảnh báo hao hụt bất thường.
- **KPI (đề xuất):**
  - ≥90% số ca có số hao hụt tự động.
  - Sai lệch so với cân đối chiếu ≤ ±X%.
  - ≥80% hao hụt được gán nguyên nhân.
  - Gram dư/viên giảm so với baseline.
  - 0 vi phạm khối lượng tịnh.
- **Giá trị:** `kg bột tiết kiệm × giá bột/kg` + `số phút nhập tay/ca × số ca/năm`.
- **Nói trước trên trang:** nếu không có điểm đo lượng bột cấp vào, giai đoạn đầu chỉ cam kết phần định lượng dư và viên loại, vì hai phần này đo được trực tiếp.

### UC3: Chống dừng máy do môi trường phòng chiết rót (khâu Dự báo và Phục hồi, **hero**)

- **Bài toán:** phòng chiết rót có cảm biến nhiệt độ và độ ẩm. Đã có lần độ ẩm vượt chuẩn khiến dây chuyền dừng nguyên một ca. Hệ thống hiện tại báo khi *đã vượt*.
- **World Model học gì và dự báo gì:**
  - Học cách RH và nhiệt độ của từng vùng **phản ứng** với các yếu tố: trạng thái AHU (tốc độ bánh xe hút ẩm, nhiệt độ tái sinh, lưu lượng gió, chênh áp lọc), chiller, thời tiết bên ngoài (mùa mưa Đồng Nai), tải dây chuyền, và các lần mở cửa hoặc vệ sinh.
  - Dự báo RH vài giờ tới kèm khoảng tin cậy.
  - Dự báo AHU suy giảm theo ngày (demo: AHU-02 "~5 ngày tới ngưỡng").
  - **So sánh phương án trước khi làm**, ví dụ "bảo trì AHU-02 trong cửa sổ dừng thứ Năm so với để đến cuối tuần: rủi ro vượt ngưỡng bao nhiêu".
  - Nói "không biết" khi gặp tình huống chưa có dữ liệu.
- **Minder làm gì:**
  1. **Trước:** cảnh báo sớm cho bảo trì và trưởng ca, kèm checklist và lần xử lý tương tự trước đó (demo: "The same pattern came before the stop on Sep 4"); đề xuất cửa sổ bảo trì ít ảnh hưởng sản lượng nhất.
  2. **Nếu vẫn vượt ngưỡng:** tự mở hồ sơ sự cố, nối với phòng, khoảng thời gian, lô, mẻ và SKU để QA quyết định về lô.
  3. **Tính tác động** lên sản lượng của ngày và đơn hàng.
  4. **Chuyển sang UC1** để soạn phương án điều chỉnh kế hoạch; Trưởng phòng Sản xuất duyệt.
  5. **Sau:** kết quả thực tế được chấm so với dự báo, và mô hình học tiếp. Đây là vòng Tự học.
- **Không làm:**
  - Không điều khiển AHU hay BMS.
  - Không đổi ngưỡng QA (ngưỡng lấy từ tiêu chuẩn nhà máy).
  - Không quyết định xuất hay hủy lô.
  - Không thay báo động BMS hiện có.
  - **Không cam kết "0 dừng máy"**: thiết bị hỏng cơ khí vẫn cần bảo trì sửa. Giá trị nằm ở việc biết sớm để chủ động.
- **Cần gì từ nhà máy:**
  - Tag cảm biến RH/T và AHU, tần suất ghi ≥1 phút.
  - **Lịch sử ≥6–12 tháng**, nếu có lưu.
  - Nhật ký dừng máy có mã nguyên nhân.
  - Hồ sơ sự cố dừng ca do độ ẩm.
  - Ngưỡng QA của phòng.
  - Lịch bảo trì HVAC; đầu mối bảo trì.
- **Deliverable:**
  - Màn giám sát môi trường và AHU.
  - Mô hình dự báo RH và mô hình phát hiện bất thường đa biến.
  - Quy tắc gửi cảnh báo (ai nhận, kênh nào).
  - Hồ sơ sự cố tự động.
  - **Báo cáo thi trên lịch sử**: với các lần RH tiến gần hoặc vượt ngưỡng, mô hình báo trước được bao lâu.
- **KPI (đề xuất):**
  - Báo trước ≥2 giờ cho ≥80% các lần vượt hoặc suýt vượt ngưỡng trong lịch sử.
  - Cảnh báo sai ≤ N lần/tuần (N do bảo trì chọn).
  - Truy vết đúng lô ≥95%.
  - Số giờ dừng do môi trường, trước và sau.
- **Giá trị:** `giờ dừng tránh được × sản lượng hộp/giờ × biên đóng góp/hộp` + chi phí giữ và xét lô.
- **Điểm cần nói thật:** chỉ có 1 sự cố dừng ca thì không đủ để chứng minh thống kê. Vì vậy phải thi trên *mọi* lần RH vượt hoặc tiến gần ngưỡng. Nếu nhà máy không lưu lịch sử RH, cần 4–8 tuần thu thập trước khi có KPI. Nói điều này trên deck sẽ tăng độ tin cậy, và cũng khớp với nguyên tắc "mô hình biết khi nào nó không biết" mà deck đang dùng.

### Mở rộng sau (nêu tên, không đi chi tiết)

Dừng ngắn và điểm nghẽn; sẵn sàng sản xuất; Jar Line và các dây chuyền khác; khu chiết xuất và sấy; các nhà máy Nestlé Việt Nam. Tất cả dùng chung World Model và bản đồ liên kết đã xây ở Dolce Gusto. Phần này giữ đúng câu chuyện **Nhân rộng**.

---

## 2. Quyết định theo từng section

Các section tầm nhìn về World Model được **giữ**. Chỉ sửa những chỗ đang tham chiếu tới 6 ứng dụng cũ hoặc tới số liệu không khớp dây chuyền.

| # | Section | Quyết định | Cần sửa |
| --- | --- | --- | --- |
| 1 | `#mo-dau` | **Giữ**, sửa nhẹ | Giữ tiêu đề World Model. Thêm một dòng cụ thể dưới tiêu đề, ví dụ: *"Bắt đầu với 3 bài toán trên dây chuyền NESCAFÉ Dolce Gusto: kế hoạch tuần, hao hụt bột, chống dừng máy do môi trường."* Thay câu hỏi nhanh "Bộ đề thi kín hoạt động thế nào?" bằng "Giai đoạn đầu cần những dữ liệu nào?". |
| 2 | `#tu-chu` | **Giữ** | Có thể thêm sơ đồ dây chuyền Dolce Gusto thật (bột → chiết rót → phòng kiểm soát → hàn màng → cân kiểm → đóng hộp → pallet) và luồng lập kế hoạch, đánh dấu 3 điểm use case chạm vào. Đây là cách chứng minh ta đã nghe khảo sát. |
| 3 | `#ky-nguyen` (M2) | **Giữ** | — |
| 4 | `#hai-con-duong` (M3) | **Giữ**, sửa số | Đổi số liệu minh họa cho khớp L1/L2 và "Phòng chiết rót – Vùng L2". Thêm bước "dự báo trước" vào phương án B (cảnh báo AHU trước khi vượt ngưỡng), không chỉ có truy vết sau sự cố. |
| 5 | `#sieu-thong-minh` (M1) | **Giữ**, sửa ví dụ | Bước 2 "Dự báo trước" đang có phương án "Chuyển sang Line 3", mà dây chuyền không có Line 3. Đổi ví dụ thành dự báo RH hoặc AHU, hoặc thành "Tăng ca L2 / sắp lại SKU". Cân nhắc làm mềm "thông minh hơn theo cấp số nhân", vì anh Phương sẽ hỏi bằng chứng. |
| 6 | `#ba-lop` (M7) | **Giữ**, bổ sung | Lớp ③ đang ghi "Năm tác nhân", đổi thành 3 tác nhân của 3 use case + tác nhân báo cáo. **Thêm khối "Kiến trúc triển khai"** (xem §3) ngay dưới M7, vì đây là câu trả lời trực tiếp cho câu hỏi "technical architecture". |
| 7 | `#mot-ngay` (M5) | **Giữ** | Mốc 1/6 (06:00) nên đổi thành một khoảnh khắc của 3 use case, ví dụ "Minder báo AHU-02 cần xử lý trong cửa sổ dừng thứ Năm". |
| 8 | `#ban-do` (M8) | **Giữ**, sửa đảo ① | Đổi "Câu hỏi mô hình trả lời" của đảo ① cho khớp 3 use case: Lịch tuần nào khả thi và cho kết quả tốt nhất? · Ca này hao hụt ở đâu, vì sao? · Bao giờ phòng chiết rót có nguy cơ vượt ngưỡng, và xử lý trước thế nào? |
| 9 | `#use-case` (M18) | **Viết lại** (lõi của bản sửa) | 6 thẻ thành 3 thẻ + nền, theo khuôn 9 dòng ở §1. Tiêu đề đổi thành ví dụ: *"Ba bài toán đầu tiên trên dây chuyền Dolce Gusto, cùng chạy trên một Mô hình AI Thế giới thực"*. Thêm một bảng tóm tắt ở đầu section: use case × World Model làm gì × KPI × thời điểm × Nestlé cung cấp gì. |
| 10 | `#lo-trinh` (M15, M10, M16, M17) | **Giữ cấu trúc, đổi nội dung use case** | Xem §4. Phần còn trống ở T+7, T+8, T+9 do bỏ 04/05/06 dùng để **đào sâu** 3 use case, không thêm use case mới. |
| 11 | `#thu-ngay` | **Sửa hero + thêm Demo video** | Hero mới chạy theo thứ tự *dự báo trước → (nếu vẫn xảy ra) tác động → lập lại kế hoạch → duyệt → tự học*, với tên L1/L2, Vùng L2, AHU-02 theo demo. Bỏ "Line 3", "Phòng kiểm soát 2", "P102". Thêm video theo khuôn Isuzu (xem §5). |
| 12 | `#hop-tac` | **Giữ** | Đổi "Ba hạng mục" thành **bảng deliverables theo use case**, lấy từ §1. Giữ nguyên các mục "Ngoài phạm vi thử nghiệm đầu tiên" và cam kết. |
| 13 | `#hai-ben` | **Giữ** | — |
| 14 | `#thu-ngo` | **Giữ**, sửa 2 chỗ | "sáu ứng dụng" đổi thành "ba bài toán đầu tiên". "Kết quả dự kiến sau 12 tháng: 6 ứng dụng chạy thật" đổi theo use case mới. Cân nhắc thêm agenda cho buổi làm việc tại nhà máy tuần tới. |

---

## 3. Khối "Kiến trúc triển khai" (thêm dưới #ba-lop)

M7 nói World Model *là gì*. Khối này nói *dữ liệu chạy qua đâu* trên dây chuyền Dolce Gusto:

```
NGUỒN (chỉ đọc)                       ① NỀN TẢNG GHI LẠI           ② MÔ HÌNH AI THẾ GIỚI THỰC          ③ TÁC NHÂN AI → NGƯỜI DUYỆT
PLC L1/L2 (vít định lượng, hàn  ──┐
 màng, đóng hộp, robot pallet)     │  OPC UA / historian replica   Bản đồ liên kết dây chuyền         Tác nhân báo cáo → Trưởng ca
Cảm biến RH/T phòng chiết rót     ├─► qua gateway trong mạng OT ─► Dự báo RH, AHU          (UC3) ──► Tác nhân môi trường → Bảo trì, QA
BMS / AHU-01/02, chiller          │                                Hao hụt kỳ vọng, định lượng (UC2)  Tác nhân hao hụt → Sản xuất
Cân kiểm viên                   ──┘                                Năng lực, chuyển đổi, kết quả lịch  Tác nhân kế hoạch → Kế hoạch,
SAP/MES: lệnh sản xuất, cấp bột ───► API / file định kỳ             (UC1)                               Trưởng phòng Sản xuất
Nhu cầu supply chain, Excel KH  ───►                               + Cân bằng vật chất, bộ giải tối ưu
Sổ ca, dừng máy                 ───►                               (tính toán, không phải dự báo)
                                         ▲                                                                   │
                                         └──────────── quyết định đã duyệt + kết quả thực tế ◄──────────────┘  (Tự học)
```

Các dòng cần ghi rõ trên trang:

- **Triển khai:** máy chủ trong nhà máy hoặc vùng cloud Nestlé duyệt. Chỉ đọc: không ghi vào PLC, BMS, SAP hay MES. Mất kết nối thì dây chuyền vẫn chạy bình thường.
- **Phân vai:** World Model dự báo; bộ giải tối ưu đảm bảo ràng buộc; cân bằng vật chất là công thức; LLM chỉ đọc đầu vào và giải thích. Mọi con số truy được về dữ liệu gốc.
- Chi tiết kỹ thuật sâu (conformal, doubly robust, JEPA) **giữ ở phụ lục** như hiện tại.

---

## 4. #lo-trinh: cập nhật "Ứng dụng đưa vào"

Giữ 4 giai đoạn, các cổng và M16/M17. Chỉ thay phần use case:

| Giai đoạn | Use case đưa vào |
| --- | --- |
| **Thử nghiệm T+1–T+4** | Nền báo cáo ca/ngày/tuần dùng thật từ T+1 · UC3 thi trên lịch sử RH/AHU từ T+2 · UC2 đối chiếu với số cân tay từ T+2 · UC1 thi trên 8–12 tuần kế hoạch đã chạy từ T+3 |
| **Triển khai T+5–T+8** | UC3 cảnh báo sớm dùng thật (T+5) · UC1 kế hoạch nháp chạy song song rồi dùng thật (T+6) · UC2 hao hụt tự điền báo cáo ca, thay nhập tay (T+6) · **Nối 3 use case**: sự cố môi trường → tác động → điều chỉnh kế hoạch trong tuần (T+7–T+8) |
| **Nhân rộng T+9–T+12** | UC2 đề xuất điều chỉnh định lượng (T+9) · đưa 3 use case sang Jar Line và các dây chuyền khác (T+9–T+11) · kế hoạch chung cho dây chuyền dùng chung nguồn bột (T+11) |
| **Năm thứ 2** | Giữ nguyên |

**Cổng 2 (T+4)** đổi thành: UC3 báo trước đạt KPI trên lịch sử · UC1 thỏa 100% ràng buộc và không kém kế hoạch đã chạy · UC2 sai lệch trong ngưỡng đã chốt.

**"Nhà máy Nestlé Trị An chỉ cần 3 việc"**: giữ 3 việc, nhưng thêm **bảng dữ liệu cần theo từng use case** (lấy từ dòng "Cần gì từ nhà máy" ở §1). Thêm giờ chuyên gia Bảo trì HVAC ~2 giờ/tuần ngay từ giai đoạn Thử nghiệm, vì UC3 cần người này.

---

## 5. Demo video (đặt trong #thu-ngay, theo khuôn Isuzu)

Dùng `kind: "video"` với nhãn `[Mô phỏng]` "Dữ liệu mô phỏng phục vụ demo", giống `decks/isuzu-vietnam/content.vi.ts`. Đề xuất 3 clip đi theo quy trình:

1. **Bản đồ dây chuyền + UC3**: Mô hình nhà máy → Tổng quan Site Manager → "Cảnh báo cần xử lý" (RH Vùng L1/L2, AHU-02) → Phát hiện lỗi → mở cảnh báo đa biến.
2. **UC2**: "Cân bằng nguyên liệu theo tuần" → tách nguyên nhân → hỏi Minder "Tuần này hao hụt tăng ở đâu?".
3. **UC1 + báo cáo**: Việc định kỳ → "Lập kế hoạch sản xuất tuần" → kết quả → Shift report → bấm "Chạy ngay".

**Cần sửa trên demo trước khi quay** (nhìn từ 4 ảnh chụp):

- Đang quay ở chế độ dev: badge "Compiling…" và icon "N" của Next.js lộ ở góc trái dưới. Quay lại trên bản build production.
- Lẫn Anh và Việt: "Modeled nodes", "Process routes", "Production flow", "Open model", "Open chart", "Manage dashboards", tiêu đề cảnh báo "Motor temperature…", "Air pressure…", tên việc "Shift report", "Daily energy report", "Critical alerts to maintenance", phần Chỉ dẫn viết tiếng Anh.
- Cột bảng lộ tên kỹ thuật `loai`, `doi_tuong`, `tinh_trang` (và `trieu_vnd`). Đổi thành "Loại / Đối tượng / Tình trạng".
- Biểu đồ "Sản lượng theo ngày" có trục X theo **giây** (01:45:36 → 01:46:06), số nhảy từ 0 lên 30.000. Người làm sản xuất sẽ thấy ngay là dữ liệu giả. Phải sửa thành trục theo ngày.
- Ô bị cắt chữ ("~7 ngày tới ngư…"). Cần cho xuống dòng.
- Như bài học từ Isuzu: soát video xem có lộ tên khách hàng khác.

---

## 6. Cần Jayson chốt

1. **Cách nêu bài toán trên trang.** Quy tắc cũ là không nêu điểm yếu của nhà máy. Nhưng anh Phương hỏi thẳng "what problems it is designed to solve". Đề xuất: ghi thành **"Bài toán anh chị đã chia sẻ"**, giọng trung tính, bằng dữ kiện ("kế hoạch tuần ~3 ngày công", "hao hụt bột đang ghi tay"). Không bao giờ ghi kiểu "nhân viên không muốn thu bột".
2. **Con số KPI mục tiêu** (báo trước ≥2 giờ cho ≥80% trường hợp; ≥90% số ca có hao hụt tự động; kế hoạch ≤ ½ ngày; ≥70% dòng được giữ nguyên) là cam kết hiệu năng. Cần duyệt trước khi lên trang.
3. **Thứ tự số:** đánh UC theo quy trình (Kế hoạch → Vận hành → Phục hồi) như trên, hay đưa độ ẩm lên UC1 vì là hero.
4. **Phí thử nghiệm:** giữ "chốt sau khảo sát", hay mang một khoảng giá đến buổi gặp tuần tới.

---

## 7. File cần sửa khi triển khai

- `decks/nestle-vietnam/usecases.ts`: thẻ M18 giảm từ 6 xuống 3 + nền. Có thể cần mở rộng kiểu dữ liệu trong `decks/types.ts` để thêm các trường "World Model học gì", "Không làm", "Cần gì", "Deliverable".
- `decks/nestle-vietnam/content.vi.ts`: #use-case (tiêu đề, bảng tóm tắt), #ba-lop (khối kiến trúc), #thu-ngay (hero + video), #hop-tac (deliverables), #thu-ngo (sáu thành ba), #mo-dau (dòng phụ).
- `decks/nestle-vietnam/scenarios.ts`: M3 và M1 (bỏ Line 3, đổi số), M5 (mốc 06:00), M8 (câu hỏi đảo ①), M15/M10 (ứng dụng theo tháng, Cổng 2).
- `decks/nestle-vietnam/faq.ts`, `assistant.ts`, `knowledge.ts`: **bắt buộc cập nhật** để chat AI không còn trả lời theo 6 ứng dụng. Sau đó chạy `npm run knowledge:build`.
- `public/decks/nestle-vietnam/`: thêm video và poster.
- `docs/nestle-content-v4.md`: nguồn nội dung mới, sạch, không ghi chú, để gửi sếp duyệt. Sau đó chạy `content:check` và xuất lại `docs/landing-export/nestle-vietnam.md`.
