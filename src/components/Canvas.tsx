"use client";

import { useDesigner } from "@/stores/designer";

export function Canvas() {
  const { template, canvasRef, shortcutRef } = useDesigner();

  return template ? (
    <div ref={shortcutRef} tabIndex={0}>
      <canvas
        ref={canvasRef}
        className="overflow-hidden rounded border border-neutral-700"
      />
    </div>
  ) : null;
}
