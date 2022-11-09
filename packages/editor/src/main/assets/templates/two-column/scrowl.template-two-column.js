!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n(require("React"),require("@scrowl/template-core"));else if("function"==typeof define&&define.amd)define(["React"],n);else{var o="object"==typeof exports?n(require("React"),require("@scrowl/template-core")):n(e.React,e.Scrowl);for(var t in o)("object"==typeof exports?exports:e)[t]=o[t]}}(self,((__WEBPACK_EXTERNAL_MODULE__24__,__WEBPACK_EXTERNAL_MODULE__294__)=>(()=>{"use strict";var __webpack_modules__={911:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXTERNAL MODULE: external \"React\"\nvar external_React_ = __webpack_require__(24);\nvar external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);\n// EXTERNAL MODULE: external {\"root\":\"Scrowl\",\"commonjs\":\"@scrowl/template-core\",\"commonjs2\":\"@scrowl/template-core\"}\nvar template_core_ = __webpack_require__(294);\nvar template_core_default = /*#__PURE__*/__webpack_require__.n(template_core_);\n;// CONCATENATED MODULE: ./src/_index.scss\n// extracted by mini-css-extract-plugin\nvar canFocus = \"can-focus\";\nvar column = \"column\";\nvar columnWrapper = \"column-wrapper\";\nvar editMode = \"edit-mode\";\nvar firstColumn = \"first-column\";\nvar hasFocus = \"has-focus\";\nvar header = \"header\";\nvar secondColumn = \"second-column\";\nvar stackedViewNarrow = \"stacked-view-narrow\";\nvar stackedViewSingle = \"stacked-view-single\";\nvar stackedViewWide = \"stacked-view-wide\";\nvar templateTwoColumn = \"template-two-column\";\nvar thirdColumn = \"third-column\";\n;// CONCATENATED MODULE: ./src/two-column.tsx\n\n\n\nconst Column = ({ field, className, heading, body, isEdit, focusElement }) => {\n    return (external_React_default().createElement(\"div\", { className: className },\n        external_React_default().createElement(\"h2\", { className: 'can-focus ' + (focusElement === `${field}.heading` && ' has-focus'), onMouseDown: () => {\n                if (isEdit) {\n                    template_core_default().core.host.sendMessage({\n                        type: 'focus',\n                        field: `${field}.heading`,\n                    });\n                }\n            } }, heading.value),\n        external_React_default().createElement(\"p\", { className: 'can-focus ' + (focusElement === `${field}.body` && ' has-focus'), onMouseDown: () => {\n                if (isEdit) {\n                    template_core_default().core.host.sendMessage({\n                        type: 'focus',\n                        field: `${field}.body`,\n                    });\n                }\n            } },\n            external_React_default().createElement((template_core_default()).core.Markdown, { children: body.value }))));\n};\nconst TwoColumn = ({ schema, ...props }) => {\n    let classes = `${templateTwoColumn}`;\n    const editMode = props.editMode ? true : false;\n    const focusElement = editMode ? props.focusElement : null;\n    const options = schema.content.options;\n    const numberOfColumns = options.content.numberOfColumns.value;\n    const stackOnMobile = options.content.stackOnMobile.value;\n    const firstColumn = schema.content.firstColumn.content;\n    const secondColumn = schema.content.secondColumn.content;\n    const thirdColumn = schema.content.thirdColumn.content;\n    return (external_React_default().createElement((template_core_default()).core.Template, { ...props, className: classes, ready: true },\n        external_React_default().createElement(\"div\", { className: \"slide-container\" },\n            external_React_default().createElement(\"div\", { className: `column-wrapper ${stackOnMobile && numberOfColumns === 3\n                    ? 'stacked-view-wide'\n                    : stackOnMobile && numberOfColumns === 2\n                        ? 'stacked-view-narrow'\n                        : stackOnMobile && numberOfColumns === 1\n                            ? 'stacked-view-single'\n                            : ''}` },\n                external_React_default().createElement(Column, { isEdit: editMode, focusElement: focusElement, className: \"column first-column\", field: \"firstColumn\", heading: firstColumn.heading, body: firstColumn.body }),\n                numberOfColumns >= 2 && (external_React_default().createElement(Column, { isEdit: editMode, focusElement: focusElement, className: \"column second-column\", field: \"secondColumn\", heading: secondColumn.heading, body: secondColumn.body })),\n                numberOfColumns >= 3 && (external_React_default().createElement(Column, { isEdit: editMode, focusElement: focusElement, className: \"column third-column\", field: \"thirdColumn\", heading: thirdColumn.heading, body: thirdColumn.body }))))));\n};\n/* harmony default export */ const two_column = ({\n    TwoColumn,\n});\n\n;// CONCATENATED MODULE: ./src/two-column.schema.ts\nconst TwoColumnSchema = {\n    meta: {\n        version: '1.0.0',\n        label: 'Two Column',\n        component: 'TwoColumn',\n        filename: 'two-column',\n        icon: 'view_week',\n        tags: ['text', 'columns'],\n    },\n    content: {\n        options: {\n            type: 'Fieldset',\n            label: 'Columns',\n            content: {\n                numberOfColumns: {\n                    type: 'Radio',\n                    label: 'Number of Columns',\n                    value: 3,\n                    options: [\n                        {\n                            label: 'One column',\n                            value: 1,\n                            icon: 'crop_portrait',\n                            controller: {\n                                fields: ['secondColumn', 'thridColumn'],\n                                effect: 'hide',\n                            },\n                        },\n                        {\n                            label: 'Two columns',\n                            value: 2,\n                            icon: 'view_column_2',\n                            controller: {\n                                fields: ['thridColumn'],\n                                effect: 'hide',\n                            },\n                        },\n                        {\n                            label: 'Three columns',\n                            value: 3,\n                            icon: 'view_week',\n                        },\n                    ],\n                },\n                stackOnMobile: {\n                    type: 'Checkbox',\n                    label: 'Stack On Mobile',\n                    value: true,\n                },\n            },\n        },\n        firstColumn: {\n            type: 'Fieldset',\n            label: 'First Column',\n            content: {\n                heading: {\n                    type: 'Textbox',\n                    label: 'Heading',\n                    placeholder: 'Heading',\n                },\n                body: {\n                    type: 'Textbox',\n                    label: 'body',\n                    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n                    placeholder: 'Write content here...',\n                    multiLine: true,\n                    lines: 3,\n                    autoGrow: 5,\n                    allowLinebreaks: true,\n                },\n            },\n        },\n        secondColumn: {\n            type: 'Fieldset',\n            label: 'Second Column',\n            content: {\n                heading: {\n                    type: 'Textbox',\n                    label: 'Heading',\n                    placeholder: 'Heading',\n                },\n                body: {\n                    type: 'Textbox',\n                    label: 'body',\n                    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n                    placeholder: 'Write content here...',\n                    multiLine: true,\n                    lines: 3,\n                    autoGrow: 5,\n                    allowLinebreaks: true,\n                },\n            },\n        },\n        thirdColumn: {\n            type: 'Fieldset',\n            label: 'Third Column',\n            content: {\n                heading: {\n                    type: 'Textbox',\n                    label: 'Heading',\n                    placeholder: 'Heading',\n                },\n                body: {\n                    type: 'Textbox',\n                    label: 'body',\n                    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',\n                    placeholder: 'Write content here...',\n                    multiLine: true,\n                    lines: 3,\n                    autoGrow: 5,\n                    allowLinebreaks: true,\n                },\n            },\n        },\n    },\n};\n/* harmony default export */ const two_column_schema = ({\n    TwoColumnSchema,\n});\n\n;// CONCATENATED MODULE: ./src/index.ts\n\n\n\n\n;// CONCATENATED MODULE: ./web/index.ts\n\nwindow.TwoColumn = TwoColumn;\nwindow.TwoColumnSchema = TwoColumnSchema;\n\n\n//# sourceURL=webpack://@scrowl/template-two-column/./web/index.ts_+_4_modules?")},24:e=>{e.exports=__WEBPACK_EXTERNAL_MODULE__24__},294:e=>{e.exports=__WEBPACK_EXTERNAL_MODULE__294__}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var o=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](o,o.exports,__webpack_require__),o.exports}__webpack_require__.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(n,{a:n}),n},__webpack_require__.d=(e,n)=>{for(var o in n)__webpack_require__.o(n,o)&&!__webpack_require__.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__(911);return __webpack_exports__})()));