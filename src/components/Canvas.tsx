"use client";

import { useDesigner } from "@/stores/designer";

export function Canvas() {
  const { canvasRef, shortcutRef, loading } = useDesigner();

  return (
    <>
      <div
        ref={shortcutRef}
        tabIndex={0}
        className={`outline-0${loading ? " hidden" : ""}`}
      >
        <canvas
          ref={canvasRef}
          className="overflow-hidden rounded border border-neutral-700 shadow-md"
        />
      </div>
      {loading && "Loading template..."}
    </>
  );
}
