/**
 * PHẦN B của gói tri thức trợ lý Isuzu: hồ sơ đề xuất chi tiết, tóm lược từ nguồn công khai và phần phương pháp.
 * KHÔNG chứa ghi chú khảo sát nội bộ (bảng "bài toán" trong tài liệu nội bộ, cách Isuzu đang truy xuất hay lưu hồ sơ).
 * Mỗi dữ kiện công khai ghi nguồn trong ngoặc vuông.
 */
export const isuzuBrief = `## Isuzu Việt Nam (nguồn công khai)

- Công ty TNHH Ô tô Isuzu Việt Nam là liên doanh Việt–Nhật thành lập ngày 19/10/1995 (Isuzu, Itochu, Samco, Resco). Trụ sở và nhà máy tại 695 Quang Trung, Gò Vấp, TP.HCM. [Isuzu Việt Nam, hồ sơ công ty; Autopro, 10/2025]
- Isuzu Việt Nam lắp ráp và phân phối xe tải nhẹ (Q-Series, N-Series), xe tải trung và nặng (F-Series), đầu kéo, khung gầm xe buýt; phân phối D-MAX và mu-X. [Isuzu Việt Nam, hồ sơ công ty]
- Hơn 129.000 xe được sản xuất tính đến tháng 9/2025; 29 đại lý và trạm dịch vụ; trung tâm dịch vụ hậu mãi tại Củ Chi (từ 2017). [Autopro, 27/10/2025; Isuzu Việt Nam, hồ sơ công ty]
- Lãnh đạo Isuzu Việt Nam nêu định hướng chuyển từ nhà sản xuất xe sang nhà cung cấp giải pháp vận tải. [Autopro, 27/10/2025]
- Isuzu Monozukuri (IM) kế thừa triết lý IMM (Isuzu Manufacturing Management) "liên tục làm ra sản phẩm tốt hơn", theo nguyên tắc không lặp lại cùng một lỗi. Mô hình ba bậc: không để lỗi đi qua (không bỏ sót lỗi), không tạo ra lỗi, không thể tạo ra lỗi; nền là sản xuất theo tiêu chuẩn. [Isuzu Việt Nam, bài viết về Isuzu Monozukuri, 9/2025]
- Bộ tiêu chuẩn IM được ban hành ngày 1/7/2025; Isuzu Việt Nam hướng tới chứng nhận IM từ Isuzu Motors vào cuối 2026. [Isuzu Việt Nam, 9/2025]
- Asakai là cuộc họp chất lượng mỗi sáng, nơi các bộ phận chia sẻ thông tin và đề xuất giải pháp. Hitozukuri là triết lý phát triển con người song hành với Monozukuri. Quản lý chất lượng theo nguyên tắc phân quyền: kỹ thuật sản xuất, sản xuất và kiểm soát chất lượng độc lập và giám sát lẫn nhau. [Isuzu Việt Nam, 9/2025]

## Cách tiếp cận của Celesnity tại Isuzu Việt Nam

- Celesnity bổ sung vào các hệ thống đang có, không thay thế hệ thống nào. Pilot chỉ đọc dữ liệu đã có, không lắp thêm cảm biến. Hệ thống cụ thể nào được kết nối xác định trong khảo sát; đề xuất không giả định Isuzu đang dùng hệ thống nào.
- Khóa chung của mọi dữ liệu là VIN. Lý lịch số của một xe gồm: VIN, model, công đoạn, trạm, đồ gá, người thao tác (chỉ để phân tích quy trình), ca, linh kiện, serial, nhà cung cấp, lô, lịch sử lỗi, nguyên nhân gốc, hành động khắc phục, kết quả QC, vị trí hiện tại.
- Tác nhân Chất lượng trả lời "lỗi này đã từng xảy ra chưa?": tìm ca tương tự, chỉ ra điểm chung, nguyên nhân và khắc phục lần trước, tách các giả thuyết (ví dụ đồ gá hay lô linh kiện) kèm bằng chứng và mức độ chắc chắn. AI không quyết định chất lượng thay QA.
- Tác nhân Truy xuất trả lời hai chiều: xe → linh kiện, và lô → mọi VIN đã lắp → ngày sản xuất → kết quả QC → vị trí hiện tại (nhà máy, đại lý, khách hàng).
- Dữ liệu học gồm quyết định, không chỉ tín hiệu: lỗi, bối cảnh, nguyên nhân, hành động khắc phục được duyệt, và kết quả sau đó, kể cả những lần không theo đề xuất.
- Đánh giá tách theo thời gian; độ chắc chắn được hiệu chuẩn (khi mô hình nói chắc chắn 90%, kết quả đúng trong khoảng 85–95% số lần).
- Bốn bước trước khi kỹ sư dùng kết quả: thi trên lịch sử; chuyên gia chấm mẫu; chạy song song trên ca thật mà không ai thấy kết quả khi quyết định; tư vấn, mọi lần không theo đề xuất đều được ghi lý do.
- Mô hình không điều khiển thiết bị, không giữ hay cho xuất xưởng xe, không thay quyết định của QA. Tuân thủ an toàn phương tiện và đăng kiểm là một lớp riêng.

## Câu hỏi khó và cách trả lời theo đề xuất

- Về chứng nhận IM: đề xuất không nói chương trình giúp hay cần cho chứng nhận IM. Chỉ nêu rằng sau chứng nhận, bài toán chuyển sang giữ và nâng mức đã đạt trên mọi dòng xe, và mô hình hỗ trợ ba bậc Monozukuri.
- Về Isuzu Motors (Nhật Bản): Celesnity không đại diện cho quan điểm của Isuzu Motors. Mọi kết nối với hệ thống hay tiêu chuẩn của Isuzu Motors theo quy định của Isuzu.
- Về cách Isuzu đang truy xuất hay lưu hồ sơ lỗi hôm nay: đề xuất không mô tả và không đánh giá; khảo sát sẽ xác định.
- Nếu mô hình không hơn cách làm hiện tại: Celesnity báo cáo đúng kết quả; không chuyển sang giai đoạn có phí tiếp theo.
- Nếu dữ liệu chưa nối được tới VIN: Cổng 1 kiểm tra trước; bắt đầu theo lô khi chưa có theo VIN.`;
