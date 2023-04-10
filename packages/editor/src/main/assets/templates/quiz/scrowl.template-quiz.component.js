"use strict";(self.webpackChunk_scrowl_template_quiz=self.webpackChunk_scrowl_template_quiz||[]).push([[154],{698:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Quiz)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst Quiz = ({ id, schema, ...props }) => {\n    const Scrowl = window[\'Scrowl\'];\n    let classes = \'template-quiz\';\n    const Markdown = Scrowl.core.Markdown;\n    const editMode = props.editMode ? true : false;\n    const focusElement = editMode ? props.focusElement : null;\n    const contentId = `${id}-quiz`;\n    const question = schema.content.question.content.question.value;\n    const answers = schema.content.answers.content;\n    const correctAnswer = schema.content.question.content.correctAnswer.value;\n    const correctAnswerText = answers.find((_obj, i) => {\n        return i === correctAnswer - 1;\n    });\n    const textFocusCss = focusElement === \'text\' && \'has-focus\';\n    const alignment = schema.content.options.content.alignment.value;\n    const alignmentCss = alignment === \'right\' ? \'right\' : \'left\';\n    const disableAnimations = schema.controlOptions.disableAnimations?.value;\n    const showProgressBar = schema.content.options.content.showProgress.value;\n    const showProgressRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(showProgressBar);\n    const slideProgress = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);\n    const [progressBarStyles, setProgressBarStyles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n        width: showProgressBar ? \'0%\' : \'100%\',\n    });\n    const selectedAnswer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n    if (showProgressBar) {\n        classes += \' show-progress\';\n    }\n    const handleFocusText = () => {\n        if (editMode) {\n            Scrowl.core.host.sendMessage({\n                type: \'focus\',\n                field: \'text\',\n            });\n        }\n    };\n    const handleSlideProgress = (ev) => {\n        slideProgress.current = ev.progress;\n        if (showProgressRef.current) {\n            setProgressBarStyles({\n                ...progressBarStyles,\n                width: `${ev.progress}%`,\n            });\n        }\n    };\n    const handleSlideEnd = () => {\n        slideProgress.current = 100;\n        if (!showProgressRef.current) {\n            return;\n        }\n        setProgressBarStyles({\n            ...progressBarStyles,\n            width: `100%`,\n        });\n    };\n    const handleSelectAnswer = (ev) => {\n        selectedAnswer.current = ev.target.value;\n    };\n    const handleSubmit = (ev) => {\n        ev.preventDefault();\n        if (selectedAnswer.current === correctAnswerText.value) {\n            alert(\'CORRECT\');\n        }\n        else {\n            alert(\'INCORRECT\');\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n        showProgressRef.current = showProgressBar;\n        setProgressBarStyles({\n            ...progressBarStyles,\n            width: showProgressBar ? `${slideProgress.current}%` : `100%`,\n        });\n    }, [showProgressBar]);\n    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Scrowl.core.Template, { id: `slide-${contentId}`, className: classes, onProgress: handleSlideProgress, onEnd: handleSlideEnd, notScene: disableAnimations ? true : false, ...props },\n        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { id: contentId, className: "owlui-container" },\n            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `owlui-row ${alignmentCss}` },\n                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `owlui-col text__wrapper` },\n                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "text__container" },\n                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "progress-indictor" },\n                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "progress-bar", style: progressBarStyles })),\n                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `text__value can-focus ${textFocusCss}`, onMouseDown: handleFocusText },\n                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", { className: "question__text" },\n                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Markdown, null, question)),\n                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: `answers__container ${alignment}` },\n                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", { onSubmit: handleSubmit },\n                                    answers.map((answer, idx) => {\n                                        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "answer", key: idx },\n                                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "radio", id: `answer-${idx}`, name: question, value: answer.value, onChange: handleSelectAnswer }),\n                                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", { htmlFor: `answer-${idx}` }, answer.value)));\n                                    }),\n                                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "submit", value: "Submit" }))))))))));\n};\n\n\n\n//# sourceURL=webpack://@scrowl/template-quiz/./src/quiz.tsx?')}}]);