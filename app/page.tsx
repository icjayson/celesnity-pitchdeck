import { redirect } from "next/navigation";

/** Trang gốc: tạm chuyển tới deck đầu tiên (giữ đường dẫn đã gửi trước khi chia deck). Thư viện deck sẽ làm sau. */
export default function Root() {
  redirect("/hoa-phat");
}
