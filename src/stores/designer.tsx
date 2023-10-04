"use client";

import React from "react";
import { fabric } from "fabric";
import pick from "lodash/pick";

import useStateHistory from "@/hooks/stateHistory";
import { drawBackground, exportCanvas, ImageType } from "@/utils/canvas";

const DesignerContext = React.createContext<null | {
  addText: () => void;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  exportMeme: () => void;
  handleOptionsChange: (newOptions: fabric.ITextboxOptions) => void;
  options: fabric.ITextboxOptions;
  setTemplate: React.Dispatch<React.SetStateAction<ImageType | null>>;
  template: ImageType | null;
}>(null);

export function useDesigner() {
  const ctx = React.useContext(DesignerContext);

  if (!ctx) {
    throw new Error(
      "`useDesigner` is supposed to be used within a `DesignerProvider`.",
    );
  }

  return ctx;
}

export function DesignerProvider({ children }: React.PropsWithChildren) {
  const canvas = React.useRef<null | fabric.Canvas>();
  const canvasRef = React.useRef<null | HTMLCanvasElement>(null);
  const [template, setTemplate] = React.useState<ImageType | null>(null);
  const [options, setOptions] = React.useState<fabric.ITextboxOptions>({
    fontSize: 32,
    fill: "#ffffff",
    stroke: "#000000",
    strokeWidth: 2,
    fontFamily: "impact",
  });
  const { resetState, state, setState, undo, redo, index, lastIndex } =
    useStateHistory<fabric.Object[]>();
  const hasStateBeenRestored = React.useRef(false);

  // initialize canvas
  React.useEffect(() => {
    if (!template) return;

    (async () => {
      canvas.current = new fabric.Canvas(canvasRef.current, {
        preserveObjectStacking: true,
      });
      canvas.current.clear();
      await drawBackground(template, canvas.current);
      resetState([]);
    })();

    return () => {
      canvas.current?.dispose();
    };
  }, [resetState, template]);

  // bind canvas events
  React.useEffect(() => {
    if (!canvas.current) return;

    const updateOptions = (e: fabric.IEvent<Event>) => {
      if (e.selected?.length !== 1) return;

      handleOptionsChange(
        pick(e.selected[0], [
          "fontSize",
          "fill",
          "stroke",
          "strokeWidth",
          "fontFamily",
        ]),
      );
    };

    const saveSnapshot = async () => {
      if (hasStateBeenRestored.current) return;
      setState(canvas.current?.toJSON()!.objects!);
    };

    const eventsMap = {
      "selection:created": updateOptions,
      "selection:updated": updateOptions,
      "object:added": saveSnapshot,
      "object:removed": saveSnapshot,
      "object:modified": saveSnapshot,
    };

    // @ts-ignore - the library types are wrong here. `on` accepts a eventsMap
    canvas.current.on(eventsMap);

    return () => {
      // @ts-ignore
      canvas.current?.off(eventsMap);
    };
  });

  // bind shortcuts
  React.useEffect(() => {
    const bindShortcuts = (e: KeyboardEvent) => {
      const hasModKey = e.ctrlKey || e.metaKey;

      // early return if a text box is being edited
      if ((canvas.current?.getActiveObject() as any)?.isEditing) {
        return;
      }

      const shortcuts: Record<string, () => any> = {
        z: () => {
          if (!hasModKey) return;

          if (e.shiftKey) {
            if (index === lastIndex) return;
            hasStateBeenRestored.current = true;
            redo();
          } else {
            if (index === 0) return;
            hasStateBeenRestored.current = true;
            undo();
          }
        },
        c: () => {
          if (!hasModKey) return;

          navigator.clipboard.writeText(
            JSON.stringify(
              canvas.current?.getActiveObjects()?.map((o) => o.toJSON()) ?? [],
            ),
          );
        },
        v: async () => {
          if (!hasModKey || !canvas.current) return;

          const item = await navigator.clipboard.readText();

          try {
            const newObjects = JSON.parse(item);

            canvas.current.renderOnAddRemove = false;
            hasStateBeenRestored.current = true;

            // @ts-ignore = mismatching types between types and lib
            fabric.util.enlivenObjects(newObjects, (objs: fabric.Object[]) => {
              if (!canvas.current) return;

              for (const o of objs) {
                o.setOptions({
                  top: (o.top ?? 0) + 10,
                  left: (o.left ?? 0) + 10,
                });

                canvas.current.add(...objs);
              }

              const lastItem = objs.at(-1);

              if (lastItem) {
                canvas.current.setActiveObject(lastItem);
              }

              canvas.current.renderAll();
              canvas.current.renderOnAddRemove = true;
              hasStateBeenRestored.current = false;
            });
          } catch {
            addText(item);
          }
        },
        Backspace: () => {
          canvas.current?.remove(...canvas.current.getActiveObjects());
        },
      };

      shortcuts[e.key]?.();
    };

    window.addEventListener("keydown", bindShortcuts);

    return () => {
      window.removeEventListener("keydown", bindShortcuts);
    };
  });

  // restore history
  React.useEffect(() => {
    if (!hasStateBeenRestored.current || !canvas.current) return;

    canvas.current.renderOnAddRemove = false;
    canvas.current.remove(...canvas.current?.getObjects());
    // @ts-ignore - enlivenObjects types don't metch lib real signature
    fabric.util.enlivenObjects(state, (objs: fabric.Object[]) => {
      if (!canvas.current) return;
      canvas.current.add(...objs);
      canvas.current.renderAll();
      canvas.current.renderOnAddRemove = true;
      hasStateBeenRestored.current = false;
    });
  }, [state]);

  const addText = React.useCallback(
    (text = "WRITE SOMETHING :)") => {
      canvas.current?.add(new fabric.Textbox(text, options));
    },
    [options],
  );

  const handleOptionsChange = React.useCallback(
    (newOptions: fabric.ITextboxOptions) => {
      canvas.current
        ?.getActiveObjects()
        ?.forEach((o) => o.setOptions(newOptions));

      canvas.current?.renderAll();

      setOptions((options) => ({ ...options, ...newOptions }));
    },
    [],
  );

  const exportMeme = React.useCallback(() => {
    if (canvas.current) exportCanvas(canvas.current);
  }, []);

  return (
    <DesignerContext.Provider
      value={{
        addText,
        canvasRef,
        options,
        handleOptionsChange,
        exportMeme,
        template,
        setTemplate,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
