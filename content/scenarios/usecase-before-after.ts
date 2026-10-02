/**
 * Trước/sau cho từng ứng dụng (M18). "Trước" là cách làm thông thường trong ngành,
 * KHÔNG phải mô tả nhà máy Hòa Phát (quy tắc: không nói điểm yếu của khách hàng).
 */
export const beforeAfter: Record<string, { before: string; after: string }> = {
  UC0: {
    before:
      "Kỹ sư gom dữ liệu thủ công từ nhiều hệ thống (sản xuất, kiểm tra, bảo hành) để lập một hồ sơ lỗi; mất nhiều giờ và dễ thiếu thông tin.",
    after:
      "Công nhân nói một câu bằng tiếng Việt; AI tự tạo hồ sơ, gắn model, phiên bản bo mạch, lô linh kiện và kết quả đo.",
  },
  UC1: {
    before:
      "Kiểm tra dàn đều hoặc chọn mẫu theo kinh nghiệm; lỗi thường chỉ lộ ra khi đã lặp lại ở cuối chuyền hoặc phát sinh bảo hành.",
    after:
      "Xếp hạng lô và trạm theo nguy cơ ngay trong lúc sản xuất, dồn nguồn lực kiểm tra vào đúng nơi có nguy cơ cao.",
  },
  UC2: {
    before:
      "Thử lần lượt từng phương án sửa; mỗi lần thử tốn khuôn, thẩm định, chứng nhận và nhiều tuần chờ kết quả.",
    after:
      "Dự báo trước tác động của từng phương án lên lỗi và bảo hành, kèm dẫn chứng từ các thay đổi đã làm trước đây.",
  },
  UC3: {
    before:
      "Biết có vấn đề khi yêu cầu bảo hành đã tăng, thường vài tháng sau khi sản phẩm rời nhà máy.",
    after:
      "Dự báo đường bảo hành của từng nhóm sản xuất vài tháng trước khi yêu cầu bảo hành xuất hiện.",
  },
  UC4: {
    before:
      "Đề xuất của tác nhân AI đến thẳng người duyệt; người duyệt phải tự đánh giá tính khả thi và hệ quả của từng đề xuất.",
    after:
      "Mô hình kiểm tra trước tính khả thi và hệ quả; người duyệt chỉ nhận những đề xuất đã qua kiểm tra.",
  },
  UC5: {
    before:
      "Kỹ thuật viên đến nhà khách rồi mới chẩn đoán; thiếu linh kiện thì phải quay lại lần thứ hai.",
    after:
      "Dự báo lỗi và cách sửa có khả năng nhất trước khi đến, để chuẩn bị đúng linh kiện và sửa đúng ngay lần đầu.",
  },
};
