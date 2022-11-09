!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n(require("React"),require("@scrowl/template-core"));else if("function"==typeof define&&define.amd)define(["React"],n);else{var t="object"==typeof exports?n(require("React"),require("@scrowl/template-core")):n(e.React,e.Scrowl);for(var a in t)("object"==typeof exports?exports:e)[a]=t[a]}}(self,((__WEBPACK_EXTERNAL_MODULE__24__,__WEBPACK_EXTERNAL_MODULE__294__)=>(()=>{"use strict";var __webpack_modules__={261:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXTERNAL MODULE: external \"React\"\nvar external_React_ = __webpack_require__(24);\nvar external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);\n// EXTERNAL MODULE: external {\"root\":\"Scrowl\",\"commonjs\":\"@scrowl/template-core\",\"commonjs2\":\"@scrowl/template-core\"}\nvar template_core_ = __webpack_require__(294);\nvar template_core_default = /*#__PURE__*/__webpack_require__.n(template_core_);\n;// CONCATENATED MODULE: ./src/_index.scss\n// extracted by mini-css-extract-plugin\nvar canFocus = \"can-focus\";\nvar center = \"center\";\nvar editMode = \"edit-mode\";\nvar hasFocus = \"has-focus\";\nvar header = \"header\";\nvar hero = \"hero\";\nvar img = \"img\";\nvar justify = \"justify\";\nvar overlay = \"overlay\";\nvar right = \"right\";\nvar showProgress = \"show-progress\";\nvar templateBlockText = \"template-block-text\";\nvar _index_text = \"text\";\nvar wrapper = \"wrapper\";\n;// CONCATENATED MODULE: ./src/simple-text.tsx\n\n\n\nconst SimpleText = ({ schema, ...props }) => {\n    let classes = `${templateBlockText} `;\n    const editMode = props.editMode ? true : false;\n    const focusElement = editMode ? props.focusElement : null;\n    const scrollScenes = external_React_default().useRef([]);\n    const timeline = external_React_default().useRef();\n    let schemaText = schema.content.text.value;\n    let useImageAsBG = schema.content.bgImage.content.bg.value;\n    let alignment = schema.content.options.content.alignment.value;\n    let animateLists = schema.content.animateLists?.value;\n    const slideDuration = animateLists ? 2000 : 0;\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n    function getId(id) {\n        if (!id) {\n            return props.id;\n        }\n        return props.id + '-' + id;\n    }\n    const handleScrollUpdate = (e) => {\n        if (e.stage === 'body') {\n            timeline.current.seek(timeline.current.duration * e.stageProgress);\n        }\n    };\n    const handleStateChange = (e) => {\n        if (e.state === 'visible') {\n            scrollScenes.current.map((scene) => scene.enabled(true));\n        }\n        else {\n            scrollScenes.current.map((scene) => scene.enabled(false));\n        }\n    };\n    external_React_default().useEffect(() => {\n        if (!animateLists) {\n            return;\n        }\n        scrollScenes.current.push(new (template_core_default()).core.scroll.Scene({\n            triggerElement: '#' + getId(),\n            duration: slideDuration,\n            offset: 0,\n            triggerHook: 0,\n        })\n            .setPin('#' + getId('pinned-body'), { pushFollowers: false })\n            .addTo(props.controller)\n            .enabled(false));\n        let selectors = [];\n        switch (animateLists) {\n            case 'all':\n                selectors.push('#' + getId('pinned-body') + ' li');\n                selectors.push('#' + getId('pinned-body') + ' p');\n                selectors.push('#' + getId('pinned-body') + ' hr');\n                selectors.push('#' + getId('pinned-body') + ' blockquote');\n                break;\n        }\n        if (!selectors.length) {\n            return;\n        }\n        const listItems = document.querySelectorAll(selectors.join(', '));\n        if (!listItems) {\n            return;\n        }\n        timeline.current = template_core_default().core.anime.timeline({\n            easing: 'easeInOutQuad',\n            autoplay: false,\n        });\n        const currentTimeline = timeline.current;\n        [...listItems].map((item) => {\n            item.style.opacity = 0;\n            item.style.transform = 'translateX(200px)';\n            const target = {\n                targets: item,\n                opacity: '1',\n                translateX: '0',\n                duration: 50,\n            };\n            currentTimeline.add(target);\n            return null;\n        });\n        const target = {\n            duration: 100,\n        };\n        currentTimeline.add(target);\n        const frozenListItems = selectors.join(', ');\n        return () => {\n            currentTimeline.children.map((child) => {\n                child.remove();\n                child.reset();\n                currentTimeline.remove(child);\n            });\n            currentTimeline.reset();\n            const listItems = document.querySelectorAll(frozenListItems);\n            [...listItems].map((item) => {\n                item.style.opacity = 1;\n                item.style.transform = '';\n                return null;\n            });\n        };\n    }, [animateLists]);\n    return (external_React_default().createElement((template_core_default()).core.Template, { ...props, className: classes, duration: slideDuration, onStateChange: handleStateChange, onScroll: handleScrollUpdate, ready: true },\n        external_React_default().createElement(\"div\", { className: \"slide-container\" },\n            external_React_default().createElement(\"div\", { id: getId('pinned-body'), className: \"hero\", \"aria-label\": useImageAsBG ? schema.content.bgImage.content.alt.value : '', style: useImageAsBG && schema.content.bgImage.content.url.value\n                    ? {\n                        width: '100vw',\n                        height: '100vh',\n                        backgroundImage: 'url(\"./assets/' +\n                            schema.content.bgImage.content.url.value +\n                            '\")',\n                    }\n                    : {} },\n                useImageAsBG ? external_React_default().createElement(\"div\", { className: \"overlay\" }) : null,\n                external_React_default().createElement(\"div\", { className: 'text ' +\n                        (alignment === 'right'\n                            ? 'right'\n                            : alignment === 'left'\n                                ? 'left'\n                                : alignment === 'center'\n                                    ? 'center'\n                                    : alignment === 'justify'\n                                        ? 'justify'\n                                        : '') },\n                    external_React_default().createElement(\"div\", { className: \"wrapper\" },\n                        external_React_default().createElement(\"p\", { className: 'can-focus ' + (focusElement === 'text' && ' has-focus'), onMouseDown: () => {\n                                if (editMode) {\n                                    template_core_default().core.host.sendMessage({\n                                        type: 'focus',\n                                        field: 'text',\n                                    });\n                                }\n                            } },\n                            external_React_default().createElement((template_core_default()).core.Markdown, { children: schemaText })))),\n                useImageAsBG ? null : (external_React_default().createElement(\"div\", { role: \"img\", \"aria-label\": schema.content.bgImage.content.alt.value, className: 'img ' +\n                        (alignment === 'right' ? ' right' : '') +\n                        ' can-focus ' +\n                        (focusElement === 'bgImage.url' && ' has-focus'), onMouseDown: () => {\n                        if (editMode) {\n                            template_core_default().core.host.sendMessage({\n                                type: 'focus',\n                                field: 'bgImage.url',\n                            });\n                        }\n                    }, style: schema.content.bgImage.content.url.value\n                        ? {\n                            backgroundImage: 'url(\"./assets/' +\n                                schema.content.bgImage.content.url.value +\n                                '\")',\n                        }\n                        : {} }))))));\n};\n/* harmony default export */ const simple_text = ({\n    SimpleText,\n});\n\n;// CONCATENATED MODULE: ./src/simple-text.schema.ts\nconst SimpleTextSchema = {\n    meta: {\n        version: '1.0.0',\n        label: 'Simple Text',\n        component: 'SimpleText',\n        filename: 'simple-text',\n        tags: [\"text\"],\n        icon: 'notes',\n    },\n    content: {\n        text: {\n            type: 'Textbox',\n            label: 'Text',\n            value: '# Starting \\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur!',\n            placeholder: 'Enter your text',\n            multiLine: true,\n            lines: 10,\n            autoGrow: 10,\n            allowLinebreaks: true,\n        },\n        animateLists: {\n            type: 'Select',\n            label: 'Animations',\n            value: 'all',\n            options: [\n                { name: 'No Animation', value: '' },\n                { name: 'Lists & Paragraphs', value: 'all' },\n            ],\n        },\n        bgImage: {\n            type: 'Fieldset',\n            label: 'Background Image',\n            content: {\n                alt: {\n                    type: 'Textbox',\n                    label: 'Alt Text',\n                    placeholder: 'Image alt text',\n                },\n                url: {\n                    type: 'Asset',\n                    assetType: 'image',\n                    label: 'Image',\n                },\n                bg: {\n                    type: 'Checkbox',\n                    label: 'Use as Background',\n                    value: false,\n                },\n            },\n        },\n        options: {\n            type: 'Fieldset',\n            label: 'Options',\n            content: {\n                alignment: {\n                    type: 'Select',\n                    hint: 'BodyAlignment',\n                    label: 'Alignment',\n                    value: 'center',\n                    options: [\n                        {\n                            name: 'Full Justify',\n                            value: 'justify',\n                            icon: 'align_horizontal_right',\n                        },\n                        {\n                            name: 'Align Left',\n                            value: 'left',\n                            icon: 'align_horizontal_left',\n                        },\n                        {\n                            name: 'Align Center',\n                            value: 'center',\n                            icon: 'align_horizontal_left',\n                        },\n                        {\n                            name: 'Align Right',\n                            value: 'right',\n                            icon: 'align_horizontal_right',\n                        },\n                    ],\n                    iconFromValue: true,\n                },\n            },\n        },\n    },\n};\n/* harmony default export */ const simple_text_schema = ({\n    SimpleTextSchema,\n});\n\n;// CONCATENATED MODULE: ./src/index.ts\n\n\n\n\n;// CONCATENATED MODULE: ./web/index.ts\n\nwindow.SimpleText = SimpleText;\nwindow.SimpleTextSchema = SimpleTextSchema;\n\n\n//# sourceURL=webpack://@scrowl/template-simple-text/./web/index.ts_+_4_modules?")},24:e=>{e.exports=__WEBPACK_EXTERNAL_MODULE__24__},294:e=>{e.exports=__WEBPACK_EXTERNAL_MODULE__294__}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var t=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](t,t.exports,__webpack_require__),t.exports}__webpack_require__.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(n,{a:n}),n},__webpack_require__.d=(e,n)=>{for(var t in n)__webpack_require__.o(n,t)&&!__webpack_require__.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__(261);return __webpack_exports__})()));