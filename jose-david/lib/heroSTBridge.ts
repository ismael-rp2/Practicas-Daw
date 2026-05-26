type ScrollerArg = Element | Window | string | null | undefined;

let _init   : ((scroller?: ScrollerArg) => void) | null = null;
let _destroy: (() => void)              | null = null;

export function registerHeroST(
  init   : (scroller?: ScrollerArg) => void,
  destroy: () => void,
): void {
  _init    = init;
  _destroy = destroy;
}

export function unregisterHeroST(): void {
  _init    = null;
  _destroy = null;
}

export function destroyHeroST(): void {
  _destroy?.();
}

export function initHeroST(scroller?: ScrollerArg): void {
  _init?.(scroller);
}
