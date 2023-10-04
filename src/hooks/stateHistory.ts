"use client";

import React from "react";
import isEqual from "lodash/isEqual";

export default function useStateHistory<T>() {
  // Used to store history of all states
  const [states, setStates] = React.useState<T[]>([]);
  // Index of current state within `states`
  const [index, setIndex] = React.useState(0);
  // Current state
  const state = React.useMemo(() => states[index], [states, index]);

  const setState = React.useCallback(
    (value: T) => {
      // Prevents rerenders if both states are equal
      if (isEqual(state, value)) return;
      // This removes all future (redo) states after current index
      const copy = states.slice(0, index + 1);
      copy.push(value);
      setStates(copy);
      setIndex(copy.length - 1);
    },
    [index, state, states],
  );

  const resetState = React.useCallback((init: T) => {
    setIndex(0);
    setStates([init]);
  }, []);

  const undo = React.useCallback(
    () => setIndex(Math.max(0, index - 1)),
    [index],
  );

  const redo = React.useCallback(
    () => setIndex(Math.min(states.length - 1, index + 1)),
    [index, states.length],
  );

  return {
    state,
    setState,
    resetState,
    index,
    lastIndex: states.length - 1,
    undo,
    redo,
  };
}
