!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n(require("React"));else if("function"==typeof define&&define.amd)define(["React"],n);else{var t="object"==typeof exports?n(require("React")):n(e.React);for(var r in t)("object"==typeof exports?exports:e)[r]=t[r]}}(self,(__WEBPACK_EXTERNAL_MODULE__24__=>(()=>{"use strict";var __webpack_modules__={219:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n;// CONCATENATED MODULE: ./src/two-column.schema.ts\nconst TwoColumnSchema = {\n    meta: {\n        version: '1.0.0',\n        label: 'Two Column',\n        component: 'TwoColumn',\n        filename: 'two-column',\n        icon: 'view_week',\n        tags: ['text', 'columns'],\n    },\n    content: {\n        options: {\n            type: 'Fieldset',\n            label: 'Columns',\n            content: {\n                numberOfColumns: {\n                    type: 'Radio',\n                    label: 'Number of Columns',\n                    value: 2,\n                    options: [\n                        {\n                            label: 'One column',\n                            value: 1,\n                            icon: 'crop_portrait',\n                            controller: {\n                                fields: ['secondColumn', 'thridColumn'],\n                                effect: 'hide',\n                            },\n                        },\n                        {\n                            label: 'Two columns',\n                            value: 2,\n                            icon: 'view_column_2',\n                            controller: {\n                                fields: ['thridColumn'],\n                                effect: 'hide',\n                            },\n                        },\n                        {\n                            label: 'Three columns',\n                            value: 3,\n                            icon: 'view_week',\n                        },\n                    ],\n                },\n                stackOnMobile: {\n                    type: 'Checkbox',\n                    label: 'Stack On Mobile',\n                    value: true,\n                },\n                alignment: {\n                    type: 'Select',\n                    hint: 'BodyAlignment',\n                    label: 'Alignment',\n                    value: 'left',\n                    options: [\n                        {\n                            name: 'Full Justify',\n                            value: 'justify',\n                            icon: 'align_horizontal_right',\n                        },\n                        {\n                            name: 'Align Left',\n                            value: 'left',\n                            icon: 'align_horizontal_left',\n                        },\n                        {\n                            name: 'Align Center',\n                            value: 'center',\n                            icon: 'align_horizontal_left',\n                        },\n                        {\n                            name: 'Align Right',\n                            value: 'right',\n                            icon: 'align_horizontal_right',\n                        },\n                    ],\n                    iconFromValue: true,\n                },\n            },\n        },\n        firstColumn: {\n            type: 'Fieldset',\n            label: 'First Column',\n            content: {\n                heading: {\n                    type: 'Textbox',\n                    label: 'Heading',\n                    placeholder: 'Heading',\n                    value: 'Heading 1',\n                },\n                body: {\n                    type: 'Textbox',\n                    label: 'body',\n                    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n                    placeholder: 'Write content here...',\n                    multiLine: true,\n                    lines: 3,\n                    autoGrow: 5,\n                    allowLinebreaks: true,\n                },\n            },\n        },\n        secondColumn: {\n            type: 'Fieldset',\n            label: 'Second Column',\n            content: {\n                heading: {\n                    type: 'Textbox',\n                    label: 'Heading',\n                    placeholder: 'Heading',\n                    value: 'Heading 2',\n                },\n                body: {\n                    type: 'Textbox',\n                    label: 'body',\n                    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n                    placeholder: 'Write content here...',\n                    multiLine: true,\n                    lines: 3,\n                    autoGrow: 5,\n                    allowLinebreaks: true,\n                },\n            },\n        },\n        thirdColumn: {\n            type: 'Fieldset',\n            label: 'Third Column',\n            content: {\n                heading: {\n                    type: 'Textbox',\n                    label: 'Heading',\n                    placeholder: 'Heading',\n                    value: 'Heading 3',\n                },\n                body: {\n                    type: 'Textbox',\n                    label: 'body',\n                    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n                    placeholder: 'Write content here...',\n                    multiLine: true,\n                    lines: 3,\n                    autoGrow: 5,\n                    allowLinebreaks: true,\n                },\n            },\n        },\n    },\n    controlOptions: {\n        stopUserAdvancement: {\n            type: 'Checkbox',\n            label: 'Stop User Advancement',\n            value: false,\n        },\n        disableAnimations: {\n            type: 'Checkbox',\n            label: 'Disable Animations',\n            value: false,\n        },\n    },\n};\n/* harmony default export */ const two_column_schema = ({\n    TwoColumnSchema,\n});\n\n;// CONCATENATED MODULE: ./src/index.ts\n\n\n\n// EXTERNAL MODULE: external \"React\"\nvar external_React_ = __webpack_require__(24);\nvar external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);\n;// CONCATENATED MODULE: ./web/two-column-lazy.tsx\n\nconst TwoColumnLazy = (0,external_React_.lazy)(() => __webpack_require__.e(/* import() | template-two-column */ 815).then(__webpack_require__.bind(__webpack_require__, 733)));\nconst TwoColumn = (props) => {\n    return (external_React_default().createElement(external_React_.Suspense, { fallback: external_React_default().createElement(\"div\", null, \"Loading...\") },\n        external_React_default().createElement(TwoColumnLazy, { ...props })));\n};\n/* harmony default export */ const two_column_lazy = (TwoColumn);\n\n;// CONCATENATED MODULE: ./web/index.ts\n\n\nwindow.TwoColumn = two_column_lazy;\nwindow.TwoColumnSchema = TwoColumnSchema;\n\n\n//# sourceURL=webpack://@scrowl/template-two-column/./web/index.ts_+_3_modules?")},24:e=>{e.exports=__WEBPACK_EXTERNAL_MODULE__24__}},__webpack_module_cache__={},inProgress,dataWebpackPrefix,loadStylesheet,installedCssChunks;function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var t=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](t,t.exports,__webpack_require__),t.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(n,{a:n}),n},__webpack_require__.d=(e,n)=>{for(var t in n)__webpack_require__.o(n,t)&&!__webpack_require__.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},__webpack_require__.f={},__webpack_require__.e=e=>Promise.all(Object.keys(__webpack_require__.f).reduce(((n,t)=>(__webpack_require__.f[t](e,n),n)),[])),__webpack_require__.u=e=>"scrowl.template-two-column.component.js",__webpack_require__.miniCssF=e=>{if(815===e)return"scrowl.template-two-column.css"},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),inProgress={},dataWebpackPrefix="@scrowl/template-two-column:",__webpack_require__.l=(e,n,t,r)=>{if(inProgress[e])inProgress[e].push(n);else{var o,a;if(void 0!==t)for(var _=document.getElementsByTagName("script"),l=0;l<_.length;l++){var i=_[l];if(i.getAttribute("src")==e||i.getAttribute("data-webpack")==dataWebpackPrefix+t){o=i;break}}o||(a=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,__webpack_require__.nc&&o.setAttribute("nonce",__webpack_require__.nc),o.setAttribute("data-webpack",dataWebpackPrefix+t),o.src=e),inProgress[e]=[n];var u=(n,t)=>{o.onerror=o.onload=null,clearTimeout(c);var r=inProgress[e];if(delete inProgress[e],o.parentNode&&o.parentNode.removeChild(o),r&&r.forEach((e=>e(t))),n)return n(t)},c=setTimeout(u.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=u.bind(null,o.onerror),o.onload=u.bind(null,o.onload),a&&document.head.appendChild(o)}},__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;__webpack_require__.g.importScripts&&(e=__webpack_require__.g.location+"");var n=__webpack_require__.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var t=n.getElementsByTagName("script");t.length&&(e=t[t.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),__webpack_require__.p=e})(),loadStylesheet=e=>new Promise(((n,t)=>{var r=__webpack_require__.miniCssF(e),o=__webpack_require__.p+r;if(((e,n)=>{for(var t=document.getElementsByTagName("link"),r=0;r<t.length;r++){var o=(_=t[r]).getAttribute("data-href")||_.getAttribute("href");if("stylesheet"===_.rel&&(o===e||o===n))return _}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){var _;if((o=(_=a[r]).getAttribute("data-href"))===e||o===n)return _}})(r,o))return n();((e,n,t,r)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=a=>{if(o.onerror=o.onload=null,"load"===a.type)t();else{var _=a&&("load"===a.type?"missing":a.type),l=a&&a.target&&a.target.href||n,i=new Error("Loading CSS chunk "+e+" failed.\n("+l+")");i.code="CSS_CHUNK_LOAD_FAILED",i.type=_,i.request=l,o.parentNode.removeChild(o),r(i)}},o.href=n,document.head.appendChild(o)})(e,o,n,t)})),installedCssChunks={718:0},__webpack_require__.f.miniCss=(e,n)=>{installedCssChunks[e]?n.push(installedCssChunks[e]):0!==installedCssChunks[e]&&{815:1}[e]&&n.push(installedCssChunks[e]=loadStylesheet(e).then((()=>{installedCssChunks[e]=0}),(n=>{throw delete installedCssChunks[e],n})))},(()=>{var e={718:0};__webpack_require__.f.j=(n,t)=>{var r=__webpack_require__.o(e,n)?e[n]:void 0;if(0!==r)if(r)t.push(r[2]);else{var o=new Promise(((t,o)=>r=e[n]=[t,o]));t.push(r[2]=o);var a=__webpack_require__.p+__webpack_require__.u(n),_=new Error;__webpack_require__.l(a,(t=>{if(__webpack_require__.o(e,n)&&(0!==(r=e[n])&&(e[n]=void 0),r)){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;_.message="Loading chunk "+n+" failed.\n("+o+": "+a+")",_.name="ChunkLoadError",_.type=o,_.request=a,r[1](_)}}),"chunk-"+n,n)}};var n=(n,t)=>{var r,o,[a,_,l]=t,i=0;if(a.some((n=>0!==e[n]))){for(r in _)__webpack_require__.o(_,r)&&(__webpack_require__.m[r]=_[r]);if(l)l(__webpack_require__)}for(n&&n(t);i<a.length;i++)o=a[i],__webpack_require__.o(e,o)&&e[o]&&e[o][0](),e[o]=0},t=self.webpackChunk_scrowl_template_two_column=self.webpackChunk_scrowl_template_two_column||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var __webpack_exports__=__webpack_require__(219);return __webpack_exports__})()));