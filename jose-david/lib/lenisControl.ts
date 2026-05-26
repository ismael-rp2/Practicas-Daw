let _destroy: (() => void) | null = null;
let _init   : ((scrollTo?: number) => void) | null = null;

export function registerLenisControl(
  destroy: () => void,
  init   : (scrollTo?: number) => void,
): void {
  _destroy = destroy;
  _init    = init;
}

export function unregisterLenisControl(): void {
  _destroy = null;
  _init    = null;
}

export function destroyLenis(): void {
  _destroy?.();
}

export function initLenis(scrollTo = 0): void {
  _init?.(scrollTo);
}
