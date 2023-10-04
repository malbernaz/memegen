"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HexColorPicker } from "react-colorful";
import { useDesigner } from "@/stores/designer";

const fontSizes = Array.from({ length: 16 }, (_, i) => (i + 2) * 4);
const borderSizes = Array.from({ length: 17 }, (_, i) => i);

export function MenuBar() {
  const { handleOptionsChange, exportMeme, options, template } = useDesigner();

  return (
    <div className="flex justify-between bg-neutral-900 py-2 text-xs">
      <div className="px-4">
        {template && (
          <button onClick={exportMeme} className="font-semibold">
            Export
          </button>
        )}
      </div>
      <div className="flex justify-end divide-x divide-neutral-700">
        <div className="flex items-center gap-2 px-4">
          <span className="font-semibold">Font:</span>
          <select
            className="bg-transparent text-neutral-200"
            value={options.fontFamily}
            onChange={(e) =>
              handleOptionsChange({ fontFamily: e.target.value })
            }
          >
            <option value="impact">Impact</option>
            <option value="arial">Arial</option>
          </select>
          <select
            className="bg-transparent text-neutral-200"
            value={options.fontSize}
            onChange={(e) =>
              handleOptionsChange({ fontSize: parseInt(e.target.value) })
            }
          >
            {fontSizes.map((s) => (
              <option key={s} value={s}>
                {s}px
              </option>
            ))}
          </select>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-lg border border-neutral-600"
                  style={{ background: options.fill as string }}
                />
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="z-20" sideOffset={8}>
                <HexColorPicker
                  color={options.fill as string}
                  onChange={(fill) => handleOptionsChange({ fill })}
                />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
        <div className="flex items-center gap-2 px-4">
          <span className="font-semibold">Border:</span>
          <select
            className="bg-transparent text-neutral-200"
            value={options.strokeWidth}
            onChange={(e) =>
              handleOptionsChange({ strokeWidth: parseInt(e.target.value) })
            }
          >
            {borderSizes.map((s) => (
              <option key={s} value={s}>
                {s}px
              </option>
            ))}
          </select>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-lg border border-neutral-600"
                  style={{ background: options.stroke as string }}
                />
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="z-20" sideOffset={8}>
                <HexColorPicker
                  color={options.stroke as string}
                  onChange={(stroke) => handleOptionsChange({ stroke })}
                />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
}
