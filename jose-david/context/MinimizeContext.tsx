'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface MinimizeCtx {
  isMinimized : boolean;
  toggle      : () => void;
  setMinimized: (v: boolean) => void;
}

const MinimizeContext = createContext<MinimizeCtx>({
  isMinimized : false,
  toggle      : () => {},
  setMinimized: () => {},
});

export function MinimizeProvider({ children }: { children: ReactNode }) {
  const [isMinimized, setMinimized] = useState(false);
  const toggle = useCallback(() => setMinimized(v => !v), []);

  return (
    <MinimizeContext.Provider value={{ isMinimized, toggle, setMinimized }}>
      {children}
    </MinimizeContext.Provider>
  );
}

export const useMinimize = () => useContext(MinimizeContext);
