!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var r=n();for(var t in r)("object"==typeof exports?exports:e)[t]=r[t]}}(self,(()=>(()=>{"use strict";var __webpack_modules__={86:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n;// CONCATENATED MODULE: ./src/versions/runtimeScorm2004.ts\nconst service = {\n    version: '2004v3',\n    init: false,\n    finished: false,\n    _time: {\n        startTime: undefined,\n        getSessionTime: () => {\n            let sessionTime;\n            if (service._time.startTime) {\n                sessionTime = new Date().getTime() - service._time.startTime.getTime();\n            }\n            return service._time.convert(sessionTime);\n        },\n        end: undefined,\n        convert: (total) => {\n            let totalMs = total % 1000;\n            let totalS = ((total - totalMs) / 1000) % 60;\n            let totalM = ((total - totalMs - totalS * 1000) / 60000) % 60;\n            let totalH = (total - totalMs - totalS * 1000 - totalM * 60000) / 3600000;\n            if (totalH == 10000) {\n                totalH = 9999;\n                totalM = (total - totalH * 3600000) / 60000;\n                if (totalM == 100) {\n                    totalM = 99;\n                }\n                totalM = Math.floor(totalM);\n                totalS = (total - totalH * 3600000 - totalM * 60000) / 1000;\n                if (totalS == 100) {\n                    totalS = 99;\n                }\n                totalS = Math.floor(totalS);\n                totalMs = total - totalH * 3600000 - totalM * 60000 - totalS * 1000;\n            }\n            let timespan = 'PT' + totalH + 'H' + totalM + 'M' + totalS + 'S';\n            if (totalH > 9999) {\n                timespan = '9999:99:99';\n            }\n            return timespan;\n        },\n    },\n    API: null,\n    getError: (printError) => {\n        printError =\n            printError === undefined || printError === null ? true : printError;\n        const [isInit, API] = service.isInitialized();\n        if (!isInit) {\n            return {\n                error: true,\n                message: 'Service is not initialized',\n            };\n        }\n        const errorId = API.GetLastError();\n        const errorMsg = API.GetErrorString(errorId);\n        const errorStack = API.GetDiagnostic(errorId);\n        const apiError = {\n            id: errorId,\n            message: errorMsg,\n            stack: errorStack,\n        };\n        if (printError) {\n            console.error(`Error:\\n${JSON.stringify(apiError, null, 2)}`);\n            const errorEvent = new CustomEvent('scormError', {\n                detail: apiError,\n            });\n            document.dispatchEvent(errorEvent);\n            return {\n                error: true,\n                data: apiError,\n            };\n        }\n        return {\n            error: false,\n            data: apiError,\n        };\n    },\n    commit: () => {\n        console.debug(`API.Commit`);\n        const [isInit, API] = service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to get location: service not initialized`);\n            return [true];\n        }\n        service.setValue('cmi.session_time', service._time.getSessionTime());\n        API.Commit('');\n        return [false];\n    },\n    exit: () => {\n        console.debug('API.Exit');\n        return service.commit();\n    },\n    isInitialized: () => {\n        service.init = false;\n        if (!service.API) {\n            console.error('MISSING_SCORM_API - INIT');\n            return [service.init, false];\n        }\n        // @ts-ignore\n        if (service.API.Initialized === 'false') {\n            console.error('API failed to initialize');\n            return [service.init, false];\n        }\n        service.init = true;\n        return [service.init, service.API];\n    },\n    updateLocation: (location, slideId) => {\n        console.debug(`API.UpdateLocation`);\n        const [isInit, API] = service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to get location: service not initialized`);\n            return [true];\n        }\n        service.setValue('cmi.location', JSON.stringify({ v1: 1, ...location, slideId: slideId }));\n        service.commit();\n        return [false];\n    },\n    getLocation: () => {\n        console.debug(`API.GetLocation`);\n        const [isInit, API] = service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to get location: service not initialized`);\n            return [true, {}];\n        }\n        try {\n            const [error, location] = service.getValue('cmi.location');\n            if (error || !location) {\n                return [true, {}];\n            }\n            return [false, JSON.parse(location)];\n        }\n        catch (e) {\n            console.error(e);\n            return [true, {}];\n        }\n    },\n    getSuspendData: () => {\n        console.debug(`API.GetSuspendData`);\n        const [isInit, API] = service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to get suspend data: service not initialized`);\n            return [true, {}];\n        }\n        try {\n            const [error, suspendData] = service.getValue('cmi.suspend_data');\n            if (error || !suspendData) {\n                return [true, {}];\n            }\n            return [false, suspendData];\n        }\n        catch (e) {\n            console.error(e);\n            return [true, {}];\n        }\n    },\n    setCourseStart: () => {\n        console.debug(`API.SetCourseStart`);\n        const [isInit, API] = service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to update suspend data: service not initialized`);\n            return [true, {}];\n        }\n        service.setValue('cmi.suspend_data', JSON.stringify({ courseStarted: true }));\n        service.commit();\n        return [false];\n    },\n    getProgress: () => {\n        console.debug(`API.GetProgress`);\n        const [isInit, API] = service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to get progress: service not initialized`);\n            return [true, {}];\n        }\n        try {\n            const [error, progress] = service.getValue('cmi.progress_measure');\n            if (error || !progress) {\n                return [true, {}];\n            }\n            return [false, progress];\n        }\n        catch (e) {\n            console.error(e);\n            return [true, {}];\n        }\n    },\n    updateProgress: (progressPercentage) => {\n        console.debug(`API.UpdateProgress`);\n        const [isInit, API] = service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to update progress: service not initialized`);\n            return [true];\n        }\n        const [progressError, previousProgress] = service.getValue('cmi.progress_measure');\n        // error 403 = Data Model Element Value Not Initialized (first time setting progress)\n        // @ts-ignore\n        if (progressError && previousProgress.data.id === '403') {\n            service.setValue('cmi.progress_measure', progressPercentage);\n            service.commit();\n        }\n        if (!progressError) {\n            if (!previousProgress ||\n                parseFloat(previousProgress) === 0 ||\n                progressPercentage > parseFloat(previousProgress)) {\n                service.setValue('cmi.progress_measure', progressPercentage);\n            }\n            service.commit();\n        }\n        return [false];\n    },\n    start: (api) => {\n        console.debug(`API.Start 2004v3`);\n        service.API = api;\n        service._time.startTime = new Date();\n        service.API?.Initialize('');\n        const [isInit, API] = service.isInitialized();\n        if (!isInit || !API) {\n            return [true];\n        }\n        const [statusError, completionStatus] = service.getValue('cmi.completion_status');\n        if (statusError) {\n            return [true];\n        }\n        if (completionStatus === 'unknown') {\n            service.setValue('cmi.completion_status', 'incomplete');\n            service.setValue('cmi.success_status', 'unknown');\n            service.setValue('cmi.suspend_data', '{}');\n            service.setValue('cmi.progress_measure', 0);\n            const startLocation = {\n                cur: {\n                    m: 0,\n                    l: 0,\n                    s: 0,\n                },\n                max: {\n                    m: 0,\n                    l: 0,\n                    s: 0,\n                },\n            };\n            service.setValue('cmi.location', JSON.stringify(startLocation));\n        }\n        else {\n            service.setValue('cmi.success_status', service.getValue('cmi.success_status')[1]);\n            service.setValue('cmi.progress_measure', service.getValue('cmi.progress_measure')[1]);\n            service.setValue('cmi.completion_status', service.getValue('cmi.completion_status')[1]);\n        }\n        // until we have things hooked up to exit buttons/nav, set exit to 'suspend' as part of start() so that status persists whether the user finishes or exits\n        service.setValue('cmi.exit', 'suspend');\n        service.commit();\n        console.debug('runtime started');\n        return [false];\n    },\n    finish: () => {\n        console.debug(`API.Finish`);\n        const [isInit, API] = service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to finish: service not initialized`);\n            return [true];\n        }\n        service.setValue('cmi.score.min', 0);\n        service.setValue('cmi.score.max', 100);\n        service.setValue('cmi.score.scaled', 1);\n        service.setValue('cmi.score.raw', 100);\n        service.setValue('cmi.success_status', 'passed');\n        service.setValue('cmi.progress_measure', 1);\n        service.setValue('cmi.completion_status', 'completed');\n        service.commit();\n        API.Terminate('');\n        return [false];\n    },\n    setValue: (elem, val) => {\n        console.debug(`API.SetValue for ${elem} to ${val}`);\n        const [isInit, API] = service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to set value for ${elem}: service not initialized`);\n            return [true];\n        }\n        if (val !== undefined) {\n            if (API.SetValue(elem, val) === 'false') {\n                service.getError(true);\n            }\n        }\n        else {\n            console.warn(`Unable to set value for ${elem}: value undefined`);\n        }\n        return [false];\n    },\n    getValue: (elem) => {\n        console.debug(`API.GetValue for ${elem}`);\n        const [isInit, API] = service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to set value for ${elem}: service not initialized`);\n            return [true, ''];\n        }\n        const getRes = API.GetValue(elem);\n        if (getRes === '') {\n            console.error(`API failed to get value for: ${elem}`);\n            service.getError(true);\n        }\n        return [false, getRes];\n    },\n};\n/* harmony default export */ const runtimeScorm2004 = ({\n    service,\n});\n\n;// CONCATENATED MODULE: ./src/versions/runtimeScorm12.ts\nconst runtimeScorm12_service = {\n    version: '1.2',\n    init: false,\n    finished: false,\n    _time: {\n        startTime: undefined,\n        getSessionTime: () => {\n            let sessionTime;\n            if (runtimeScorm12_service._time.startTime) {\n                sessionTime = new Date().getTime() - runtimeScorm12_service._time.startTime.getTime();\n            }\n            return runtimeScorm12_service._time.convert(sessionTime);\n        },\n        end: undefined,\n        convert: (total) => {\n            function ZeroPad(val, pad) {\n                let res = new String(val);\n                const len = res.length;\n                if (len > pad) {\n                    return res.substr(0, pad);\n                }\n                for (let i = len; i < pad; i++) {\n                    res = '0' + res;\n                }\n                return res;\n            }\n            let totalMs = total % 1000;\n            let totalS = ((total - totalMs) / 1000) % 60;\n            let totalM = ((total - totalMs - totalS * 1000) / 60000) % 60;\n            let totalH = (total - totalMs - totalS * 1000 - totalM * 60000) / 3600000;\n            if (totalH == 10000) {\n                totalH = 9999;\n                totalM = (total - totalH * 3600000) / 60000;\n                if (totalM == 100) {\n                    totalM = 99;\n                }\n                totalM = Math.floor(totalM);\n                totalS = (total - totalH * 3600000 - totalM * 60000) / 1000;\n                if (totalS == 100) {\n                    totalS = 99;\n                }\n                totalS = Math.floor(totalS);\n                totalMs = total - totalH * 3600000 - totalM * 60000 - totalS * 1000;\n            }\n            // should eventually check SCORM version and format time accordingly\n            let timespan = ZeroPad(totalH, 4) +\n                ':' +\n                ZeroPad(totalM, 2) +\n                ':' +\n                ZeroPad(totalS, 2);\n            if (totalH > 9999) {\n                timespan = '9999:99:99';\n            }\n            return timespan;\n        },\n    },\n    API: null,\n    getError: (printError) => {\n        printError =\n            printError === undefined || printError === null ? true : printError;\n        const [isInit, API] = runtimeScorm12_service.isInitialized();\n        if (!isInit) {\n            return {\n                error: true,\n                message: 'Service is not initialized',\n            };\n        }\n        const errorId = API.LMSGetLastError();\n        const errorMsg = API.LMSGetErrorString(errorId);\n        const errorStack = API.LMSGetDiagnostic(errorId);\n        const apiError = {\n            id: errorId,\n            message: errorMsg,\n            stack: errorStack,\n        };\n        if (printError) {\n            console.error(`Error:\\n${JSON.stringify(apiError, null, 2)}`);\n            const errorEvent = new CustomEvent('scormError', {\n                detail: apiError,\n            });\n            document.dispatchEvent(errorEvent);\n        }\n        return {\n            error: false,\n            data: apiError,\n        };\n    },\n    commit: () => {\n        console.debug(`API.Commit`);\n        const [isInit, API] = runtimeScorm12_service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to get location: service not initialized`);\n            return [true];\n        }\n        runtimeScorm12_service.setValue('cmi.core.session_time', runtimeScorm12_service._time.getSessionTime());\n        API.LMSCommit('');\n        return [false];\n    },\n    exit: () => {\n        console.debug('API.Exit');\n        return runtimeScorm12_service.commit();\n    },\n    isInitialized: () => {\n        runtimeScorm12_service.init = false;\n        if (!runtimeScorm12_service.API) {\n            console.error('MISSING_SCORM_API - INIT');\n            return [runtimeScorm12_service.init, false];\n        }\n        // @ts-ignore\n        if (runtimeScorm12_service.API.Initialized === 'false') {\n            console.error('API failed to initialize');\n            return [runtimeScorm12_service.init, false];\n        }\n        runtimeScorm12_service.init = true;\n        return [runtimeScorm12_service.init, runtimeScorm12_service.API];\n    },\n    updateLocation: (location, slideId) => {\n        console.debug(`API.UpdateLocation`);\n        const [isInit, API] = runtimeScorm12_service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to get location: service not initialized`);\n            return [true];\n        }\n        runtimeScorm12_service.setValue('cmi.core.lesson_location', JSON.stringify({ v1: 1, ...location, slideId: slideId }));\n        runtimeScorm12_service.commit();\n        return [false];\n    },\n    getLocation: () => {\n        console.debug(`API.GetLocation`);\n        const [isInit, API] = runtimeScorm12_service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to get location: service not initialized`);\n            return [true, {}];\n        }\n        try {\n            const [error, location] = runtimeScorm12_service.getValue('cmi.core.lesson_location');\n            if (error || !location) {\n                return [true, {}];\n            }\n            return [false, JSON.parse(location)];\n        }\n        catch (e) {\n            console.error(e);\n            return [true, {}];\n        }\n    },\n    setCourseStart: () => {\n        console.debug(`API.SetCourseStart`);\n        const [isInit, API] = runtimeScorm12_service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to set suspend data: service not initialized`);\n            return [true, {}];\n        }\n        runtimeScorm12_service.setValue('cmi.suspend_data', JSON.stringify({ courseStarted: true }));\n        runtimeScorm12_service.commit();\n        return [false];\n    },\n    getSuspendData: () => {\n        console.debug(`API.GetSuspendData`);\n        const [isInit, API] = runtimeScorm12_service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to get suspend data: service not initialized`);\n            return [true, {}];\n        }\n        try {\n            const [error, suspendData] = runtimeScorm12_service.getValue('cmi.suspend_data');\n            if (error || !suspendData) {\n                return [true, {}];\n            }\n            return [false, suspendData];\n        }\n        catch (e) {\n            console.error(e);\n            return [true, {}];\n        }\n    },\n    getProgress: () => {\n        console.debug(`API.GetProgress`);\n        const [isInit, API] = runtimeScorm12_service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to get progress: service not initialized`);\n            return [true, {}];\n        }\n        try {\n            const [error, progress] = runtimeScorm12_service.getValue('cmi.suspend_data');\n            if (error || !progress) {\n                return [true, {}];\n            }\n            return [false, progress];\n        }\n        catch (e) {\n            console.error(e);\n            return [true, {}];\n        }\n    },\n    updateProgress: (progressPercentage) => {\n        console.debug(`API.UpdateProgress`);\n        const [isInit, API] = runtimeScorm12_service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to update progress: service not initialized`);\n            return [true];\n        }\n        const [progressError, previousProgress] = runtimeScorm12_service.getValue('cmi.suspend_data');\n        // error 403 = Data Model Element Value Not Initialized (first time setting progress)\n        // @ts-ignore\n        if (progressError && previousProgress.data.id === '403') {\n            runtimeScorm12_service.setValue('cmi.suspend_data', progressPercentage);\n            runtimeScorm12_service.commit();\n        }\n        if (!progressError) {\n            if (!previousProgress ||\n                parseFloat(previousProgress) === 0 ||\n                progressPercentage > parseFloat(previousProgress)) {\n                runtimeScorm12_service.setValue('cmi.suspend_data', progressPercentage);\n            }\n            runtimeScorm12_service.commit();\n        }\n        return [false];\n    },\n    start: (api) => {\n        console.debug(`API.Start 1.2`);\n        runtimeScorm12_service._time.startTime = new Date();\n        runtimeScorm12_service.API = api;\n        runtimeScorm12_service.API?.LMSInitialize('');\n        const [isInit, API] = runtimeScorm12_service.isInitialized();\n        if (!isInit || !API) {\n            return [true];\n        }\n        const [statusError, lessonStatus] = runtimeScorm12_service.getValue('cmi.core.lesson_status');\n        if (statusError) {\n            return [true];\n        }\n        if (lessonStatus === 'unknown' || lessonStatus === 'not attempted') {\n            runtimeScorm12_service.setValue('cmi.core.lesson_status', 'incomplete');\n            runtimeScorm12_service.setValue('cmi.suspend_data', 0);\n            const startLocation = {\n                cur: {\n                    m: 0,\n                    l: 0,\n                    s: 0,\n                },\n                max: {\n                    m: 0,\n                    l: 0,\n                    s: 0,\n                },\n            };\n            runtimeScorm12_service.setValue('cmi.core.lesson_location', JSON.stringify(startLocation));\n        }\n        else {\n            runtimeScorm12_service.setValue('cmi.core.lesson_status', runtimeScorm12_service.getValue('cmi.core.lesson_status')[1]);\n            runtimeScorm12_service.setValue('cmi.suspend_data', runtimeScorm12_service.getValue('cmi.suspend_data')[1]);\n        }\n        // until we have things hooked up to exit buttons/nav, set exit to 'suspend' as part of start() so that status persists whether the user finishes or exits\n        runtimeScorm12_service.setValue('cmi.core.exit', 'suspend');\n        runtimeScorm12_service.commit();\n        console.debug('runtime started');\n        return [false];\n    },\n    finish: () => {\n        console.debug(`API.Finish`);\n        const [isInit, API] = runtimeScorm12_service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to finish: service not initialized`);\n            return [true];\n        }\n        runtimeScorm12_service.setValue('cmi.core.score.raw', 100);\n        runtimeScorm12_service.setValue('cmi.core.lesson_status', 'passed');\n        runtimeScorm12_service.setValue('cmi.suspend_data', 1);\n        runtimeScorm12_service.commit();\n        API.LMSFinish('');\n        return [false];\n    },\n    setValue: (elem, val) => {\n        console.debug(`API.SetValue for ${elem} to ${val}`);\n        const [isInit, API] = runtimeScorm12_service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to set value for ${elem}: service not initialized`);\n            return [true];\n        }\n        if (val !== undefined) {\n            if (API.LMSSetValue(elem, val) === 'false') {\n                runtimeScorm12_service.getError(true);\n            }\n        }\n        else {\n            console.warn(`Unable to set value for ${elem}: value undefined`);\n        }\n        return [false];\n    },\n    getValue: (elem) => {\n        console.debug(`API.GetValue for ${elem}`);\n        const [isInit, API] = runtimeScorm12_service.isInitialized();\n        if (!isInit || !API) {\n            console.warn(`Unable to set value for ${elem}: service not initialized`);\n            return [true, ''];\n        }\n        const getRes = API.LMSGetValue(elem);\n        if (getRes === '') {\n            console.error(`API failed to get value for: ${elem}`);\n            runtimeScorm12_service.getError(true);\n        }\n        return [false, getRes];\n    },\n};\n/* harmony default export */ const runtimeScorm12 = ({\n    service: runtimeScorm12_service,\n});\n\n;// CONCATENATED MODULE: ./src/runtime.ts\n\n\nconst runtime_service = {\n    API: null,\n    version: '1.2',\n    _scanApi: (win, v) => {\n        let retries = 0;\n        // Check to see if the window (win) contains the API\n        // if the window (win) does not contain the API and\n        // the window (win) has a parent window and the parent window\n        // is not the same as the window (win)\n        while (win[v] == null && win.parent != null && win.parent != win) {\n            // increment the number of findAPITries\n            retries++;\n            // Note: 7 is an arbitrary number, but should be more than sufficient\n            if (retries > 7) {\n                alert('Error finding API -- too deeply nested.');\n                return null;\n            }\n            // set the variable that represents the window being\n            // being searched to be the parent of the current window\n            // then search for the API again\n            win = win.parent;\n        }\n        return win[v];\n    },\n    // @ts-ignore\n    start: (apiPreference) => {\n        let API;\n        switch (apiPreference) {\n            case service.version:\n                API = runtime_service._scanApi(window, 'API_1484_11');\n                runtime_service.version = apiPreference;\n                Object.assign(runtime_service, service);\n                break;\n            case runtimeScorm12_service.version:\n            default:\n                API = runtime_service._scanApi(window, 'API');\n                runtime_service.version = apiPreference;\n                Object.assign(runtime_service, runtimeScorm12_service);\n                break;\n        }\n        if (!API) {\n            console.error('Unable to start scorm runtime service');\n            return [false];\n        }\n        runtime_service.API = API;\n        // @ts-ignore\n        runtime_service.start(API);\n        return [true];\n    },\n};\n/* harmony default export */ const runtime = ({\n    service: runtime_service,\n});\n\n;// CONCATENATED MODULE: ./src/index.ts\n\n\n\n;// CONCATENATED MODULE: ./web/index.ts\n\nwindow.Scrowl = window.Scrowl || {};\n// @ts-ignore\nwindow.Scrowl.runtime = runtime_service;\n\n\n//# sourceURL=webpack://@scrowl/runtime/./web/index.ts_+_4_modules?")}},__webpack_require__={r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},__webpack_exports__={};return __webpack_modules__[86](0,__webpack_exports__,__webpack_require__),__webpack_exports__})()));