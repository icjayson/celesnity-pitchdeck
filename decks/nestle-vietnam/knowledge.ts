/**
 * PHẦN B của gói tri thức trợ lý Nestlé: hồ sơ đề xuất chi tiết, tóm lược từ nguồn công khai và phần phương pháp.
 * KHÔNG chứa ghi chú khảo sát nội bộ của nhà máy (những điều nhà máy chia sẻ riêng không đưa vào trợ lý).
 * Mỗi dữ kiện công khai ghi nguồn trong ngoặc vuông.
 */
export const nestleBrief = `## Nhà máy Nestlé Trị An và Nestlé (nguồn công khai)

- Nhà máy Nestlé Trị An sản xuất NESCAFÉ, NESCAFÉ Dolce Gusto, Nespresso, Starbucks và Blue Bottle; xuất khẩu tới hơn 29 quốc gia và vùng lãnh thổ. [Nestlé Việt Nam, 1/2024]
- Nestlé đã đầu tư hơn 500 triệu USD vào nhà máy Trị An từ năm 2011, trong đó 100 triệu USD bổ sung năm 2024 để nâng công suất. [Nestlé Việt Nam, 1/2024]
- Jar Line mới tại nhà máy Trị An vận hành chính thức tháng 8/2026, công suất ban đầu hơn 350.000 hũ/ngày cho 11 thị trường xuất khẩu; có cảm biến và camera thời gian thực, kiểm tra thủy tinh trước chiết rót, dò kim loại, hàn màng cảm ứng và X-ray cuối chuyền. [Nestlé Việt Nam, 8/2026]
- Nestlé Việt Nam công bố bốn nhà máy: Trị An, Đồng Nai, Bông Sen và Bình An. [Nestlé Việt Nam, 2025]
- Nhà máy Nestlé Bình An sản xuất đồ uống dạng lỏng, trong đó có MILO uống liền; quy trình gồm lưu trữ, phối trộn, kiểm tra chất lượng, tiệt trùng, chiết rót và đóng gói. [Nestlé Việt Nam, tài liệu môi trường]
- Nhà máy Nestlé Bông Sen là nhà máy kết nối với hơn 40 ứng dụng nội bộ (theo công bố năm 2021). [Nestlé Việt Nam, 9/2021]
- Theo công bố trước đây, nhà máy Nestlé Đồng Nai sản xuất các sản phẩm dạng bột như NESCAFÉ, NESTEA, MAGGI, MILO; hiện trạng cần xác nhận qua khảo sát. [Nestlé Việt Nam, 2017]
- Cà phê là một trong bốn mảng chiến lược của Nestlé (cập nhật chiến lược 2/2026). Nestlé có 335 nhà máy tại 75 quốc gia; hệ thống sản xuất chung phủ gần 90% số nhà máy. [Nestlé, 2025–2026]
- Chương trình Fuel for Growth của Nestlé đặt mục tiêu tiết kiệm 3 tỷ CHF đến cuối 2027. [Nestlé, kết quả 6 tháng 2026]

## Cách tiếp cận của Celesnity tại nhà máy Nestlé Trị An

- Celesnity bổ sung vào các hệ thống đang có (MES, historian, ERP, QMS, hệ thống giám sát thiết bị), không thay thế hệ thống nào. Kết nối qua giao diện đọc đã duyệt; không cần truy cập trực tiếp bộ điều khiển.
- Thử nghiệm tập trung vào một quy trình vận hành liên kết toàn diện trên một dây chuyền, với một chỉ tiêu vật lý chính được chọn cùng Sản xuất, Kế hoạch, QA và Tài chính trong khảo sát.
- Kiến trúc lai: mô hình cơ học và cân bằng vật chất; mô phỏng sự kiện rời rạc cho hàng đợi, thứ tự sản xuất và nguồn lực; mô hình học cho phần biến động (thời gian chuyển đổi, dừng ngắn, tác động của môi trường); bộ giải tối ưu có ràng buộc để tạo lịch khả thi; mô hình ngôn ngữ chỉ để hiểu câu hỏi và giải thích.
- Kiến trúc này cho phép truy ngược: thành phần nào đưa ra dự báo, quy tắc nào loại một phương án, bằng chứng nào đứng sau một lời giải thích.
- Dữ liệu học gồm quyết định, không chỉ tín hiệu: trạng thái trước hành động, hành động được đề xuất, được duyệt, được thực hiện, nhiễu bên ngoài và kết quả, kể cả kế hoạch bị hủy và lần không theo đề xuất.
- Đánh giá tách theo thời gian, có tập thi riêng cho các lần chuyển đổi và chế độ vận hành hiếm; độ chắc chắn được hiệu chuẩn (khi mô hình nói chắc chắn 90%, kết quả đúng trong khoảng 85–95% số lần).
- Bốn bước trước khi người vận hành dùng dự báo: thi trên dữ liệu lịch sử; chuyên gia chấm mẫu; chạy song song trên ca thật mà không ai thấy dự báo khi quyết định; tư vấn, mọi lần không theo dự báo đều được ghi lý do.
- Các bậc tự chủ tính riêng cho từng loại hành động: quan sát, tư vấn, hỗ trợ thực hiện, vòng kín có giới hạn. Thử nghiệm dừng ở bậc tư vấn; mỗi bậc tiếp theo là quyết định riêng của Nestlé qua quy trình quản lý thay đổi.
- Giá trị được đo bằng đơn vị vật lý trước, quy ra tiền sau, theo mô hình chi phí do Tài chính Nestlé duyệt: sản lượng bù tại điểm nghẽn, lượng cà phê dư trên viên, hao hụt nguyên liệu và bao bì, giờ chuyển đổi. Không tính vào lợi ích: hóa đơn giảm vì sản lượng giảm, coi mỗi cảnh báo là một lần hỏng tránh được, kết quả của nhà máy hay chương trình khác.

## Câu hỏi khó và cách trả lời theo đề xuất

- Nếu Nestlé đã có công cụ phân tích hoặc giám sát thiết bị cho một bài toán: khảo sát sẽ rà soát; Celesnity bổ sung vào phần chưa được phủ (những câu hỏi cắt ngang nhiều hệ thống) hoặc chọn bài toán khác.
- Nếu mô hình không hơn cách làm hiện tại: Celesnity báo cáo đúng kết quả và giữ cách làm đơn giản hơn; không chuyển sang giai đoạn có phí tiếp theo.
- Nếu dữ liệu giữa các hệ thống không khớp thời gian hoặc mã lô: Cổng 1 kiểm tra trước; dừng nếu không khắc phục được.
- Khối lượng việc thêm cho nhà máy được đo và báo cáo, cùng với việc bớt đi.`;
