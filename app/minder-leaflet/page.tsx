import { redirect } from "next/navigation";

/** Tờ rơi Minder có theo ngôn ngữ; đường dẫn gốc chuyển sang bản tiếng Việt. */
export default function MinderLeafletIndex() {
  redirect("/minder-leaflet/vi");
}
