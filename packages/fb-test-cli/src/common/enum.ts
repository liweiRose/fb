export enum LANG {
  JS = "javascript",
  TS = "typescript",
}

export enum APP_TYPE {
  APP = "application",
  LIB = "library",
}

export enum APPLICATION {
  VUE = "vue" /* Vue.js + volar + Ts */,
  REACT = "react" /* React + Hooks + Redux-Saga + React-Router + Immer + Ts */,
  ANGULAR = "angular" /* Angular 全家桶 */,
}

export enum VERSION_VUE {
  OLD = "old" /* 表示 2.x 版本 */,
  NEXT = "next" /* 表示 3.x 版本 */,
}

export enum VERSION_REACT {
  CLASS = "class" /* 16.7 版本 ↓ */,
  HOOK = "hook" /* 16.8 版本 ↑ */,
}

export enum LIBRARY {
  CLI = "cli" /* Command-Line Interface */,
  COMMON = "common" /* Common-JavaScript-Library */,
  COMPONENT = "component" /* react/vue/angular 组件包 */,
}

export enum ENV {
  BROWSER = "browser",
  NODE = "node",
  COMMON = "common",
}
