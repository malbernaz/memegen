"use client";

import { SearchBar } from "./SearchBar";
import { MenuBar } from "./MenuBar";
import { Canvas } from "./Canvas";
import { useDesigner } from "@/stores/designer";

export function Designer() {
  const { addText, template, loading } = useDesigner();

  return (
    <div className="grid h-screen grid-cols-[300px_1fr]">
      <SearchBar />
      <div className="relative grid h-screen grid-rows-[auto_1fr] overflow-y-auto bg-neutral-800 shadow-inner">
        <div className="sticky top-0 z-10 border-b border-b-neutral-600">
          <MenuBar />
        </div>
        <div className="grid h-full place-content-center p-8">
          {template && <Canvas />}
        </div>
        {template && !loading && (
          <button
            className="fixed bottom-4 right-4 rounded border border-neutral-600 bg-neutral-900 px-3 py-2 font-semibold"
            onClick={() => addText()}
          >
            Add Caption
          </button>
        )}
      </div>
    </div>
  );
}
