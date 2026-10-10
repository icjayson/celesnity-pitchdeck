/**
 * PHẦN B của gói tri thức trợ lý Takako: hồ sơ đề xuất chi tiết.
 * Thông tin về Takako chỉ gồm điều Takako đã chia sẻ trong buổi trao đổi (ngày 09/10/2026) và phạm vi Takako xác nhận (10/10/2026).
 * KHÔNG nêu tên hay trích lời cá nhân nào phía Takako, KHÔNG có số tiền hay phí, KHÔNG mô tả điểm yếu của Takako.
 */
export const takakoBrief = `## Takako (theo thông tin Takako chia sẻ)

- Takako là công ty vốn Nhật, có 2 nhà máy tại Việt Nam và 3 nhà máy ở nước ngoài.
- Takako thuần kỹ thuật và gia công chính xác: bản vẽ, mã hàng, đồ gá, chương trình gia công, cycle time. Nhiều khách hàng, nhiều mã hàng, nhiều dòng chảy sản phẩm; nhà máy vận hành theo quy trình.
- Takako đã hoàn thành lộ trình khoảng 10 năm về tự động hóa, robot, ERP và MES. Dữ liệu có cấu trúc, có IoT trên khoảng 1.000 máy móc thiết bị; 100% dữ liệu sửa chữa và bảo trì đã nằm trên hệ thống. Takako đã có chart và dashboard cho quản lý.

## Phạm vi Giai đoạn 1 (Takako xác nhận)

- Ba phần việc: quy trình và nghiệp vụ của phòng kế toán (giá thành, chi phí, tính lại khi kế hoạch sản lượng thay đổi, văn bản pháp lý mới từ nguồn được phép); dữ liệu MES-IoT đang quản lý (tình trạng máy, sự cố, sửa chữa, bảo trì, cycle time, sản lượng); một phần nhỏ trong quản lý bản vẽ sản phẩm (bản vẽ hiện hành, phiên bản, lệnh và lô liên quan).
- Ngoài phạm vi Giai đoạn 1: ghi dữ liệu vào hệ thống, điều khiển máy, giám sát quy trình xưởng, chương trình gia công.

## Cách Minder AI làm việc

- Minder AI là trợ lý vận hành chủ động: theo dõi, phát hiện thay đổi vượt ngưỡng Takako đặt, soạn sẵn bản tin, cảnh báo, báo cáo, và gửi đúng người quản lý kèm nguồn và cách tính. Khi được hỏi, trả lời ngay theo cùng quy tắc.
- Quy tắc trả lời do chính quản lý phụ trách đặt: dữ liệu dùng, cách tính, ngưỡng, định dạng, người nhận, thời điểm. Minder AI không tự đặt ngưỡng, không tự đổi cách tính, không tự thêm người nhận.
- Con số luôn tính bằng công thức đã duyệt, không do mô hình ngôn ngữ tự tính. Mọi output dẫn tới bản ghi gốc; thiếu dữ liệu thì nói rõ.
- Dữ liệu nối với nhau bằng mã hàng: từ một sự cố dừng máy trên MES, Minder AI chỉ ra tác động đến giá thành trên ERP và bản vẽ liên quan.
- Mô hình open-weight chạy trong nhà máy; không gọi dịch vụ AI bên ngoài; nguồn bên ngoài chỉ theo danh sách được phép; phân quyền theo vai trò; nhật ký mọi truy vấn và output.
- Kỹ sư thực địa của Celesnity làm việc tại nhà máy cùng từng phòng, không thay đổi quy trình đang chạy. GIANTY quản lý dự án, tư vấn lộ trình AI và bảo mật dữ liệu. Một đối tác kết nối dữ liệu nhà máy làm đầu mối kết nối ERP, MES-IoT và kho bản vẽ.

## Câu hỏi khó và cách trả lời theo đề xuất

- Về cách Takako đang làm hôm nay (thời gian hiện tại, công cụ, quy trình nội bộ): đề xuất không mô tả và không đánh giá; tuần 1 đo số nền cùng Takako.
- Về phần minh họa (PT-2041, MC-07, VS-118, các lệnh, lô, ngưỡng 3%): đó là mô phỏng minh họa, không phải số liệu của Takako.
- Về hệ thống ERP, MES cụ thể Takako dùng: đề xuất không giả định; kết nối qua API, database view hoặc file xuất định kỳ, xác định trong tuần 1.
- Về con số mục tiêu: chỉ có ví dụ tình trạng một máy từ khoảng 30 phút xuống dưới 2 phút; các mục tiêu khác chốt cùng Takako.
- Nếu KPI không đạt ở Cổng 1: Takako quyết định; không mở rộng khi độ chính xác chưa đạt yêu cầu.`;
