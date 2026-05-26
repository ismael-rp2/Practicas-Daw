let _setter: ((p: number) => void) | null = null;

export function registerProgressSetter(fn: (p: number) => void): void {
  _setter = fn;
}

export function unregisterProgressSetter(): void {
  _setter = null;
}

export function setHeroProgress(p: number): void {
  _setter?.(p);
}
