/**
 * PHẦN B của gói tri thức trợ lý SCG: hồ sơ đề xuất chi tiết, tóm lược từ nguồn công khai và phần phương pháp.
 * KHÔNG chứa ghi chú nội bộ, không mô tả hệ thống điều khiển SCG đang dùng, không nêu tên hay trích lời cá nhân phía SCG.
 * Mỗi dữ kiện công khai ghi nguồn trong ngoặc vuông.
 */
export const scgBrief = `## SCG và SCG Việt Nam (nguồn công khai)

- SCG (Siam Cement Group) thành lập năm 1913 tại Thái Lan; các mảng chính năm 2026 gồm Xi măng và Vật liệu xây dựng (SCG Cement-Building Materials), SCG Decor (PRIME, COTTO), SCG Chemicals (SCGC) và SCG Packaging (SCGP). [The Reporter Asia, 23/7/2026]
- Doanh thu SCG năm 2025 khoảng 497 tỷ baht; 6 tháng đầu năm 2026 khoảng 260 tỷ baht, tăng 4%. [Kaohoon International, 28/1/2026; The Reporter Asia, 23/7/2026]
- Chiến lược ESG 4 Plus (Net Zero, Go Green, Reduce Inequality, Embrace Collaboration, cộng Fairness and Transparency); mục tiêu Net Zero 2050; định hướng Inclusive Green Growth với AI, robot và công nghệ sâu là đòn bẩy cốt lõi. [VTV, 4/1/2024; Vietnam News, 11/11/2025]
- SCG có mặt tại Việt Nam từ năm 1992, đầu tư hơn 7 tỷ USD qua 28 công ty, chiếm khoảng 28% tổng tài sản của SCG. [Vietnam News, 25/12/2025]
- Doanh thu SCG tại Việt Nam năm 2025 khoảng 1,7 tỷ USD, khoảng 11% doanh thu Tập đoàn. [Vietnam News, 11/2/2026]
- SCG đặt Việt Nam làm trung tâm vận hành chiến lược và cơ sở sản xuất, xuất khẩu chi phí thấp, theo chiến lược tối ưu theo khu vực cùng Thái Lan, bao gồm chia sẻ năng lực số, AI, tự động hóa và quản lý nhà máy. [Vietnam News, 25/12/2025]
- Mảng xi măng của SCG tại Việt Nam có công suất khoảng 3 triệu tấn clinker và 4 triệu tấn xi măng mỗi năm, sản xuất tại miền Trung và miền Nam; xi măng và clinker carbon thấp được xuất khẩu sang nhiều châu lục; các lò dùng nhiên liệu thay thế (sinh khối, RDF) và thu hồi nhiệt thải. [Vietnam News, 25/12/2025]
- Xi măng Sông Gianh (Tuyên Hóa) khánh thành năm 2006, tròn 20 năm vào năm 2026; đồng xử lý 140–200 nghìn tấn chất thải mỗi năm; mục tiêu giảm 23% phát thải CO₂ cho xi măng miền Trung vào năm 2030 so với năm 2020, đã giảm khoảng 9% đến năm 2025; đầu tư hệ thống xuất hàng tự động năm 2026. [VCCI, 11/3/2026; Diễn đàn Doanh nghiệp, 10/3/2026]
- SCG ra mắt xi măng SCG Low Carbon Super Cement tại Việt Nam tháng 7/2024. [VIR, 7/2024]
- Năm 2026, SCG công bố mô hình nền CiMie AI cho ngành xi măng và hợp tác về AI điều khiển quá trình (APC) và nhà máy thông minh. [The Story Thailand, 27/4/2026]
- SCGP cho biết hơn 2.500 nhân sự đang dùng AI trong sản xuất bao bì, gồm dự báo độ bền giấy và tối ưu cài đặt máy. [SCGP, 25/6/2026]
- Tiêu thụ xi măng Việt Nam đạt kỷ lục khoảng 75 triệu tấn năm 2025; 6 tháng đầu năm 2026 đạt khoảng 61 triệu tấn, tăng khoảng 16%. [S&P Global, 1/2026; VIR, 3/8/2026]
- SCG Lampang (Thái Lan) có một lò, công suất khoảng 2 triệu tấn clinker mỗi năm, dùng RDF, sinh khối và thu hồi nhiệt thải. [Global Energy Monitor]

## Cách tiếp cận của Celesnity tại SCG

- Minder là nền tảng nơi con người, máy móc, hệ thống và robot kết nối, qua bốn kênh: trên thiết bị (điện thoại, máy tính bảng), tại máy (edge), trên nền tảng phần mềm, và qua robot. Mô hình AI Thế giới thực là bộ não chạy bên trong Minder.
- Năm năng lực: Quan sát và Ghi nhớ (đang chạy), Dự báo (thử nghiệm trên dữ liệu thực từ 11/2026), Hành động có phê duyệt (2027), Tự vận hành (tầm nhìn).
- Minder thay thế hàng chục phần mềm riêng lẻ bằng một mô hình chung của nhà máy; hệ thống điều khiển và hệ thống an toàn giữ nguyên; Minder làm việc cùng lớp điều khiển nâng cao (APC) và các mô hình AI của SCG. Hệ thống cụ thể được kết nối do khảo sát xác định; đề xuất không giả định SCG đang dùng hệ thống nào.
- Minder tại máy đọc qua OPC UA hoặc Modbus; chỉ ghi điểm đặt sau Cổng 2, qua cổng đã duyệt, trong dải giới hạn do Công nghệ SCG đặt, có người duyệt từng lần, có nhật ký và đọc lại xác nhận.
- Ba nấc tự chủ: Tư vấn → Có phê duyệt → Tự động trong giới hạn. Lên nấc là quyết định riêng của SCG qua quản lý thay đổi.
- Video demo: robot công nghiệp, camera và thiết bị Minder tại phòng thí nghiệm của Celesnity; Minder Hub báo trạng thái (cổng kết nối, robot, camera, chu trình) và gửi lệnh bắt đầu chu trình; robot gắp chi tiết theo vị trí camera đọc được. Không quay tại nhà máy SCG.
- Đánh giá tách theo thời gian; độ chắc chắn được hiệu chuẩn; bốn bước trước khi kỹ sư dùng kết quả: thử nghiệm trên lịch sử, chuyên gia chấm mẫu, chạy song song không ai thấy dự báo, rồi tư vấn có ghi lý do khi không theo.
- Tiêu chuẩn Celesnity: thiết kế theo GDPR và Đạo luật AI của EU; lộ trình ISO 27001 (6/2027) và SOC 2 (8/2027); không có cơ chế ngắt từ xa; không chấm điểm cá nhân người lao động.

## Câu hỏi khó và cách trả lời theo đề xuất

- Về AI sẵn có của SCG (CiMie, APC): Mô hình AI Thế giới thực và Minder bổ sung lớp hiểu toàn nhà máy, ghi nhớ quyết định và vòng điều khiển có phê duyệt; làm việc cùng, không thay thế.
- Về lý do chọn Sông Gianh và Lampang: là đề xuất của Celesnity, dựa trên quy mô lò tương đồng và dữ liệu công khai; SCG chốt nhà máy trong khảo sát.
- Về hệ thống điều khiển SCG đang dùng: đề xuất không mô tả và không đánh giá; khảo sát sẽ xác định.
- Nếu mô hình không hơn cách làm hiện tại: Celesnity báo cáo đúng kết quả; không chuyển sang giai đoạn có phí tiếp theo.`;
