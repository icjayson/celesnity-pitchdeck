/**
 * Single source of copy for the Siam Cement Group deck (/scg), English edition, translated from vi/content.ts.
 * Do not hard-code copy in components; edit here, then run `npm run content:check -- --deck=scg`.
 * Rules: do not name or quote any individual on the Siam Cement Group side; do not describe Siam Cement Group weaknesses; scenarios are illustrative.
 */
import type { Act, AppendixSection, Section } from "../../types";
import { PILOT, PILOT_SHORT, THAI, VN_NEXT } from "./places";
import { appCount, useCases } from "./usecases";

export const meta = {
  title: "Super-Smart Factory · Siam Cement Group × Celesnity",
  description: "Partnership proposal: the World Model and the Minder platform for the Siam Cement Group plant network. October 2026.",
  tagline: "Self-learning · Foresight · Scale-out",
  footer: "SUPER-SMART FACTORY · Siam Cement Group × Celesnity · October 2026",
};

export const acts: Act[] = [
  { n: 1, label: "I.", title: "A new era" },
  { n: 2, label: "II.", title: "A Super-Smart Factory for Siam Cement Group" },
  { n: 3, label: "III.", title: "The roadmap from one line to the Siam Cement Group network" },
];

export const labels = {
  sim: "Simulated illustration — the real model is trained during the pilot",
  simShort: "Simulated illustration",
  ai: "Real AI",
  future: "Future vision",
  proposal: "Proposed direction",
  calculatorPrivacy: "Enter your own figures. The calculation runs in your browser; nothing is stored or sent.",
  chatNotice: "The assistant only answers questions about this proposal. Questions are processed by an international AI service; please do not enter internal data.",
  details: "Show details",
  hideDetails: "Hide details",
};

export const sections: Section[] = [
  // ───────────────────────────── OPENING ─────────────────────────────
  {
    id: "mo-dau",
    act: 0,
    theme: "dark",
    layout: "hero",
    cover: "/decks/scg-vietnam/cover-nha-may-dem.jpg",
    coverPosition: "60% 50%",
    eyebrow: "Siam Cement Group × Celesnity",
    title: "SUPER-SMART\nFACTORY",
    blocks: [
      { kind: "lead", text: "From one kiln line to one Siam Cement Group network of plants" },
      {
        kind: "p",
        text: "**A World Model learns how Siam Cement Group plants really run, predicts what each decision will do, and through the Minder platform sends approved commands back to the machines.**",
      },
      { kind: "note", text: "Partnership proposal, pilot and 22-month roadmap · October 2026" },
      { kind: "note", text: "To the Leadership of Siam Cement Group" },
      { kind: "note", text: "**Responsible:** Nguyễn Duy Tân & Nguyễn Công Nam Anh, Directors, Celesnity" },
    ],
  },
  {
    id: "thu-ngo",
    act: 0,
    theme: "light",
    eyebrow: "Open letter",
    title: "To the Leadership of Siam Cement Group",
    blocks: [
      { kind: "p", text: "First, Celesnity sincerely thanks you for your time in considering this proposal." },
      {
        kind: "p",
        text: "For more than a century, Siam Cement Group has grown by **moving first**: from Thailand's first cement plant to a network of building materials, chemicals and packaging across ASEAN. In Vietnam, Siam Cement Group has invested **more than USD 7 billion across 28 companies** since 1992, and has made Vietnam a **strategic operations hub**, where digital, AI and automation capabilities are shared with Thailand. The **Net Zero 2050** goal, and the target of a 23% cut in CO₂ emissions from cement in Central Vietnam by 2030, pose exactly the problem the next generation of AI can solve: keeping the kiln stable while raising alternative fuel use and lowering heat consumption.",
      },
      {
        kind: "p",
        text: "The next generation of AI is moving from understanding language to **understanding and interacting with the physical world**. For a cement plant, that means a model that understands how the kiln responds to each change in raw meal, fuel and setpoints, forecasts the consequences in advance, and sends approved adjustments back to the machine. We call this the **World Model** (hereafter **the Model**). People, machines and the Model work together on **Minder**, the platform developed by Celesnity.",
      },
      {
        kind: "p",
        text: "Celesnity therefore respectfully proposes that Siam Cement Group become the **Founding Industrial Partner** of the **Super-Smart Factory** programme for the building materials industry. The Model runs in Siam Cement Group's own environment at each plant, on Siam Cement Group data, and Siam Cement Group **owns the operating technology at each plant**.",
      },
      {
        kind: "p",
        text: `**Approach**\nStart small and sure: **one kiln line at ${PILOT}** for a 4-month pilot. Once the gate is passed, open up the whole plant, then the next Siam Cement Group plants, including one in Thailand. **22 months** in total.`,
      },
      {
        kind: "p",
        text: `**Expected results after 22 months**\n${appCount} applications on the Minder platform running from the first months, from quarry to port; Forecast, and Act with approval, opened up across the whole pilot plant; the Model scaled out across Siam Cement Group plants; Siam Cement Group **owning the new operating technology at each plant**.`,
      },
      {
        kind: "p",
        text: "**Commitments**\nRaw data stays in Siam Cement Group's own environment at each plant. The Model forecasts and recommends; **every command sent to a machine is approved by an authorised person**, within limits set by Siam Cement Group engineers; safety systems and interlocks remain unchanged. After the pilot, Celesnity's fees follow the value confirmed by Siam Cement Group Finance.",
      },
      { kind: "p", text: "**We respectfully ask your leadership to:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Agree the direction:** Siam Cement Group as Founding Industrial Partner; one kiln line as the starting point, and the Siam Cement Group network of plants as the destination of the first phase.",
          "**Appoint points of contact:** a Group executive sponsor, plant leads, a data lead, Kiln Process and Quality leads, and shift leads and operating engineers at the pilot plant.",
          `**Approve a survey of ${PILOT_SHORT}** to confirm the line, the problems to solve, the baseline figures and the pilot fee.`,
        ],
      },
      {
        kind: "p",
        text: "We believe a Super-Smart Factory owned by Siam Cement Group, proven at one plant and shared across the Group, can set a new standard for the building materials industry in the region. Celesnity looks forward to working with Siam Cement Group on that journey.",
      },
      { kind: "signature", lines: ["Yours sincerely,", "**Celesnity**, developer of the Minder platform and the World Model"] },
    ],
  },

  // ───────────────────────────── ACT 1 ─────────────────────────────
  {
    id: "scg",
    act: 1,
    theme: "mist",
    eyebrow: "Siam Cement Group today",
    title: "Siam Cement Group has grown by moving first, and Vietnam is its strategic operations hub",
    blocks: [
      {
        kind: "stats",
        items: [
          { value: "Over USD 7 billion", label: "Invested in Vietnam", note: "28 companies, since 1992" },
          { value: "~USD 1.7 billion", label: "Revenue in Vietnam in 2025", note: "about 11% of Group revenue" },
          { value: "~3 million tonnes", label: "Clinker per year in Vietnam", note: "and about 4 million tonnes of cement" },
          { value: "2050", label: "Net Zero target", note: "ESG 4 Plus · Inclusive Green Growth" },
        ],
      },
      {
        kind: "list",
        items: [
          "**Green cement:** low-carbon cement and clinker from Siam Cement Group Vietnam are exported to the Americas, Europe, Africa, Oceania and Asia; the kilns use alternative fuels (biomass, refuse-derived fuel) and waste heat recovery.",
          "**Song Gianh Cement at 20 years:** co-processes 140–200 thousand tonnes of waste a year as alternative fuel and raw material; cut CO₂ by about 9% by 2025, aiming for a 23% cut by 2030 against 2020; investing in an automated dispatch system in 2026.",
          "**Regionally optimised operations:** Vietnam is Siam Cement Group's low-cost production and export base, sharing digital, AI, automation and plant management capabilities with Thailand.",
          "**Siam Cement Group is already ahead on AI:** the CiMie AI foundation model for cement, an AI process control partnership in 2026, AI in packaging production, and the aim of becoming an AI-run enterprise.",
        ],
      },
      {
        kind: "quote",
        emphasis: true,
        compact: true,
        text: "The next link: a **World Model that learns from Siam Cement Group's own kilns in Vietnam**, sends approved adjustments back to the machine, and carries that experience across the Group.",
      },
    ],
  },
  {
    id: "ky-nguyen",
    act: 1,
    theme: "light",
    eyebrow: "The next era of manufacturing",
    title: "The next generation of AI understands and interacts with the physical world",
    blocks: [
      { kind: "module", id: "M2" },
      {
        kind: "statement",
        context: "The major technology companies are all investing heavily in AI research for the physical world (for example NVIDIA Cosmos, Meta V-JEPA 2).",
        highlight: "What makes the difference is **real operating experience** from each kiln, each mill, each shift.",
        conclusion: "Siam Cement Group has more than a century of experience running cement plants. The World Model turns that experience into a digital asset Siam Cement Group owns.",
      },
    ],
    details: [
      {
        key: "waves",
        title: "The three waves",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Wave", "What AI can do", "Who holds the advantage?"],
            rows: [
              ["**Automation** (control systems, programmable logic controllers, control loops)", "Hold a programmed setpoint", "Those who own the machines"],
              ["**Large language AI** (ChatGPT, virtual assistants)", "Read, write, answer questions", "Those who own language models; now widespread and getting cheaper"],
              [
                "**World Model**",
                "**Understands how a physical system responds to decisions, forecasts ahead, and acts when approved**",
                "**Those who hold real operating decision data**",
              ],
            ],
          },
          { kind: "p", text: "**Sequence:** Automation (2000s) → Large language AI (2022) → World Model (2027)." },
        ],
      },
    ],
  },
  // ───────────────────────────── ACT 2 ─────────────────────────────
  {
    id: "sieu-thong-minh",
    act: 2,
    theme: "dark",
    layout: "wide",
    eyebrow: "What a Super-Smart Factory is",
    title: "A plant that learns by itself, sees ahead, and scales out its experience",
    blocks: [
      { kind: "module", id: "M1", variant: "story" },
      {
        kind: "table",
        printOnly: true,
        head: ["Property", "Meaning", "Example"],
        rows: [
          [
            "**1. Self-learning**",
            "Every setpoint change, every laboratory sample, every kiln stop becomes data automatically; **better every shift**",
            "Next month's free lime forecast is more accurate than this month's, and engineers can see why",
          ],
          [
            "**2. Foresight**",
            "Forecasts the consequences of a decision **before** it is made, with a level of confidence",
            "Reduce fuel, or coordinate feed and fuel: which lowers heat consumption while holding quality?",
          ],
          [
            "**3. Scale-out**",
            "**The experience of one line carries to other lines, plants and countries**, without depending on one person or one place",
            "From the kiln to cement grinding, then to the next Siam Cement Group plants",
          ],
        ],
      },
    ],
  },
  {
    id: "minder",
    act: 2,
    theme: "light",
    layout: "wide",
    eyebrow: "Minder and the World Model",
    title: "Minder is where the whole plant is managed, powered by a World Model that understands Siam Cement Group's plant",
    blocks: [
      {
        kind: "cards",
        cols: 3,
        rows: [
          ["**Minder · the interface**", "Where the plant's people, machines, systems and robots connect, through voice, screens and sensors."],
          ["**World Model · the brain**", "Predicts what each decision will do to the plant's output, quality, energy and stability, and learns from many plants."],
          ["**Together**", "The Model is the brain. Minder is where the Siam Cement Group team sees, asks and acts with it."],
        ],
      },
      { kind: "h3", text: "Minder is present wherever work in the plant happens" },
      {
        kind: "cards",
        cols: 4,
        tone: "blue",
        rows: [
          ["**1 · Through people**", "Phones and tablets: hand over shifts, report incidents, approve on the spot."],
          ["**2 · Through machines**", "Reads control system and sensor signals; writes approved setpoints back."],
          ["**3 · Through software**", "Real-time monitoring and automatic alerts, connected to existing systems."],
          ["**4 · Through robots**", "Take on repetitive, heavy or hazardous tasks where it pays off."],
        ],
      },
      {
        kind: "quote",
        emphasis: true,
        text: "**Minder:** people, work, materials, machines and results in a single record.\n**World Model:** every recorded data point helps the Model understand Siam Cement Group's plant more deeply.",
        lines: true,
      },
      { kind: "h3", text: "Five capabilities, deployed step by step" },
      {
        kind: "progress",
        now: "Today · October 2026",
        items: [
          { label: "Observe", text: "A live picture of the whole plant.", status: "done", when: "Live" },
          { label: "Remember", text: "Every decision, fix and outcome is kept, even when the best people are away.", status: "done", when: "Live" },
          { label: "Forecast", text: "What each option will change, with a level of confidence.", status: "active", when: "Trials from November 2026" },
          { label: "Act", text: "Minder sends approved commands to the machine. People approve.", status: "next", when: "2027" },
          { label: "Autonomous operation", text: "The line runs itself within approved limits, together with robots.", status: "future", when: "Vision" },
        ],
      },
      {
        kind: "p",
        wide: true,
        text: "Minder replaces dozens of separate software and brings them together into **one shared model of the plant** covering planning, production, inspection, monitoring, maintenance, logistics, security and optimisation, so the AI understands and remembers the whole plant. Minder also works alongside advanced process control layers and the AI models Siam Cement Group already has.",
      },
    ],
  },
  {
    id: "ba-lop",
    act: 2,
    theme: "light",
    eyebrow: "How the Super-Smart Factory works",
    title: "The World Model forecasts and recommends; people, machines, software and robots carry it out; Minder records; authorised people approve",
    blocks: [
      { kind: "module", id: "M7" },
      { kind: "p", wide: true, text: "**Improvement loop:** approved decisions, commands sent to the machine and actual results flow back to layer ①, and the model keeps learning." },
      {
        kind: "p",
        wide: true,
        text: "**What only a World Model can do:** the control system and sensors record what happened. Minder also records **who decided what, why, and what happened next**. By learning from thousands of \"setpoint → kiln response → clinker quality\" sequences, the model understands **consequences**, like an experienced kiln engineer who never goes off shift.",
      },
      { kind: "p", text: "**A World Model is not:**" },
      {
        kind: "chips",
        tone: "negative",
        items: [
          "A chatbot",
          "Enterprise resource planning software",
          "A video generation model",
          "A replacement for the control system or the safety system",
          "Something that changes setpoints without anyone approving",
          "A replacement for process simulation (thermal, combustion and gas flow simulation is still done by engineers, and the results feed the model)",
        ],
      },
    ],
    details: [
      {
        key: "layers",
        title: "How the layers work together",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Layer", "Role", "What it does"],
            rows: [
              [
                "**① World Model**: \"the brain that understands the plant\"",
                "Forecast",
                "Learns how the kiln, the mills and the whole plant respond to decisions; forecasts with a level of confidence; says \"I don't know\" when it meets a situation with no data, and never makes up a result",
              ],
              [
                "**② Minder**: \"the plant's memory\"",
                "Record",
                "Reads machine signals · records work by voice in Vietnamese and Thai · connects to existing systems · manages permissions · keeps every decision and every command",
              ],
              [
                "**Authorised people**",
                "Decide",
                "Approve every command sent to the machine, set setpoint limits, make quality and dispatch decisions",
              ],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ban-do",
    act: 2,
    theme: "light",
    layout: "wide",
    eyebrow: "Siam Cement Group's Super-Smart Factory map",
    title: "Start with one kiln line, then scale out across the Siam Cement Group network",
    blocks: [
      { kind: "module", id: "M8" },
      {
        kind: "p",
        text: "**One Minder platform · one model family · one Siam Cement Group standard way of operating.** Each plant keeps its own data environment; what moves between plants is model knowledge approved by Siam Cement Group, not raw data.",
      },
      {
        kind: "label",
        variant: "proposal",
        text: "The scale-out plants are a proposed direction, chosen with Siam Cement Group once pilot results are in.",
      },
      { kind: "h3", text: "Why Siam Cement Group should start now" },
      { kind: "cards", cols: 4, rows: [["**Vietnam is Siam Cement Group's strategic operations hub**; the regional optimisation strategy already sets out sharing digital and AI capabilities between Vietnam and Thailand"], ["**The 23% CO₂ cut by 2030:** raising alternative fuel use while keeping the kiln stable is exactly the problem the World Model solves"], ["**A growing market:** Vietnam's cement consumption reached a record of about 75 million tonnes in 2025 and grew about 16% in the first half of 2026"], ["**Siam Cement Group's existing AI foundation:** the World Model adds a layer that understands the plant and an approved control loop, working alongside Siam Cement Group's advanced process control layers and AI models"]] },
      { kind: "h3", text: "What the next plant inherits from the first line" },
      {
        kind: "pillars",
        items: [
          "A World Model already trained on a real kiln",
          "A proven test set and acceptance criteria",
          "Plant operating engineers who have mastered the new technology",
          "Data governance and setpoint write permissions already approved by Siam Cement Group",
        ],
      },
    ],
    details: [
      {
        key: "arms",
        title: "The three arms",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**① Pilot plant**", "**② Scale-out, wave 1**", "**③ Scale-out, wave 2**"],
            rows: [
              ["**Where**", PILOT, `${VN_NEXT[0]} · ${VN_NEXT[1]}`, THAI],
              ["**Role**", "The starting point: one kiln line, then the whole plant", "Scale-out", "**Destination**"],
              ["**Timing**", "Months 1–10", "Months 11–16", "Months 17–22"],
              [
                "**Questions the model answers** *(examples)*",
                "Is the kiln about to drift out of stable operation? Which setpoint change lowers heat consumption while holding free lime? Which rotating equipment should be inspected before the next kiln stop?",
                "How does the new plant differ from the first? Which experience can be reused right away, and what needs further learning?",
                "What does the model need to adjust at each new plant? What can the plants learn from each other? Which Siam Cement Group plant should go next?",
              ],
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────── ACT 3 ─────────────────────────────
  {
    id: "lo-trinh",
    act: 3,
    theme: "light",
    layout: "wide",
    eyebrow: "22-month roadmap: Siam Cement Group owns the operating technology",
    title: "One line → the whole plant → the next Siam Cement Group plants",
    blocks: [
      { kind: "h3", text: "Timing: 22 months of deployment, after a 2-month survey" },
      {
        kind: "gantt",
        ticks: ["T-1", "T0", ...Array.from({ length: 22 }, (_, i) => `T+${i + 1}`)],
        rows: [
          { label: "Survey and signing", sub: "T-1 to T0", from: 1, to: 2, tone: 0 },
          { label: "Pilot: one kiln line", sub: `${PILOT_SHORT} · T+1 to T+4`, from: 3, to: 6, tone: 1 },
          { label: "Minder & World Model go live", sub: "T+1 to T+22", from: 3, to: 24, tone: 2 },
          { label: "Whole plant: Forecast, and Act with approval", sub: "T+5 to T+22", from: 7, to: 24, tone: 3 },
          { label: `Scale-out: ${VN_NEXT[0]}`, sub: "T+11 to T+22", from: 13, to: 24, tone: 3 },
          { label: `Scale-out: ${VN_NEXT[1]}`, sub: "T+14 to T+22", from: 16, to: 24, tone: 3 },
          { label: `Scale-out: ${THAI}`, sub: "T+17 to T+22", from: 19, to: 24, tone: 4 },
        ],
        milestones: [
          { at: 3, label: "Gate 1" },
          { at: 6, label: "Gate 2" },
          { at: 12, label: "Gate 3" },
          { at: 18, label: "Gate 4" },
          { at: 24, label: "Gate 5" },
        ],
      },
      {
        kind: "table",
        head: ["Phase", "Roadmap", "Work"],
        rows: [
          ["**Survey and signing**", "T-1 to T0", `Survey ${PILOT_SHORT}; choose the line and the problems to solve; sign the data agreement; confirm the pilot fee.`],
          ["**Pilot**", "T+1 to T+4", `Switch on ${appCount} applications on the 5 Minder features; test Forecast on the kiln line's history against a blind test set held by Siam Cement Group. **Gate 1** (T+1): kiln data readable, read-only, with at least 2 years of history. **Gate 2** (T+4): Forecast beats the current approach; shift leads use Minder every day.`],
          ["**Whole plant**", "T+5 to T+10", "Forecast in live use: kiln stability, setpoint options, alternative fuel, kiln shell, grinding, dispatch. Act with approval: setpoint writes, urea injection for NOx reduction, batch holds. **Gate 3** (T+10): Siam Cement Group Finance confirms the value; the new operating technology enters the plant's standard procedures."],
          ["**Scale-out, wave 1**", "T+11 to T+16", `${VN_NEXT[0]} (T+11 to T+13), then ${VN_NEXT[1]} (T+14 to T+16): carry over the model and the standard way of operating, without starting from zero. **Gate 4** (T+16): the second plant meets its criteria faster than the first.`],
          ["**Scale-out, wave 2**", "T+17 to T+22", `${THAI}: survey, a test on the plant's own history, then live use; data stays at the plant. **Gate 5** (T+22): a joint technical report and a plan for the next plants.`],
        ],
      },
      { kind: "note", text: "T+1 is the first month after Siam Cement Group approves access to data and the computing environment. T-1 and T0 are the two survey and signing months." },
      { kind: "h3", text: "Staffing by phase" },
      { kind: "module", id: "M16" },
    ],
    details: [
      {
        title: "A 16-week pilot on one kiln line",
        printOnly: true,
        blocks: [
          {
            kind: "steps",
            head: ["Weeks", "Work", "Output"],
            rows: [
              ["**1–2**", `Survey ${PILOT_SHORT}; Kiln Process, Quality and Finance choose the line and the problems to solve; sign the data agreement`, "Scope and baseline agreed"],
              ["**3–4**", "Set up the environment at the pilot plant; install Minder at the machine in read-only mode; **switch on applications across the 5 Minder features: data connection, monitoring, alerts, AI assistant, automatic reporting**", "**Gate 1** · first applications running in the control room"],
              ["**5–8**", "Connect 2 years of kiln and laboratory history; Siam Cement Group builds a **blind test set**; train the first version of the dedicated model", "Model v0.1"],
              ["**9–12**", "**Test on the history of Siam Cement Group's own kiln**: forecasts compared with what actually happened (kiln stability forecasts, setpoint option comparisons); Kiln Process scores the samples", "Test results"],
              ["**13–14**", "Run in parallel on live shifts, with no one seeing the forecast when deciding; shift leads and process engineers use Minder on shift and assess it", "New shift procedure with Minder"],
              ["**15–16**", "Finance confirms the value; report to the Steering Committee", "**Gate 2**: expand, adjust or stop"],
            ],
          },
          { kind: "p", text: "**Siam Cement Group needs to do only 3 things during the pilot:**" },
          {
            kind: "list",
            ordered: true,
            items: [
              "**Open existing data:** read-only, no writes to the machine during the pilot, no disruption to current systems.",
              "**Assign people:** shift leads, Kiln Process and Quality engineers, about 4 hours a week each.",
              "**Review and assess.**",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "use-case",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Application catalogue",
    title: `${appCount} practical applications at Song Gianh on 5 Minder platform features available today`,
    blocks: [
      { kind: "module", id: "M18", variant: "features" },
    ],
    details: [
      {
        title: "Application catalogue table",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["#", "Minder feature", "Practical application", "Process area"],
            rows: [
              ...useCases
                .filter((u) => u.card)
                .map((u) => [`**${u.code}**`, (u.card?.minder ?? "").replace(/\s*\(.*\)\s*$/, ""), u.question, u.card?.stage ?? ""]),
              ["→", "**Scale-out, wave 1**", `${VN_NEXT[0]} (T+11–T+13) → ${VN_NEXT[1]} (T+14–T+16)`, ""],
              ["→", "**Scale-out, wave 2**", `${THAI}: survey (T+17) → live use (T+19–T+22)`, ""],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dieu-khien",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Demo · from machine data to machine command",
    title: "The Model reads data from the machine and, through Minder, sends commands back for the machine to act on",
    blocks: [
      {
        kind: "label",
        variant: "ai",
        text: "A real demo in Celesnity's laboratory: an industrial robot, a camera and a Minder device at the machine. Not a Siam Cement Group plant.",
      },
      {
        kind: "media",
        side: "left",
        video: {
          src: "/decks/scg-vietnam/demo-dieu-khien-may-phu-de.mp4",
          poster: "/decks/scg-vietnam/demo-dieu-khien-may-phu-de.jpg",
          width: 480,
          height: 854,
          maxWidth: 380,
          title: "Minder Hub controlling a robot cell",
          caption: "The camera reads the position of each part on the tray · the Minder device at the machine connects the robot and camera · Minder Hub reports status and sends the cycle-start command · the robot carries it out and reports completion",
        },
        blocks: [
          {
            kind: "steps",
            layout: "vertical",
            head: ["Step", "What happens in the demo", "At a Siam Cement Group kiln"],
            rows: [
              ["**Read**", "The camera and robot controller report status to the Minder device at the machine: gateway online, robot connected, camera running.", "Minder at the machine reads control system signals: burning zone temperature, O₂, pressure, kiln torque, feed, fuel."],
              ["**Understand**", "The position and orientation of each part are calculated and become targets for the robot.", "The Model forecasts where the kiln is heading over the next 1–2 hours and compares setpoint options."],
              ["**Approve and send**", "The operator presses \"Start cycle\" in Minder Hub; the command goes to the robot.", "The shift lead approves the recommendation; Minder writes the setpoint to the control system, only within the limits approved by Process."],
              ["**Act and report back**", "The robot picks each part; the status changes to \"running\", then \"complete\".", "The control system executes; Minder reads back the kiln's response and the laboratory results, compares them with the forecast, and the model keeps learning."],
            ],
          },
          {
            kind: "note",
            text: "The same **read → understand → approve → act → verify** loop applies to every type of machine. The plant's interlocks, safety systems and emergency stop always override any Minder command.",
          },
        ],
      },
      { kind: "h3", text: "Three levels of autonomy; Siam Cement Group decides when to move up" },
      {
        kind: "cards",
        cols: 3,
        tone: "navy",
        rows: [
          ["**Level 1 · Advisory**", "The Model recommends, with a forecast and evidence; operators adjust the control system themselves, as today. Every time a recommendation is not followed, the reason is recorded."],
          ["**Level 2 · With approval**", "An authorised person approves a recommendation; Minder writes the setpoint to the control system within the approved range, then reports the result."],
          ["**Level 3 · Automatic within limits**", "Only for setpoints and narrow ranges Siam Cement Group has approved after months at level 2; operators can still switch it off at any time."],
        ],
      },
    ],
  },
  {
    id: "hai-ben",
    act: 3,
    theme: "mist",
    layout: "wide",
    eyebrow: "Data sovereignty and mutual benefit",
    title: "Siam Cement Group keeps data sovereignty at every plant; Celesnity owns the World Model technology. Both advance with every operating cycle",
    blocks: [
      {
        kind: "statement",
        context: "The Model keeps improving from real production; in return, Siam Cement Group's operating experience is standardised and scaled out through AI.",
        highlight: "Siam Cement Group has **more than a century of operating experience**. Celesnity **owns the World Model technology**.",
        conclusion: "**Partnership principle:** each party keeps 100% of its data assets. Only model knowledge that has passed security review is shared, creating value in both directions.",
      },
      { kind: "h3", text: "A closed cycle of data and knowledge" },
      { kind: "module", id: "M13", variant: "exchange" },
      {
        kind: "note",
        text: "Every update passes testing against data reconstruction and is approved by Siam Cement Group before it is sent, because an update merged into a released foundation model version cannot be withdrawn.",
      },
      { kind: "h3", text: "Six unchanging commitments" },
      { kind: "module", id: "M13", variant: "commitments" },
      { kind: "h3", text: "Intellectual property" },
      {
        kind: "cards",
        cols: 3,
        tone: "orange",
        head: ["Asset", "Owner", "Siam Cement Group's rights", "Celesnity's rights"],
        rows: [
          ["Internal data, raw-mix recipes, operating records and all results about Siam Cement Group's operations", "Siam Cement Group", "Full rights", "Used only to operate the service, within the scope Siam Cement Group approves"],
          ["Model dedicated to Siam Cement Group", "Celesnity", "Exclusive use for the full term of the partnership", "Develops, trains and maintains it; not provided to anyone else"],
          ["Foundation model, Minder platform, training code, evaluation toolkit", "Celesnity", "Use for the full term of the partnership", "Owns, continues to develop and licenses"],
        ],
      },
      { kind: "h3", text: "A partnership in which value compounds" },
      { kind: "module", id: "M14", variant: "paired" },
      {
        kind: "p",
        wide: true,
        text: "**Building value together:** Celesnity is rewarded only when Siam Cement Group realises real economic benefit; Celesnity's foundation model capability grows alongside Siam Cement Group's technological independence.",
      },
    ],
    details: [
      {
        key: "cycle",
        title: "A closed cycle of data and knowledge",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Step", "What goes where", "What it contains"],
            rows: [
              ["**①**", "**Source data kept by Siam Cement Group, at every plant**", "All raw data (machine signals, laboratory, raw-mix recipes, operating records) is stored and controlled by Siam Cement Group; the model dedicated to Siam Cement Group runs inside this environment."],
              ["**②**", "**Knowledge transfer under Siam Cement Group approval**", "Only model weight updates that have been de-identified and security-tested are sent; never with raw data, and only when Siam Cement Group approves each one."],
              ["**③**", "**Reintegration and stronger operating capability**", "Siam Cement Group receives an upgraded foundation model version, refined across many plants, making Siam Cement Group's own model more accurate with each round."],
            ],
            caption: "Raw data always stays in the Siam Cement Group environment. Only learned model knowledge is transferred, and it comes back as a smarter model.",
          },
        ],
      },
      {
        key: "commitments",
        title: "Six unchanging commitments",
        printOnly: true,
        blocks: [
          {
            kind: "list",
            ordered: true,
            items: [
              "The Model forecasts, compares and recommends. **Every command sent to a machine is approved by an authorised person**, within limits set by Siam Cement Group engineers. Each step to a higher level of autonomy is Siam Cement Group's decision alone, through the plant's change management process.",
              "Interlocks, safety systems, emergency stop, Quality decisions and dispatch decisions **keep their current authority**. Thresholds and limits come from the plant's standards, **not set by AI**.",
              "Raw data stays in Siam Cement Group's own environment at each plant. **Raw-mix recipes, drawings and process parameters never leave Siam Cement Group.**",
              "Siam Cement Group approves the purpose, who has access, retention periods and everything that is shared. Siam Cement Group data is not pooled with other clients and is not used for competitors. When the partnership ends, data is returned or deleted on request.",
              "Worker data is **never** used to rank or discipline individuals.",
              "Any publication, and any use of the Siam Cement Group name or logo, requires written consent (with at least 30 days' preview).",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "hop-tac",
    act: 3,
    theme: "light",
    eyebrow: "Partnership model",
    title: "Siam Cement Group invests in operating technology its own plants own, not in a stand-alone piece of software",
    blocks: [
      { kind: "h3", text: "Three main deployment components" },
      { kind: "module", id: "M14", variant: "package" },
      {
        kind: "list",
        items: [
          `**Pilot phase:** a fixed fee for a defined scope of work, agreed after the survey of ${PILOT_SHORT}. If Gate 2 is not passed, the project does not move to the next paid phase.`,
          "**After the pilot:** pricing based on actual economic value confirmed by Siam Cement Group Finance. Each new plant has its own scope and pricing.",
          "**Three commitments:** no exclusivity lock-in · no equity or revenue-share requirement · no raw data leaving the country where the plant is located.",
          "**Model development funding:** Celesnity funds the research and refinement of the foundation model itself.",
        ],
      },
      { kind: "h3", text: "Legal and security" },
      {
        kind: "list",
        items: [
          "**Vietnam:** Law on Artificial Intelligence 134/2025/QH15 (effective 1 March 2026) · Law on Personal Data Protection 91/2025/QH15 and Decree 356/2025/NĐ-CP (effective 1 January 2026).",
          "**Thailand:** Personal Data Protection Act B.E. 2562 (2019); Thai plant data stays in the Siam Cement Group environment in Thailand.",
          "**Security:** follows the approved plant network architecture and the IEC 62443 zoning model; starts in read-only mode; setpoint write permission opens only after Gate 2, setpoint by setpoint, with a log of every command.",
          "**Celesnity's standards:** designed in line with the GDPR and the EU AI Act; roadmap to ISO 27001 (June 2027) and SOC 2 (August 2027). No remote kill switch of any kind is built in.",
        ],
      },
      { kind: "h3", text: "Governance" },
      {
        kind: "cards",
        cols: 3,
        rows: [
          ["Joint Steering Committee", "Chaired by Siam Cement Group leadership, with the leads of each participating plant, together with Celesnity's Chief Executive and Chief Technology Officer. Meets quarterly and at each gate."],
          ["Data Council", "Meets monthly; approves data scope and setpoint write permissions."],
          ["Joint working group", "Meets weekly, at the plant."],
        ],
      },
    ],
    details: [
      {
        title: "The three components of the package",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["Component", "What it includes"],
            rows: [
              ["**① World Model**", "Siam Cement Group's own instance, running in Siam Cement Group's own environment at each plant; receives new foundation model versions, learned from many plants"],
              ["**② Minder platform and application suite**", "Minder on devices, at the machine and on the platform · 35 applications on 5 features, from quarry to port · approved control loop"],
              ["**③ Deployment and acceptance (field engineers)**", "Configured to Siam Cement Group procedures · systems integration · **training shift leads and plant engineers until they master the new operating technology**"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "loi-moi",
    act: 3,
    theme: "light",
    layout: "closing",
    eyebrow: "Invitation",
    title: "We invite Siam Cement Group to become the Founding Industrial Partner of the Super-Smart Factory",
    blocks: [
      { kind: "p", text: "**We respectfully ask your leadership to:**" },
      {
        kind: "list",
        ordered: true,
        items: [
          "**Agree the direction:** Siam Cement Group as Founding Industrial Partner; one kiln line as the starting point, and the Siam Cement Group network of plants as the destination of the first phase.",
          "**Assign people:** a Group executive sponsor · plant leads · a data lead · Kiln Process and Quality leads · a Finance lead · **shift leads and operating engineers at the pilot plant**.",
          `**Approve a survey of ${PILOT_SHORT}** to confirm the line, the problems to solve, the baseline and the pilot fee.`,
        ],
      },
      {
        kind: "steps",
        head: ["Timing", "Work"],
        rows: [
          ["T-1", "Meet Siam Cement Group leadership; agree the term sheet, non-disclosure agreement and data processing agreement"],
          ["T0", `Survey ${PILOT_SHORT} → confirm the pilot scope and fee`],
          ["T+4", "Gate 2: pilot results on the kiln line"],
          ["T+10", "Gate 3: whole plant, approved control loop"],
          ["T+16", "Gate 4: scale-out, wave 1"],
          ["T+22", "**Gate 5: scale-out, wave 2; Siam Cement Group owns the operating technology across its plants**"],
        ],
      },
      { kind: "module", id: "M14", variant: "closing" },
    ],
  },
];

/**
 * Parked sections (not shown on the page, not in print or the assistant).
 * To re-enable: move the element back into the `sections` array ("hai-con-duong" after "ky-nguyen").
 */
export const parkedSections: Section[] = [
  {
    id: "hai-con-duong",
    act: 1,
    theme: "mist",
    eyebrow: "The strategic question",
    title: "Who will own the operating intelligence of Siam Cement Group's plants?",
    blocks: [
      { kind: "module", id: "M3" },
      {
        kind: "quote",
        text: "Siam Cement Group has built its own capabilities in cement, in green materials and in supply chains across ASEAN. **Operating intelligence is the next capability Siam Cement Group can fully own.**",
      },
    ],
    details: [
      {
        title: "The two paths",
        printOnly: true,
        blocks: [
          {
            kind: "table",
            head: ["", "**Path A: Rent AI plant by plant**", "**Path B: Own it**"],
            rows: [
              ["**Model**", "Belongs to the vendor", "**Siam Cement Group's own World Model**"],
              ["**Data**", "Usually has to go to the vendor's systems", "**Stays in Siam Cement Group's own environment at each plant**"],
              ["**Experience**", "Enriches someone else's model", "**Builds up as a permanent Siam Cement Group asset**"],
              ["**Team**", "Depends on outside specialists", "**Run and developed by Siam Cement Group engineers**"],
              ["**Moving to a new plant or country**", "Buy more, integrate again", "**Carry the experience over, without starting from zero**"],
            ],
          },
        ],
      },
    ],
  },
];

/** Closing passage (shown in M14 variant "closing") */
export const closing = {
  headline: "Siam Cement Group has built more than a century of operating experience. The next step: turn that experience into operating intelligence that Siam Cement Group owns.",
  lead: "One day soon:",
  story: `At a Siam Cement Group plant in Thailand, a shift lead opens Minder before handover. The Model has learned from the kiln at ${PILOT_SHORT}, from the other Siam Cement Group plants, and from thousands of decisions by Siam Cement Group engineers. It forecasts that the kiln will drift in 90 minutes and recommends an adjustment. The shift lead approves. The kiln stays stable.`,
  tagline: "SUPER-SMART FACTORY: Self-learning · Foresight · Scale-out.",
  owner: "Owned by Siam Cement Group.",
  thanks: "Celesnity looks forward to building it with Siam Cement Group.",
  pdf: "Download PDF",
  ask: "Ask the assistant",
};

/**
 * Mutual benefits (M14 variant "paired" in #hai-ben): row i for Siam Cement Group corresponds to row i for Celesnity.
 */
export const benefits = {
  groupTitles: { give: "Contributions", receive: "Value received" },
  columnHeads: {
    give: ["Area", "Siam Cement Group contributes", "Celesnity contributes"],
    receive: ["Value goal", "Siam Cement Group receives", "Celesnity receives"],
  },
  rowLabels: {
    give: ["Data and core technology", "Platform and domain expertise", "Infrastructure and on-site deployment", "People and operations"],
    receive: ["Economics and cost", "Model and data sovereignty", "Technology maturity", "Long-term vision and position"],
  },
  partner: {
    name: "Siam Cement Group",
    give: [
      "**Access to operating data:** read-only during the pilot, stored on site, opened only within the scope Siam Cement Group approves.",
      "**Expert knowledge:** Kiln Process, Quality and Maintenance help solve the problems, about 4 hours a week.",
      "**On-site infrastructure:** plant servers and networks at each plant, owned by Siam Cement Group.",
      "**Plant operating engineers:** shift leads, process and maintenance staff use Minder in their daily work.",
    ],
    receive: [
      "**Measurable economic results:** heat consumption, power, kiln stops, alternative fuel, confirmed directly by Siam Cement Group Finance.",
      "**A dedicated AI model:** runs in the Siam Cement Group environment and serves only Siam Cement Group for the full term of the partnership; data and all results about Siam Cement Group's operations belong to Siam Cement Group.",
      "**Early access to leading AI capability:** 6 months' early access to new features and foundation model versions.",
      "**Ownership of the operating technology:** engineers across Siam Cement Group plants operate with Minder, ready to scale out to the next Siam Cement Group plants in the region.",
    ],
  },
  celesnity: {
    name: "Celesnity",
    give: [
      "**Foundation AI model:** provides the foundation model and funds 100% of its research and development.",
      "**Minder platform:** Minder on devices, at the machine and on the platform, with an application suite for the kiln and the whole plant.",
      "**Deployment team:** 3 people for the pilot and the whole plant, including a field engineer working at the plant; 4–5 as the programme scales out.",
      "**Operating guidance:** training and on-the-floor coaching until shift leads and engineers master the new operating technology.",
    ],
    receive: [
      "**Value-based fees:** a fixed fee during the pilot; after that, fees tied to confirmed value.",
      "**Model knowledge updates:** security-tested weights, only when Siam Cement Group approves; never with raw data.",
      "**Industrial proof of capability:** a World Model proven on a cement kiln, one of the most demanding industrial processes.",
      "**A strategic reference client in the region:** a deployment showcase across a regional network of plants, with Siam Cement Group's consent.",
    ],
  },
};

/** Partnership package (M14 variant "package") */
export const packageParts = [
  { n: "①", name: "World Model", body: "Siam Cement Group's own instance, running in Siam Cement Group's own environment at each plant; receives new foundation model versions, learned from many plants" },
  { n: "②", name: "Minder platform and application suite", body: "Minder on devices, at the machine and on the platform · 35 applications on 5 features, from quarry to port · approved control loop" },
  { n: "③", name: "Deployment and acceptance (field engineers)", body: "Configured to Siam Cement Group procedures · systems integration · **training shift leads and plant engineers until they master the new operating technology**" },
];

export const costShift = [
  { year: "Year 1", deploy: 0.7, model: 0.3, deployLabel: "Larger share", modelLabel: "Smaller share" },
  { year: "Year 2+", deploy: 0.25, model: 0.75, deployLabel: "Smaller share", modelLabel: "Larger share" },
];

// ───────────────────────────── APPENDIX ─────────────────────────────
export const appendix: AppendixSection[] = [
  {
    id: "cach-hoat-dong",
    title: "How the World Model works (simplified)",
    blocks: [
      {
        kind: "list",
        ordered: true,
        items: [
          "**Record:** everything at the plant becomes a \"state → decision → outcome\" sequence (for example: kiln state → setpoint change → kiln response and free lime).",
          "**Learn:** the model learns patterns of the form \"doing X in state Y usually leads to Z\".",
          "**Forecast with a level of confidence:** the model says \"I don't know\" when it meets raw materials, fuels or operating modes it has never seen.",
          "**Separate cause from coincidence:** operators usually change setpoints for a reason, so the model uses statistical methods to separate the true effect from the reason for the choice. When the data is not enough to tell them apart, the model says so.",
          "**Check technical limits:** a separate checking layer ensures recommendations stay within setpoint ranges, equipment limits and environmental regulations.",
          "**No experiments on the kiln:** the model learns only from recorded operation and approved changes.",
        ],
      },
      { kind: "p", text: "*Technical detail for the engineering team:*" },
      {
        kind: "list",
        items: [
          "The model core learns in a representation space (a JEPA-style approach).",
          "Confidence is calibrated with conformal methods.",
          "Effects are estimated with propensity and doubly robust methods.",
          "Training and testing are split by time.",
          "Minder at the machine: reads via OPC UA or Modbus from the control system and programmable logic controllers; writes setpoints only through an approved gateway, within limits, with a log and read-back confirmation.",
        ],
      },
    ],
  },
  {
    id: "nhan-rong-vat-lieu",
    title: "Scale-out directions for other Siam Cement Group materials plants (proposed)",
    blocks: [
      {
        kind: "cards",
        cols: 3,
        head: ["Direction", "Question the model answers", "Data needed"],
        rows: [
          ["Tile kilns", "How do changes to the firing curve or kiln speed affect warping, dimensions and reject rate?", "Roller kiln parameters, glaze, body mix, grading results"],
          ["Paper machines and packaging", "How do changes to pulp, drying steam or machine speed affect strength and web breaks?", "Paper machine parameters, reel quality, energy"],
          ["Concrete and green materials", "How does a lower-clinker mix affect strength?", "Mix designs, strength results, curing conditions"],
          ["Regional energy", "Which production schedule uses the least energy while still meeting orders?", "Production plans, energy metering, electricity prices"],
          ["Maintenance", "Which equipment needs maintenance first; what are the consequences of moving the maintenance schedule?", "Maintenance history, equipment alerts, engineers' observations"],
        ],
      },
    ],
  },
  {
    id: "rui-ro",
    title: "Risks and mitigation",
    blocks: [
      {
        kind: "cards",
        cols: 3,
        tone: "navy",
        head: ["Risk", "Mitigation"],
        rows: [
          ["Kiln data is insufficient or poorly time-aligned", "Gate 1 checks this first; start with available data, add sensors only where needed"],
          ["The model does not beat the current approach", "Gate 2 with a blind test set; if not passed, stop, with no move to a paid phase"],
          ["Commands written to the machine create operating risk", "Opened only after Gate 2; setpoint by setpoint; narrow ranges approved by Process; a person approves each time; interlocks and safety systems always override"],
          ["Experience from one plant does not transfer to the next", "Each new plant has its own survey and test set; what carries over is the platform, the method and the team, with no assumption that accuracy carries over"],
          ["Data leaves the country", "A separate environment at each plant, within its own jurisdiction; only tested weights approved by Siam Cement Group are shared"],
          ["Dependence on Celesnity", "Plant engineers master the new way of operating from the first months; source code and models are held in escrow"],
          ["Workers worry about being monitored", "Prior consultation; de-identification; never used to assess individuals"],
        ],
      },
    ],
  },
  {
    id: "nguon",
    title: "Sources",
    blocks: [{
        kind: "p",
        text: "Siam Cement Group and Siam Cement Group Vietnam: 2025 business results (January 2026) and first-half 2026 results (July 2026) · Siam Cement Group in Vietnam: over USD 7 billion, 28 companies, regional optimisation strategy (December 2025) · Siam Cement Group Vietnam 2025 revenue (February 2026) · Song Gianh Cement: 20 years, waste co-processing, 23% CO₂ reduction target for 2030, automated dispatch system (March 2026) · ESG 4 Plus and Inclusive Green Growth · CiMie AI and the AI process control partnership for cement (April 2026) · AI in Siam Cement Group packaging production (June 2026) · Vietnam cement market 2025 and first half of 2026 (Vietnam Investment Review, August 2026).",
      },
      {
        kind: "note",
        text: "Company announcements and press coverage establish reported information, not independent audit. The scale-out plants and the plant in Thailand are Celesnity's proposal. The scenarios and value figures in the examples are illustrative only.",
      },],
  },
];

export const sectionIds = sections.map((s) => s.id);
