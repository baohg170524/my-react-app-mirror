(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/features/events/contexts/EventDashboardContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventDashboardProvider",
    ()=>EventDashboardProvider,
    "useEventDashboard",
    ()=>useEventDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const EventDashboardContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function EventDashboardProvider(param) {
    let { children } = param;
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dashboard');
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EventDashboardContext.Provider, {
        value: {
            activeTab,
            setActiveTab,
            isModalOpen,
            setIsModalOpen,
            isLoading,
            setIsLoading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/features/events/contexts/EventDashboardContext.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(EventDashboardProvider, "1Vv5Ey9+dVpNkGo4D1mNRREchQs=");
_c = EventDashboardProvider;
function useEventDashboard() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(EventDashboardContext);
    if (!context) throw new Error('useEventDashboard must be used within EventDashboardProvider');
    return context;
}
_s1(useEventDashboard, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "EventDashboardProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventDashboard/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/contexts/EventDashboardContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const tabs = [
    {
        id: 'dashboard',
        label: 'Event Dashboard',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
    },
    {
        id: 'submission',
        label: 'Submission',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"]
    },
    {
        id: 'results',
        label: 'Results',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"]
    }
];
function Sidebar() {
    _s();
    const { activeTab, setActiveTab } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventDashboard"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "fixed left-0 top-0 h-screen w-16 md:w-60 bg-surface-dark border-r border-hairline-strong flex flex-col lg:w-60 z-50",
        role: "navigation",
        "aria-label": "Event dashboard navigation",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex-1 pt-0",
                role: "tablist",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "list-none p-0 m-0",
                    children: tabs.map((tab)=>{
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            role: "presentation",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                role: "tab",
                                "aria-selected": isActive,
                                onClick: ()=>setActiveTab(tab.id),
                                className: "w-full px-4 py-4 flex items-center gap-3 border-b border-hairline-strong transition-colors duration-150 cursor-pointer min-h-12 ".concat(isActive ? 'bg-surface-dark text-on-dark border-l-4 border-l-primary' : 'bg-surface-dark text-on-dark hover:bg-[rgba(255,255,255,0.08)] border-l-4 border-l-transparent', " focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"),
                                "aria-label": "".concat(tab.label, " tab"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        size: 18,
                                        className: isActive ? 'text-primary opacity-100' : 'text-on-dark opacity-75',
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                                        lineNumber: 42,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-body-strong text-sm font-bold hidden md:inline",
                                        children: tab.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                                        lineNumber: 47,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sr-only",
                                        children: tab.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                                        lineNumber: 48,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                                lineNumber: 31,
                                columnNumber: 17
                            }, this)
                        }, tab.id, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                            lineNumber: 30,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-hairline-strong p-4 flex items-center gap-3 bg-surface-dark",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0",
                        children: "KT"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex flex-col flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-on-dark text-body-sm font-bold truncate text-opacity-100",
                                children: "Kim Test"
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block bg-primary/20 text-primary text-caption-xs px-2 py-1 rounded-full text-xs mt-1 w-fit font-semibold",
                                children: "Leader"
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "md:hidden p-2 text-on-dark opacity-75 hover:opacity-100 hover:bg-[rgba(255,255,255,0.08)] rounded-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                        "aria-label": "User settings",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                            size: 18,
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventDashboard/Sidebar.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "b6iTidHcn+X2+JASpqybfn61Ans=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventDashboard"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventDashboard/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function Header(param) {
    let { title, subtitle, status, submissionType } = param;
    const getStatusColor = (status)=>{
        if (status === 'open') return 'bg-primary text-on-primary';
        if (status === 'closed') return 'bg-stone text-on-dark';
        return '';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "fixed top-0 left-0 right-0 h-auto md:h-20 bg-canvas border-b border-hairline flex items-center px-4 md:px-6 gap-4 md:gap-8 lg:left-60 z-40 py-4 md:py-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1 min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "t-heading-md text-ink m-0 truncate text-sm md:text-lg lg:text-xl",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/Header.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "t-body-sm text-mute m-0 hidden md:block text-xs md:text-body-sm",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/Header.tsx",
                        lineNumber: 23,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/EventDashboard/Header.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 md:gap-3 ml-auto flex-shrink-0",
                children: [
                    status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-block px-2 md:px-3 py-1 rounded-sm text-xs md:text-body-sm font-bold uppercase whitespace-nowrap ".concat(getStatusColor(status)),
                        children: status === 'open' ? 'Open' : 'Closed'
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/Header.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this),
                    submissionType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-block bg-surface-soft text-ink px-2 md:px-3 py-1 rounded-sm text-caption-xs md:text-caption-sm font-bold uppercase whitespace-nowrap",
                        children: submissionType
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/Header.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/EventDashboard/Header.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventDashboard/Header.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventDashboard/Modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Modal",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Modal(param) {
    let { isOpen, onClose, title, children } = param;
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            const handleEscape = {
                "Modal.useEffect.handleEscape": (e)=>{
                    if (e.key === 'Escape') onClose();
                }
            }["Modal.useEffect.handleEscape"];
            if (isOpen) {
                document.addEventListener('keydown', handleEscape);
                document.body.style.overflow = 'hidden';
            }
            return ({
                "Modal.useEffect": ()=>{
                    document.removeEventListener('keydown', handleEscape);
                    document.body.style.overflow = 'unset';
                }
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], [
        isOpen,
        onClose
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-0 bg-black/70",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dialog", {
            open: isOpen,
            className: "relative z-[101] w-full max-w-2xl bg-canvas border border-hairline rounded-sm shadow-2xl mx-4 flex flex-col h-auto max-h-[90vh]",
            "aria-labelledby": "modal-title",
            "aria-modal": "true",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-4 p-6 md:p-8 border-b border-hairline flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "modal-title",
                            className: "t-heading-sm text-ink m-0 flex-1",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/Modal.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-2 text-mute hover:text-ink bg-surface-soft hover:bg-surface-dark rounded-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex-shrink-0",
                            "aria-label": "Close dialog",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 20,
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/Modal.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/Modal.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/events/components/EventDashboard/Modal.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-6 md:px-8 py-4 modal-content",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/Modal.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 justify-end p-6 md:p-8 border-t border-hairline flex-shrink-0 bg-canvas"
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/Modal.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/events/components/EventDashboard/Modal.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/events/components/EventDashboard/Modal.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(Modal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Modal;
var _c;
__turbopack_context__.k.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/api/mockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addSubmissionToStore",
    ()=>addSubmissionToStore,
    "createTeamInStore",
    ()=>createTeamInStore,
    "getUserTeamFromStore",
    ()=>getUserTeamFromStore,
    "mockDataStore",
    ()=>mockDataStore,
    "mockEvents",
    ()=>mockEvents,
    "mockScoreBreakdown",
    ()=>mockScoreBreakdown,
    "mockSubmissions",
    ()=>mockSubmissions,
    "mockTeamScores",
    ()=>mockTeamScores,
    "mockTeams",
    ()=>mockTeams
]);
const mockEvents = [
    {
        id: 'evt-001',
        title: 'React Frontend Challenge 2026',
        startDate: '2026-06-15T10:00:00Z',
        endDate: '2026-06-22T23:59:59Z',
        status: 'open',
        submissionType: 'Both',
        description: 'Build a responsive React dashboard with real-time data updates. Showcase your UI/UX design skills and JavaScript proficiency.'
    },
    {
        id: 'evt-002',
        title: 'Node.js API Development',
        startDate: '2026-07-01T10:00:00Z',
        endDate: '2026-07-15T23:59:59Z',
        status: 'open',
        submissionType: 'ZIP',
        description: 'Design and implement a RESTful API with authentication, validation, and database integration.'
    },
    {
        id: 'evt-003',
        title: 'Mobile App Contest',
        startDate: '2026-08-01T10:00:00Z',
        endDate: '2026-08-20T23:59:59Z',
        status: 'closed',
        submissionType: 'URL',
        description: 'Create an innovative mobile application using React Native or Flutter.'
    }
];
const mockTeams = {
    'evt-001': [
        {
            id: 'team-001',
            name: 'Code Warriors',
            leader: {
                id: 'user-1',
                name: 'Alice Johnson',
                email: 'alice@example.com'
            },
            members: [
                {
                    id: 'user-2',
                    name: 'Bob Smith',
                    email: 'bob@example.com'
                },
                {
                    id: 'user-3',
                    name: 'Charlie Wilson',
                    email: 'charlie@example.com'
                }
            ],
            eventId: 'evt-001'
        },
        {
            id: 'team-002',
            name: 'Frontend Ninjas',
            leader: {
                id: 'user-4',
                name: 'Diana Lee',
                email: 'diana@example.com'
            },
            members: [
                {
                    id: 'user-5',
                    name: 'Eve Martinez',
                    email: 'eve@example.com'
                }
            ],
            eventId: 'evt-001'
        },
        {
            id: 'team-003',
            name: 'Design Innovators',
            leader: {
                id: 'user-6',
                name: 'Frank Brown',
                email: 'frank@example.com'
            },
            members: [
                {
                    id: 'user-7',
                    name: 'Grace Chen',
                    email: 'grace@example.com'
                },
                {
                    id: 'user-8',
                    name: 'Henry Davis',
                    email: 'henry@example.com'
                }
            ],
            eventId: 'evt-001'
        }
    ],
    'evt-002': [
        {
            id: 'team-004',
            name: 'Backend Masters',
            leader: {
                id: 'user-9',
                name: 'Iris Williams',
                email: 'iris@example.com'
            },
            members: [
                {
                    id: 'user-10',
                    name: 'Jack Anderson',
                    email: 'jack@example.com'
                }
            ],
            eventId: 'evt-002'
        }
    ],
    'evt-003': []
};
const mockSubmissions = {
    'team-001': [
        {
            id: 'sub-001',
            teamId: 'team-001',
            eventId: 'evt-001',
            type: 'ZIP',
            status: 'graded',
            submitDate: '2026-06-20T14:30:00Z',
            content: 'dashboard-v1.zip'
        },
        {
            id: 'sub-002',
            teamId: 'team-001',
            eventId: 'evt-001',
            type: 'ZIP',
            status: 'graded',
            submitDate: '2026-06-21T10:15:00Z',
            content: 'dashboard-v2-final.zip'
        }
    ],
    'team-002': [
        {
            id: 'sub-003',
            teamId: 'team-002',
            eventId: 'evt-001',
            type: 'URL',
            status: 'pending-review',
            submitDate: '2026-06-21T16:45:00Z',
            content: 'https://github.com/diana-lee/frontend-challenge'
        }
    ],
    'team-003': [
        {
            id: 'sub-004',
            teamId: 'team-003',
            eventId: 'evt-001',
            type: 'ZIP',
            status: 'submitted',
            submitDate: '2026-06-22T09:00:00Z',
            content: 'design-showcase.zip'
        }
    ],
    'team-004': []
};
const mockScoreBreakdown = {
    'team-001': [
        {
            criterion: 'Design & UX',
            score: 9,
            max: 10,
            status: 'graded'
        },
        {
            criterion: 'Functionality',
            score: 9,
            max: 10,
            status: 'graded'
        },
        {
            criterion: 'Code Quality',
            score: 8,
            max: 10,
            status: 'graded'
        },
        {
            criterion: 'Performance',
            score: 8,
            max: 10,
            status: 'graded'
        },
        {
            criterion: 'Documentation',
            score: 7,
            max: 10,
            status: 'pending'
        }
    ],
    'team-002': [
        {
            criterion: 'Design & UX',
            score: 8,
            max: 10,
            status: 'graded'
        },
        {
            criterion: 'Functionality',
            score: 7,
            max: 10,
            status: 'graded'
        },
        {
            criterion: 'Code Quality',
            score: 7,
            max: 10,
            status: 'pending'
        },
        {
            criterion: 'Performance',
            score: 0,
            max: 10,
            status: 'pending'
        },
        {
            criterion: 'Documentation',
            score: 0,
            max: 10,
            status: 'pending'
        }
    ],
    'team-003': [
        {
            criterion: 'Design & UX',
            score: 8,
            max: 10,
            status: 'graded'
        },
        {
            criterion: 'Functionality',
            score: 6,
            max: 10,
            status: 'graded'
        },
        {
            criterion: 'Code Quality',
            score: 6,
            max: 10,
            status: 'graded'
        },
        {
            criterion: 'Performance',
            score: 7,
            max: 10,
            status: 'pending'
        },
        {
            criterion: 'Documentation',
            score: 0,
            max: 10,
            status: 'pending'
        }
    ]
};
const mockTeamScores = {
    'evt-001': [
        {
            teamId: 'team-001',
            score: 41,
            status: 'graded'
        },
        {
            teamId: 'team-003',
            score: 27,
            status: 'pending'
        },
        {
            teamId: 'team-002',
            score: 22,
            status: 'pending'
        }
    ],
    'evt-002': [
        {
            teamId: 'team-004',
            score: 0,
            status: 'pending'
        }
    ]
};
const mockDataStore = {
    teams: JSON.parse(JSON.stringify(mockTeams)),
    submissions: JSON.parse(JSON.stringify(mockSubmissions)),
    scores: JSON.parse(JSON.stringify(mockTeamScores)),
    scoreBreakdown: JSON.parse(JSON.stringify(mockScoreBreakdown))
};
function getUserTeamFromStore(eventId, userId) {
    const teams = mockDataStore.teams[eventId] || [];
    return teams.find((team)=>team.leader.id === userId || team.members.some((m)=>m.id === userId)) || null;
}
function createTeamInStore(eventId, teamData) {
    const teamId = "team-".concat(Date.now());
    const currentUserId = 'user-001'; // This should come from auth context in real app
    const newTeam = {
        id: teamId,
        name: teamData.name,
        leader: {
            id: currentUserId,
            name: 'Current User',
            email: 'user@example.com'
        },
        members: teamData.memberIds.filter((id)=>id !== currentUserId).map((id)=>({
                id,
                name: "User ".concat(id),
                email: "".concat(id, "@example.com")
            })),
        eventId
    };
    if (!mockDataStore.teams[eventId]) {
        mockDataStore.teams[eventId] = [];
    }
    mockDataStore.teams[eventId].push(newTeam);
    // Initialize empty submissions and scores for new team
    mockDataStore.submissions[teamId] = [];
    mockDataStore.scores[eventId] = mockDataStore.scores[eventId] || [];
    mockDataStore.scores[eventId].push({
        teamId,
        score: 0,
        status: 'pending'
    });
    mockDataStore.scoreBreakdown[teamId] = [
        {
            criterion: 'Design & UX',
            score: 0,
            max: 10,
            status: 'pending'
        },
        {
            criterion: 'Functionality',
            score: 0,
            max: 10,
            status: 'pending'
        },
        {
            criterion: 'Code Quality',
            score: 0,
            max: 10,
            status: 'pending'
        },
        {
            criterion: 'Performance',
            score: 0,
            max: 10,
            status: 'pending'
        },
        {
            criterion: 'Documentation',
            score: 0,
            max: 10,
            status: 'pending'
        }
    ];
    return newTeam;
}
function addSubmissionToStore(teamId, eventId, submission) {
    const submissionId = "sub-".concat(Date.now());
    const newSubmission = {
        ...submission,
        id: submissionId,
        submitDate: new Date().toISOString()
    };
    if (!mockDataStore.submissions[teamId]) {
        mockDataStore.submissions[teamId] = [];
    }
    mockDataStore.submissions[teamId].push(newSubmission);
    return newSubmission;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/api/eventService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "eventService",
    ()=>eventService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/api/mockData.ts [app-client] (ecmascript)");
;
// Simulate network delay for realistic UX
const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
const eventService = {
    // Get all events
    getAllEvents: async ()=>{
        await delay(300);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockEvents"];
    },
    // Get user's joined events
    getMyEvents: async ()=>{
        await delay(300);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockEvents"].filter((e)=>e.status === 'open');
    },
    // Join an event
    joinEvent: async (eventId)=>{
        await delay(500);
        return {
            success: true
        };
    },
    // Get single event details
    getEvent: async (eventId)=>{
        await delay(300);
        const event = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockEvents"].find((e)=>e.id === eventId);
        if (!event) {
            throw new Error("Event ".concat(eventId, " not found"));
        }
        return event;
    },
    // Get all teams for an event
    getEventTeams: async (eventId)=>{
        await delay(300);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDataStore"].teams[eventId] || [];
    },
    // Get user's team for event (if exists)
    getUserTeam: async (eventId, userId)=>{
        await delay(300);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserTeamFromStore"])(eventId, userId);
    },
    // Create new team
    createTeam: async (eventId, teamData)=>{
        await delay(500);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTeamInStore"])(eventId, teamData);
    },
    // Get team submissions
    getTeamSubmissions: async (teamId)=>{
        await delay(300);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDataStore"].submissions[teamId] || [];
    },
    // Submit work (ZIP or URL)
    submitWork: async (teamId, eventId, submissionData)=>{
        await delay(800);
        if (submissionData.type === 'ZIP') {
            if (!(submissionData.content instanceof FormData)) {
                throw new Error('ZIP submission requires FormData');
            }
            const file = submissionData.content.get('file');
            if (!file) {
                throw new Error('ZIP submission missing file');
            }
        }
        const submission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addSubmissionToStore"])(teamId, eventId, {
            teamId,
            eventId,
            type: submissionData.type,
            status: 'submitted',
            content: submissionData.type === 'ZIP' ? 'submission.zip' : submissionData.content
        });
        return submission;
    },
    // Get team score & leaderboard
    getTeamScores: async (eventId)=>{
        await delay(300);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDataStore"].scores[eventId] || [];
    },
    // Get score breakdown for a team
    getScoreBreakdown: async (teamId, eventId)=>{
        await delay(300);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDataStore"].scoreBreakdown[teamId] || [];
    }
};
const __TURBOPACK__default__export__ = eventService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/hooks/useEvents.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAllEvents",
    ()=>useAllEvents,
    "useCreateTeam",
    ()=>useCreateTeam,
    "useEvent",
    ()=>useEvent,
    "useEventTeams",
    ()=>useEventTeams,
    "useJoinEvent",
    ()=>useJoinEvent,
    "useMyEvents",
    ()=>useMyEvents,
    "useScoreBreakdown",
    ()=>useScoreBreakdown,
    "useSubmitWork",
    ()=>useSubmitWork,
    "useTeamScores",
    ()=>useTeamScores,
    "useTeamSubmissions",
    ()=>useTeamSubmissions,
    "useUserTeam",
    ()=>useUserTeam
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$eventService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/api/eventService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature();
'use client';
;
;
const useEvent = (eventId)=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'event',
            eventId
        ],
        queryFn: {
            "useEvent.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$eventService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getEvent(eventId)
        }["useEvent.useQuery"],
        staleTime: 5 * 60 * 1000
    });
};
_s(useEvent, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useAllEvents = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'events',
            'all'
        ],
        queryFn: {
            "useAllEvents.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$eventService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getAllEvents()
        }["useAllEvents.useQuery"],
        staleTime: 2 * 60 * 1000
    });
};
_s1(useAllEvents, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useMyEvents = ()=>{
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'events',
            'my'
        ],
        queryFn: {
            "useMyEvents.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$eventService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getMyEvents()
        }["useMyEvents.useQuery"],
        staleTime: 2 * 60 * 1000
    });
};
_s2(useMyEvents, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useEventTeams = (eventId)=>{
    _s3();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'eventTeams',
            eventId
        ],
        queryFn: {
            "useEventTeams.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$eventService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getEventTeams(eventId)
        }["useEventTeams.useQuery"],
        staleTime: 2 * 60 * 1000
    });
};
_s3(useEventTeams, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useUserTeam = (eventId, userId)=>{
    _s4();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'userTeam',
            eventId,
            userId
        ],
        queryFn: {
            "useUserTeam.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$eventService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getUserTeam(eventId, userId)
        }["useUserTeam.useQuery"],
        staleTime: 5 * 60 * 1000
    });
};
_s4(useUserTeam, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useCreateTeam = (eventId)=>{
    _s5();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useCreateTeam.useMutation": (teamData)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$eventService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createTeam(eventId, teamData)
        }["useCreateTeam.useMutation"],
        onSuccess: {
            "useCreateTeam.useMutation": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'eventTeams',
                        eventId
                    ]
                });
                // Invalidate with exact key for this event's user team
                queryClient.invalidateQueries({
                    queryKey: [
                        'userTeam',
                        eventId
                    ]
                });
            }
        }["useCreateTeam.useMutation"]
    });
};
_s5(useCreateTeam, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useTeamSubmissions = (teamId)=>{
    _s6();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'submissions',
            teamId
        ],
        queryFn: {
            "useTeamSubmissions.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$eventService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getTeamSubmissions(teamId)
        }["useTeamSubmissions.useQuery"],
        staleTime: 1 * 60 * 1000
    });
};
_s6(useTeamSubmissions, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useSubmitWork = (teamId, eventId)=>{
    _s7();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSubmitWork.useMutation": (submissionData)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$eventService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].submitWork(teamId, eventId, submissionData)
        }["useSubmitWork.useMutation"],
        onSuccess: {
            "useSubmitWork.useMutation": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'submissions',
                        teamId
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'scores',
                        eventId
                    ]
                });
            }
        }["useSubmitWork.useMutation"]
    });
};
_s7(useSubmitWork, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useTeamScores = (eventId)=>{
    _s8();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'scores',
            eventId
        ],
        queryFn: {
            "useTeamScores.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$eventService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getTeamScores(eventId)
        }["useTeamScores.useQuery"],
        staleTime: 2 * 60 * 1000
    });
};
_s8(useTeamScores, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useScoreBreakdown = (teamId, eventId)=>{
    _s9();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'scoreBreakdown',
            teamId,
            eventId
        ],
        queryFn: {
            "useScoreBreakdown.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$eventService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getScoreBreakdown(teamId, eventId)
        }["useScoreBreakdown.useQuery"],
        staleTime: 5 * 60 * 1000
    });
};
_s9(useScoreBreakdown, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useJoinEvent = ()=>{
    _s10();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useJoinEvent.useMutation": (eventId)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$api$2f$eventService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].joinEvent(eventId)
        }["useJoinEvent.useMutation"],
        onSuccess: {
            "useJoinEvent.useMutation": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        'events',
                        'my'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'events',
                        'all'
                    ]
                });
            }
        }["useJoinEvent.useMutation"]
    });
};
_s10(useJoinEvent, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventDashboard/Card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function Card(param) {
    let { children, title, className = '' } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-canvas border border-hairline rounded-sm p-4 md:p-6 ".concat(className),
        children: [
            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "t-heading-sm text-ink m-0 mb-4 text-base md:text-lg",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/Card.tsx",
                lineNumber: 14,
                columnNumber: 17
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventDashboard/Card.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventDashboard/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function Button(param) {
    let { variant = 'primary', size = 'md', children, isLoading = false, disabled = false, className = '', ...props } = param;
    const baseClass = 'inline-flex items-center justify-center gap-2 rounded-sm font-bold transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed min-h-11';
    const variants = {
        primary: 'bg-primary text-on-primary hover:bg-primary-dark active:bg-primary-dark',
        secondary: 'bg-surface-soft text-ink border border-hairline hover:bg-canvas active:bg-hairline',
        outline: 'bg-transparent text-ink border border-hairline hover:bg-surface-soft active:bg-hairline'
    };
    const sizes = {
        sm: 'px-3 py-2 text-body-sm',
        md: 'px-6 py-3 md:py-2 text-body-strong',
        lg: 'px-8 py-3 text-button-md'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: "".concat(baseClass, " ").concat(variants[variant], " ").concat(sizes[size], " ").concat(className),
        disabled: disabled || isLoading,
        ...props,
        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/Button.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, this),
                children
            ]
        }, void 0, true) : children
    }, void 0, false, {
        fileName: "[project]/src/features/events/components/EventDashboard/Button.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CardSkeleton",
    ()=>CardSkeleton,
    "FormSkeleton",
    ()=>FormSkeleton,
    "TableRowSkeleton",
    ()=>TableRowSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function CardSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-canvas border border-hairline rounded-sm p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-6 bg-surface-soft rounded-sm mb-4 w-1/3 animate-pulse"
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 bg-surface-soft rounded-sm w-full animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 bg-surface-soft rounded-sm w-5/6 animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 bg-surface-soft rounded-sm w-4/6 animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = CardSkeleton;
function TableRowSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-3 border-b border-hairline space-y-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-4 bg-surface-soft rounded-sm w-1/3 animate-pulse"
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-4 bg-surface-soft rounded-sm w-1/4 animate-pulse"
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = TableRowSkeleton;
function FormSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-10 bg-surface-soft rounded-sm animate-pulse"
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-32 bg-surface-soft rounded-sm animate-pulse"
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-10 bg-surface-soft rounded-sm animate-pulse"
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c2 = FormSkeleton;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "CardSkeleton");
__turbopack_context__.k.register(_c1, "TableRowSkeleton");
__turbopack_context__.k.register(_c2, "FormSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardTab",
    ()=>DashboardTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/hooks/useEvents.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/contexts/EventDashboardContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function DashboardTab(param) {
    let { eventId, userId } = param;
    _s();
    const { setIsModalOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventDashboard"])();
    const { data: event, isLoading: eventLoading, error: eventError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(eventId);
    const { data: teams, isLoading: teamsLoading, error: teamsError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventTeams"])(eventId);
    const { data: userTeam } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserTeam"])(eventId, userId);
    const formatDate = (date)=>new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    if (eventError || teamsError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-error/10 border border-error rounded-sm p-6 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "t-body-md text-error font-bold",
                    children: "Failed to load event"
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "t-body-sm text-mute mt-2",
                    children: "Please refresh and try again"
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this);
    }
    if (eventLoading || teamsLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardSkeleton"], {}, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardSkeleton"], {}, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardSkeleton"], {}, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this);
    }
    if (!event) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "t-body-md text-mute",
        children: "Event not found"
    }, void 0, false, {
        fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
        lineNumber: 42,
        columnNumber: 22
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                title: "Event Details",
                className: "lg:col-span-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "t-body-md text-body",
                            children: event.description
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-baseline",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "t-body-sm text-mute",
                                            children: "Start Date"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "t-body-strong text-ink",
                                            children: formatDate(event.startDate)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                            lineNumber: 52,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-baseline border-t border-hairline pt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "t-body-sm text-mute",
                                            children: "End Date"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "t-body-strong text-ink",
                                            children: formatDate(event.endDate)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                            lineNumber: 56,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-baseline border-t border-hairline pt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "t-body-sm text-mute",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                            lineNumber: 59,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-block px-3 py-1 rounded-sm t-caption-sm font-bold uppercase ".concat(event.status === 'open' ? 'bg-primary text-on-primary' : 'bg-stone text-on-dark'),
                                            children: event.status
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                            lineNumber: 60,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-baseline border-t border-hairline pt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "t-body-sm text-mute",
                                            children: "Submission Type"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "t-body-strong text-ink",
                                            children: event.submissionType
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-baseline border-t border-hairline pt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "t-body-sm text-mute",
                                            children: "Total Teams"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                            lineNumber: 69,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "t-body-strong text-ink",
                                            children: (teams === null || teams === void 0 ? void 0 : teams.length) || 0
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                title: "Registered Teams",
                className: "lg:col-span-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3 max-h-72 overflow-y-auto",
                    children: teams && teams.length > 0 ? teams.map((team)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pb-3 border-b border-hairline last:border-b-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "t-body-sm font-bold text-ink truncate",
                                    children: team.name
                                }, void 0, false, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                    lineNumber: 81,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "t-caption-sm text-mute",
                                    children: team.leader.name
                                }, void 0, false, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                    lineNumber: 82,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "t-caption-sm text-mute",
                                    children: [
                                        team.members.length + 1,
                                        " members"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                                    lineNumber: 83,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, team.id, true, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                            lineNumber: 80,
                            columnNumber: 15
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "t-body-sm text-mute text-center py-4",
                        children: "No teams registered yet"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                        lineNumber: 87,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:lg:col-span-3",
                children: userTeam ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-surface-soft border border-hairline rounded-sm p-4 md:p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "t-body-strong text-ink mb-2 text-sm md:text-base",
                            children: [
                                "You're registered as: ",
                                userTeam.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "t-body-sm text-mute text-xs md:text-sm",
                            children: "You can now submit your work and view results"
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                    lineNumber: 94,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: ()=>setIsModalOpen(true),
                    size: "lg",
                    className: "w-full",
                    children: "Register Team"
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                    lineNumber: 99,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(DashboardTab, "H9jOMBJgOxLDF0/rbTQ37l/JKZ8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventDashboard"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventTeams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserTeam"]
    ];
});
_c = DashboardTab;
var _c;
__turbopack_context__.k.register(_c, "DashboardTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/utils/validationUtils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "urlValidation",
    ()=>urlValidation,
    "zipValidation",
    ()=>zipValidation
]);
const zipValidation = {
    maxSize: 50 * 1024 * 1024,
    validate: (file)=>{
        const errors = {};
        if (!file) {
            errors.file = 'Please select a ZIP file';
            return {
                isValid: false,
                errors
            };
        }
        if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
            errors.file = 'File must be a ZIP archive';
        }
        if (file.size > zipValidation.maxSize) {
            errors.file = "File size must be less than 50MB (current: ".concat((file.size / 1024 / 1024).toFixed(2), "MB)");
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
};
const urlValidation = {
    validate: (url)=>{
        const errors = {};
        if (!url.trim()) {
            errors.url = 'Please enter a submission link';
            return {
                isValid: false,
                errors
            };
        }
        try {
            new URL(url);
        } catch (e) {
            errors.url = 'Please enter a valid URL (starting with http:// or https://)';
            return {
                isValid: false,
                errors
            };
        }
        const validDomains = [
            'github.com',
            'drive.google.com',
            'gitlab.com',
            'bitbucket.org'
        ];
        const isValidDomain = validDomains.some((domain)=>url.includes(domain));
        if (!isValidDomain) {
            errors.url = 'URL must be from GitHub, Google Drive, GitLab, or Bitbucket';
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventDashboard/Badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function Badge(param) {
    let { variant, icon, children } = param;
    const variants = {
        success: 'bg-surface-soft text-ink border border-success-deep',
        warning: 'bg-surface-soft text-warning border border-warning',
        error: 'bg-surface-soft text-error border border-error',
        primary: 'bg-surface-soft text-ink border border-primary',
        default: 'bg-surface-soft text-ink border border-hairline'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-2 px-3 py-1 rounded-sm text-caption-sm font-bold ".concat(variants[variant]),
        children: [
            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center",
                children: icon
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/Badge.tsx",
                lineNumber: 22,
                columnNumber: 16
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventDashboard/Badge.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubmissionTab",
    ()=>SubmissionTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/hooks/useEvents.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$utils$2f$validationUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/utils/validationUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function SubmissionTab(param) {
    let { teamId, eventId } = param;
    _s();
    const { data: submissions, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTeamSubmissions"])(teamId);
    const submitMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubmitWork"])(teamId, eventId);
    const [submissionType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('zip');
    const [zipFile, setZipFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [urlInput, setUrlInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [validationErrors, setValidationErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const handleZipSelect = (file)=>{
        if (file) {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$utils$2f$validationUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zipValidation"].validate(file);
            if (result.isValid) {
                setZipFile(file);
                setValidationErrors({});
            } else {
                setValidationErrors(result.errors);
                setZipFile(null);
            }
        }
    };
    const handleZipDrop = (e)=>{
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) handleZipSelect(files[0]);
    };
    const handleUrlChange = (value)=>{
        setUrlInput(value);
        if (value.trim()) {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$utils$2f$validationUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["urlValidation"].validate(value);
            setValidationErrors(result.errors);
        } else {
            setValidationErrors({});
        }
    };
    const handleSubmit = async ()=>{
        if (submissionType === 'zip') {
            if (!zipFile) {
                setValidationErrors({
                    file: 'Please select a ZIP file'
                });
                return;
            }
            const formData = new FormData();
            formData.append('file', zipFile);
            await submitMutation.mutateAsync({
                type: 'ZIP',
                content: formData
            });
        } else {
            const result = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$utils$2f$validationUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["urlValidation"].validate(urlInput);
            if (!result.isValid) {
                setValidationErrors(result.errors);
                return;
            }
            await submitMutation.mutateAsync({
                type: 'URL',
                content: urlInput
            });
        }
        setZipFile(null);
        setUrlInput('');
        setValidationErrors({});
    };
    const getStatusBadge = (status)=>{
        const statusMap = {
            submitted: {
                variant: 'primary',
                label: 'Submitted'
            },
            'pending-review': {
                variant: 'warning',
                label: 'Pending Review'
            },
            rejected: {
                variant: 'error',
                label: 'Rejected'
            },
            graded: {
                variant: 'success',
                label: 'Graded'
            }
        };
        const config = statusMap[status] || {
            variant: 'default',
            label: 'Unknown'
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
            variant: config.variant,
            children: config.label
        }, void 0, false, {
            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
            lineNumber: 87,
            columnNumber: 12
        }, this);
    };
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-error/10 border border-error rounded-sm p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "t-body-md text-error font-bold",
                children: "Failed to load submissions"
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                lineNumber: 93,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
            lineNumber: 92,
            columnNumber: 7
        }, this);
    }
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormSkeleton"], {}, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormSkeleton"], {}, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this);
    }
    const formatDate = (date)=>new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                title: "Submit for Event",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        submissionType === 'zip' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onDrop: handleZipDrop,
                            onDragOver: (e)=>e.preventDefault(),
                            className: "border-2 border-dashed rounded-sm p-4 md:p-8 text-center cursor-pointer transition-colors duration-150 ".concat(validationErrors.file ? 'border-error bg-error/5' : 'border-hairline bg-surface-soft hover:border-primary'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                    size: 24,
                                    className: "mx-auto mb-2 ".concat(validationErrors.file ? 'text-error' : 'text-mute')
                                }, void 0, false, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            accept: ".zip",
                                            onChange: (e)=>{
                                                var _e_target_files;
                                                return handleZipSelect(((_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0]) || null);
                                            },
                                            className: "sr-only",
                                            "aria-label": "Upload ZIP file"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                            lineNumber: 125,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "t-body-md text-ink cursor-pointer",
                                            children: "Drag ZIP file here or click to browse"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                            lineNumber: 132,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "t-caption-sm text-mute mt-2",
                                    children: "Max 50MB"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 134,
                                    columnNumber: 15
                                }, this),
                                zipFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "t-body-sm text-primary mt-2 font-bold",
                                    children: [
                                        "✓ ",
                                        zipFile.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 135,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "urlInput",
                                    className: "t-body-strong text-ink block text-sm md:text-base",
                                    children: "Submission Link"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "urlInput",
                                            type: "url",
                                            placeholder: "https://github.com/... or https://drive.google.com/...",
                                            value: urlInput,
                                            onChange: (e)=>handleUrlChange(e.target.value),
                                            className: "w-full px-4 py-2 border rounded-sm text-body-md focus:outline-none transition-colors duration-150 ".concat(validationErrors.url ? 'border-error focus:border-error' : 'border-hairline focus:border-primary'),
                                            "aria-invalid": !!validationErrors.url,
                                            "aria-describedby": validationErrors.url ? 'url-error' : undefined
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                            size: 16,
                                            className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-mute"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                            lineNumber: 155,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "t-caption-sm text-mute",
                                    children: "Paste GitHub, Drive, or similar link"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 157,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this),
                        validationErrors.file && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 bg-error/10 border border-error rounded-sm p-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    size: 16,
                                    className: "text-error flex-shrink-0 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    id: "file-error",
                                    className: "t-body-sm text-error",
                                    children: validationErrors.file
                                }, void 0, false, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 164,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this),
                        validationErrors.url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 bg-error/10 border border-error rounded-sm p-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    size: 16,
                                    className: "text-error flex-shrink-0 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    id: "url-error",
                                    className: "t-body-sm text-error",
                                    children: validationErrors.url
                                }, void 0, false, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                            lineNumber: 169,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleSubmit,
                            isLoading: submitMutation.isPending,
                            disabled: !zipFile && !urlInput,
                            className: "w-full",
                            size: "lg",
                            children: "Submit"
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                title: "Submission History",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: !isLoading && submissions && submissions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                size: 32,
                                className: "text-mute mx-auto mb-2 opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                lineNumber: 191,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "t-body-md text-mute",
                                children: "No submissions yet"
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                lineNumber: 192,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                        lineNumber: 190,
                        columnNumber: 13
                    }, this) : submissions === null || submissions === void 0 ? void 0 : submissions.map((sub)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pb-3 border-b border-hairline last:border-b-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-2 mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "t-caption-sm text-mute",
                                            children: formatDate(sub.submitDate)
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                            lineNumber: 198,
                                            columnNumber: 19
                                        }, this),
                                        getStatusBadge(sub.status)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 197,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "t-body-sm text-ink font-bold",
                                    children: [
                                        sub.type,
                                        " Submission"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                                    lineNumber: 201,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, sub.id, true, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                            lineNumber: 196,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(SubmissionTab, "OjahJftOfqRz2DRN0ObS74jJXJI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTeamSubmissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubmitWork"]
    ];
});
_c = SubmissionTab;
var _c;
__turbopack_context__.k.register(_c, "SubmissionTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventDashboard/tabs/Results.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResultsTab",
    ()=>ResultsTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/hooks/useEvents.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/Card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/SkeletonLoaders.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ResultsTab(param) {
    let { teamId, eventId } = param;
    _s();
    const { data: scoreBreakdown = [], error: breakdownError, isLoading: breakdownLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScoreBreakdown"])(teamId, eventId);
    const { data: teamScores = [], error: leaderboardError, isLoading: leaderboardLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTeamScores"])(eventId);
    if (breakdownError || leaderboardError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-error/10 border border-error rounded-sm p-6 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "t-body-md text-error font-bold",
                children: "Failed to load results"
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this);
    }
    if (breakdownLoading || leaderboardLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardSkeleton"], {}, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardSkeleton"], {}, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardSkeleton"], {}, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardSkeleton"], {}, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRowSkeleton"], {}, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRowSkeleton"], {}, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$SkeletonLoaders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRowSkeleton"], {}, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this);
    }
    const userScore = scoreBreakdown.reduce((acc, item)=>acc + item.score, 0);
    const totalPossible = scoreBreakdown.reduce((acc, item)=>acc + item.max, 0);
    const avgScore = teamScores.length > 0 ? Math.round(teamScores.reduce((acc, score)=>acc + score.score, 0) / teamScores.length) : 0;
    // Find user's rank
    const sortedScores = [
        ...teamScores
    ].sort((a, b)=>b.score - a.score);
    const userRank = sortedScores.findIndex((score)=>score.teamId === teamId) + 1 || teamScores.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 md:space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-l-4 border-l-primary",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "t-display-lg text-primary font-bold m-0 text-2xl md:text-3xl",
                            children: [
                                "#",
                                userRank,
                                " out of ",
                                teamScores.length,
                                " teams"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "t-heading-md text-ink m-0 text-lg md:text-xl",
                            children: [
                                "Total Score: ",
                                userScore,
                                "/",
                                totalPossible
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: "primary",
                            children: "Pending Review"
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        title: "Score Breakdown",
                        className: "lg:col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: scoreBreakdown.length > 0 ? scoreBreakdown.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pb-3 border-b border-hairline last:border-b-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between gap-2 mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "t-body-sm text-mute",
                                                    children: item.criterion
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 21
                                                }, this),
                                                item.status === 'graded' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                    size: 16,
                                                    className: "text-success-deep",
                                                    "aria-label": "Graded"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    size: 16,
                                                    className: "text-warning",
                                                    "aria-label": "Pending"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                            lineNumber: 76,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "t-body-strong text-ink",
                                            children: [
                                                item.score,
                                                "/",
                                                item.max
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                            lineNumber: 84,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.criterion, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                    lineNumber: 75,
                                    columnNumber: 17
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "t-body-sm text-mute text-center py-4",
                                children: "No scores available yet"
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        title: "Comparison",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "t-caption-sm text-mute uppercase font-bold mb-1",
                                            children: "Average Score"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                            lineNumber: 99,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "t-body-md text-ink",
                                            children: [
                                                avgScore,
                                                "/",
                                                totalPossible || 100
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "t-caption-sm text-mute uppercase font-bold mb-1",
                                            children: "Your Score"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "t-body-strong text-primary",
                                            children: [
                                                userScore,
                                                "/",
                                                totalPossible || 100
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-2 border-t border-hairline",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "t-body-sm text-primary font-bold",
                                        children: [
                                            "+",
                                            userScore - avgScore,
                                            " above average"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                title: "Leaderboard",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto -mx-6 md:mx-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-left text-xs md:text-body-sm px-6 md:px-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-hairline",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "pb-3 t-body-strong text-mute font-bold uppercase",
                                            children: "Rank"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                            lineNumber: 119,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "pb-3 t-body-strong text-mute font-bold uppercase",
                                            children: "Team ID"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "pb-3 t-body-strong text-mute font-bold uppercase text-right",
                                            children: "Score"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                            lineNumber: 121,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "pb-3 t-body-strong text-mute font-bold uppercase text-right",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                            lineNumber: 122,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: sortedScores.map((entry, index)=>{
                                    const isCurrentTeam = entry.teamId === teamId;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-hairline last:border-b-0 ".concat(isCurrentTeam ? 'bg-surface-soft border-l-4 border-l-primary' : ''),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 t-body-strong",
                                                children: index + 1
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                                lineNumber: 135,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 t-body-md",
                                                children: entry.teamId
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                                lineNumber: 136,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 t-body-md text-right",
                                                children: entry.score
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                                lineNumber: 137,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "py-3 text-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: entry.status === 'graded' ? 'success' : 'default',
                                                    children: entry.status === 'graded' ? 'Graded' : 'Submitted'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                                lineNumber: 138,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, entry.teamId, true, {
                                        fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                        lineNumber: 129,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventDashboard/tabs/Results.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(ResultsTab, "gfDkYE1Nm7fcf1m/ImDj4BsNVbw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScoreBreakdown"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTeamScores"]
    ];
});
_c = ResultsTab;
var _c;
__turbopack_context__.k.register(_c, "ResultsTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamRegistrationForm",
    ()=>TeamRegistrationForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/contexts/EventDashboardContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/hooks/useEvents.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const mockUsers = [
    {
        id: 'user-1',
        name: 'Alice Johnson',
        email: 'alice@example.com'
    },
    {
        id: 'user-2',
        name: 'Bob Smith',
        email: 'bob@example.com'
    },
    {
        id: 'user-3',
        name: 'Charlie Wilson',
        email: 'charlie@example.com'
    },
    {
        id: 'user-4',
        name: 'Diana Lee',
        email: 'diana@example.com'
    },
    {
        id: 'user-5',
        name: 'Eve Martinez',
        email: 'eve@example.com'
    }
];
function TeamRegistrationForm(param) {
    let { eventId, userId } = param;
    _s();
    const { setIsModalOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventDashboard"])();
    const createTeamMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateTeam"])(eventId);
    const [teamName, setTeamName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedMembers, setSelectedMembers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchInput, setSearchInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [showMemberDropdown, setShowMemberDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitError, setSubmitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const filteredUsers = mockUsers.filter((user)=>user.id !== userId && !selectedMembers.find((m)=>m.id === user.id) && (user.name.toLowerCase().includes(searchInput.toLowerCase()) || user.email.toLowerCase().includes(searchInput.toLowerCase())));
    const handleAddMember = (member)=>{
        setSelectedMembers([
            ...selectedMembers,
            member
        ]);
        setSearchInput('');
        setShowMemberDropdown(false);
    };
    const handleRemoveMember = (memberId)=>{
        setSelectedMembers(selectedMembers.filter((m)=>m.id !== memberId));
    };
    const validateForm = ()=>{
        const newErrors = {};
        if (!teamName.trim()) {
            newErrors.teamName = 'Team name is required';
        }
        if (selectedMembers.length === 0) {
            newErrors.members = 'Add at least one team member';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setSubmitError('');
        if (!validateForm()) return;
        const memberIds = [
            userId,
            ...selectedMembers.map((m)=>m.id)
        ];
        try {
            await createTeamMutation.mutateAsync({
                name: teamName,
                memberIds
            });
            setTeamName('');
            setSelectedMembers([]);
            setErrors({});
            setIsModalOpen(false);
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Failed to create team');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6 overflow-y-auto flex-1 p-6 md:p-8",
                children: [
                    submitError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-error/10 border border-error rounded-sm p-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "t-body-sm text-error font-bold",
                            children: submitError
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "teamName",
                                className: "block t-body-strong text-ink mb-2 text-sm md:text-base",
                                children: "Team Name"
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "teamName",
                                type: "text",
                                placeholder: "Enter team name",
                                value: teamName,
                                onChange: (e)=>{
                                    setTeamName(e.target.value);
                                    if (errors.teamName) setErrors({
                                        ...errors,
                                        teamName: ''
                                    });
                                },
                                "aria-invalid": !!errors.teamName,
                                "aria-describedby": errors.teamName ? 'teamName-error' : undefined,
                                className: "w-full px-4 py-3 md:py-2 border rounded-sm text-base md:text-body-md focus:outline-none transition-colors duration-150 min-h-12 md:min-h-11 ".concat(errors.teamName ? 'border-error focus:border-error' : 'border-hairline focus:border-primary')
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            errors.teamName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                id: "teamName-error",
                                className: "t-body-sm text-error mt-1",
                                role: "alert",
                                children: errors.teamName
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block t-body-strong text-ink mb-2",
                                children: "Add Members"
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 p-3 bg-surface-soft rounded-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "t-body-sm text-mute uppercase font-bold text-xs",
                                        children: "Team Leader (You)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "t-body-strong text-ink",
                                        children: "Current User"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search by name or email",
                                        value: searchInput,
                                        onChange: (e)=>setSearchInput(e.target.value),
                                        onFocus: ()=>setShowMemberDropdown(true),
                                        className: "w-full px-4 py-3 md:py-2 border border-hairline rounded-sm text-base md:text-body-md focus:border-primary focus:outline-none min-h-12 md:min-h-11"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this),
                                    showMemberDropdown && filteredUsers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-full left-0 right-0 mt-1 bg-canvas border border-hairline rounded-sm shadow-lg z-10",
                                        children: filteredUsers.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleAddMember(user),
                                                className: "w-full text-left px-4 py-2 hover:bg-surface-soft transition-colors duration-150 border-b border-hairline last:border-b-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "t-body-sm font-bold text-ink",
                                                        children: user.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "t-caption-sm text-mute",
                                                        children: user.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, user.id, true, {
                                                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                                lineNumber: 156,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            selectedMembers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 mb-3",
                                children: selectedMembers.map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center gap-2 bg-surface-soft text-ink px-3 py-1 rounded-full text-caption-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: member.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                                lineNumber: 178,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleRemoveMember(member.id),
                                                className: "ml-1 hover:text-error transition-colors duration-150 focus-visible:outline-1 focus-visible:outline-primary",
                                                "aria-label": "Remove ".concat(member.name, " from team"),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    size: 12,
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                                lineNumber: 179,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, member.id, true, {
                                        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                        lineNumber: 174,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this),
                            errors.members && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "t-body-sm text-error",
                                role: "alert",
                                children: errors.members
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 justify-end p-6 md:p-8 border-t border-hairline flex-shrink-0 bg-canvas",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "secondary",
                        onClick: ()=>setIsModalOpen(false),
                        disabled: createTeamMutation.isPending,
                        type: "button",
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "submit",
                        isLoading: createTeamMutation.isPending,
                        disabled: !teamName.trim() || selectedMembers.length === 0,
                        children: "Create Team"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s(TeamRegistrationForm, "dan7E1aophoViIH433hm+ZxDNyo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventDashboard"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateTeam"]
    ];
});
_c = TeamRegistrationForm;
var _c;
__turbopack_context__.k.register(_c, "TeamRegistrationForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventDashboard/EventDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventDashboard",
    ()=>EventDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/Modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$tabs$2f$Dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/tabs/Dashboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$tabs$2f$Submission$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/tabs/Submission.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$tabs$2f$Results$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/tabs/Results.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$TeamRegistrationForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/TeamRegistrationForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/contexts/EventDashboardContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/hooks/useEvents.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function EventDashboard(param) {
    let { eventId, userId } = param;
    _s();
    const { activeTab, isModalOpen, setIsModalOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventDashboard"])();
    // Fetch real data
    const { data: event, isLoading: eventLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"])(eventId);
    const { data: userTeam, isLoading: userTeamLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserTeam"])(eventId, userId);
    const { isLoading: teamsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventTeams"])(eventId);
    const isLoading = eventLoading || userTeamLoading || teamsLoading;
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-canvas flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "t-body-md text-mute",
                        children: "Loading event..."
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this);
    }
    if (!event) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-canvas flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "t-heading-md text-error",
                children: "Event not found"
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this);
    }
    const renderTabContent = ()=>{
        switch(activeTab){
            case 'dashboard':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$tabs$2f$Dashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardTab"], {
                    eventId: eventId,
                    userId: userId
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                    lineNumber: 51,
                    columnNumber: 16
                }, this);
            case 'submission':
                return userTeam ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$tabs$2f$Submission$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubmissionTab"], {
                    teamId: userTeam.id,
                    eventId: eventId
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                    lineNumber: 53,
                    columnNumber: 27
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "t-body-md text-mute p-6",
                    children: "Please register a team first"
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                    lineNumber: 53,
                    columnNumber: 86
                }, this);
            case 'results':
                return userTeam ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$tabs$2f$Results$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResultsTab"], {
                    teamId: userTeam.id,
                    eventId: eventId
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                    lineNumber: 55,
                    columnNumber: 27
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "t-body-md text-mute p-6",
                    children: "Results available after submission"
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                    lineNumber: 55,
                    columnNumber: 83
                }, this);
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-canvas",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {}, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
                title: event.title,
                subtitle: "Team Competition",
                status: event.status,
                submissionType: event.submissionType
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "fixed top-24 md:top-20 left-0 right-0 bottom-0 overflow-hidden bg-canvas lg:left-60",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full overflow-y-auto p-3 md:p-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-fadeIn",
                        children: renderTabContent()
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false),
                title: "Create New Team",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$TeamRegistrationForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TeamRegistrationForm"], {
                    eventId: eventId,
                    userId: userId
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventDashboard/EventDashboard.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(EventDashboard, "qw9SL1rwLV9M7u3OlV68UVFdYfk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventDashboard"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEvent"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserTeam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventTeams"]
    ];
});
_c = EventDashboard;
var _c;
__turbopack_context__.k.register(_c, "EventDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/events/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventDashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/contexts/EventDashboardContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$EventDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventDashboard/EventDashboard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function EventDashboardPageContent() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const eventId = params === null || params === void 0 ? void 0 : params.id;
    const userId = 'user-001';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$contexts$2f$EventDashboardContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDashboardProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventDashboard$2f$EventDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventDashboard"], {
            eventId: eventId,
            userId: userId
        }, void 0, false, {
            fileName: "[project]/src/app/events/[id]/page.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/events/[id]/page.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(EventDashboardPageContent, "+jVsTcECDRo3yq2d7EQxlN9Ixog=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = EventDashboardPageContent;
function EventDashboardPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-canvas flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "t-body-md text-mute",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/src/app/events/[id]/page.tsx",
                lineNumber: 22,
                columnNumber: 98
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/src/app/events/[id]/page.tsx",
            lineNumber: 22,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EventDashboardPageContent, {}, void 0, false, {
            fileName: "[project]/src/app/events/[id]/page.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/events/[id]/page.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c1 = EventDashboardPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "EventDashboardPageContent");
__turbopack_context__.k.register(_c1, "EventDashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_dd8080af._.js.map