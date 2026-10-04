"use client";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ModuleId } from "@/decks/types";

const loading = () => <div className="min-h-[240px] animate-pulse rounded-[var(--radius-card)] bg-current/[0.04]" />;

const registry: Record<ModuleId, ComponentType<{ variant?: string }>> = {
  M1: dynamic(() => import("@/components/modules/M1"), { loading }),
  M2: dynamic(() => import("@/components/modules/M2"), { loading }),
  M3: dynamic(() => import("@/components/modules/M3"), { loading }),
  M4: dynamic(() => import("@/components/modules/M4"), { loading }),
  M5: dynamic(() => import("@/components/modules/M5"), { loading }),
  M6: dynamic(() => import("@/components/modules/M6"), { loading }),
  M7: dynamic(() => import("@/components/modules/M7"), { loading }),
  M8: dynamic(() => import("@/components/modules/M8"), { loading }),
  M9: dynamic(() => import("@/components/modules/M9"), { loading }),
  M10: dynamic(() => import("@/components/modules/M10"), { loading }),
  M11: dynamic(() => import("@/components/modules/M11"), { loading }),
  M12: dynamic(() => import("@/components/modules/M12"), { loading }),
  M13: dynamic(() => import("@/components/modules/M13"), { loading }),
  M14: dynamic(() => import("@/components/modules/M14"), { loading }),
  M15: dynamic(() => import("@/components/modules/M15"), { loading }),
  M16: dynamic(() => import("@/components/modules/M16"), { loading }),
  M17: dynamic(() => import("@/components/modules/M17"), { loading }),
  M18: dynamic(() => import("@/components/modules/M18"), { loading }),
  M19: dynamic(() => import("@/components/modules/M19"), { loading }),
};

/** Chỗ đặt một module tương tác trong section */
export function ModuleSlot({ id, variant }: { id: ModuleId; variant?: string }) {
  const C = registry[id];
  return (
    <div data-module={id} className="w-full">
      <C variant={variant} />
    </div>
  );
}
