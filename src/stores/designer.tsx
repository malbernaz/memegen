"use client";

import React from "react";
import { fabric } from "fabric";
import pick from "lodash/pick";

import useStateHistory from "@/hooks/stateHistory";
import { drawBackground, exportCanvas, ImageType } from "@/utils/canvas";
import { useShortcuts } from "@/hooks/useShortcuts";

const DesignerContext = React.createContext<null | {
  addText: () => void;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  exportMeme: () => void;
  handleOptionsChange: (newOptions: fabric.ITextboxOptions) => void;
  options: fabric.ITextboxOptions;
  setTemplate: React.Dispatch<React.SetStateAction<ImageType | null>>;
  template: ImageType | null;
  shortcutRef: React.MutableRefObject<HTMLDivElement | null>;
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
  const onGoingRestore = React.useRef(false);

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
      if (onGoingRestore.current) return;
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

  const shortcutRef = useShortcuts(
    {
      // undo/redo
      z: (e) => {
        if (!(e.ctrlKey || e.metaKey)) return;

        if (e.shiftKey) {
          if (index === lastIndex) return;
          onGoingRestore.current = true;
          redo();
        } else {
          if (index === 0) return;
          onGoingRestore.current = true;
          undo();
        }
      },
      // copy
      c: (e) => {
        if (!(e.ctrlKey || e.metaKey)) return;

        navigator.clipboard.writeText(
          JSON.stringify(
            canvas.current?.getActiveObjects()?.map((o) => o.toJSON()) ?? [],
          ),
        );
      },
      // paste
      v: async (e) => {
        if (!(e.ctrlKey || e.metaKey) || !canvas.current) return;

        const item = await navigator.clipboard.readText();

        try {
          const newObjects = JSON.parse(item);

          // make sure things aren't rendered until they are supposed to
          canvas.current.renderOnAddRemove = false;
          onGoingRestore.current = true;

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
            onGoingRestore.current = false;
          });
        } catch {
          addText(item);
        }
      },
      // delete
      Backspace: () => {
        canvas.current?.remove(...canvas.current.getActiveObjects());
      },
    },
    {
      enabled: !(canvas.current?.getActiveObject() as any)?.isEditing,
    },
  );

  // restore history
  React.useEffect(() => {
    if (!onGoingRestore.current || !canvas.current) return;

    canvas.current.renderOnAddRemove = false;
    canvas.current.remove(...canvas.current?.getObjects());
    // @ts-ignore - enlivenObjects types don't metch lib real signature
    fabric.util.enlivenObjects(state, (objs: fabric.Object[]) => {
      if (!canvas.current) return;
      canvas.current.add(...objs);
      canvas.current.renderAll();
      canvas.current.renderOnAddRemove = true;
      onGoingRestore.current = false;
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
        shortcutRef,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
