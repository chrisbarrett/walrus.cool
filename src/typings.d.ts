// typography libs

declare module 'typography-theme-github' {
  import { TypographyOptions } from 'typography';
  const Theme: TypographyOptions;
  export = Theme;
}

declare module 'typography-plugin-code';

// type shims for CSS modules

interface CSSModule {
  [className: string]: string;
}

declare module '*.module.scss' {
  const cssModule: CSSModule;
  export = cssModule;
}

declare module '*.module.css' {
  const cssModule: CSSModule;
  export = cssModule;
}
