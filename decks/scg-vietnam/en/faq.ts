/**
 * Frequently asked questions for the Siam Cement Group deck, drawn only from the proposal content (decks/scg-vietnam/en/content.ts).
 * Used for: the Siam Cement Group assistant's knowledge pack, prepared answers when offline / over budget / on API errors, and suggested questions.
 * Contains no information about other clients and does not describe how Siam Cement Group works today.
 * Keywords are English plus a few original Vietnamese ones, so offline matching still works for Vietnamese input.
 */
import type { FaqItem } from "../../types";

export const faq: FaqItem[] = [
  {
    id: "nha-may-sieu-thong-minh-la-gi",
    q: "What is a Super-Smart Factory?",
    a: "It is a plant where every setpoint change, every laboratory sample, every decision and its outcome becomes learning data for a **World Model**. The plant is **self-learning** after every shift, has **foresight** into the consequences of the next decision, and **scales out** its experience to other plants and other countries. People always approve.",
    section: "sieu-thong-minh",
    keywords: ["super-smart", "super smart factory", "what is", "definition", "self-learning", "foresight", "scale-out", "siêu thông minh", "là gì", "tự học"],
    suggested: true,
  },
  {
    id: "minder-la-gi",
    q: "How do Minder and the World Model differ?",
    a: "**The World Model is the brain**: it learns how the plant responds to decisions and forecasts ahead. **Minder is where people work with that brain**: on phones and tablets, on the platform, and through Minder at the machine, which reads signals from the control system, programmable logic controllers and sensors and, when approved, writes setpoints back to the machine. Minder brings people, work, materials, machines and results into a single record.",
    section: "minder",
    keywords: ["minder", "platform", "difference", "brain", "interface", "edge", "world model", "nền tảng", "khác nhau", "bộ não"],
    suggested: true,
  },
  {
    id: "gui-lenh-xuong-may",
    q: "Does the model control the kiln on its own?",
    a: "Not on its own. The model reads, forecasts and recommends; **Minder sends a setpoint to the control system only when an authorised person approves it**, within limits set by Siam Cement Group engineers, and only after Gate 2. The first 4-month pilot is read-only. There are three levels: advisory, with approval, and automatic within a narrow range Siam Cement Group has approved; moving up a level is Siam Cement Group's decision alone. Interlocks, safety systems and emergency stop always override any Minder command.",
    section: "dieu-khien",
    keywords: ["control", "automatic", "autonomous", "send command", "setpoint", "control system", "closed loop", "safety", "điều khiển", "tự động", "điểm đặt"],
    suggested: true,
  },
  {
    id: "video-demo",
    q: "What does the demo video show?",
    a: "The video was filmed in Celesnity's laboratory: a camera reads the position of each part on a tray, the Minder device at the machine connects the robot and camera, Minder Hub reports status and sends the cycle-start command, and the robot carries it out and reports completion. It is the same **read → understand → approve → act → verify** loop Minder uses at the kiln, with the control system in place of the robot. The video was not filmed at a Siam Cement Group plant.",
    section: "dieu-khien",
    keywords: ["video", "demo", "robot", "minder hub", "camera", "lab", "phòng thí nghiệm", "quay"],
    suggested: true,
  },
  {
    id: "danh-muc-ung-dung",
    q: "How many applications are there, and which can run right away?",
    a: "The catalogue has **35 practical applications** at Song Gianh, all running on the 5 Minder features available today and in live use from T+1 to T+3: **real-time data connection** (7, for example connecting the control system in read-only mode), **monitoring and measurement** (7, for example the 3D plant model), **alerts and anomaly detection** (8, for example early cyclone blockage warning), **proactive AI assistant** (6, for example asking in Vietnamese and getting a chart) and **automatic reporting** (7, for example shift and daily reports). Forecast, and Act with approval, follow later, from T+5 and T+10.",
    section: "use-case",
    keywords: ["how many applications", "catalogue", "catalog", "run now", "use case", "applications", "process area", "bao nhiêu ứng dụng", "danh mục", "ứng dụng nào"],
    suggested: true,
  },
  {
    id: "vi-sao-bat-dau-tu-lo",
    q: "Why start with the kiln line?",
    a: "The kiln is where most of a cement plant's energy, clinker quality and downtime risk is concentrated, and where a great deal of data is recorded continuously. A successful application at the kiln delivers measurable value quickly and lays the foundation for raw grinding, cement grinding, maintenance and energy across the whole plant. The specific line is agreed with Siam Cement Group during the survey.",
    section: "use-case",
    keywords: ["why", "kiln", "start", "pilot", "trial", "kiln line", "vì sao", "lò nung", "bắt đầu"],
    suggested: true,
  },
  {
    id: "lo-trinh-22-thang",
    q: "What does the 22-month roadmap include?",
    a: "Four phases: a **pilot** on one kiln line (T+1–T+4, Gate 2); the **whole plant** with Forecast and the approved control loop (T+5–T+10, Gate 3); **scale-out, wave 1** to the next Siam Cement Group plants (T+11–T+16, Gate 4); and **scale-out, wave 2** to a further plant in the network, proposed in Thailand (T+17–T+22, Gate 5). Each gate is a point where Siam Cement Group decides to expand, adjust or stop.",
    section: "lo-trinh",
    keywords: ["roadmap", "22 months", "phase", "gate", "timeline", "how long", "lộ trình", "22 tháng", "giai đoạn"],
    suggested: true,
  },
  {
    id: "thai-lan",
    q: "How does the next plant in the network join?",
    a: "From T+15, once results from the first plants are in, Siam Cement Group chooses the next plant in the network (proposed: a plant in Thailand); the survey takes place at T+17 and applications are in live use from T+19 to T+22. The model learned at the earlier plants is carried over, so it **does not start from zero**, but each new plant still has its own survey and test set. Its data stays in Siam Cement Group's own environment at that plant; Minder supports Thai.",
    section: "ban-do",
    keywords: ["next plant", "network", "thailand", "thai", "thai plant", "kaeng khoi", "lampang", "scale-out", "thái lan", "nhà máy thái", "nhân rộng"],
    suggested: true,
  },
  {
    id: "du-lieu-o-dau",
    q: "Where does Siam Cement Group's data reside?",
    a: "Raw data stays in **Siam Cement Group's own environment at each plant**; the model dedicated to Siam Cement Group runs inside that environment. Raw-mix recipes and process parameters never leave Siam Cement Group. Only model weight updates that have passed security testing, and that Siam Cement Group approves each time, are shared.",
    section: "hai-ben",
    keywords: ["data", "where stored", "sovereignty", "security", "privacy", "cloud", "on-premise", "dữ liệu", "lưu ở đâu", "chủ quyền"],
    suggested: true,
  },
  {
    id: "so-huu-mo-hinh",
    q: "Who owns the model?",
    a: "Internal data and all results about Siam Cement Group's operations belong to Siam Cement Group. The model dedicated to Siam Cement Group is developed and maintained by Celesnity; Siam Cement Group has exclusive use of it for the full term of the partnership, and it is not provided to anyone else. The foundation model, the Minder platform and the evaluation toolkit belong to Celesnity.",
    section: "hai-ben",
    keywords: ["ownership", "own", "intellectual property", "IP", "who owns the model", "sở hữu", "sở hữu trí tuệ", "mô hình thuộc ai"],
  },
  {
    id: "phi",
    q: "What does it cost?",
    a: "The pilot has a **fixed fee**, agreed after the survey of the pilot plant; if Gate 2 is not passed, the project does not move to the next paid phase. After the pilot, fees follow **the economic value confirmed by Siam Cement Group Finance**; each new plant has its own scope and pricing.",
    section: "hop-tac",
    keywords: ["cost", "fee", "price", "pricing", "quote", "how much", "chi phí", "phí", "giá"],
    suggested: true,
  },
  {
    id: "scg-can-lam-gi",
    q: "What does Siam Cement Group need to prepare for the pilot?",
    a: "Three things: **open existing data** in read-only mode; **assign people**: shift leads and Kiln Process and Quality engineers, about 4 hours a week each; and **review and assess** the results. The executive sponsor meets monthly; Finance takes part at each gate.",
    section: "lo-trinh",
    keywords: ["prepare", "what is needed", "people", "staffing", "point of contact", "engineers", "chuẩn bị", "cần gì", "nhân sự"],
  },
  {
    id: "do-luong",
    q: "How are results measured?",
    a: "Each application has pass or fail criteria agreed after the survey, scored on **a blind test set held by Siam Cement Group**: for example, at least 30 minutes' warning for most kiln upsets, choosing the better setpoint option at least 70% of the time on past changes, and no setpoint write outside the approved range. Economic value (heat consumption, power, kiln stops, alternative fuel) is confirmed by Siam Cement Group Finance.",
    section: "use-case",
    keywords: ["measure", "kpi", "criteria", "results", "acceptance", "test set", "đo", "tiêu chí", "nghiệm thu"],
  },
  {
    id: "he-thong-hien-co",
    q: "Does Minder replace existing systems?",
    a: "Minder **replaces the many separate software tools** and brings them together into one shared model of the plant: planning, production, inspection, monitoring, maintenance, logistics, security and optimisation. The control system and safety systems stay in place, and Minder works alongside advanced process control and the AI models Siam Cement Group already has. Which systems are connected is decided in the survey.",
    section: "minder",
    keywords: ["replace", "control system", "existing systems", "integration", "ERP", "SCADA", "thay thế", "hệ thống hiện có", "tích hợp"],
  },
  {
    id: "nguoi-lao-dong",
    q: "Will operators be monitored or scored?",
    a: "No. Worker data is **never** used to rank or discipline individuals. Celesnity consults operators in advance, de-identifies data, and Minder keeps expert know-how in the plant, so whoever is on shift can use it.",
    section: "hai-ben",
    keywords: ["monitoring", "surveillance", "workers", "scoring", "discipline", "operators", "giám sát", "người lao động", "chấm điểm"],
  },
];
