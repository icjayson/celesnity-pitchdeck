# Minder AI: Takako × Celesnity
### Nội dung landing page v1, theo cấu trúc codebase (10/10/2026)

> **Ghi chú biên tập (không hiển thị trên trang)**
> - **Nguồn:** `docs/takako-brief.md` (v4) và `docs/takako-implementation-plan.md` §4. Thông tin về Takako lấy từ buổi trao đổi ngày 09/10/2026 và phạm vi Takako chốt ngày 10/10/2026.
> - **Thứ tự section (v1.2, 11/10/2026):** `mo-dau` → `thu-ngo` → `tu-chu` → `chinh-xac` → `minder-ai` → `quy-tac` → `ba-viec` → `kiem-soat` → `ban-do` → `lo-trinh` → `gia-tri` → `hai-ben` → `hop-tac`. `mot-ngay` (Thử ngay) tạm ẩn.
> - **Module:** M20 (Minder AI làm việc) · M21 (thẻ minh họa, sơ đồ ranh giới bảo mật) · M8 (bản đồ ba giai đoạn, lõi "Minder AI") · M15 (ba giai đoạn) · M16 (nhân sự) · M14 (quyền lợi đôi bên, hình thức hợp tác, đoạn kết). Không dùng module của bộ Mô hình AI Thế giới thực (M1, M2, M3, M5, M6, M7, M10, M18, M19).
> - **Người đọc là Ban lãnh đạo Takako.**
>   - Không nêu tên, không trích lời cá nhân nào phía Takako. Mọi yêu cầu đều ghi là "Takako đặt ra".
>   - Tên đối tác cá nhân cũng không đưa lên trang; phần vai trò ghi theo tổ chức.
> - **Không nói điểm yếu của Takako.** Phạm vi "ngoài Giai đoạn 1" là lựa chọn phạm vi, không phải hạn chế của nhà máy.
> - **Quy ước câu chữ:**
>   - Minder AI là chủ ngữ và là người làm: *theo dõi · phát hiện · soạn sẵn · báo đúng người · trả lời ngay khi được hỏi*.
>   - Dùng "quy tắc trả lời do quản lý đặt", không dùng "template cố định".
>   - Không dùng "chatbot".
>   - Không có "Mô hình AI Thế giới thực" ở luồng chính.
>   - Bộ ba Tự học · Dự báo trước · Nhân rộng chỉ xuất hiện ở lộ trình.
> - **Về con số:**
>   - 10 năm, ~1.000 máy, 100% dữ liệu bảo trì, 2 + 3 nhà máy là thông tin Takako cung cấp.
>   - Mã hàng, máy, lệnh sản xuất, quy tắc, ngưỡng, phần trăm và giờ máy trong `quy-tac` và `mot-ngay` là **minh họa**.
>   - KPI là đề xuất, chốt cùng Takako. Mục tiêu "khoảng 30 phút xuống dưới 2 phút" là mục tiêu đề xuất, không gắn với cá nhân nào.
> - **Mặc định khi chưa chốt** (implementation plan §9):
>   - slug `takako-vietnam`;
>   - bật trợ lý Minder AI trên trang (trả lời về đề xuất; lời nhắc ghi rõ câu hỏi trên trang do dịch vụ AI quốc tế xử lý);
>   - chỉ tiếng Việt;
>   - không case study;
>   - Giai đoạn 2–3 không ghi năm.
> - **Dữ liệu module** M20, M21, M15, M16 nằm trong `decks/takako-vietnam/scenarios.ts`; quyền lợi đôi bên và gói hợp tác trong `content.vi.ts`. Các bảng dữ liệu module dưới đây có dấu `skip-table`.
> - **Nhân sự, tỷ lệ vận hành và năng lực đội Takako** trong M15/M16 là đề xuất, chốt cùng Takako.
> - **Cần xác minh trước khi phát hành:**
>   - MES có gắn thời gian máy, phế phẩm, sửa chữa theo mã hàng hoặc lệnh sản xuất không. Nếu không, đổi nguyên nhân ở thẻ 09:00.
>   - Takako đã có định mức giá thành theo mã hàng chưa.
>   - Kênh nhận tin nội bộ.
>   - Cách ghi ISO 27001 (phía GIANTY).
>   - Tên tổ chức của đối tác kết nối dữ liệu.
> - **Giao diện và nội dung:**
>   - Khung giao diện M20 chỉ lấy **phong cách UI** từ `minder-platform/celesnity-web`: token màu, chữ, bo góc, bố cục thẻ, chip nguồn, logo mark.
>   - Nội dung, tên gọi (**Minder AI**) và các trường của quy tắc theo đúng brief và file này, không theo tính năng hiện có của codebase đó.
> - **Sửa câu chữ:** sửa file này trước, rồi `decks/takako-vietnam/*`, rồi chạy `npm run content:check -- --deck=takako-vietnam`.

**meta**
- title: Minder AI · Takako × Celesnity
- description: Đề xuất triển khai Minder AI, trợ lý vận hành chủ động cho Takako. Tài liệu thảo luận, tháng 10/2026.
- tagline: Trợ lý vận hành chủ động của Takako
- footer: MINDER AI · Takako × Celesnity · Tài liệu thảo luận

**acts**
- I. Takako đã sẵn sàng
- II. Minder AI tại Takako
- III. Đo bằng con số, mở rộng từng bước

**labels**
- sim: Mô phỏng minh họa: dữ liệu dựng để trình bày, không phải số liệu của Takako.
- simShort: Mô phỏng minh họa
- ai: Minder AI soạn
- chatNotice: Trợ lý chỉ trả lời về đề xuất này. Câu hỏi trên trang được xử lý bởi dịch vụ AI quốc tế; vui lòng không nhập dữ liệu nội bộ. Minder AI khi triển khai chạy trong nhà máy Takako.
- future: Hình dung khi triển khai
- proposal: Đề xuất, chốt cùng Takako
- details: Xem chi tiết
- hideDetails: Thu gọn

**brand**
- partnerWordmark: TAKAKO (không dùng logo) · coreLabel: Minder AI
- islands (M8): Ba phần việc (machining-cell) · Mở rộng ứng dụng (machining-plant) · Nhà máy thứ hai (second-plant, đích đến)
- trợ lý: bật; câu hỏi nhanh: Minder AI là gì? · Làm sao bảo đảm Minder AI không bịa số liệu? · Dữ liệu của Takako có ra khỏi nhà máy không? · Giai đoạn 1 diễn ra thế nào trong 4 tuần?
- party: Takako · short: Takako · team: Đội Takako · environment: Môi trường Takako

**quickLink:** Bước tiếp theo → `hop-tac`

---

## `#mo-dau` · Takako × Celesnity

*act 0 · theme dark · layout hero · cover /decks/takako-vietnam/nha-may-takako-viet-nam.webp (ảnh nhà máy Takako Việt Nam, Jayson cung cấp 11/10/2026) · coverLayout right*

**eyebrow:** Takako × Celesnity · Đề xuất triển khai

### Minder AI, trợ lý vận hành chủ động của Takako

**lead:** Mọi thông tin quản lý cần về sản xuất, vận hành, kế toán và tài nguyên kỹ thuật, từ chính dữ liệu và hệ thống Takako đang sở hữu.

*Chạy trong nhà máy · Chỉ đọc dữ liệu · Con người quyết định*

*Bên phải trang bìa: ảnh nhà máy Takako Việt Nam và khung chat trợ lý Minder AI (neo ở trang bìa trên desktop). Biến thể M20 `cover` không còn dùng ở trang bìa.*

---

## `#thu-ngo` · Thư ngỏ

*act 0 · theme light*

**eyebrow:** Thư ngỏ

### Kính gửi Ban lãnh đạo Takako

Trước hết, Celesnity xin trân trọng cảm ơn Quý vị đã dành thời gian cho đề xuất này.

Takako đã hoàn thành chặng đường khoảng mười năm số hóa: tự động hóa, robot, ERP, MES, cùng dữ liệu IoT trên khoảng 1.000 máy móc thiết bị, và 100% dữ liệu sửa chữa, bảo trì đã nằm trên hệ thống. Với một nhà máy gia công chính xác có nhiều khách hàng, nhiều mã hàng và nhiều dòng chảy sản phẩm, đó là nền dữ liệu mà không nhiều nhà máy có được. Bước tiếp theo không phải thêm một hệ thống hay một dashboard, mà là để dữ liệu ấy **tự đến đúng người quản lý, đúng lúc**, với những con số tin được.

Các nhà máy có thể dùng nhiều công cụ AI phổ biến. Nhưng với giá thành, tình trạng máy hay phiên bản bản vẽ, một câu trả lời nghe hợp lý là chưa đủ: mỗi con số phải truy được về bản ghi gốc và được tính đúng theo công thức mà quản lý đã duyệt. Vì thế Celesnity xây dựng Minder AI theo một nguyên tắc: **không suy đoán ngoài dữ liệu**.

Celesnity trân trọng đề xuất triển khai **Minder AI, trợ lý vận hành chủ động của Takako**. Minder AI chạy trong nhà máy, đặt trên ERP, MES-IoT và kho bản vẽ Takako đang có, chỉ đọc dữ liệu và nối dữ liệu theo mã hàng. Minder AI tự theo dõi, phát hiện thay đổi, soạn sẵn thông tin và báo đúng người quản lý, theo **quy tắc do chính quản lý Takako đặt**.

**Tầm nhìn**<br>Mọi thông tin quản lý cần về sản xuất, vận hành, kế toán và tài nguyên kỹ thuật đều sẵn có, đúng, đủ và nhất quán, từ chính dữ liệu Takako đang sở hữu. Minder AI **tự học** dữ liệu và quy tắc của Takako, **dự báo trước** những điều sắp xảy ra ở máy móc và mã hàng, và **nhân rộng** sang nhà máy thứ hai.

**Cách làm**<br>Bắt đầu nhỏ và chắc: ba phần việc trong 4 tuần, gồm Trợ lý giá thành cho Kế toán, Trợ lý dữ liệu máy cho Sản xuất và Vận hành, Trợ lý bản vẽ cho Tài nguyên kỹ thuật. Dữ liệu chỉ đọc, không thay phần mềm nào, không thay đổi quy trình đang chạy. Kỹ sư thực địa của Celesnity làm việc tại nhà máy cùng từng phòng; ngay tuần 1, hai bên đo số nền thời gian làm việc hiện tại và quản lý đặt quy tắc cho từng phần việc.

**Kết quả dự kiến sau 4 tuần**<br>Ba phần việc chạy thật trên dữ liệu của Takako. Thời gian cho công việc Minder AI đảm nhận được đo so với số nền tuần 1, ví dụ tình trạng một máy từ khoảng 30 phút xuống dưới 2 phút. 100% output có nguồn, và tỷ lệ đúng do chính người nhận xác nhận. Tại Cổng 1, Takako quyết định mở rộng sang các ứng dụng tiếp theo, rồi sang nhà máy thứ hai.

**Cam kết của Celesnity**<br>Minder AI và mô hình AI open-weight chạy trong nhà máy, không gọi dịch vụ AI bên ngoài; dữ liệu thuộc Takako. Minder AI không ghi vào hệ thống, không điều khiển máy, không tự đặt ngưỡng hay công thức. Phí gắn với KPI đã chốt trước khi bắt đầu. **Quản lý Takako luôn là người quyết định.**

**Kính đề nghị Ban lãnh đạo**

1. **Thống nhất định hướng:** triển khai Minder AI theo ba giai đoạn. Ba phần việc giá thành, dữ liệu máy và bản vẽ là điểm khởi đầu; nhà máy thứ hai là đích đến.
2. **Cử đầu mối:** đầu mối Kế toán, Kỹ thuật, Sản xuất và IT, cùng quản lý phụ trách mỗi mảng để đặt quy tắc ở tuần 1.
3. **Cho phép kết nối chỉ đọc** vào ERP, MES-IoT và kho bản vẽ để đo số nền và khởi động Giai đoạn 1 vào cuối tháng 10/2026.

**Tại buổi trình bày với IT và Ban lãnh đạo**, Celesnity đề xuất: đi qua ba phần việc trên dữ liệu mô phỏng; rà danh sách dữ liệu và hạ tầng trong nhà máy cùng IT; thống nhất KPI, cách đo số nền và người xác nhận cho từng chỉ số.

Chúng tôi tin rằng một nhà máy gia công chính xác đã số hóa bài bản như Takako có thể là nơi đầu tiên chứng minh một trợ lý vận hành chủ động, chính xác đến từng con số. Celesnity mong được đồng hành cùng Takako trên chặng đường đó.

Trân trọng,<br>**Celesnity**, đơn vị phát triển Minder AI

---

## `#tu-chu` · Takako hôm nay

*act 1 · theme mist*

**eyebrow:** Takako hôm nay

### Mười năm số hóa đã hoàn thành. Dữ liệu đã sẵn sàng.

**[stats]**
- **10 năm** · lộ trình tự động hóa, robot, ERP và MES đã hoàn thành
- **~1.000** · máy móc, thiết bị có dữ liệu IoT
- **100%** · dữ liệu sửa chữa và bảo trì đã nằm trên hệ thống
- **5** · nhà máy: 2 tại Việt Nam, 3 ở nước ngoài

**[flow]** Yêu cầu khách hàng → Bản vẽ và mã hàng → Chạy thử → Sản xuất → Chất lượng → Xuất hàng

*Mỗi mã hàng đi qua một chuỗi rõ ràng, và mỗi bước đều để lại dữ liệu trên hệ thống của Takako.*

- **Thuần kỹ thuật và gia công chính xác:** bản vẽ, mã hàng, đồ gá, chương trình gia công, cycle time.
- **Nhiều khách hàng, nhiều mã hàng, nhiều dòng chảy sản phẩm**, vận hành theo quy trình.
- **Hệ thống đã có:** ERP, MES, IoT trên máy, kho bản vẽ, cùng chart và dashboard cho quản lý.
- **Dữ liệu có cấu trúc**, đủ để AI làm việc ngay, không cần lắp thêm thiết bị.

**[statement]**
- Takako vận hành theo quy trình, với nhiều khách hàng, nhiều mã hàng và nhiều dòng chảy sản phẩm.
- **Dữ liệu đã có. Bước tiếp theo là để dữ liệu tự đến đúng người quản lý, đúng lúc.**
- Minder AI làm việc đó, trên chính hệ thống Takako đang sở hữu.

---

## `#chinh-xac` · Tiêu chuẩn chính xác

*act 1 · theme light*

**eyebrow:** Tiêu chuẩn đảm bảo tính chính xác của Minder AI đối với dữ liệu

### Mọi thông tin Minder AI đưa ra đều truy xuất được nguồn gốc, tính đúng theo công thức của quản lý và loại trừ hoàn toàn hiện tượng suy đoán

**[table]**

| Tiêu chuẩn chính xác | Cách Minder AI bảo chứng | Thước đo độ chính xác |
|---|---|---|
| **Chính xác từ dữ liệu gốc** (Zero Hallucination) | Mọi kết quả đều dẫn link trực tiếp tới bản ghi trên ERP, MES-IoT hoặc kho bản vẽ. Thiếu số liệu thì báo thiếu, tuyệt đối không ước lượng, không suy đoán ngoài dữ liệu. | Tỷ lệ output được người phụ trách xác nhận đúng 100% nguồn gốc. |
| **Chính xác về logic và công thức tính** | Tuân thủ tuyệt đối quy tắc do chính Quản lý ban hành: dùng đúng biến số, chạy đúng thuật toán duyệt sẵn, giữ nguyên định dạng báo cáo cho mọi lần xuất kết quả. | 100% output tuân thủ đúng quy tắc và công thức đã chốt. |
| **Chính xác về hiệu quả thực tế** | Giá trị của độ chính xác được lượng hóa bằng thời gian xử lý: so sánh trực tiếp số nền tuần 1 và kết quả tuần 4. Cam kết KPI gắn liền với chi phí. | Thời gian truy xuất / tính toán nghiệp vụ thật giảm rõ rệt (ví dụ: từ 30 phút xuống < 2 phút). |
| **Chính xác về phân quyền & truy vết** (Auditability) | Mô hình open-weight chạy on-premise trong nhà máy. Phân quyền chặt chẽ theo vai trò; ghi nhật ký (audit log) 100% câu hỏi, kết quả xuất ra và người truy cập. | Minh bạch tuyệt đối, truy vết được nguyên nhân mọi kết quả trả về. |
| **Kiểm chứng chính xác trên phạm vi giới hạn** | Không triển khai ồ ạt; khoanh vùng kiểm định độ chính xác trên 3 bài toán lõi (giá thành, máy móc, bản vẽ) ở chế độ chỉ đọc (read-only). | Cổng nghiệm thu sau 4 tuần: chỉ mở rộng khi độ chính xác đạt yêu cầu. |
| **Chính xác theo ngữ cảnh kỹ thuật nhà máy** | Không trả lời chung chung; chỉ giải quyết bài toán nghiệp vụ chuyên sâu: bóc tách nguyên nhân đội giá thành theo công đoạn, lịch sử sự cố máy, phiên bản bản vẽ đang chạy. | Tần suất sử dụng và tỷ lệ đánh giá "Đúng nghiệp vụ" của kỹ sư, kế toán hàng tuần. |
| **Chính xác trong liên kết chuỗi dữ liệu** (Traceability) | Khớp nối dữ liệu xuyên suốt theo mã hàng (Part Number): từ một sự cố dừng máy trên MES, chỉ ra chính xác tác động đến giá thành trên ERP và bản vẽ kỹ thuật liên quan. | Chuỗi dữ liệu liên phòng ban được đồng bộ chính xác, không đứt gãy. |

---

## `#minder-ai` · Minder AI là gì

*act 2 · theme mist · layout wide*

**eyebrow:** Minder AI là gì

### Một trợ lý vận hành đặt trên hệ thống Takako đã có, không thay phần mềm nào

**lead:** Minder AI kết nối ERP, MES-IoT và kho bản vẽ ngay trong nhà máy, nối dữ liệu theo mã hàng, rồi tự đưa thông tin đến đúng người quản lý.

**[M21 architecture]** Hình kiến trúc: cột "Hệ thống của Takako" (ERP · Kế toán, MES-IoT, Kho bản vẽ, Nguồn bên ngoài được phép, có icon) → (chỉ đọc, chấm dữ liệu chạy) → lõi Minder AI (Theo dõi · Phát hiện · Soạn sẵn · Báo đúng người; nối dữ liệu theo mã hàng), nhận "Quy tắc do quản lý đặt" (Dữ liệu dùng · Cách tính · Ngưỡng · Định dạng · Người nhận · Thời điểm) → (kèm nguồn) → "Quản lý theo vai trò" (Kế toán · Kỹ thuật · Sản xuất · Ban lãnh đạo).

**Chi tiết (bản in): sơ đồ kiến trúc** [diagram]
- **Nhánh** (tone plain, hệ thống của Takako):
  - ERP · Kế toán: đơn giá, chi phí, định mức
  - MES-IoT: máy, sản lượng, cycle time, sửa chữa, bảo trì
  - Kho bản vẽ: mã hàng, phiên bản, ghi chú thay đổi
  - Nguồn bên ngoài được phép: văn bản pháp luật theo danh sách được phép
- **Gộp vào:** **Minder AI** · trong nhà máy · chỉ đọc · nối theo mã hàng (tone platform)
- **Rồi đến:**
  - **Quy tắc do quản lý đặt** (tone edge)
  - **Quản lý theo vai trò**: Kế toán · Kỹ thuật · Sản xuất · Ban lãnh đạo
- **Chú thích:** Minder AI đọc dữ liệu từ hệ thống sẵn có, không ghi ngược lại và không thay phần mềm nào.

**[M21 buoc]** Bốn thẻ có hình minh họa, nối bằng mũi tên: Theo dõi → Phát hiện → Soạn sẵn → Báo đúng người (thẻ cuối nổi bật). Mỗi thẻ: "Minder AI làm gì" (đúng chữ ở bảng dưới) và một ví dụ.

**Chi tiết (bản in): Bốn bước làm việc**

| Bước | Minder AI làm gì |
|---|---|
| **Theo dõi** | Đọc dữ liệu từ ERP, MES-IoT và kho bản vẽ, liên tục và theo lịch quản lý đặt |
| **Phát hiện** | Nhận ra thay đổi vượt ngưỡng Takako đặt: giá thành, sự cố máy, phiên bản bản vẽ |
| **Soạn sẵn** | Viết bản tin, cảnh báo, báo cáo theo đúng quy tắc của quản lý phụ trách |
| **Báo đúng người** | Gửi đúng quản lý, đúng lúc, kèm nguồn và cách tính |

*Khi được hỏi, Minder AI trả lời ngay, theo cùng quy tắc và cùng nguồn dữ liệu.*

#### Bốn mảng thông tin quản lý cần

**[cards 4]**

| Mảng | Quản lý cần | Dữ liệu Takako đã có |
|---|---|---|
| **Sản xuất** | Sản lượng, cycle time, phế phẩm theo mã hàng và theo máy | MES-IoT |
| **Vận hành** | Tình trạng máy, sự cố, sửa chữa, bảo trì | MES, với 100% dữ liệu sửa chữa và bảo trì |
| **Kế toán** | Giá thành thực, chênh lệch so với định mức, chi phí khi kế hoạch thay đổi, văn bản pháp lý mới | ERP, kết hợp MES-IoT và bản vẽ |
| **Tài nguyên kỹ thuật** | Bản vẽ hiện hành, phiên bản, lệnh và lô liên quan | Kho bản vẽ và lệnh sản xuất |

Kỹ sư Celesnity làm việc tại nhà máy cùng từng bộ phận, hiểu cách làm việc của từng phòng và **không thay đổi quy trình đang chạy**.

---

## `#quy-tac` · Quy tắc do quản lý đặt

*act 2 · theme light · layout wide*

**eyebrow:** Quy tắc do quản lý đặt

### Quản lý đặt quy tắc. Minder AI trả lời đúng quy tắc đó, lần nào cũng vậy.

**lead:** Mỗi loại thông tin có một quy tắc do quản lý phụ trách đặt ra: dùng dữ liệu nào, tính thế nào, trình bày ra sao, gửi cho ai và khi nào. Minder AI chỉ làm theo quy tắc, nên số liệu chuẩn xác, output đúng định dạng đã đề ra và nhất quán giữa các người nhận, các ngày và các bộ phận.

**[M20 rule]**
- **Bên trái:** quy tắc QT-GT-01.
- **Bên phải:** output do quy tắc đó tạo ra.
- **Nút chọn ngưỡng:** 3% · 5%.
  - Ở 3%: PT-2041 vượt định mức 4,1% → Minder AI gửi cảnh báo.
  - Ở 5%: không vượt ngưỡng → Minder AI không gửi, và hiện dòng "Không vượt ngưỡng 5%, Minder AI không gửi cảnh báo".

**[steps]**

| Bước | Việc | Ai làm |
|---|---|---|
| **Đặt quy tắc** | Dữ liệu dùng, cách tính, ngưỡng, định dạng, người nhận, thời điểm | Quản lý phụ trách |
| **Áp dụng** | Mọi output và mọi câu trả lời cùng loại đều theo đúng quy tắc | Minder AI |
| **Kiểm tra** | Mỗi output có nguồn và cách tính; bấm Xác nhận, Không đúng hoặc Không cần | Người nhận |
| **Điều chỉnh** | Sửa quy tắc khi cần; Minder AI áp dụng từ lần sau và ghi lại ai sửa, sửa gì, khi nào | Quản lý phụ trách |

*Minder AI không tự đặt ngưỡng, không tự đổi cách tính và không tự thêm người nhận.*

**Chi tiết (bản in): Một quy tắc mẫu**

**[kv]**

| Mục | Nội dung |
|---|---|
| **Quy tắc** | QT-GT-01 · Cảnh báo giá thành theo mã hàng |
| **Người đặt** | Trưởng phòng Kế toán |
| **Áp dụng cho** | Mọi mã hàng đang sản xuất trong tháng |
| **Dữ liệu dùng** | ERP: đơn giá vật liệu, đơn giá giờ máy, định mức giá thành · MES-IoT: cycle time, phế phẩm, sản lượng · Kho bản vẽ: vật liệu theo phiên bản hiện hành |
| **Cách tính** | Công thức giá thành Phòng Kế toán đã duyệt: vật liệu + giờ máy + nhân công + phế phẩm + chi phí chung |
| **Ngưỡng** | Giá thành thực cao hơn định mức trên 3% |
| **Định dạng** | Kết quả · Chênh lệch · Nguyên nhân chính · Cách tính · Nguồn |
| **Người nhận** | Phòng Kế toán; thêm Phòng Kỹ thuật khi nguyên nhân nằm ở sản xuất |
| **Thời điểm** | 09:00 mỗi ngày làm việc |

---

## `#ba-viec` · Giai đoạn 1

*act 2 · theme mist · layout wide*

**eyebrow:** Giai đoạn 1

### Ba phần việc đầu tiên Minder AI nhận tại Takako

**lead:** Ba phần việc phủ đủ bốn mảng thông tin, chỉ dùng dữ liệu Takako đã có, và chỉ đọc.

**[M21 ba-viec]** Ba thẻ có hình minh họa (giá thành · máy CNC · bản vẽ), nội dung đúng như bảng dưới.

**Chi tiết (bản in): Ba phần việc**

| Phần việc | Quản lý nhận | Minder AI tự gửi | Trả lời khi được hỏi | Dữ liệu | Đo bằng |
|---|---|---|---|---|---|
| **Trợ lý giá thành** · Kế toán | Phòng Kế toán | Cảnh báo mã hàng vượt định mức kèm nguyên nhân và cách tính · Tính lại giờ máy và chi phí khi kế hoạch sản lượng thay đổi · Báo cáo giá thành tháng soạn sẵn · Tóm tắt văn bản pháp lý mới từ nguồn được phép | "Giá thành thực của mã hàng này tháng 9?" · "Nếu sản lượng tăng 20% thì giờ máy và chi phí thay đổi thế nào?" | ERP, MES-IoT, kho bản vẽ, nguồn pháp lý được phép | Thời gian tính giá thành thực của một mã hàng |
| **Trợ lý dữ liệu máy** · Sản xuất và Vận hành | Phòng Kỹ thuật, Phòng Sản xuất | Bản tin sáng về các máy cần chú ý · Báo cáo bảo trì tuần soạn sẵn | "Tình trạng máy MC-07 trong 6 tháng qua?" · "Sản lượng và phế phẩm của mã hàng này tuần trước?" | MES-IoT: sự cố, sửa chữa, bảo trì, cycle time, sản lượng | Thời gian trả lời tình trạng một máy |
| **Trợ lý bản vẽ** · Tài nguyên kỹ thuật | Phòng Kỹ thuật, Phòng Sản xuất | Cảnh báo khi bản vẽ có phiên bản mới mà lệnh hoặc lô còn chạy theo phiên bản cũ | "Bản vẽ hiện hành của mã hàng này là phiên bản nào?" · "Lô nào đã chạy theo phiên bản cũ?" | Kho bản vẽ, lệnh sản xuất | Thời gian tìm và xác nhận bản vẽ hiện hành |

**[label proposal]** Ngoài phạm vi Giai đoạn 1: ghi dữ liệu vào hệ thống, điều khiển máy, giám sát quy trình xưởng, chương trình gia công. Các phần này thuộc lộ trình sau, khi Takako quyết định.

---

## `#mot-ngay` · Thử ngay

*act 2 · theme navy · layout wide · **tạm ẩn** (parkedSections, 11/10/2026); dữ liệu M20 "feed" giữ nguyên*

**eyebrow:** Thử ngay

### Một ngày làm việc cùng Minder AI

**[label sim]** Dữ liệu mô phỏng phục vụ minh họa, không phải số liệu của Takako. Mã hàng, máy, lệnh sản xuất, ngưỡng và quy tắc là ví dụ.

**[M20 feed]**

*Chọn vai trò để xem Minder AI gửi gì cho từng bộ phận. Bấm vào quy tắc để xem quy tắc đó do ai đặt. Bấm "Hỏi thêm" để hỏi tiếp ngay trên thông tin vừa nhận.*

**Chi tiết (bản in): Một ngày của Minder AI**

| Giờ | Minder AI gửi | Cho ai | Nội dung | Theo quy tắc |
|---|---|---|---|---|
| **07:30** | Bản tin buổi sáng | Phòng Kỹ thuật, Phòng Sản xuất | MC-07 dừng 3 lần vì lỗi trục chính trong 6 tháng, lần sửa gần nhất 12/9. MC-04 có cycle time tăng 6% trong 2 tuần. MC-12 không có dữ liệu từ 15/9, cần kiểm tra kết nối | QT-MAY-01 · Trưởng phòng Kỹ thuật |
| **09:00** | Cảnh báo giá thành | Phòng Kế toán, Phòng Kỹ thuật | PT-2041 tháng 9 cao hơn định mức 4,1%, vượt ngưỡng 3%. Nguyên nhân chính: cycle time công đoạn OP-30 trên MC-07 tăng từ 3,6 lên 3,9 phút sau lần dừng ngày 12/9 | QT-GT-01 · Trưởng phòng Kế toán |
| **11:00** | Bản vẽ có phiên bản mới | Phòng Kỹ thuật, Phòng Sản xuất | VS-118 phát hành bản vẽ rev D. Hai lệnh sản xuất còn theo rev C: LSX-1182 đang chạy trên MC-05 và LSX-1187 chưa bắt đầu | QT-BV-01 · Trưởng phòng Kỹ thuật |
| **14:00** | Tính lại theo kế hoạch | Phòng Kế toán, Phòng Sản xuất | Kế hoạch tháng 11 của nhóm piston tăng 20%. Nhóm tiện CNC cần thêm khoảng 310 giờ máy, thiếu khoảng 120 giờ so với công suất còn trống | QT-GT-02 · Trưởng phòng Kế toán |
| **16:00** | Văn bản pháp lý mới | Phòng Kế toán | Văn bản hướng dẫn mới về hóa đơn điện tử trên nguồn được phép: ba điểm liên quan đến quy trình của Takako, kèm trích dẫn điều khoản. Cần Kế toán trưởng xác nhận trước khi áp dụng | QT-PL-01 · Kế toán trưởng |
| **Thứ Sáu 17:00** | Báo cáo tuần | Ban lãnh đạo và các phòng | Hai mã hàng vượt định mức, một máy cần bảo trì, một bản vẽ ra phiên bản mới. Trong tuần: 14 output, 13 được xác nhận đúng, 1 được đánh dấu không cần | QT-BC-01 · Giám đốc nhà máy |

### Dữ liệu module M20 (không hiển thị nguyên văn; nằm trong `scenarios.ts`)

**Vai trò:** Ban lãnh đạo (mặc định, thấy toàn bộ) · Kế toán · Kỹ thuật · Sản xuất.

**Quy tắc:**

<!-- content-check: skip-table -->
| Mã | Tên | Người đặt | Ngưỡng / lịch | Định dạng |
|---|---|---|---|---|
| QT-MAY-01 | Bản tin buổi sáng về máy | Trưởng phòng Kỹ thuật | 07:30 mỗi ngày; máy dừng lặp cùng lỗi ≥ 2 lần trong 6 tháng, cycle time tăng > 5% trong 2 tuần, mất dữ liệu > 1 ngày | Máy · Điều cần chú ý · Lần sửa gần nhất · Linh kiện đã thay · Bản ghi gốc |
| QT-MAY-02 | Báo cáo bảo trì tuần | Trưởng phòng Kỹ thuật | Thứ Sáu 16:00 | Máy cần bảo trì · thay thế · sửa chữa · đặt linh kiện, xếp theo mức nghiêm trọng |
| QT-GT-01 | Cảnh báo giá thành theo mã hàng | Trưởng phòng Kế toán | 09:00 mỗi ngày; vượt định mức > 3% (nút đổi 3% · 5%) | Kết quả · Chênh lệch · Nguyên nhân chính · Cách tính · Nguồn |
| QT-GT-02 | Tính lại khi kế hoạch thay đổi | Trưởng phòng Kế toán | Khi kế hoạch sản lượng trên ERP thay đổi > 10% | Thay đổi · Giờ máy cần thêm · Công suất còn trống · Chi phí · Giả định |
| QT-PL-01 | Văn bản pháp lý mới | Kế toán trưởng | Khi nguồn được phép có văn bản mới thuộc danh mục theo dõi | Văn bản · Điểm liên quan · Trích dẫn · Việc cần xác nhận |
| QT-BV-01 | Cảnh báo phiên bản bản vẽ | Trưởng phòng Kỹ thuật | Khi kho bản vẽ có phiên bản mới mà lệnh hoặc lô còn theo phiên bản cũ | Mã hàng · Phiên bản mới · Ghi chú thay đổi · Lệnh và lô liên quan · Nguồn |
| QT-BC-01 | Báo cáo tuần | Giám đốc nhà máy | Thứ Sáu 17:00 | Giá thành · Máy · Bản vẽ · Phản hồi trong tuần |

**Thẻ và quyền xem theo vai trò:**

<!-- content-check: skip-table -->
| Giờ | Ban lãnh đạo | Kế toán | Kỹ thuật | Sản xuất |
|---|---|---|---|---|
| 07:30 Bản tin buổi sáng | Đầy đủ | — | Đầy đủ | Đầy đủ |
| 09:00 Cảnh báo giá thành | Đầy đủ | Đầy đủ, có cách tính | Chỉ phần nguyên nhân (cycle time OP-30 trên MC-07); kết quả, chênh lệch và cách tính ẩn | Không hiện: "Vai trò này không xem được giá thành" |
| 11:00 Bản vẽ | Đầy đủ | — | Đầy đủ | Đầy đủ |
| 14:00 Tính lại | Đầy đủ | Đầy đủ | — | Chỉ giờ máy và công suất; phần chi phí ẩn |
| 16:00 Văn bản pháp lý | Đầy đủ | Đầy đủ | — | — |
| Thứ Sáu 17:00 Báo cáo tuần | Đầy đủ | Đầy đủ | Phần giá thành ẩn | Phần giá thành ẩn |

**Chi tiết từng thẻ:**

- **07:30 · Bản tin buổi sáng** (QT-MAY-01)
  - **Nội dung:**
    - MC-07: 3 lần dừng vì lỗi trục chính trong 6 tháng; lần sửa gần nhất 12/9, đã thay vòng bi trục chính.
    - MC-04: cycle time công đoạn OP-20 tăng 6% trong 2 tuần.
    - MC-12: **không có dữ liệu MES từ 15/9**. Minder AI nói rõ là không đánh giá được, đề nghị kiểm tra kết nối.
  - **Nguồn:** MES-IoT · bản ghi sửa chữa SC-0912-07, SC-0702-07, SC-0418-07.
  - **Hỏi thêm:** "Lịch sử sửa chữa MC-07 trong 6 tháng?"
    - 18/4 lỗi trục chính, thay vòng bi;
    - 2/7 rung trục chính, cân chỉnh;
    - 12/9 lỗi trục chính, thay vòng bi trục chính.
    - Mỗi dòng có liên kết đến bản ghi gốc.
- **09:00 · Cảnh báo giá thành** (QT-GT-01)
  - **Kết quả:** giá thành thực PT-2041 (piston) tháng 9 cao hơn định mức **4,1%**.
  - **Nguyên nhân chính:** cycle time OP-30 trên MC-07 tăng từ 3,6 lên 3,9 phút sau lần dừng 12/9 (cùng máy trong bản tin 07:30); phế phẩm tăng từ 1,2% lên 1,8%.
  - **Xem cách tính** (đóng góp vào chênh lệch):
    - vật liệu (theo bản vẽ rev C): 0 điểm %;
    - giờ máy: +2,9 điểm %;
    - phế phẩm: +0,9 điểm %;
    - nhân công: +0,3 điểm %;
    - chi phí chung: 0 điểm %;
    - **tổng +4,1%**.
  - **Nguồn:** Bản vẽ PT-2041 rev C · MES-IoT tháng 9 · ERP: định mức giá thành, đơn giá giờ máy 2026.
  - **Hỏi thêm:** "Nếu MC-07 về lại 3,6 phút thì sao?" → chênh lệch còn khoảng 1,2%, dưới ngưỡng 3%.
  - **Trong `rule`:** ở ngưỡng 5%, Minder AI không gửi thẻ này.
- **11:00 · Bản vẽ có phiên bản mới** (QT-BV-01)
  - **Nội dung:**
    - VS-118 (valve spool) phát hành rev D lúc 10:40, ghi chú thay đổi: dung sai đường kính rãnh.
    - Lệnh còn theo rev C: LSX-1182 đang chạy trên MC-05, còn 640 chi tiết; LSX-1187 chưa bắt đầu.
  - **Nguồn:** Kho bản vẽ VS-118 rev C, rev D · MES: lệnh sản xuất.
  - **Hỏi thêm:** "Tháng này đã có lô nào chạy theo rev C?" → 3 lô: L-0903, L-0917, L-0928.
- **14:00 · Tính lại theo kế hoạch** (QT-GT-02)
  - **Nội dung:**
    - Kế hoạch tháng 11 nhóm piston tăng 20% (ERP cập nhật 13:40).
    - Nhóm tiện CNC cần thêm khoảng 310 giờ máy; công suất còn trống khoảng 190 giờ, nên thiếu khoảng 120 giờ.
    - Chi phí biến đổi tăng theo sản lượng; giá thành bình quân mỗi chi tiết giảm khoảng 2% nhờ chia chi phí chung.
  - **Giả định:** cycle time bình quân 3 tháng gần nhất · đơn giá giờ máy 2026 · chưa tính tăng ca.
  - **Ghi chú trên thẻ:** "Đây là phép tính theo công thức đã duyệt, không phải kế hoạch sản xuất."
- **16:00 · Văn bản pháp lý mới** (QT-PL-01)
  - **Nội dung:** ba điểm cần Kế toán xem (thời điểm lập hóa đơn · xử lý hóa đơn có sai sót · lưu trữ), mỗi điểm trích đúng điều khoản.
  - **Nguồn:** cơ sở dữ liệu văn bản pháp luật trong danh sách được phép.
  - **Việc cần làm:** Kế toán trưởng xác nhận trước khi áp dụng.
  - **Lưu ý:** không ghi số hiệu văn bản thật trong bản minh họa.
- **Thứ Sáu 17:00 · Báo cáo tuần** (QT-BC-01)
  - **Giá thành:** 2 mã vượt ngưỡng (PT-2041, RP-305).
  - **Máy:** MC-07 cần bảo trì; MC-12 đã có dữ liệu trở lại.
  - **Bản vẽ:** VS-118 rev D; 2 lệnh đã chuyển sang rev D.
  - **Phản hồi trong tuần:** 14 output, 13 xác nhận đúng, 1 không cần.

**Nút trên mỗi thẻ:** Xác nhận · Không đúng · Không cần · Hỏi thêm. Cuối feed hiện: "Đã xác nhận x/y" (y là số thẻ vai trò đó thấy đầy đủ).

---

## `#kiem-soat` · Bảo mật và kiểm soát

*act 2 · theme light*

**eyebrow:** Bảo mật và kiểm soát

### Dữ liệu ở lại Takako. Con người quyết định.

**[M21 security]** Sơ đồ ranh giới: khung nét đứt "Trong nhà máy Takako" gồm ERP · Kế toán, MES-IoT, Kho bản vẽ → (chỉ đọc) → Minder AI (mô hình open-weight chạy cục bộ) → Quản lý theo vai trò, Nhật ký. Ra ngoài: Nguồn được phép (chỉ danh sách Takako duyệt); Dịch vụ AI bên ngoài bị gạch (không gửi dữ liệu Takako ra ngoài).

#### Cách triển khai

**[kv]**

| Mục | Nội dung |
|---|---|
| **Nơi chạy** | Trong nhà máy Takako (on-premise) |
| **Mô hình AI** | Mô hình open-weight chạy cục bộ, không gọi dịch vụ AI bên ngoài |
| **Kết nối** | Chỉ đọc ERP, MES-IoT và kho bản vẽ |
| **Nguồn bên ngoài** | Chỉ các nguồn trong danh sách được phép, ví dụ cơ sở dữ liệu văn bản pháp luật cho Kế toán |
| **Truy cập** | Theo vai trò: mỗi người chỉ thấy thông tin đúng vai trò của mình |
| **Nhật ký** | Ghi lại mọi truy vấn, mọi output và mọi lần sửa quy tắc |
| **Pháp lý** | Ký NDA trước khi khảo sát; quản lý bảo mật theo ISO 27001 cùng GIANTY |
| **Quyền dữ liệu** | Dữ liệu thuộc Takako, không dùng để huấn luyện mô hình chung khi chưa được Takako đồng ý |

#### Bảy cam kết

**[checklist 2]**
- Minder AI không ghi vào ERP, MES hay kho bản vẽ.
- Minder AI không điều khiển máy.
- Minder AI không thay đổi quy trình đang chạy.
- Quy tắc, ngưỡng và người nhận do quản lý Takako đặt.
- Mọi output có nguồn và cách tính.
- Thiếu dữ liệu thì Minder AI nói rõ, không ước đoán.
- Dữ liệu không dùng để đánh giá cá nhân.

---

## `#ban-do` · Bản đồ triển khai

*act 3 · theme mist · layout wide*

**eyebrow:** Bản đồ triển khai Minder AI tại Takako

### Bắt đầu từ ba phần việc, mở rộng ứng dụng, rồi đến nhà máy thứ hai

**[M8]** Ba đảo: Ba phần việc → Mở rộng ứng dụng → Nhà máy thứ hai (đích đến, orange); lõi ghi "Minder AI".

**Cùng một Minder AI · cùng bộ quy tắc của quản lý · cùng cách đo KPI.** Mỗi giai đoạn thêm việc cho Minder AI trên nền đã chứng minh ở giai đoạn trước.

**[label proposal]** Giai đoạn 2 và 3 là hướng đề xuất; phạm vi và thứ tự do Takako quyết định sau mỗi cổng.

#### Những gì nhà máy thứ hai kế thừa từ nhà máy thứ nhất

**[pillars]**
- Minder AI đã chạy thật trên dữ liệu Takako
- Bộ quy tắc trả lời của quản lý Takako
- Cách đo KPI và cổng nghiệm thu đã kiểm chứng
- Đội Takako đã tự đặt và chỉnh quy tắc

**Chi tiết (bản in): Bảng ba giai đoạn**

|  | **① Giai đoạn 1** | **② Giai đoạn 2** | **③ Giai đoạn 3** |
|---|---|---|---|
| **Nơi** | Nhà máy thứ nhất · Kế toán, Kỹ thuật, Sản xuất | Nhà máy thứ nhất · các phòng ban | Nhà máy thứ hai |
| **Vai trò** | Nơi bắt đầu | Mở rộng ứng dụng | **Đích đến** |
| **Thời gian** | 4 tuần | Sau Cổng 1 | Sau Cổng 2 |
| **Câu hỏi Minder AI trả lời** *(ví dụ)* | Giá thành thực của mã hàng này tháng 9? Máy nào cần chú ý hôm nay? Bản vẽ đang dùng có phải bản mới nhất? | Máy nào có khả năng hỏng trong 2 tuần tới? Mã hàng này đang ở đâu, từ yêu cầu khách hàng đến xuất hàng? Mã hàng mới giống mã cũ nào, cần lưu ý claim gì? | Nhà máy thứ hai dùng cùng quy tắc giá thành chưa? Ứng dụng nào đưa sang trước? Hai nhà máy so với nhau thế nào trên cùng KPI? |

---

## `#lo-trinh` · Lộ trình

*act 3 · theme light · layout wide*

**eyebrow:** Lộ trình

### Ba giai đoạn. Takako quyết định ở mỗi cổng.

**[M15]** Dải ba giai đoạn và thẻ chi tiết từng giai đoạn (ứng dụng đưa vào · đầu ra nghiệm thu · nguồn lực · năng lực đội Takako); dữ liệu ở mục "Dữ liệu M15, M16" bên dưới.

**Chi tiết (bản in): Ba giai đoạn**

**[steps]**

| Giai đoạn | Minder AI làm gì |  |
|---|---|---|
| **Giai đoạn 1 · 4 tuần** | Ba phần việc: giá thành, dữ liệu máy, bản vẽ. Minder AI học dữ liệu, công thức và quy tắc của Takako. **Tự học** | Cổng 1: Takako chấm KPI |
| **Giai đoạn 2** | Nhận thêm các ứng dụng Takako đã nêu, từ báo cáo điều đã xảy ra sang cảnh báo điều sắp xảy ra. **Dự báo trước** | Cổng 2: Takako chọn ứng dụng tiếp theo |
| **Giai đoạn 3** | Minder AI và các phần việc đã chứng minh chạy tại nhà máy thứ hai. **Nhân rộng** | Takako quyết định |

#### Giai đoạn 1 theo tuần

**[timeline]**

| Tuần | Việc | Minder AI | Takako |
|---|---|---|---|
| **1** | Kết nối và đo số nền | Kết nối chỉ đọc ERP, MES-IoT, kho bản vẽ; đo thời gian hiện tại | Quản lý đặt quy tắc, ngưỡng và người nhận cho từng phần việc |
| **2** | Output đầu tiên | Gửi bản tin, cảnh báo và báo cáo cho 2–3 người nhận mỗi phần việc | Người nhận đánh dấu từng output |
| **3** | Dùng hằng ngày | Gửi cho toàn bộ người nhận; trả lời câu hỏi thêm | Quản lý chỉnh quy tắc theo phản hồi |
| **4** | Đo và quyết định | Báo cáo KPI so với tuần 1 | **Cổng 1:** Takako quyết định Giai đoạn 2 |

**[label proposal]** Khởi động cuối tháng 10/2026, có kết quả cuối tháng 11/2026.

*(bản in, tiếp)* Giai đoạn 2: Minder AI nhận thêm việc

**[cards 3]**

| Đợt | Ứng dụng | Dữ liệu |
|---|---|---|
| **Đợt 2a · dữ liệu đã sẵn sàng** | Trợ lý bảo trì đầy đủ cho khoảng 1.000 máy: máy cần bảo trì, thay thế, sửa chữa, đặt linh kiện, xếp theo mức nghiêm trọng · Truy vết tình trạng mã hàng xuyên hệ thống: từ yêu cầu khách hàng, chạy thử, sản xuất, chất lượng đến xuất hàng · So sánh và kiểm tra bản vẽ: bản mới khác gì bản trong kho, sai hay cũ phiên bản | MES, ERP, dữ liệu chất lượng, kho bản vẽ, tài liệu phòng ban |
| **Đợt 2b · cảnh báo trước** | Gợi ý quy trình chuẩn từ mã hàng tương tự, cảnh báo claim cũ, công đoạn dễ bị bỏ, lỗi đồ gá · Bảo trì dự đoán: cảnh báo khả năng hỏng trong 1 đến 2 tuần tới | Lịch sử mã hàng, quy trình, claim chất lượng, IoT, lịch sử sự cố |
| **Đợt 2c · tối ưu** | Tối ưu chương trình gia công, giảm cycle time theo phương pháp cải tiến của Takako · Đôn đốc tiến độ sản xuất: từ đơn hàng đến lệnh sản xuất, công đoạn, máy và tồn kho | Chương trình gia công, quy tắc cải tiến, gần như mọi hệ thống |

*Thứ tự ứng dụng ở Giai đoạn 2 là đề xuất, theo mức độ sẵn sàng của dữ liệu. Takako chọn thứ tự.*

*(bản in, tiếp)* Giai đoạn 3: nhà máy thứ hai

Minder AI và các phần việc đã chứng minh ở nhà máy thứ nhất chạy tại nhà máy thứ hai. Lớp kết nối dữ liệu, quy tắc của quản lý và cách đo KPI được dùng lại, nên triển khai nhanh hơn nhà máy thứ nhất.

#### Nhân sự theo giai đoạn

**[M16]**

**[label proposal]** Nhân sự và tỷ lệ vận hành là đề xuất, chốt cùng Takako trước khi khởi động.

### Dữ liệu M15, M16 (nằm trong `scenarios.ts`)

<!-- content-check: skip-table -->
| Giai đoạn | Thời gian | Ứng dụng đưa vào | Cổng | Tỷ lệ vận hành Celesnity / Takako | Nguồn lực |
|---|---|---|---|---|---|
| 01 Ba phần việc | 4 tuần | Trợ lý giá thành, dữ liệu máy, bản vẽ: output đầu tiên tuần 2 | Cổng 1 · tuần 4: Takako chấm KPI | 80 / 20 | ~3 người Celesnity · đầu mối 3 phòng |
| 02 Mở rộng ứng dụng | Sau Cổng 1 | Đợt 2a · 2b · 2c | Cổng 2 · cuối mỗi đợt: mỗi ứng dụng đạt KPI riêng | 50 / 50 | ~4 người Celesnity · đầu mối mỗi ứng dụng |
| 03 Nhà máy thứ hai | Sau Cổng 2 | Các phần việc đã đạt KPI; lớp kết nối, quy tắc, cách đo dùng lại | Takako quyết định | Takako dẫn dắt · Celesnity hỗ trợ | |

<!-- content-check: skip-table -->
| Năng lực đội Takako | Mốc |
|---|---|
| Đặt quy tắc đầu tiên | Tuần 1 |
| Tự chỉnh quy tắc và ngưỡng | Tuần 3 |
| Tự đọc và chấm KPI | Tuần 4 |
| Tự đặt quy tắc cho ứng dụng mới | GĐ 2 |
| Vận hành Minder AI hằng ngày | GĐ 2 |
| Dẫn dắt nhân rộng | GĐ 3 |

<!-- content-check: skip-table -->
| Đội | Ba phần việc | Mở rộng ứng dụng | Nhà máy thứ hai |
|---|---|---|---|
| Celesnity | ~3: FDE tại nhà máy 2, Kỹ sư AI 1 | ~4: FDE 2, Kỹ sư AI 1, + Kỹ sư dữ liệu 1 | ~2: FDE tại nhà máy thứ hai 1, Kỹ sư AI 1 |
| GIANTY | 1: Quản lý dự án | 1: + Tư vấn lộ trình AI | 1 |
| IT Takako | 1: Cấp quyền chỉ đọc, hạ tầng | 1 | 1: + Hạ tầng nhà máy thứ hai |
| Quản lý và đầu mối nghiệp vụ Takako | ~2 giờ/tuần mỗi đầu mối; quản lý đặt quy tắc ở tuần 1 | + Đầu mối của mỗi ứng dụng mới | Đầu mối nhà máy thứ hai |
| Ban lãnh đạo Takako | Duyệt ở mỗi cổng · xem báo cáo tuần | | |

---

## `#gia-tri` · Đo lường

*act 3 · theme mist*

**eyebrow:** Đo lường

### Đo trên công việc thật, phí gắn với kết quả

**[steps]**

| Thời điểm | Việc | Kết quả |
|---|---|---|
| **Tuần 1** | Đo thời gian Takako đang dùng cho từng phần việc | Số nền (baseline) được hai bên xác nhận |
| **Tuần 2–4** | Minder AI làm việc hằng ngày; người nhận đánh dấu từng output | Dữ liệu đo thật, cập nhật mỗi tuần |
| **Tuần 4** | So sánh với tuần 1, chấm KPI | Cổng 1: Takako quyết định bước tiếp theo |

**[table]**

| KPI | Cách đo | Mục tiêu đề xuất |
|---|---|---|
| **Thời gian cho công việc Minder AI đảm nhận**: tính giá thành một mã hàng, tổng hợp tình trạng một máy, xác nhận bản vẽ hiện hành | So với số nền tuần 1 | Tình trạng một máy: từ khoảng 30 phút xuống dưới 2 phút. Các phần việc khác chốt cùng Takako |
| **Tỷ lệ xác nhận đúng** | Phần output người nhận bấm Xác nhận | Chốt cùng Takako, ví dụ trên 90% |
| **Tỷ lệ không cần** | Phần output người nhận bấm Không cần | Thấp và giảm dần mỗi tuần |
| **Output có nguồn** | Kiểm tra tự động | 100% |
| **Mức sử dụng thật** | Số người nhận, số output được đọc, số câu hỏi thêm mỗi tuần | Chốt cùng Takako |

Mỗi output của Minder AI có ba nút: **Xác nhận · Không đúng · Không cần**. Đó chính là dữ liệu đo KPI, đo ngay trên công việc hằng ngày của Takako.

#### Phí gắn với kết quả

- **Một phần cố định nhỏ** cho kỹ sư Celesnity làm việc tại nhà máy.
- **Phần còn lại chỉ trả khi đạt KPI** đã chốt trước khi bắt đầu.
- **Không tính phí theo số người dùng.**
- **Sau Giai đoạn 1:** hợp đồng theo từng giai đoạn, giá gắn với giá trị đo được.

**[label proposal]** Mức phí cụ thể nằm trong đề xuất gửi kèm.

---

## `#hai-ben` · Quyền lợi đôi bên

*act 3 · theme light · layout wide*

**eyebrow:** Quyền lợi đôi bên

### Takako giữ dữ liệu và quyền quyết định; Celesnity được trả phí khi đạt KPI

**[M14 benefits]** Hai cột Nhận · Góp của Takako (orange) và Celesnity (blue).

#### Kể cả khi Giai đoạn 1 không đạt, Takako vẫn giữ

**[pillars]**
- Số nền thời gian làm việc của ba phần việc
- Bộ quy tắc trả lời do quản lý Takako đặt
- Bản đồ dữ liệu ERP, MES-IoT và kho bản vẽ
- Toàn bộ dữ liệu và nhật ký, nằm trong nhà máy

**Chi tiết (bản in): Bảng quyền lợi đôi bên**

|  | **Takako** | **Celesnity** |
|---|---|---|
| **Nhận** | Ba phần việc chạy thật trên dữ liệu của chính Takako sau 4 tuần · Thời gian làm việc giảm, đo bằng số nền tuần 1 · Quy tắc trả lời do quản lý Takako đặt và giữ · Lộ trình có cổng: Takako quyết định ở mỗi bước | Phí gắn với KPI đạt được · Phản hồi nghiệp vụ để hoàn thiện Minder AI · Bằng chứng triển khai thực tế, chỉ công bố khi Takako đồng ý bằng văn bản |
| **Góp** | Quyền truy cập chỉ đọc vào ERP, MES-IoT và kho bản vẽ · Đầu mối ở mỗi phòng, vài giờ mỗi tuần · Quản lý đặt quy tắc và ngưỡng · Phản hồi trên từng output | Nền tảng Minder AI và các ứng dụng · Kỹ sư thực địa tại nhà máy · Đo và báo cáo KPI minh bạch mỗi tuần · Chuyển giao để đội Takako tự đặt và chỉnh quy tắc |

---

## `#hop-tac` · Hợp tác

*act 3 · theme mist · layout closing*

**eyebrow:** Hình thức hợp tác

### Hai thành phần: Bộ ứng dụng AI-native, và Triển khai, nghiệm thu bởi kỹ sư thực địa

#### Hai thành phần của gói

**[M14 package]**

<!-- content-check: skip-table -->
| Thành phần | Nội dung |
|---|---|
| **① Bộ ứng dụng AI-native** | Minder AI chạy trong nhà máy và các ứng dụng trên cùng nền tảng: **Trợ lý giá thành · Trợ lý dữ liệu máy · Trợ lý bản vẽ** ở Giai đoạn 1, thêm ứng dụng ở Giai đoạn 2. Quy tắc trả lời do quản lý Takako đặt |
| **② Triển khai và nghiệm thu (kỹ sư thực địa)** | Kỹ sư Celesnity làm việc tại nhà máy cùng từng phòng: **kết nối dữ liệu chỉ đọc · cùng quản lý đặt quy tắc · đo số nền và KPI · nghiệm thu ở mỗi cổng**. Không thay đổi quy trình đang chạy |

#### Vai trò các bên

**[cards 4]**

| Bên | Vai trò |
|---|---|
| **Takako** | Chủ trì; chọn người nhận; quản lý đặt quy tắc và ngưỡng; xác nhận KPI; cấp quyền truy cập dữ liệu chỉ đọc |
| **Đối tác kết nối dữ liệu nhà máy** | Đầu mối kết nối ERP, MES-IoT và kho bản vẽ |
| **Celesnity** | Nền tảng Minder AI; kỹ sư làm việc tại nhà máy; xây các phần việc; đo KPI |
| **GIANTY** | Quản lý dự án; tư vấn lộ trình AI; bảo mật dữ liệu |

#### Bước tiếp theo: khởi động cuối tháng 10, có kết quả cuối tháng 11

**[kv]**

| Thời gian | Việc |
|---|---|
| **16/10/2026** | Gửi đề xuất triển khai |
| **Tuần 19/10** | Trình bày với IT và Ban lãnh đạo Takako |
| **Cuối tháng 10** | Khởi động Giai đoạn 1: kết nối dữ liệu, đo số nền, quản lý đặt quy tắc |
| **Cuối tháng 11** | Kết quả Giai đoạn 1 và Cổng 1 |

> **Đề nghị:** Ban lãnh đạo Takako đồng ý khởi động Giai đoạn 1 vào cuối tháng 10/2026.

**[M14 closing]** Nút Tải bản PDF và Hỏi trợ lý Minder AI; cảnh ba đảo với lõi Minder AI.

**closing**
- headline: Minder AI, trợ lý vận hành chủ động của Takako
- lead: Takako × Celesnity
- story: Takako đã hoàn thành mười năm số hóa. Minder AI giúp dữ liệu đó tự đến đúng người quản lý, đúng lúc, theo đúng quy tắc Takako đặt ra.
- tagline: Mọi thông tin quản lý cần, từ chính dữ liệu Takako đang sở hữu.
- owner: Celesnity, đơn vị phát triển Minder AI
- thanks: Cảm ơn Ban lãnh đạo Takako đã dành thời gian.
- pdf: Tải bản PDF
- ask: Hỏi trợ lý Minder AI

---

# `/phu-luc`

## Minder AI kết nối với hệ thống của Takako thế nào

- **ERP và kế toán:** qua API, database view hoặc file xuất định kỳ. Chỉ đọc.
- **MES-IoT:** dữ liệu máy, sản lượng, cycle time, sự cố, sửa chữa, bảo trì. Chỉ đọc.
- **Kho bản vẽ:** thông tin phiên bản, ngày phát hành, ghi chú thay đổi, liên kết với mã hàng và lệnh sản xuất.
- **Nguồn bên ngoài:** chỉ các nguồn trong danh sách được phép do Takako duyệt.
- **Kênh nhận thông tin:** email nội bộ hoặc kênh Takako chọn; xem lại toàn bộ trong Minder AI.
- **Mở rộng sau này:**
  - Minder AI kết nối thêm hệ thống qua giao thức MCP, nên phần mềm đã có sẵn tính năng AI không phải là rào cản;
  - kết nối trực tiếp với máy qua CAN, Modbus, Ethernet hoặc PLC khi Takako cần.

## Hạ tầng triển khai trong nhà máy

1. **Máy chủ và GPU đặt tại nhà máy:** dùng hạ tầng Takako sẵn có hoặc bổ sung, chốt trước khi khởi động.
2. **Mô hình AI:** loại open-weight, chạy cục bộ. Minder AI không gọi dịch vụ AI bên ngoài; kết nối ra ngoài chỉ tới các nguồn trong danh sách được phép.
3. **Phân quyền và nhật ký:** quyền theo vai trò; nhật ký lưu trong nhà máy.
4. **Kỹ sư bên ngoài vào nhà máy:** theo quy định IT và bảo mật của Takako.

## Câu hỏi thường gặp

- **Minder AI có thay ERP hay MES không?** Không. Minder AI đặt trên các hệ thống Takako đang có, chỉ đọc dữ liệu và không thay phần mềm nào.
- **Dữ liệu có ra khỏi nhà máy không?** Không. Minder AI và mô hình AI chạy trong nhà máy. Kết nối ra ngoài chỉ tới các nguồn trong danh sách được phép.
- **Nếu Minder AI sai thì sao?** Mỗi output có nguồn và cách tính để người nhận kiểm tra. Bấm "Không đúng" thì lỗi được ghi lại, rồi sửa dữ liệu hoặc quy tắc. Tỷ lệ đúng là một KPI của Giai đoạn 1.
- **Quy tắc do ai đặt, đổi thế nào?** Quản lý phụ trách từng mảng đặt quy tắc: dữ liệu dùng, cách tính, ngưỡng, định dạng, người nhận, thời điểm. Quản lý sửa khi cần; Minder AI áp dụng từ lần sau và ghi lại lịch sử thay đổi.
- **Minder AI có tự gửi quá nhiều thông tin không?** Giai đoạn 1 chỉ có 2–3 loại output cho mỗi phần việc. Ngưỡng do quản lý đặt và được chỉnh mỗi tuần theo nút "Không cần".
- **Tuần 1 cần gì từ Takako?** Quyền truy cập chỉ đọc vào ERP, MES-IoT và kho bản vẽ; một đầu mối ở mỗi bộ phận; quản lý đặt quy tắc ban đầu; vài giờ để đo thời gian làm việc hiện tại.
- **Vì sao Giai đoạn 1 chưa làm giám sát quy trình xưởng hay đôn đốc tiến độ?** Đó là các ứng dụng cần gần như mọi hệ thống. Bắt đầu từ ba phần việc có dữ liệu sẵn sàng và đo được ngay, rồi mở rộng khi Takako quyết định.

## Rủi ro và cách xử lý

**[cards 3]**

| Rủi ro | Cách xử lý |
|---|---|
| **Dữ liệu máy chưa gắn được theo mã hàng** | Kiểm tra ngay tuần 1; nếu chưa gắn, cảnh báo giá thành dùng dữ liệu theo lô hoặc theo tháng |
| **Chưa có định mức giá thành cho mọi mã hàng** | Bắt đầu bằng so sánh với tháng trước; Phòng Kế toán bổ sung định mức dần |
| **Thông tin gửi đi quá nhiều** | Mỗi phần việc chỉ 2–3 loại output; ngưỡng do quản lý đặt; chỉnh hằng tuần theo nút Không cần |
| **Output sai** | Mỗi output có nguồn và cách tính; nút Không đúng ghi lại để sửa dữ liệu hoặc quy tắc |
| **Hạ tầng trong nhà máy chưa sẵn sàng** | Chốt máy chủ và GPU trước khởi động; tuần 1 chỉ cần kết nối dữ liệu |
| **Người dùng lo bị giám sát** | Dữ liệu không dùng để đánh giá cá nhân; phân quyền theo vai trò |

## Nguồn

Thông tin về Takako: trao đổi giữa Takako và Celesnity ngày 09/10/2026 và phạm vi Takako xác nhận ngày 10/10/2026. Ảnh trang bìa: nhà máy Takako Việt Nam (Takako).

*Các tình huống, mã hàng, máy, lệnh sản xuất, lô, quy tắc, ngưỡng và số liệu trong phần minh họa đều là mô phỏng, không phải dữ liệu của Takako.*
