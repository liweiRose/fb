"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = exports.LIBRARY = exports.VERSION_REACT = exports.VERSION_VUE = exports.APPLICATION = exports.APP_TYPE = exports.LANG = void 0;
var LANG;
(function (LANG) {
    LANG["JS"] = "javascript";
    LANG["TS"] = "typescript";
})(LANG = exports.LANG || (exports.LANG = {}));
var APP_TYPE;
(function (APP_TYPE) {
    APP_TYPE["APP"] = "application";
    APP_TYPE["LIB"] = "library";
})(APP_TYPE = exports.APP_TYPE || (exports.APP_TYPE = {}));
var APPLICATION;
(function (APPLICATION) {
    APPLICATION["VUE"] = "vue"; /* Vue.js + volar + Ts */
    APPLICATION["REACT"] = "react"; /* React + Hooks + Redux-Saga + React-Router + Immer + Ts */
    APPLICATION["ANGULAR"] = "angular"; /* Angular 全家桶 */
})(APPLICATION = exports.APPLICATION || (exports.APPLICATION = {}));
var VERSION_VUE;
(function (VERSION_VUE) {
    VERSION_VUE["OLD"] = "old"; /* 表示 2.x 版本 */
    VERSION_VUE["NEXT"] = "next"; /* 表示 3.x 版本 */
})(VERSION_VUE = exports.VERSION_VUE || (exports.VERSION_VUE = {}));
var VERSION_REACT;
(function (VERSION_REACT) {
    VERSION_REACT["CLASS"] = "class"; /* 16.7 版本 ↓ */
    VERSION_REACT["HOOK"] = "hook"; /* 16.8 版本 ↑ */
})(VERSION_REACT = exports.VERSION_REACT || (exports.VERSION_REACT = {}));
var LIBRARY;
(function (LIBRARY) {
    LIBRARY["CLI"] = "cli"; /* Command-Line Interface */
    LIBRARY["COMMON"] = "common"; /* Common-JavaScript-Library */
    LIBRARY["COMPONENT"] = "component"; /* react/vue/angular 组件包 */
})(LIBRARY = exports.LIBRARY || (exports.LIBRARY = {}));
var ENV;
(function (ENV) {
    ENV["BROWSER"] = "browser";
    ENV["NODE"] = "node";
    ENV["COMMON"] = "common";
})(ENV = exports.ENV || (exports.ENV = {}));
//# sourceMappingURL=enum.js.map