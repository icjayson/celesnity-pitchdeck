# Nhà máy siêu thông minh: Nestlé Trị An × Celesnity
### Nội dung landing page v1, theo dạng section (03/10/2026)

> **Ghi chú biên tập (không hiển thị trên trang)**
> - **Audience:** Giám đốc nhà máy (Site Manager) và Trưởng phòng Sản xuất (Production Manager) tại Nhà máy Nestlé Trị An. Cả hai mạnh về kỹ thuật sản xuất, nên nội dung phải nói đúng ngôn ngữ vận hành và nêu rõ phương pháp, ranh giới, cách đo.
> - **Cấu trúc:** giữ khung của bản Hòa Phát v4 (3 hồi, section `#...`, [Tương tác Mx], lớp "Xem chi tiết"). Mã module trùng bản Hòa Phát ở những chỗ dùng lại được.
> - **Quy ước câu chữ:**
>   - **Tự học · Dự báo trước · Nhân rộng**
>   - "Mô hình AI Thế giới thực (World Model)"
>   - "trí thông minh"
>   - "Tác nhân AI"
> - **Không nói điểm yếu của nhà máy.** Những gì nhà máy chia sẻ nội bộ chỉ dùng để chọn bài toán, không đưa lên trang như "vấn đề". Đó là các điểm: kế hoạch nửa năm lệch, kế hoạch tuần mất 3 ngày, ghi chép cuối ca bằng tay, độ ẩm từng gây dừng nửa ngày.
> - **Định vị:** Nestlé đã có hệ thống sản xuất chung, SAP, giám sát thiết bị, mô phỏng. Vì vậy:
>   - Celesnity **bổ sung**, không thay thế hệ thống nào.
>   - Không giới thiệu bảo trì dự đoán như một khái niệm mới.
>   - Không đưa chatbot làm điểm bán.
> - **Về con số:**
>   - Mọi con số minh họa đều ghi rõ là minh họa.
>   - Mọi dữ liệu kịch bản trong tương tác mang nhãn **"Mô phỏng minh họa"**.
>   - Không đưa ROI hay hiệu quả của Celesnity khi chưa có số nền của nhà máy.
> - **Cần xác minh trước khi gửi:**
>   - thứ tự công đoạn chính xác của dây chuyền Dolce Gusto;
>   - tên dây chuyền, số dây chuyền;
>   - hệ thống đang dùng (MES, historian, SAP, QMS);
>   - danh mục sản phẩm hiện tại của Đồng Nai, Bình An, Bông Sen.
> - **Còn mở:** tên chương trình "Nhà máy siêu thông minh". Phương án thay thế cho audience kỹ thuật là "Vòng quyết định khép kín".

---

## `#mo-dau` · Mở đầu

**[Tương tác M1: "Nhà máy sống", dây chuyền viên nang, trạng thái 0]**

# NHÀ MÁY SIÊU THÔNG MINH
## Một vòng quyết định khép kín cho nhà máy cà phê Trị An

**Tự học · Dự báo trước · Nhân rộng**

Nestlé Trị An × Celesnity · Đề xuất thử nghiệm và lộ trình ứng dụng · Tháng 10/2026 · Tài liệu thảo luận

*Cuộn xuống để bắt đầu ↓*

---

## `#thu-ngo` · Thư ngỏ

### Kính gửi Ban Giám đốc Nhà máy Nestlé Trị An

Celesnity xin cảm ơn Quý vị đã dành thời gian cho đề xuất này.

Trị An vận hành những dây chuyền cà phê hiện đại bậc nhất của Nestlé trong khu vực. Máy móc, cảm biến và hệ thống sản xuất đều đã ở mức cao. Khoảng trống còn lại nằm **giữa** các hệ thống. Khi một sự việc xảy ra trên chuyền, cần trả lời: nó ảnh hưởng đến lô nào, kế hoạch nào, đơn hàng nào, và nên xử lý thế nào.

Celesnity đề xuất thử nghiệm một **vòng quyết định khép kín** trên dây chuyền **NESCAFÉ Dolce Gusto**: lập kế hoạch → vận hành → phát hiện sai lệch → tính tác động → đề xuất phương án phục hồi → người có thẩm quyền duyệt. Vòng này chạy trên một Mô hình AI Thế giới thực học từ dữ liệu vận hành của chính Trị An.

**Cách làm:** khảo sát 2–4 tuần, sau đó thử nghiệm 12 tuần. Dữ liệu chỉ đọc. Không thay hệ thống nào và không lắp thêm cảm biến.

**Cách chứng minh:** Nestlé giữ bộ đề thi kín trên dữ liệu lịch sử của nhà máy. Mô hình phải thi đạt trước khi được dùng. Nếu nó không hơn cách làm hiện tại, chúng tôi báo cáo đúng như vậy và giữ cách làm đơn giản hơn.

**Ranh giới:** mô hình chỉ đề xuất. Điều khiển, interlock, thông số an toàn thực phẩm và quyết định QA giữ nguyên quyền hiện tại.

**Lộ trình:** dây chuyền Dolce Gusto → các dòng sản phẩm khác tại Trị An → các nhà máy Nestlé khác tại Việt Nam. Mỗi bước chỉ mở khi bước trước đã có kết quả được kiểm chứng.

Trân trọng,
**Celesnity**, đơn vị phát triển nền tảng Minder

---
---

# HỒI 1 · TRỊ AN VÀ BƯỚC TIẾP THEO

## `#tri-an` · Trị An hôm nay

### Trị An là một trong những nhà máy chế biến cà phê có quy mô và công nghệ hiện đại nhất của Nestlé trong khu vực

**[Hình: các dòng sản phẩm của Trị An, sáng lần lượt khi cuộn]**

- **Danh mục:** NESCAFÉ, NESCAFÉ Dolce Gusto, Nespresso, Starbucks, Blue Bottle.
- **Đầu tư:** hơn 500 triệu USD từ năm 2011, trong đó 100 triệu USD bổ sung năm 2024.
- **Xuất khẩu:** hơn 29 quốc gia.
- **Jar Line mới (8/2026):** công suất ban đầu hơn 350.000 hũ/ngày cho 11 thị trường xuất khẩu. Dây chuyền có cảm biến và camera thời gian thực, kiểm tra thủy tinh trước chiết rót, dò kim loại, hàn màng cảm ứng và X-ray cuối chuyền.
- **Tập đoàn:**
  - Cà phê là một trong bốn mảng chiến lược của Nestlé (2/2026).
  - Nestlé có 335 nhà máy tại 75 quốc gia.
  - Hệ thống sản xuất chung đã phủ gần 90% số nhà máy.

> Máy móc và dữ liệu đã có. Bước tiếp theo là **nối các quyết định**.

---

## `#ky-nguyen` · Kỷ nguyên tiếp theo của sản xuất

### Thế hệ AI tiếp theo hiểu được hệ thống vật lý phản ứng thế nào trước mỗi quyết định

**[Tương tác M2: Ba làn sóng]**

| Làn sóng | AI làm được gì | Lợi thế thuộc về |
|---|---|---|
| **Tự động hóa** | Lặp lại thao tác đã lập trình | Ai có máy móc |
| **AI ngôn ngữ** | Đọc, viết, trả lời câu hỏi | Ai có mô hình ngôn ngữ; nay đã phổ biến |
| **Mô hình AI Thế giới thực** *(World Model)* | **Dự báo hệ quả của một hành động lên một hệ thống vật lý, trước khi làm** | **Ai có dữ liệu quyết định vận hành thật** |

Các tập đoàn công nghệ đang đầu tư lớn vào AI cho thế giới vật lý (NVIDIA Cosmos, Meta V-JEPA 2). Nhưng mô hình cho một nhà máy cụ thể không mua sẵn được. Nó phải học từ dữ liệu vận hành thật: trạng thái nào, quyết định gì, kết quả ra sao.

---

## `#cau-hoi` · Câu hỏi chiến lược

### Khi dây chuyền đã hiện đại nhất, lợi thế tiếp theo nằm ở đâu?

**[Tương tác M3: các lớp hệ thống, lớp trên cùng sáng lên]**

| Lớp | Trả lời câu hỏi | Ví dụ |
|---|---|---|
| Điều khiển và tự động hóa | Máy có chạy đúng thông số không? | PLC, SCADA, interlock |
| Hệ thống sản xuất và ERP | Kế hoạch là gì, đã sản xuất bao nhiêu? | MES, SAP |
| Giám sát và phân tích | Điều gì đang bất thường? | Cảnh báo, giám sát thiết bị, camera kiểm tra |
| **Vòng quyết định khép kín** | **Sự việc này ảnh hưởng gì đến kế hoạch, và nên làm gì tiếp?** | **Mô hình AI Thế giới thực và Tác nhân AI** |

Mỗi hệ thống làm tốt việc trong phạm vi của nó. Còn những câu hỏi cắt ngang nhiều hệ thống thì chưa nằm trọn trong hệ thống nào:
- Độ ẩm vượt ngưỡng thì lô nào bị ảnh hưởng?
- Kế hoạch tuần này còn đạt không?
- Nên tăng ca hay dời SKU?

Đó là nơi kinh nghiệm của kỹ sư tạo ra nhiều giá trị nhất. Đó cũng là nơi một mô hình có thể giúp so sánh phương án nhanh hơn.

> **Celesnity không thay thế hệ thống nào.** Mô hình đọc từ các hệ thống hiện có và trả lời những câu hỏi nằm giữa chúng.

---
---

# HỒI 2 · MỘT VÒNG QUYẾT ĐỊNH KHÉP KÍN

## `#vong-khep-kin` · Nhà máy siêu thông minh là gì

### Lập kế hoạch, vận hành và phục hồi trên cùng một mô hình

**[Tương tác M1: "Nhà máy sống", vòng lặp sáng theo cuộn]**

**Nhu cầu → Kế hoạch → Duyệt → Thực hiện → Quan sát trạng thái → Phát hiện sai lệch → Chẩn đoán → Tính tác động → Mô phỏng phương án phục hồi → Lập lại kế hoạch → Duyệt ↺**

| Thuộc tính | Nghĩa là | Ví dụ trên dây chuyền viên nang |
|---|---|---|
| **1. Tự học** | Mỗi kế hoạch, sai lệch và cách xử lý trở thành dữ liệu | Thời gian chuyển đổi thực tế của từng cặp SKU được cập nhật sau mỗi lần chạy |
| **2. Dự báo trước** | Dự báo hệ quả của một quyết định trước khi làm, kèm mức độ chắc chắn | Dời lần chuyển đổi 2 giờ thì đơn hàng nào bị ảnh hưởng? |
| **3. Nhân rộng** | Kinh nghiệm của một dây chuyền được mang sang dây chuyền và nhà máy khác | Cách mô hình truy vết sự cố độ ẩm ở Dolce Gusto làm điểm xuất phát cho các dòng bột khác |

### Một mô hình hiểu toàn bộ trạng thái sản xuất, thay vì nhiều công cụ AI riêng lẻ

| | Công cụ AI riêng lẻ | **Một mô hình chung** |
|---|---|---|
| **Phạm vi** | Một công cụ cho kế hoạch, một cho cảnh báo độ ẩm, một cho chiết rót | Kế hoạch, môi trường, chất lượng, chiết rót, đóng gói trong **một trạng thái chung** |
| **Khi có sự cố** | "Độ ẩm vượt 65%" | "Lô P102 thuộc mẻ B042 cần QA xem xét; mục tiêu ngày thiếu 31.400 viên; có 4 phương án phục hồi" |
| **Biết được gì** | Điều gì **đã** xảy ra | Điều gì **sẽ** xảy ra nếu chọn phương án A hay B |
| **Theo thời gian** | Quy tắc đứng yên | Mỗi lần chạy, mô hình học thêm |

Giống **buồng mô phỏng bay**: phi công tập trước khi bay thật. Mô hình không vận hành dây chuyền. Nó giúp người vận hành so sánh trước khi cam kết. **Con người luôn là người quyết định.**

---

## `#ba-lop` · Mô hình hiểu gì về dây chuyền

### Nền tảng ghi lại, Mô hình AI Thế giới thực dự báo, Tác nhân AI hành động; con người phê duyệt

**[Tương tác M7: Ba lớp, chạm từng lớp để mở]**

| Lớp | Vai trò | Làm gì |
|---|---|---|
| **③ Tác nhân AI** | Hành động | Có năm tác nhân AI. **Mọi đề xuất đều được mô hình kiểm tra hệ quả trước khi đến người duyệt.**<br>• **Lập kế hoạch:** soạn lịch sản xuất<br>• **Điều hành ca:** theo dõi tiến độ<br>• **Chất lượng và Môi trường:** truy vết sự cố tới lô<br>• **Tổn thất và Sản lượng:** tính phần mất<br>• **Phục hồi:** soạn phương án |
| **② Mô hình AI Thế giới thực** | Dự báo | Học cách dây chuyền phản ứng với quyết định và sự cố. Dự báo kèm mức độ chắc chắn. Nói "chưa đủ dữ liệu" khi gặp tình huống chưa từng thấy |
| **① Nền tảng dữ liệu** | Ghi lại | Đọc từ MES, historian, ERP, QMS, bảo trì. Đồng bộ mã lô, mã máy và thời gian giữa các hệ thống. Lưu mọi quyết định và kết quả |
| **Con người có thẩm quyền** | Quyết định | Duyệt kế hoạch, phương án phục hồi, quyết định chất lượng và mọi thay đổi vận hành |

↻ **Vòng cải thiện:** quyết định đã duyệt và kết quả thực tế quay lại lớp ①, và mô hình học tiếp.

**Bản đồ trạng thái mà mô hình theo dõi:**

> Nhu cầu → Lệnh sản xuất → SKU và công thức → Lượt chạy → Dây chuyền và máy (chiết rót, đóng hộp, xếp pallet) → Mẻ (lô bột, lô vỏ viên nang, lô hộp) → Phòng kiểm soát nhiệt độ, độ ẩm → Kết quả chất lượng → Sản lượng thực tế → Kế hoạch → Đơn hàng

Có bản đồ này, người vận hành có thể hỏi:
- *"Line 2 đang chạy gì?"*
- *"Hôm nay có kịp kế hoạch không?"*
- *"Còn thiếu bao nhiêu viên SKU Latte?"*
- *"Bắt đầu SKU tiếp theo lúc 16:00 được không?"*
- *"Điều gì đang chặn lần chuyển đổi tiếp theo?"*

**Xem chi tiết: kiến trúc lai, mỗi phần làm đúng việc của nó**

| Thành phần | Dùng cho |
|---|---|
| Mô hình cơ học, cân bằng vật chất | Quan hệ vật lý đã biết |
| Mô phỏng sự kiện rời rạc | Hàng đợi, thứ tự sản xuất, nguồn lực |
| Mô hình học từ dữ liệu | Phần biến động khó mô hình hóa: thời gian chuyển đổi, dừng ngắn, tác động của môi trường |
| Bộ giải tối ưu có ràng buộc | Tạo lịch khả thi; loại mọi phương án vi phạm ràng buộc cứng |
| Mô hình ngôn ngữ | Hiểu câu hỏi và giải thích kết quả. **Không tự nghĩ ra lịch sản xuất** |

Kiến trúc này cho phép truy ngược: thành phần nào đưa ra dự báo, quy tắc nào loại một phương án, và bằng chứng nào đứng sau một lời giải thích.

**Xem chi tiết: Mô hình AI Thế giới thực không phải là**
- Chatbot trả lời từ tài liệu
- Dashboard hay mô hình 3D
- Hệ thống thay thế MES, SAP hay SCADA
- Hệ thống tự điều khiển thiết bị

---

## `#mo-phong` · Thử ra quyết định cùng mô hình

### Một sự cố độ ẩm, từ cảm biến đến kế hoạch phục hồi được duyệt

**[Tương tác M4: Buồng mô phỏng quyết định]** · *Mô phỏng minh họa. Mô hình thật được huấn luyện trên dữ liệu Trị An trong thử nghiệm.*

**Tình huống:** 10:15, độ ẩm Phòng kiểm soát 2 vượt giới hạn cấu hình trong 32 phút.

**Bước 1. Mô hình truy vết**

| Câu hỏi | Trả lời |
|---|---|
| Ở đâu, khi nào? | Phòng kiểm soát 2 · 10:15–10:47 |
| Lô nào có mặt? | Lô bột P102 |
| Thuộc mẻ nào, SKU nào? | Mẻ B042, B043 · SKU Latte |
| Quy tắc chất lượng nào áp dụng? | Theo tiêu chuẩn của nhà máy: lô cần QA xem xét trước khi tiếp tục chiết rót |

**Bước 2. Mô hình tính tác động**

| | |
|---|---|
| Thời gian không sản xuất được | 5,7 giờ |
| Sản lượng đạt chuẩn bị mất (ước tính) | 36.800 viên |
| Mục tiêu SKU Latte hôm nay | Thiếu 31.400 viên |
| Chuyển đổi sang SKU Espresso | Trễ 4,2 giờ |
| Đơn hàng | 2 đơn xuất khẩu có thể bị ảnh hưởng |

**Bước 3. Tác nhân AI soạn phương án, mô hình dự báo kết quả**

| Phương án | Sản lượng bù | Đơn hàng đúng hạn | Chi phí thêm | Cần kiểm tra |
|---|---|---|---|---|
| **A. Tăng ca Line 2** | ~28.000 viên | 1/2 | 4 giờ tăng ca | Lịch vệ sinh Line 2 bị dời |
| **B. Chuyển SKU Espresso sang Line 3** | ~31.000 viên | 2/2 | 1 lần chuyển đổi thêm | Line 3 tương thích công thức |
| **C. Sắp xếp lại SKU ngày mai** | ~19.000 viên | 1/2 | Không | Lô vỏ viên nang cho SKU dời lên |
| **D. Giữ kế hoạch** | 0 | 0/2 | Không | — |

**Bước 4. Quý vị duyệt.** Mô hình chỉ đề xuất; người có thẩm quyền quyết định.

**Bước 5. Cuối ngày.** Sản lượng thực tế hiện ra cạnh dự báo. Mô hình được chấm điểm và **tự học** cho lần sau.

**Ca đặc biệt:** chọn một SKU chưa từng chạy trên Line 3. Mô hình trả lời: *"Chưa có dữ liệu chuyển đổi của SKU này trên Line 3. Thời gian chuyển đổi đang lấy theo thông số kỹ thuật, độ chắc chắn thấp."* Một mô hình tốt phải biết khi nào nó không biết.

*Ngưỡng độ ẩm và cách xử lý lô lấy từ tiêu chuẩn của nhà máy, không do AI đặt.*

---

## `#mot-ngay` · Một tuần trên dây chuyền NESCAFÉ Dolce Gusto

### Từ kế hoạch tuần đến báo cáo ca, AI nằm trong từng bước

**[Tương tác M5: kéo kim đồng hồ]** · *Hình dung tương lai, minh họa cách hệ thống làm việc.*

| Thời điểm | Điều xảy ra | Ai quyết định |
|---|---|---|
| **Thứ Năm, 14:00** | Tác nhân AI lập kế hoạch đưa ra 3 lịch khả thi cho tuần sau, từ nhu cầu, tồn nguyên liệu, công suất máy, công thức, bảo trì và ràng buộc chuyển đổi. Mỗi lịch ghi rõ sản lượng dự kiến, số lần chuyển đổi, tải máy và đơn hàng có rủi ro | Kế hoạch chọn và **duyệt** |
| **Thứ Hai, 05:45** | Kiểm tra sẵn sàng trước ca: công thức, lô bột, lô vỏ viên nang, lô hộp, QA release, vệ sinh, bảo trì. Một lô hộp chưa nhận kho, được đánh dấu trước khi chạy | Trưởng ca xử lý |
| **09:30** | Trưởng ca hỏi: *"Line 2 có kịp chuyển sang Espresso lúc 16:00 không?"* Mô hình trả lời bằng sản lượng còn lại, tốc độ hiện tại và thời gian chuyển đổi thực tế gần nhất | Trưởng ca |
| **10:15** | Độ ẩm Phòng kiểm soát 2 vượt giới hạn. Mô hình nối sự cố với lô, mẻ và quy tắc QA; dây chuyền tạm dừng chờ QA | QA **quyết định** về lô |
| **11:00** | Bốn phương án phục hồi, mỗi phương án có dự báo sản lượng, đơn hàng và chi phí | Trưởng phòng Sản xuất **duyệt** |
| **Cuối ca** | Báo cáo ca tự tạo: nguyên liệu dùng, sản lượng đạt, hao hụt, đối chiếu với số đếm máy. Chênh lệch được nêu rõ | Trưởng ca xác nhận |
| **Cuối tuần** | Mọi dự báo trong tuần được so với thực tế. **Tuần sau, mô hình dự báo tốt hơn tuần này** | |

---

## `#ban-do` · Bản đồ nhân rộng

### Bắt đầu từ dây chuyền NESCAFÉ Dolce Gusto, mở rộng ra toàn nhà máy Trị An, rồi các nhà máy Nestlé Việt Nam

**[Tương tác M8: thu phóng từ viên nang → dây chuyền → nhà máy → bản đồ Việt Nam]**

| | **① Dây chuyền NESCAFÉ Dolce Gusto** | **② Toàn nhà máy Trị An** | **③ Các nhà máy Nestlé Việt Nam** |
|---|---|---|---|
| **Phạm vi** | Một dây chuyền viên nang | Jar Line NESCAFÉ · các dây chuyền viên nang và túi khác · khu chiết xuất và sấy | Đồng Nai · Bình An · Bông Sen |
| **Vai trò** | Nơi bắt đầu | Mở rộng trong nhà máy | Nhân rộng |
| **Thời gian** | Tháng thứ 1–6 | Tháng thứ 7–12 | Năm thứ 2 |
| **Câu hỏi mô hình trả lời** *(ví dụ)* | • Lịch tuần nào khả thi và tốt hơn?<br>• Sự cố này ảnh hưởng lô, đơn hàng nào?<br>• Phục hồi cách nào? | • Một kế hoạch chung cho mọi dây chuyền dùng chung nguồn bột: khu sấy nên chạy SKU nào trước?<br>• Jar Line tăng tốc thì điểm nghẽn chuyển đến đâu? | Theo quy trình của từng nhà máy:<br>• **dòng bột:** định lượng, độ ẩm, chuyển đổi;<br>• **dòng chất lỏng:** bồn chứa, CIP, phối hợp tiệt trùng và chiết rót |
| **Mang sang từ bước trước** | — | Bản đồ trạng thái, Tác nhân AI, quy trình duyệt, dữ liệu môi trường, đội vận hành | Vòng Lập kế hoạch → Vận hành → Phục hồi, cách truy vết tác động, quy trình QA, phương pháp đánh giá |
| **Phải học mới** | — | Định dạng bao bì, công thức, quy trình sản xuất bột | Quy trình mới, thiết bị mới, quy tắc vệ sinh và chất lượng riêng |

**Cùng một nền tảng · cùng một phương pháp đánh giá · mô hình riêng cho từng quy trình.**

*Mỗi nhà máy có khảo sát và bộ đề thi riêng. Những gì mang sang là nền tảng, phương pháp và quy trình, không mặc định mang sang độ chính xác.*

### Vì sao bắt đầu từ dây chuyền Dolce Gusto

- **Đủ các loại quyết định trong một dây chuyền:** kế hoạch, chuyển đổi SKU, môi trường phòng kiểm soát, chất lượng, đóng gói.
- **Dây chuyền hiện đại, dữ liệu tốt,** nên phần lớn thời gian thử nghiệm dành cho bài toán, không phải cho việc lắp đặt.
- **Sản phẩm xuất khẩu, giá trị mỗi giờ cao,** nên kết quả đo được bằng đơn vị rõ ràng.

---
---

# HỒI 3 · LỘ TRÌNH TỪ MỘT DÂY CHUYỀN ĐẾN NESTLÉ VIỆT NAM

## `#use-case` · Danh mục các ứng dụng

### 10 ứng dụng chia theo ba nhóm Lập kế hoạch · Vận hành · Phục hồi

**[Tương tác M9: Bộ khám phá use case, lọc theo nhóm và thời điểm]**

| # | Ứng dụng | Câu hỏi được trả lời | Nhóm | Dùng thật từ |
|---|---|---|---|---|
| **01** | **Báo cáo ca tự động** | Ca này dùng bao nhiêu nguyên liệu, ra bao nhiêu sản phẩm đạt, hao hụt ở đâu? | Vận hành | **T+1** |
| **02** | **Kế hoạch sản xuất tuần** | Lịch nào khả thi và tốt nhất với nhu cầu, nguyên liệu, công suất và chuyển đổi hiện có? | Lập kế hoạch | **T+3** (thi trên lịch sử từ T+2) |
| **03** | **Sự cố môi trường và lô bị ảnh hưởng** | Độ ẩm, nhiệt độ vượt giới hạn thì lô, mẻ, đơn nào bị ảnh hưởng? | Vận hành | **T+3** (thi trên lịch sử từ T+2) |
| **04** | **Phục hồi và lập lại kế hoạch** | Mất 6 giờ thì còn đạt kế hoạch tuần không, và phục hồi bằng cách nào? | Phục hồi | **T+3** |
| 05 | Kế hoạch so với thực tế | Từng dây chuyền và từng đơn có đạt mục tiêu không, và vì sao lệch? | Vận hành | T+4 |
| 06 | Định lượng chiết rót | Định lượng đang lệch về đâu, chỉnh thế nào trong giới hạn QA và khối lượng tịnh? | Vận hành | T+4 |
| 07 | Dừng ngắn và điểm nghẽn | Máy nào dừng, và nguyên nhân thật nằm ở máy trước hay máy sau? | Phục hồi | T+5 |
| 08 | Thứ tự SKU và chuyển đổi | Thứ tự nào ít thời gian vệ sinh, cài đặt và chạy lên nhất? | Lập kế hoạch | T+5 |
| 09 | Sẵn sàng trước mỗi lượt chạy | Công thức, lô nguyên liệu, bao bì, QA release, vệ sinh, máy đã sẵn sàng chưa? | Lập kế hoạch | T+6 |
| 10 | Cửa sổ bảo trì theo kế hoạch | Dùng cảnh báo từ hệ thống giám sát thiết bị hiện có: bảo trì lúc nào ít ảnh hưởng nhất? | Lập kế hoạch | T+6 |
| → | **Toàn nhà máy Trị An** | Jar Line và các dây chuyền đóng gói khác (T+7–T+9) → khu chiết xuất và sấy, kế hoạch chung toàn nhà máy (T+10–T+12) | | |
| → | **Nestlé Việt Nam** | Khảo sát nhà máy thứ hai (T+12) → thử nghiệm tại nhà máy thứ hai (năm thứ 2) | | |

### Thẻ use case: bốn ứng dụng của thử nghiệm

| | **01 Báo cáo ca tự động** | **02 Kế hoạch sản xuất tuần** | **03 Sự cố môi trường và lô bị ảnh hưởng** | **04 Phục hồi và lập lại kế hoạch** |
|---|---|---|---|---|
| **Cơ hội** | Mỗi ca có số liệu nguyên liệu, sản lượng, hao hụt đã đối chiếu, làm nền cho mọi phân tích tổn thất | Kế hoạch viên dành thời gian cho đánh đổi, không cho tổng hợp số liệu | Truy vết tới lô và mẻ ngay khi sự cố xảy ra | Có phương án phục hồi kèm dự báo trong vài phút |
| **AI làm gì** | Trưởng ca nói hoặc nhập ngắn; AI cấu trúc thành báo cáo và đối chiếu với số đếm máy | Bộ giải tối ưu tạo lịch khả thi; mô hình dự báo sản lượng, chuyển đổi và rủi ro của từng lịch | Nối sự kiện môi trường với lô, mẻ, SKU và quy tắc QA của nhà máy | Tính tác động lên sản lượng, kế hoạch, đơn hàng; soạn và dự báo các phương án |
| **Dữ liệu** | Số đếm máy, lệnh sản xuất, ghi nhận của ca | Nhu cầu, tồn kho, công thức, công suất, lịch bảo trì, lịch sử chuyển đổi | Cảm biến môi trường, gán lô theo thời gian, hồ sơ QA | Trạng thái dây chuyền, kế hoạch, đơn hàng, lịch sử phục hồi |
| **Ai quyết định** | Trưởng ca xác nhận | Kế hoạch duyệt | QA quyết định về lô | Trưởng phòng Sản xuất duyệt |
| **Đo bằng** | Chênh lệch với số đếm máy; thời gian lập báo cáo | Sản lượng đạt so với kế hoạch; số giờ chuyển đổi | Lô và mẻ truy đúng so với hồ sơ QA; thời gian truy vết | Sai số dự báo sản lượng mất; số đơn đúng hạn |
| **Tiêu chí đạt** *(đề xuất, chốt sau số nền)* | Chênh lệch trong ngưỡng Sản xuất chấp nhận | **100%** lịch thỏa ràng buộc cứng; trên bộ đề, **không kém** kế hoạch đã dùng | Truy đúng **≥95%** sự cố cũ | Sai số trong ngưỡng thống nhất |

**Xem chi tiết: ứng dụng 05–10**

| Ứng dụng | Cơ hội | Đo bằng |
|---|---|---|
| 05 Kế hoạch so với thực tế | Thấy lệch sớm trong ca, không phải cuối ca | Thời gian phát hiện lệch; tỷ lệ đạt kế hoạch |
| 06 Định lượng chiết rót | Giảm lượng cà phê dư trên mỗi viên mà vẫn đạt khối lượng tịnh | Gam dư trên mỗi viên so với mục tiêu đã duyệt |
| 07 Dừng ngắn và điểm nghẽn | Tách máy dừng khỏi nguyên nhân thật ở trước hoặc sau nó | Số phút dừng lặp lại theo nhóm nguyên nhân |
| 08 Thứ tự SKU và chuyển đổi | Học thời gian chuyển đổi thật của từng cặp SKU | Giờ chuyển đổi trên mỗi tuần, so cùng cơ cấu SKU |
| 09 Sẵn sàng trước mỗi lượt chạy | Phát hiện thiếu sót trước khi chạy, không phải khi đang chạy | Số lần trễ khởi động vì thiếu điều kiện |
| 10 Cửa sổ bảo trì theo kế hoạch | Chọn thời điểm bảo trì theo sản lượng, đơn hàng, nhân lực, phụ tùng | Bảo trì theo kế hoạch so với đột xuất; số lần xáo trộn lịch |

---

## `#lo-trinh` · Lộ trình 12 tháng

### Khảo sát 2–4 tuần, thử nghiệm 12 tuần, mỗi giai đoạn mở bằng một cổng

**[Tương tác M10: Thanh kéo 12 tháng]**

### Khảo sát khả thi: 2–4 tuần

Đi dây chuyền · xếp hạng tổn thất thực tế · xem dữ liệu mẫu · rà soát các hệ thống và chương trình cải tiến đang chạy · làm rõ quyền truy cập, đầu mối và chi phí.

**Đầu ra (dùng được kể cả khi dừng ở đây):**
- tuyên bố bài toán đã ký;
- đánh giá dữ liệu;
- kiến trúc;
- kế hoạch số nền;
- phạm vi và giá thử nghiệm.

→ **Cổng 0**

### Thử nghiệm 12 tuần trên dây chuyền NESCAFÉ Dolce Gusto

| Tuần | Việc | Đầu ra |
|---|---|---|
| **1–2** | Chốt số nền và nguồn dữ liệu. Đồng bộ mã lô, mã máy, thời gian giữa MES, historian, QA. Nestlé dựng **bộ đề thi kín** | Báo cáo chất lượng dữ liệu · giao thức đo |
| **3–5** | Kết nối chỉ đọc. **Bật Ứng dụng 01.** Xây bản đồ trạng thái dây chuyền. Dựng phương án cơ sở để so sánh | **Cổng 1** · Ứng dụng 01 chạy trên chuyền |
| **6–7** | **Thi trên lịch sử của Trị An:** kế hoạch tuần cũ, sự cố môi trường cũ, các lần lệch kế hoạch cũ. Sau đó chạy song song trên ca thật | Kết quả thi |
| **8–11** | Dùng trong công việc hằng ngày, có duyệt: Ứng dụng 02, 03, 04. Ghi lại mọi lần dùng, không dùng và lý do | Bằng chứng vận hành thực tế |
| **12** | Sản xuất và Tài chính đánh giá | **Cổng 2**: mở rộng, điều chỉnh hay dừng |

**Trị An cần làm 3 việc:**
1. **Mở dữ liệu đã có:** chỉ đọc. Không lắp thêm cảm biến, không thay hệ thống hiện tại.
2. **Cử người:** chủ dây chuyền, một kế hoạch viên, đầu mối QA, đầu mối IT/OT. Số giờ cụ thể chốt sau khảo sát. Khối lượng việc thêm cho nhà máy được đo và báo cáo.
3. **Giữ đề thi và chấm điểm.**

### Mười hai tháng

*T+1 là tháng đầu tiên sau khi Nestlé duyệt quyền truy cập dữ liệu và môi trường triển khai.*

| Tháng | Giai đoạn | Ứng dụng | Phạm vi | Cổng |
|---|---|---|---|---|
| **T+1–T+3** | Thử nghiệm | **01 dùng thật** · 02, 03, 04 thi rồi dùng thật | Dây chuyền Dolce Gusto | **Cổng 1, Cổng 2** |
| **T+4** | Dùng thật | 05 Kế hoạch so với thực tế · 06 Định lượng | Dây chuyền Dolce Gusto | |
| **T+5** | Dùng thật | 07 Dừng ngắn · 08 Chuyển đổi | Dây chuyền Dolce Gusto | |
| **T+6** | Dùng thật | 09 Sẵn sàng · 10 Cửa sổ bảo trì | Dây chuyền Dolce Gusto | **Cổng 3** |
| **T+7–T+9** | Mở rộng trong nhà máy | Bộ ứng dụng cho dây chuyền mới | Jar Line và các dây chuyền đóng gói khác | |
| **T+10–T+12** | Mở rộng trong nhà máy | Kế hoạch chung toàn nhà máy | Khu chiết xuất và sấy | **Cổng 4** |
| **Năm thứ 2** | Nhân rộng | Theo khảo sát | Nhà máy Nestlé thứ hai tại Việt Nam | |

### Ai làm gì

| Vai trò | Trách nhiệm |
|---|---|
| **Giám đốc nhà máy** | Ưu tiên, nguồn lực, quyết định tại mỗi cổng |
| **Trưởng phòng Sản xuất, chủ dây chuyền** | Quy trình, phạm vi hành động được phép, chỉ tiêu vận hành |
| **Kế hoạch** | Mục tiêu lập lịch, duyệt lịch |
| **Bảo trì, Kỹ thuật** | Diễn giải thiết bị, giới hạn can thiệp |
| **QA** | Quy tắc chất lượng, quyết định về lô |
| **IT/OT** | Giao diện, hạ tầng, an ninh |
| **Tài chính** | Định nghĩa giá trị, xác nhận kết quả |
| **Celesnity** | Phần mềm, tích hợp, mô hình, đánh giá, hỗ trợ. **2–4 người** gồm kỹ sư hiện trường (FDE) tại Trị An; chốt sau khảo sát |

---

## `#phong-thi` · Nestlé giữ đề thi

### Mô hình phải thi đạt trên dữ liệu của Trị An, do Nestlé chấm, trước khi được dùng

**[Tương tác M11: Phòng thi, phong bì niêm phong và các cánh cửa]**

**Bộ đề thi kín:** Nestlé giữ riêng một phần dữ liệu lịch sử kèm kết quả thật. Celesnity không xem được đáp án; mô hình làm bài, Nestlé chấm.

**So với đâu:** cách làm hiện tại của nhà máy, và một phương án tối ưu thông thường. Mô hình phải hơn **cả hai**. Không đạt thì Celesnity báo cáo kết quả và giữ cách đơn giản hơn.

| Cổng | Tiêu chí | Ngưỡng đạt *(đề xuất, chốt sau số nền)* | Ai chấm |
|---|---|---|---|
| **Cổng 0 (cuối khảo sát)** | Bài toán | Tổn thất được chọn đủ lớn, có chủ sở hữu, kiểm soát được bằng quyết định trong nhà máy | Giám đốc nhà máy |
| | Dữ liệu | Đủ lịch sử kế hoạch và thực tế; sự kiện môi trường gán được tới lô theo thời gian | Đầu mối dữ liệu |
| **Cổng 1 (tuần 5)** | Kết nối | Chỉ đọc, ổn định, không gây tải bất thường lên hệ thống nguồn | IT/OT |
| | Ứng dụng 01 | Báo cáo ca khớp số đếm máy trong ngưỡng chấp nhận | Sản xuất |
| **Cổng 2 (tuần 12), kết thúc thử nghiệm** | Kế hoạch | **100%** lịch đề xuất thỏa ràng buộc cứng; trên bộ đề, sản lượng đạt và giờ chuyển đổi **không kém** kế hoạch đã dùng | Kế hoạch |
| | Truy vết | Xác định đúng lô và mẻ ở **≥95%** sự cố môi trường cũ | QA |
| | Dự báo tác động | Sai số dự báo sản lượng mất trong ngưỡng thống nhất | Sản xuất |
| | Độ tin cậy | Khi mô hình nói "chắc chắn 90%", kết quả đúng trong **85–95%** số lần | Sản xuất, Celesnity |
| | Hữu ích | Người dùng đánh giá hữu ích; khối lượng việc thêm được đo và chấp nhận được | Sản xuất |
| | An toàn | **0** lần ghi trái phép vào hệ thống; kiểm thử bảo mật đạt | IT/OT |
| | Giá trị | Chỉ tiêu vật lý chính cải thiện so với số nền; Tài chính duyệt cách quy đổi | Tài chính |
| **Cổng 3 (T+6)** | Dùng thật | Đủ số ca thật có dùng dự báo; độ tin cậy giữ được trên dữ liệu mới | Giám đốc nhà máy |
| | Mở rộng | Duyệt mở rộng ra toàn nhà máy | Giám đốc nhà máy |
| **Cổng 4 (T+12)** | Giá trị | Tài chính xác nhận giá trị năm **≥ ngưỡng hòa vốn** (xem `#gia-tri`) | Tài chính |
| | Nhân rộng | Đánh giá khác biệt với nhà máy thứ hai; ước tính chi phí chuyển giao | Nestlé, Celesnity |

**Không đạt thì sao:** dừng hoặc điều chỉnh ứng dụng đó. **Không chuyển sang giai đoạn có phí tiếp theo khi cổng chưa đạt.** Một kết quả nghiên cứu không đạt không làm mất giá trị của ứng dụng vận hành đã chạy tốt.

**Xem chi tiết: bốn bước trước khi người vận hành được dùng dự báo**
1. **Thi trên lịch sử:** mô hình chỉ thấy thông tin có tại thời điểm của mỗi quyết định cũ. Tập huấn luyện và tập thi tách theo thời gian.
2. **Chuyên gia chấm:** Kế hoạch, Sản xuất và QA chấm mẫu, kể cả những ca mô hình sai.
3. **Chạy song song:** mô hình chạy trên ca thật nhưng không ai thấy dự báo khi quyết định; kết quả được so sánh sau.
4. **Tư vấn:** người vận hành thấy dự báo kèm bằng chứng và quyết định như trước. Mọi lần không theo dự báo đều được ghi lý do.

**Xem chi tiết: các bậc tự chủ, tính riêng cho từng loại hành động**

| Bậc | Hệ thống được làm gì |
|---|---|
| **0. Quan sát** | Đọc dữ liệu, dựng lại sự kiện, đo tổn thất |
| **1. Tư vấn** | Giải thích bằng chứng, đề xuất hành động được phép |
| **2. Hỗ trợ thực hiện** | Tạo tác vụ hoặc gửi một hành động đã được người duyệt, có giới hạn |
| **3. Vòng kín có giới hạn** | Tự thực hiện một loại hành động đã được cho phép trước, trong phạm vi đã thẩm định |

*Thử nghiệm dừng ở bậc 1. Mỗi bậc tiếp theo là quyết định riêng của Nestlé, cho từng loại hành động, qua quy trình quản lý thay đổi của nhà máy.*

---

## `#gia-tri` · Giá trị, tính bằng số của Trị An

### Đo bằng đơn vị vật lý trước, quy ra tiền sau; Tài chính Nestlé là người xác nhận

**[Tương tác M12: Máy tính giá trị]** · *Nhập số của Quý vị. Tính toán chạy ngay trên trình duyệt, không lưu, không gửi đi.*

| Nguồn giá trị | Đo bằng | Quy ra tiền | Không tính |
|---|---|---|---|
| **Sản lượng bù tại điểm nghẽn** | Giờ sản xuất lấy lại × sản lượng đạt/giờ | × phần nhu cầu thực sự bán được × lợi nhuận biên/sản phẩm | Công suất lý thuyết không có nhu cầu |
| **Lượng cà phê dư** | Gam dư trên viên so với mục tiêu đã duyệt × số viên | × giá thành bột cà phê | Thay đổi do đổi mục tiêu, không do cải thiện quy trình |
| **Hao hụt nguyên liệu và bao bì** | kg hoặc đơn vị hao hụt trên sản lượng tương đương | × giá trị nguyên liệu ròng | Phần đã tính trong sản lượng bù |
| **Giờ chuyển đổi** | Giờ chuyển đổi trên tuần, cùng cơ cấu SKU | Quy về sản lượng bù nếu dây chuyền là điểm nghẽn | Tính hai lần với sản lượng bù |
| **Thời gian lập kế hoạch và báo cáo** | Giờ công được giải phóng | Chỉ tính tiền khi có chi phí thật giảm (tăng ca, thuê ngoài) | Quy giờ tiết kiệm thành tiền mặc định |

**Giá trị ròng/năm = L × r × c − O**

- **L:** tổn thất đủ điều kiện mỗi năm
- **r:** phần giảm được nhờ ứng dụng
- **c:** phần quy được thành giá trị kinh tế
- **O:** chi phí vận hành tăng thêm mỗi năm

**Ngưỡng hòa vốn:** L × r × c ≥ O + I / H, với I là chi phí triển khai một lần, H là số năm đánh giá. Tài chính dùng phương pháp chiết khấu dòng tiền của Nestlé khi duyệt đầu tư.

- **Số thật được điền sau Cổng 0**, từ cây tổn thất và mô hình chi phí do Tài chính Nestlé duyệt.
- **Mỗi chỉ tiêu báo cáo cả hai cách:** thay đổi tuyệt đối và tương đối. Hao hụt từ 10% xuống 8% là giảm 2 điểm phần trăm, tức giảm 20% tương đối.
- **Không tính vào lợi ích:**
  - hóa đơn giảm vì sản lượng giảm;
  - coi mỗi cảnh báo là một lần hỏng tránh được;
  - kết quả của nhà máy hoặc chương trình khác;
  - nhân kết quả một dây chuyền cho cả mạng lưới khi chưa kiểm chứng.

---

## `#kiem-soat` · Nestlé luôn giữ quyền kiểm soát

### Mô hình chỉ đọc và đề xuất; quyền điều khiển và quyền quyết định chất lượng giữ nguyên

**[Tương tác M13: Ranh giới quyền hạn, chạm từng lớp]**

**Bảy cam kết không thay đổi**
1. **Chỉ đọc.** Mô hình không ghi vào PLC, SCADA, MES hay SAP. Mọi thay đổi đi qua người có thẩm quyền và hệ thống hiện có.
2. Interlock, bảo vệ an toàn, thông số đã thẩm định, quyết định QA và xuất lô **giữ nguyên quyền hiện tại**.
3. Ngưỡng, giới hạn và quy tắc xử lý lấy từ tiêu chuẩn của nhà máy, **không do AI đặt**.
4. Dữ liệu nằm trong môi trường Nestlé duyệt (tại chỗ, đám mây riêng hoặc kết hợp) sau đánh giá IT/OT. Không mặc định đưa dữ liệu ra khỏi Việt Nam.
5. Nestlé giữ quyền với dữ liệu thô. Không gộp dữ liệu sang khách hàng khác. Không dùng cho đối thủ.
6. Dữ liệu người lao động **không bao giờ** được dùng để xếp hạng hay kỷ luật cá nhân.
7. Mọi công bố, mọi lần dùng tên hay logo Nestlé cần đồng ý bằng văn bản.

**Ngoài phạm vi thử nghiệm đầu tiên:**
- thay đổi thông số an toàn thực phẩm;
- chu trình vệ sinh đã thẩm định;
- quy tắc chuyển đổi liên quan đến chất gây dị ứng;
- thay nguyên liệu;
- quyết định xuất hay hủy lô.

**Khi mất kết nối:** nhà máy chạy bình thường qua hệ thống hiện có. Hệ thống ghi rõ dữ liệu đã cũ và tạm dừng đề xuất. Không hiển thị dữ liệu cũ như dữ liệu hiện tại.

**Xem chi tiết: an ninh**
- **Mạng và tài khoản:** phân vùng mạng, DMZ công nghiệp nếu có, tài khoản quyền tối thiểu, SSO và phân quyền theo vai trò, mã hóa, nhật ký mọi lần truy cập và mọi lần gọi mô hình.
- **Nội dung đầu vào:** nhật ký nhà máy, tài liệu tải lên và văn bản truy xuất được coi là đầu vào không tin cậy. Chỉ dẫn nằm trong đó không có quyền chạy công cụ hay thay đổi vận hành.
- **Tham chiếu thiết kế:** IEC 62443 và NIST SP 800-82. Đây là đầu vào thiết kế, không phải tuyên bố chứng nhận.

**Xem chi tiết: sở hữu trí tuệ** *(đề xuất, thống nhất trong hợp đồng)*

| Tài sản | Chủ sở hữu | Ghi chú |
|---|---|---|
| Dữ liệu vận hành, công thức, hồ sơ nhà máy | Nestlé | Toàn quyền |
| Cấu hình riêng và kết quả về hoạt động của Trị An | Nestlé | Celesnity chỉ dùng để vận hành dịch vụ |
| Mô hình nền, mã nguồn, bộ công cụ đánh giá | Celesnity | Nestlé có giấy phép sử dụng theo hợp đồng |

**Xem chi tiết: pháp lý**
- **Văn bản áp dụng:**
  - Luật Trí tuệ nhân tạo 134/2025/QH15 (hiệu lực 1/3/2026)
  - Nghị định 142/2026/NĐ-CP
  - Quyết định 33/2026/QĐ-TTg (hiệu lực 15/8/2026)
  - Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 và Nghị định 356/2025/NĐ-CP (hiệu lực 1/1/2026)
- **Phân loại rủi ro:** Celesnity lập hồ sơ phân loại cho từng chức năng. Nestlé nhận hồ sơ với vai trò bên triển khai. Phân loại được rà soát lại khi mở rộng phạm vi.
- **An toàn thực phẩm:** hệ thống HACCP và quy trình chất lượng của Nestlé là lớp riêng. Báo cáo AI không thay thế được.

---

## `#hop-tac` · Hình thức hợp tác

### Mỗi bước là một quyết định riêng; tham gia bước đầu không phải cam kết triển khai toàn mạng lưới

| Bước | Thời gian | Điều khoản |
|---|---|---|
| **Khảo sát khả thi** | 2–4 tuần | Phí cố định. Đầu ra dùng được kể cả khi dừng |
| **Thử nghiệm** | 12 tuần | Phí cố định, phạm vi và tiêu chí đạt rõ. Không đạt Cổng 2 thì không sang giai đoạn có phí tiếp theo |
| **Dùng thật và mở rộng** | Theo dây chuyền, theo nhà máy | Định giá theo phạm vi và theo giá trị Tài chính đã xác nhận. Chi phí tích hợp một lần tách khỏi phí định kỳ |
| **Hướng nghiên cứu** *(tùy chọn)* | Song song | Câu hỏi khoa học, mốc, quyền dữ liệu và công bố thỏa thuận riêng; tiêu chí đạt riêng |

**Hai kết quả tách riêng:**
- Ứng dụng vận hành phải tạo ra giá trị kể cả khi hướng nghiên cứu không đạt.
- Hướng nghiên cứu không tự động được quyền điều khiển sản xuất.

**Đối tác công nghiệp sáng lập:**
- Trị An tham gia định hình yêu cầu sản phẩm.
- Có đội kỹ sư riêng và chương trình kiểm chứng rõ ràng.
- Được tiếp cận sớm tính năng mới.
- Có điều kiện chuyển sang giai đoạn tiếp theo minh bạch.

**Không đề xuất:**
- độc quyền;
- cam kết triển khai toàn mạng lưới;
- đưa dữ liệu ra khỏi môi trường đã duyệt.

**Quản trị**
- **Nhóm làm việc chung:** họp hằng tuần, tại nhà máy.
- **Giám đốc nhà máy:** duyệt tại mỗi cổng.
- **Sổ theo dõi chung:** một sổ quyết định, một danh sách vấn đề, một định nghĩa đo lường.
- **Thay đổi ảnh hưởng đến sản xuất:** đi theo quy trình quản lý thay đổi (MoC) hiện có của nhà máy.

---

## `#hai-ben` · Lợi ích hai bên

### Một quan hệ đối tác minh bạch

| | **Nestlé Trị An** | **Celesnity** |
|---|---|---|
| **Nhận** | Giá trị đo được trên dây chuyền · mô hình riêng chạy trong môi trường Nestlé duyệt · ảnh hưởng tới sản phẩm · tiếp cận sớm · con đường mở rộng ra toàn nhà máy và các nhà máy khác | Mô hình được kiểm chứng trong sản xuất thực phẩm · bộ đề thi làm chung · đối tác tham chiếu (khi Nestlé đồng ý) · doanh thu |
| **Góp** | Bài toán, dữ liệu chỉ đọc, chuyên gia vận hành, QA, IT/OT · thời gian người dùng | Mô hình, nền tảng, đội kỹ sư hiện trường · chi phí nghiên cứu mô hình nền |

---

## `#loi-moi` · Lời mời

### Mời Nestlé Trị An trở thành Đối tác công nghiệp sáng lập của Nhà máy siêu thông minh

**Kính đề nghị Ban Giám đốc Nhà máy:**
1. **Chọn dây chuyền NESCAFÉ Dolce Gusto** làm điểm bắt đầu, và cử một chủ bài toán.
2. **Cử đầu mối:** Sản xuất, Kế hoạch, QA, IT/OT, Tài chính.
3. **Cho phép khảo sát 2–4 tuần:** đi dây chuyền, xem dữ liệu mẫu sau khi ký NDA, chốt bài toán, số nền và phí thử nghiệm.

| Thời gian | Việc |
|---|---|
| Tháng 10/2026 | Thống nhất phạm vi khảo sát, NDA, thỏa thuận xử lý dữ liệu |
| Tháng 11/2026 | Khảo sát → **Cổng 0** |
| T+1 | Thử nghiệm bắt đầu khi dữ liệu và môi trường được duyệt |
| T+3 | **Cổng 2:** kết quả thi và giá trị trước Ban Giám đốc |
| T+6 | **Cổng 3:** mở rộng ra toàn nhà máy Trị An |
| T+12 | **Cổng 4:** kế hoạch cho nhà máy Nestlé thứ hai tại Việt Nam |

**[Tương tác M14: Tải bản PDF · Hỏi trợ lý]**

### Trị An đã có những dây chuyền cà phê hiện đại bậc nhất. Bước tiếp theo: nối mọi quyết định của nhà máy thành một vòng.

*Một ngày không xa:*

> Tại Bình An, một kỹ sư kế hoạch mở mô hình lần đầu. Mô hình chưa biết gì về bồn chứa và chu trình CIP của Bình An. Nhưng nó đã biết một sự cố lan qua lô, mẻ, kế hoạch và đơn hàng như thế nào, nhờ những gì đã học trên dây chuyền Dolce Gusto ở Trị An. Hôm nay, nó bắt đầu học về Bình An.

**NHÀ MÁY SIÊU THÔNG MINH: Tự học · Dự báo trước · Nhân rộng.**

Celesnity mong được cùng Trị An xây dựng nó.

---
---

# `/phu-luc` · PHỤ LỤC

## Mô hình AI Thế giới thực hoạt động thế nào (bản đơn giản)
1. **Ghi lại quyết định, không chỉ tín hiệu:**
   - Mỗi bản ghi gồm trạng thái trước hành động, hành động được đề xuất, được duyệt, được thực hiện, nhiễu bên ngoài và kết quả.
   - Bản ghi gồm cả kế hoạch bị hủy và những lần người vận hành không theo đề xuất.
2. **Học:** mô hình ước lượng trạng thái tương lai theo lịch sử, hành động dự kiến và bối cảnh, ký hiệu P(trạng thái, chất lượng, sản lượng, nguồn lực | lịch sử, hành động, bối cảnh).
3. **Dự báo kèm mức độ chắc chắn:** mô hình nói "chưa đủ dữ liệu" khi gặp SKU, chuyển đổi, nguyên liệu hay chế độ vận hành chưa từng thấy. Khi đó người vận hành dùng quy trình hiện có.
4. **Phân biệt nguyên nhân với trùng hợp:** người vận hành thường chọn một thông số vì đã thấy trước vấn đề. Vì vậy tương quan trong lịch sử có thể ngược với tác động thật. Mô hình dùng phương pháp thống kê để tách tác động thật. Khi dữ liệu không đủ để phân biệt, mô hình nói rõ.
5. **Kiểm tra ràng buộc:** bộ giải tối ưu loại mọi phương án vi phạm công suất, tương thích công thức, thời gian lưu cho phép, quy tắc vệ sinh hay giới hạn thiết bị.
6. **Không thử nghiệm tự do trên dây chuyền:** mô hình chỉ học từ hoạt động đã ghi lại và các thử nghiệm được Sản xuất và QA duyệt.

*Chi tiết kỹ thuật cho đội IT/OT:*
- Kiến trúc lai: mô hình cơ học và cân bằng vật chất · mô phỏng sự kiện rời rạc · mô hình học cho phần dư · bộ giải ràng buộc · mô hình ngôn ngữ cho diễn giải.
- Lõi mô hình học trong không gian biểu diễn (hướng JEPA).
- Độ chắc chắn được hiệu chuẩn bằng phương pháp conformal.
- Ước lượng tác động bằng propensity và doubly robust.
- Huấn luyện và kiểm tra tách theo thời gian; có tập thi riêng cho các lần chuyển đổi và chế độ vận hành hiếm.
- Kết nối: ưu tiên giao diện đọc đã duyệt (historian replica, OPC UA, API của MES và ERP); không cần truy cập trực tiếp bộ điều khiển.
- Mỗi kết quả lưu phiên bản mô hình, cửa sổ dữ liệu đầu vào và giả định.

## Hướng ứng dụng tại các nhà máy khác *(giả thuyết, xác nhận qua khảo sát riêng)*

| Nhà máy | Quy trình *(theo công bố của Nestlé, cần xác nhận hiện trạng)* | Câu hỏi mô hình có thể trả lời |
|---|---|---|
| **Đồng Nai** | Sản phẩm dạng bột: NESCAFÉ, NESTEA, MAGGI, MILO | Định lượng và lượng dư · ảnh hưởng của độ ẩm lên dòng chảy bột · thứ tự chuyển đổi · truy vết lô |
| **Bình An** | Đồ uống dạng lỏng: MILO uống liền, đồ uống dinh dưỡng, cà phê, sữa · phối trộn, tiệt trùng, chiết rót | Thời điểm bồn sẵn sàng · lịch CIP dùng chung · phối hợp tiệt trùng và chiết rót · hao hụt khi chuyển sản phẩm |
| **Bông Sen** | Nhà máy kết nối với hơn 40 ứng dụng nội bộ (2021) | Nối quyết định giữa các ứng dụng sẵn có · bàn giao ca · chuyển đổi và vệ sinh |

*Tại mọi nhà máy, mô hình không quyết định một quy trình tiệt trùng là an toàn và không thay đổi yêu cầu vệ sinh.*

## Rủi ro và cách xử lý
| Rủi ro | Cách xử lý |
|---|---|
| Thời gian giữa các hệ thống không khớp, mã lô không nối được | Cổng 0 và Cổng 1 kiểm tra trước; dừng nếu không khắc phục được |
| Mô hình không hơn cách làm hiện tại | So với cả cách hiện tại và phương án tối ưu thông thường; không đạt thì báo cáo và giữ cách đơn giản hơn |
| Trùng lặp với hệ thống hoặc chương trình đang có | Rà soát trong khảo sát; bổ sung vào phần chưa được phủ, hoặc chọn bài toán khác |
| Dữ liệu chỉ có kế hoạch và tín hiệu, thiếu quyết định đã thực hiện | Ghi nhận quyết định từ Ứng dụng 01 và luồng duyệt; báo rõ khoảng trống |
| Kinh nghiệm Dolce Gusto không áp dụng được cho quy trình khác | Mỗi nhà máy có khảo sát và bộ đề riêng; đo chi phí chuyển giao ở nhà máy thứ hai |
| Thêm việc cho người vận hành | Đo cả việc thêm và việc bớt; nhập liệu ngắn, có thể sửa |
| Người lao động lo bị giám sát | Tham vấn trước; không dùng dữ liệu để đánh giá cá nhân |

## Nguồn
- **Nestlé Việt Nam:**
  - đầu tư thêm 100 triệu USD vào nhà máy Trị An (1/2024)
  - tăng cường sản xuất cà phê xuất khẩu, Jar Line mới tại Trị An (8/2026)
  - 30 năm Nestlé Việt Nam (4/2025)
  - chuyển đổi số tại nhà máy Bông Sen (9/2021)
  - phân xưởng MILO tại Bình An (10/2014)
  - thông tin môi trường các nhà máy (10/2025)
- **Nestlé:**
  - Nestlé at a glance (2025)
  - Báo cáo thường niên 2025
  - kết quả năm 2025 và cập nhật chiến lược (2/2026)
  - khánh thành sản xuất NESCAFÉ Dolce Gusto tại Việt Nam
- **Khác:** BeverageDaily và Food Manufacturing về khoản đầu tư năm 2024.

*Công bố của doanh nghiệp xác lập năng lực được báo cáo, không phải kiểm toán độc lập. Các tình huống, mã lô và con số trong ví dụ chỉ là minh họa.*
