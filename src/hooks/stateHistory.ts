"use client";

import React from "react";
import isEqual from "lodash/isEqual";

export default function useStateHistory<T>() {
  // Used to store history of all states
  const [history, setHistory] = React.useState<T[]>([]);
  // Index of current state within `states`
  const [index, setIndex] = React.useState(0);
  // Current state
  const state = React.useMemo(() => history[index], [history, index]);

  const setState = React.useCallback(
    (value: T) => {
      // Prevents rerenders if both states are equal
      if (isEqual(state, value)) return;
      // This removes all future (redo) states after current index
      const copy = history.slice(0, index + 1);
      copy.push(value);
      setHistory(copy);
      setIndex(copy.length - 1);
    },
    [index, state, history],
  );

  const resetState = React.useCallback((init: T) => {
    setIndex(0);
    setHistory([init]);
  }, []);

  const undo = React.useCallback(
    () => setIndex(Math.max(0, index - 1)),
    [index],
  );

  const redo = React.useCallback(
    () => setIndex(Math.min(history.length - 1, index + 1)),
    [index, history.length],
  );

  return {
    state,
    setState,
    resetState,
    index,
    lastIndex: history.length - 1,
    undo,
    redo,
  };
}
