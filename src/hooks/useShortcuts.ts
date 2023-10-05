import React from "react";

type Shortcuts = Record<string, (e: KeyboardEvent) => void | Promise<void>>;
type Options = {
  enabled?: boolean;
};

export function useShortcuts(
  shortcuts: Shortcuts,
  options: Options = { enabled: true },
) {
  const shortcutRef = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    const shortcutElement = shortcutRef.current;

    const bindShortcuts = (e: KeyboardEvent) => {
      if (!options.enabled) return false;

      e.preventDefault();

      shortcuts[e.key]?.(e);
    };

    shortcutElement?.addEventListener("keydown", bindShortcuts);

    return () => {
      shortcutElement?.removeEventListener("keydown", bindShortcuts);
    };
  });

  return shortcutRef;
}
