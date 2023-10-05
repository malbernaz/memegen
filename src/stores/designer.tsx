"use client";

import React from "react";
import {
  Canvas,
  Textbox,
  Object as FabricObject,
  type TextboxProps,
  util,
} from "fabric";
import pick from "lodash/pick";

import useStateHistory from "@/hooks/stateHistory";
import { drawBackground, exportCanvas, ImageType } from "@/utils/canvas";
import { useShortcuts } from "@/hooks/useShortcuts";

const DesignerContext = React.createContext<null | {
  addText: () => void;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  exportMeme: () => void;
  handleOptionsChange: (newOptions: Partial<TextboxProps>) => void;
  options: Partial<TextboxProps>;
  setTemplate: React.Dispatch<React.SetStateAction<ImageType | null>>;
  template: ImageType | null;
  shortcutRef: React.MutableRefObject<HTMLDivElement | null>;
  loading: boolean;
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
  const canvas = React.useRef<null | Canvas>();
  const canvasRef = React.useRef<null | HTMLCanvasElement>(null);
  const [template, setTemplate] = React.useState<ImageType | null>(null);
  const [options, setOptions] = React.useState<Partial<TextboxProps>>({
    fontSize: 32,
    fill: "#ffffff",
    stroke: "#000000",
    strokeWidth: 2,
    fontFamily: "impact",
  });
  const { resetState, state, setState, undo, redo, index, lastIndex } =
    useStateHistory<Object[]>();
  const onGoingRestore = React.useRef(false);
  const [loading, setLoading] = React.useState(false);

  // initialize canvas
  React.useEffect(() => {
    (async () => {
      if (!canvasRef.current || !template) return;

      setLoading(true);

      canvas.current = new Canvas(canvasRef.current, {
        preserveObjectStacking: true,
      });

      canvas.current.clear();

      await drawBackground(template, canvas.current);

      resetState([]);

      setLoading(false);
    })();

    return () => {
      canvas.current?.dispose();
    };
  }, [resetState, template]);

  // bind canvas events
  React.useEffect(() => {
    if (!canvas.current) return;

    const updateOptions = (e: { selected: FabricObject[] }) => {
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

    canvas.current.on(eventsMap);

    return () => canvas.current?.off(eventsMap);
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
          const json = JSON.parse(item);

          const newObjects = await util.enlivenObjects<FabricObject>(json);

          for (const o of newObjects) {
            o.set("top", (o.top ?? 0) + 10);
            o.set("left", (o.left ?? 0) + 10);
          }

          canvas.current.add(...newObjects);
          canvas.current.setActiveObject(newObjects.at(-1)!);
        } catch {
          addText(item);
        }
      },
      // delete
      Backspace: () => {
        canvas.current?.remove(...canvas.current.getActiveObjects());
        canvas.current?.discardActiveObject();
      },
    },
    {
      enabled: !(canvas.current?.getActiveObject() as any)?.isEditing,
    },
  );

  // restore history
  React.useEffect(() => {
    (async () => {
      if (!onGoingRestore.current || !canvas.current) return;

      canvas.current.renderOnAddRemove = false;
      canvas.current.remove(...canvas.current?.getObjects());

      const newObjects = await util.enlivenObjects<FabricObject>(state);

      canvas.current.add(...newObjects);
      canvas.current.renderAll();

      canvas.current.renderOnAddRemove = true;
      onGoingRestore.current = false;
    })();
  }, [state]);

  const addText = React.useCallback(
    (text = "WRITE SOMETHING :)") => {
      canvas.current?.add(new Textbox(text, options));
    },
    [options],
  );

  const handleOptionsChange = React.useCallback(
    (newOptions: Partial<TextboxProps>) => {
      canvas.current?.getActiveObjects()?.forEach((o) => {
        for (const [k, v] of Object.entries(newOptions)) {
          o.set(k, v);
        }
      });

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
        loading,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
