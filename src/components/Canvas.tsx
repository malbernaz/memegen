"use client";

import { useDesigner } from "@/stores/designer";

export function Canvas() {
  const { template, canvasRef } = useDesigner();

  return template ? (
    <canvas
      className="overflow-hidden rounded border border-neutral-700"
      ref={canvasRef}
    />
  ) : null;
}
