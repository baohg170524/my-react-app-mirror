module.exports = [
"[project]/src/services/api/schools.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "schoolsApi",
    ()=>schoolsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/client.ts [app-ssr] (ecmascript)");
;
/**
 * School list is served by the deployed API (not the local backend).
 * Absolute URL overrides apiClient's baseURL for this request only.
 */ const SCHOOLS_URL = process.env.NEXT_PUBLIC_SCHOOLS_API_URL ?? "https://api.sealswp391.xyz/api/Schools";
const schoolsApi = {
    list: async (pageSize = 100, pageNumber = 1)=>{
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(SCHOOLS_URL, {
            params: {
                PageNumber: pageNumber,
                PageSize: pageSize
            }
        });
        return data;
    }
};
}),
"[project]/src/services/api/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$schools$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/schools.ts [app-ssr] (ecmascript)");
;
;
;
}),
"[project]/src/hooks/useAuth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_KEYS",
    ()=>AUTH_KEYS,
    "useCurrentUser",
    ()=>useCurrentUser,
    "useIsAuthenticated",
    ()=>useIsAuthenticated,
    "useLogin",
    ()=>useLogin,
    "useLogout",
    ()=>useLogout,
    "useRegister",
    ()=>useRegister
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/services/api/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/auth.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AUTH_KEYS = {
    all: [
        "auth"
    ],
    me: [
        "auth",
        "me"
    ]
};
const USER_STORAGE_KEY = "currentUser";
// ─── Helpers ──────────────────────────────────────────────────────────────────
function persistTokens(accessToken, refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}
function clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem(USER_STORAGE_KEY);
}
function persistUser(user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}
function readPersistedUser() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const raw = undefined;
}
function hasToken() {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
/** Build the in-app UserProfile from the backend login response. */ function loginResponseToProfile(res) {
    const role = res.isAdmin ? "ADMIN" : res.isStudent ? "STUDENT" : "MENTOR";
    return {
        id: res.userId,
        email: res.email,
        fullName: res.fullName,
        role,
        createdAt: new Date().toISOString(),
        stats: {
            eventsJoined: 0,
            projectScore: 0,
            rank: 0
        }
    };
}
function useCurrentUser() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: AUTH_KEYS.me,
        queryFn: async ()=>readPersistedUser(),
        enabled: hasToken(),
        staleTime: Infinity,
        retry: false
    });
}
function useIsAuthenticated() {
    const { data } = useCurrentUser();
    return !!data;
}
function useLogin() {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (payload)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].login(payload),
        onSuccess: (data)=>{
            persistTokens(data.accessToken, data.refreshToken);
            const profile = loginResponseToProfile(data);
            persistUser(profile);
            queryClient.setQueryData(AUTH_KEYS.me, profile);
            // replace (not push) so Back doesn't return to the login screen
            router.replace("/");
        }
    });
}
function useRegister() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (payload)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].register(payload)
    });
}
function useLogout() {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authApi"].logout,
        onSuccess: ()=>{
            clearTokens();
            queryClient.clear();
            router.push("/auth");
        },
        onError: ()=>{
            clearTokens();
            queryClient.clear();
            router.push("/auth");
        }
    });
}
}),
"[project]/src/app/auth/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/services/api/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$schools$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/schools.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
// ─── Tiny field component ─────────────────────────────────────────────────────
function Field({ label, type = "text", value, onChange, placeholder, autoComplete }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: 6
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-mute)"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/auth/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                className: "text-input",
                type: type,
                value: value,
                onChange: onChange,
                placeholder: placeholder,
                autoComplete: autoComplete,
                style: {
                    height: 44
                }
            }, void 0, false, {
                fileName: "[project]/src/app/auth/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/auth/page.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
// ─── Field label (shared with select / upload) ────────────────────────────────
function FieldLabel({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        style: {
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-mute)"
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/auth/page.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
// ─── School select ────────────────────────────────────────────────────────────
function SchoolSelect({ value, onChange, schools, isLoading, isError, isEmpty, onRetry }) {
    const placeholder = isLoading ? "Đang tải danh sách trường…" : isError ? "Không tải được danh sách trường" : isEmpty ? "Chưa có trường nào trong hệ thống" : "— Chọn trường —";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: 6
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                children: "Trường"
            }, void 0, false, {
                fileName: "[project]/src/app/auth/page.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                className: "auth-select",
                value: value,
                onChange: onChange,
                disabled: isLoading || isError || isEmpty,
                style: {
                    color: value === "" ? "var(--color-mute)" : "var(--color-ink)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        disabled: true,
                        style: {
                            color: "var(--color-ink)"
                        },
                        children: placeholder
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth/page.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    schools.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: s.id,
                            style: {
                                color: "var(--color-ink)"
                            },
                            children: s.schoolName
                        }, s.id, false, {
                            fileName: "[project]/src/app/auth/page.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/auth/page.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            (isError || isEmpty) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 12,
                    color: isError ? "var(--color-error)" : "var(--color-mute)",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: isError ? "Không kết nối được tới máy chủ." : "Vui lòng liên hệ admin để được thêm trường."
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth/page.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this),
                    isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onRetry,
                        style: {
                            background: "none",
                            border: "none",
                            padding: 0,
                            color: "var(--color-primary)",
                            fontWeight: 700,
                            cursor: "pointer"
                        },
                        children: "Thử lại"
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth/page.tsx",
                        lineNumber: 158,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/auth/page.tsx",
                lineNumber: 143,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/auth/page.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
// ─── Student-card upload (UI only — preview, not submitted) ────────────────────
function CardUpload({ preview, fileName, onSelect, onClear }) {
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: 6
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                children: "Ảnh thẻ sinh viên"
            }, void 0, false, {
                fileName: "[project]/src/app/auth/page.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-upload-preview",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: preview,
                        alt: "Ảnh thẻ sinh viên"
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth/page.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth-upload-meta",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "auth-upload-name",
                                children: fileName
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/page.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClear,
                                className: "auth-upload-remove",
                                children: "Xóa"
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/page.tsx",
                                lineNumber: 204,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth/page.tsx",
                        lineNumber: 202,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/auth/page.tsx",
                lineNumber: 199,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "auth-upload-drop",
                onClick: ()=>inputRef.current?.click(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "auth-upload-plus",
                        children: "+"
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth/page.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Nhấn để tải ảnh thẻ"
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth/page.tsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "auth-upload-hint",
                        children: "PNG, JPG · tối đa 5MB"
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth/page.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/auth/page.tsx",
                lineNumber: 210,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: inputRef,
                type: "file",
                accept: "image/*",
                onChange: onSelect,
                style: {
                    display: "none"
                }
            }, void 0, false, {
                fileName: "[project]/src/app/auth/page.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/auth/page.tsx",
        lineNumber: 195,
        columnNumber: 5
    }, this);
}
function AuthPage() {
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("login");
    const [loginForm, setLoginForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        email: "",
        password: ""
    });
    const [registerForm, setRegisterForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        schoolId: "",
        studentCode: ""
    });
    // Student-card image is UI-only (preview), not sent in the register payload.
    const [cardImage, setCardImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [clientError, setClientError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSwitching, setIsSwitching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const switchTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const loginMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLogin"])();
    const registerMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRegister"])();
    const schoolsQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "schools"
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$schools$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["schoolsApi"].list(),
        staleTime: 5 * 60_000
    });
    const schools = schoolsQuery.data?.data ?? [];
    const selectedSchool = schools.find((s)=>s.id === registerForm.schoolId);
    // Treat any school whose name contains "FPT" as the FPT-University case
    // (no student-card upload required, student code recommended).
    const isFptSchool = !!selectedSchool?.schoolName.toUpperCase().includes("FPT");
    const isPending = loginMutation.isPending || registerMutation.isPending;
    const serverError = loginMutation.error?.response?.data?.message || registerMutation.error?.response?.data?.message;
    const isRegister = mode === "register";
    // ── sliding transform values ───────────────────────────────────────────────
    // The dark (intro) panel starts left and slides right on register mode.
    // The form panel starts right and slides left on register mode.
    // The spine (72 px) sits fixed at 50% and has z-index:20 so panels slide behind it.
    const SPINE = 72;
    const darkTransform = isRegister ? `translateX(calc(100% + ${SPINE}px))` : "translateX(0)";
    const formTransform = isRegister ? `translateX(calc(-100% - ${SPINE}px))` : "translateX(0)";
    const EASE = "transform 0.68s cubic-bezier(0.76, 0, 0.24, 1)";
    // ── handlers ──────────────────────────────────────────────────────────────
    function switchMode() {
        if (isSwitching) return;
        setClientError("");
        setSuccessMessage("");
        loginMutation.reset();
        registerMutation.reset();
        setIsSwitching(true);
        // wait one paint for the spinner to appear before swapping form content
        if (switchTimerRef.current) clearTimeout(switchTimerRef.current);
        switchTimerRef.current = setTimeout(()=>{
            setMode((m)=>m === "login" ? "register" : "login");
        }, 100);
        // hide spinner after slide animation completes (680ms) + fade buffer
        setTimeout(()=>setIsSwitching(false), 720);
    }
    async function handleLogin(e) {
        e.preventDefault();
        setClientError("");
        setSuccessMessage("");
        loginMutation.mutate(loginForm);
    }
    // Card upload is required for non-FPT schools (UI-only — not sent yet).
    const needsCard = registerForm.schoolId !== "" && !isFptSchool;
    function handleSchoolChange(e) {
        const value = e.target.value;
        setRegisterForm((f)=>({
                ...f,
                schoolId: value
            }));
        const next = schools.find((s)=>s.id === value);
        const nextIsFpt = !!next?.schoolName.toUpperCase().includes("FPT");
        if (value === "" || nextIsFpt) setCardImage(null);
    }
    function handleCardSelect(e) {
        const file = e.target.files?.[0];
        e.target.value = ""; // allow re-selecting the same file later
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setClientError("Vui lòng chọn một file ảnh hợp lệ.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setClientError("Ảnh thẻ không được vượt quá 5MB.");
            return;
        }
        const reader = new FileReader();
        reader.onload = ()=>{
            setClientError("");
            setCardImage({
                preview: reader.result,
                name: file.name
            });
        };
        reader.readAsDataURL(file);
    }
    async function handleRegister(e) {
        e.preventDefault();
        setClientError("");
        setSuccessMessage("");
        if (!registerForm.schoolId) {
            setClientError("Vui lòng chọn trường.");
            return;
        }
        if (needsCard && !cardImage) {
            setClientError("Vui lòng tải ảnh thẻ sinh viên.");
            return;
        }
        if (registerForm.password !== registerForm.confirmPassword) {
            setClientError("Mật khẩu xác nhận không khớp.");
            return;
        }
        registerMutation.mutate({
            schoolId: registerForm.schoolId,
            studentCode: registerForm.studentCode.trim() || undefined,
            email: registerForm.email.trim(),
            password: registerForm.password,
            fullName: registerForm.fullName.trim(),
            isStudent: true,
            // FPT status is derived from the selected school name (contains "FPT").
            isFpt: isFptSchool
        }, {
            onSuccess: ()=>{
                // Backend returns the user but no tokens — prompt user to log in.
                setSuccessMessage("Đăng ký thành công. Vui lòng đăng nhập để tiếp tục.");
                setLoginForm({
                    email: registerForm.email.trim(),
                    password: ""
                });
                setRegisterForm({
                    fullName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    schoolId: "",
                    studentCode: ""
                });
                setCardImage(null);
                setMode("login");
            }
        });
    }
    // ─────────────────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .auth-root {
          position: fixed;
          inset: 0;
          overflow: hidden;
          background: var(--color-surface-dark);
          font-family: var(--font-sans);
        }

        /* ── dark intro panel ─────────────────────────────────────────────── */
        .auth-dark {
          position: absolute;
          top: 0;
          left: 0;
          width: calc(50% - ${SPINE / 2}px);
          height: 100%;
          background: var(--color-surface-dark);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 56px;
          z-index: 15;
          transition: ${EASE};
          overflow: hidden;
        }

        /* subtle dot-grid background on dark panel */
        .auth-dark::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            circle,
            rgba(118, 185, 0, 0.12) 1px,
            transparent 1px
          );
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* ── corner squares ───────────────────────────────────────────────── */
        .auth-cs-tl {
          position: absolute;
          top: 0;
          left: 0;
          width: 14px;
          height: 14px;
          background: var(--color-primary);
          z-index: 1;
        }
        .auth-cs-br {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 14px;
          height: 14px;
          background: var(--color-primary);
          z-index: 1;
        }

        /* ── spine ────────────────────────────────────────────────────────── */
        .auth-spine {
          position: absolute;
          top: 0;
          left: calc(50% - ${SPINE / 2}px);
          width: ${SPINE}px;
          height: 100%;
          background: var(--color-surface-elevated);
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-left: 1px solid var(--color-hairline-strong);
          border-right: 1px solid var(--color-hairline-strong);
        }

        .auth-spine-line {
          width: 1px;
          flex: 1;
          background: var(--color-hairline-strong);
        }

        .auth-spine-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          border: none;
          background: transparent;
          padding: 16px 0;
        }

        .auth-spine-arrow {
          width: 36px;
          height: 36px;
          border-radius: 2px;
          background: var(--color-primary);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          transition: background 80ms linear;
        }
        .auth-spine-btn:hover .auth-spine-arrow {
          background: var(--color-primary-dark);
        }

        .auth-spine-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-on-dark-mute);
          writing-mode: vertical-rl;
        }

        /* ── form panel ───────────────────────────────────────────────────── */
        .auth-form-panel {
          position: absolute;
          top: 0;
          right: 0;
          width: calc(50% - ${SPINE / 2}px);
          height: 100%;
          background: var(--color-canvas);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: ${EASE};
        }

        /* ── switching spinner overlay ────────────────────────────────────── */
        .auth-spinner-overlay {
          position: absolute;
          inset: 0;
          background: var(--color-canvas);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          opacity: 0;
          pointer-events: none;
          transition: opacity 120ms ease;
        }
        .auth-spinner-overlay.is-active {
          opacity: 1;
          pointer-events: auto;
        }
        .auth-spinner {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 2px solid var(--color-hairline);
          border-top-color: var(--color-primary);
          animation: auth-spin 0.55s linear infinite;
        }
        @keyframes auth-spin {
          to { transform: rotate(360deg); }
        }

        .auth-form-inner {
          width: 100%;
          max-width: 380px;
          padding: 0 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ── brand on dark panel ──────────────────────────────────────────── */
        .auth-brand-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 4px;
        }

        .auth-brand-name {
          font-size: 32px;
          font-weight: 700;
          line-height: 1.15;
          color: var(--color-on-dark);
          margin: 0 0 16px 0;
        }

        .auth-brand-desc {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.65;
          color: var(--color-on-dark-mute);
          margin: 0;
          max-width: 320px;
        }

        .auth-feature-list {
          list-style: none;
          padding: 0;
          margin: 24px 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .auth-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 400;
          color: var(--color-on-dark-mute);
        }

        .auth-feature-dot {
          width: 6px;
          height: 6px;
          background: var(--color-primary);
          border-radius: 0;
          flex-shrink: 0;
        }

        /* ── form heading ─────────────────────────────────────────────────── */
        .auth-form-heading {
          font-size: 32px;
          font-weight: 700;
          line-height: 1.2;
          color: var(--color-ink);
          margin: 0;
        }

        .auth-form-sub {
          font-size: 14px;
          color: var(--color-mute);
          margin: 2px 0 0 0;
        }

        /* ── error ────────────────────────────────────────────────────────── */
        .auth-error {
          font-size: 13px;
          color: var(--color-error);
          padding: 10px 12px;
          background: rgba(229, 32, 32, 0.06);
          border-left: 2px solid var(--color-error);
          border-radius: 0;
        }

        /* ── submit button override ───────────────────────────────────────── */
        .auth-submit {
          width: 100%;
          height: 44px;
          background: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: 2px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 80ms linear;
          margin-top: 4px;
        }
        .auth-submit:hover:not(:disabled) {
          background: var(--color-primary-dark);
        }
        .auth-submit:disabled {
          background: var(--color-surface-soft);
          color: var(--color-ash);
          cursor: not-allowed;
        }

        /* ── form content fade when mode changes ──────────────────────────── */
        .auth-form-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ── school select ────────────────────────────────────────────────── */
        .auth-select {
          box-sizing: border-box;
          height: 44px;
          width: 100%;
          padding: 0 36px 0 12px;
          font-size: 14px;
          font-family: inherit;
          color: var(--color-ink);
          background-color: var(--color-canvas);
          border: var(--border-hairline);
          border-radius: 2px;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
        }
        .auth-select:focus {
          outline: none;
          border: var(--border-primary-2);
          padding: 0 35px 0 11px;
        }

        /* ── student-card upload ──────────────────────────────────────────── */
        .auth-upload-drop {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          width: 100%;
          padding: 20px 12px;
          background: var(--color-canvas);
          border: 1px dashed var(--color-hairline-strong);
          border-radius: 2px;
          cursor: pointer;
          font-size: 13px;
          color: var(--color-mute);
          transition: border-color 80ms linear, background 80ms linear;
        }
        .auth-upload-drop:hover {
          border-color: var(--color-primary);
          background: rgba(118, 185, 0, 0.04);
        }
        .auth-upload-plus {
          font-size: 22px;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1;
        }
        .auth-upload-hint {
          font-size: 11px;
          color: var(--color-ash);
        }
        .auth-upload-preview {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px;
          border: 1px solid var(--color-hairline-strong);
          border-radius: 2px;
          background: var(--color-canvas);
        }
        .auth-upload-preview img {
          width: 100%;
          max-height: 180px;
          object-fit: contain;
          border-radius: 2px;
          background: var(--color-surface-soft);
        }
        .auth-upload-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .auth-upload-name {
          font-size: 12px;
          color: var(--color-mute);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .auth-upload-remove {
          flex-shrink: 0;
          background: none;
          border: none;
          padding: 0;
          font-size: 12px;
          font-weight: 700;
          color: var(--color-error);
          cursor: pointer;
        }

        /* ── responsive ───────────────────────────────────────────────────── */
        @media (max-width: 768px) {
          .auth-dark { display: none; }
          .auth-spine { display: none; }
          .auth-form-panel {
            width: 100% !important;
            transform: none !important;
          }
        }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/auth/page.tsx",
                lineNumber: 411,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-root",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth-dark",
                        style: {
                            transform: darkTransform
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "auth-cs-tl"
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/page.tsx",
                                lineNumber: 804,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "auth-cs-br"
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/page.tsx",
                                lineNumber: 805,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative",
                                    zIndex: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "auth-brand-tag",
                                        children: "SWP SE1907"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth/page.tsx",
                                        lineNumber: 808,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "auth-brand-name",
                                        children: [
                                            "HACKATHON",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 811,
                                                columnNumber: 15
                                            }, this),
                                            "FPT UNIVERSITY"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth/page.tsx",
                                        lineNumber: 809,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "auth-brand-desc",
                                        children: "Nền tảng quản lý cuộc thi hackathon"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth/page.tsx",
                                        lineNumber: 814,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "auth-feature-list",
                                        children: [
                                            "Quản lý cuộc thi",
                                            "Theo dõi tiến độ theo thời gian thực",
                                            "Giao diện trực quan, dễ sử dụng",
                                            "Tối ưu trải nghiệm thi đấu"
                                        ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "auth-feature-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "auth-feature-dot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth/page.tsx",
                                                        lineNumber: 826,
                                                        columnNumber: 19
                                                    }, this),
                                                    f
                                                ]
                                            }, f, true, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 825,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth/page.tsx",
                                        lineNumber: 818,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auth/page.tsx",
                                lineNumber: 807,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth/page.tsx",
                        lineNumber: 803,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth-spine",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "auth-spine-line"
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/page.tsx",
                                lineNumber: 836,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "auth-spine-btn",
                                onClick: switchMode,
                                "aria-label": isRegister ? "Chuyển sang đăng nhập" : "Chuyển sang đăng ký",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "auth-spine-arrow",
                                        children: isRegister ? "«" : "»"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth/page.tsx",
                                        lineNumber: 843,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "auth-spine-label",
                                        children: isRegister ? "Đăng nhập" : "Đăng kí"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth/page.tsx",
                                        lineNumber: 846,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auth/page.tsx",
                                lineNumber: 838,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "auth-spine-line"
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/page.tsx",
                                lineNumber: 851,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth/page.tsx",
                        lineNumber: 835,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth-form-panel",
                        style: {
                            transform: formTransform
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `auth-spinner-overlay${isSwitching ? " is-active" : ""}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "auth-spinner"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/auth/page.tsx",
                                    lineNumber: 858,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth/page.tsx",
                                lineNumber: 857,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "auth-form-inner",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "auth-form-heading",
                                                children: isRegister ? "Đăng ký" : "Đăng nhập"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 864,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "auth-form-sub",
                                                children: isRegister ? "Tạo tài khoản mới để bắt đầu" : "Chào mừng trở lại"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 867,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth/page.tsx",
                                        lineNumber: 863,
                                        columnNumber: 13
                                    }, this),
                                    (clientError || serverError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "auth-error",
                                        children: clientError || serverError
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth/page.tsx",
                                        lineNumber: 876,
                                        columnNumber: 15
                                    }, this),
                                    successMessage && !clientError && !serverError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "auth-error",
                                        style: {
                                            color: "var(--color-successDeep, #3f8500)",
                                            background: "rgba(118, 185, 0, 0.08)",
                                            borderLeftColor: "var(--color-primary)"
                                        },
                                        children: successMessage
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth/page.tsx",
                                        lineNumber: 879,
                                        columnNumber: 15
                                    }, this),
                                    !isRegister && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        className: "auth-form-content",
                                        onSubmit: handleLogin,
                                        noValidate: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Email",
                                                type: "email",
                                                value: loginForm.email,
                                                onChange: (e)=>setLoginForm((f)=>({
                                                            ...f,
                                                            email: e.target.value
                                                        })),
                                                placeholder: "ten@email.com",
                                                autoComplete: "email"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 898,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Mật khẩu",
                                                type: "password",
                                                value: loginForm.password,
                                                onChange: (e)=>setLoginForm((f)=>({
                                                            ...f,
                                                            password: e.target.value
                                                        })),
                                                placeholder: "••••••••",
                                                autoComplete: "current-password"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 908,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    marginTop: -8
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "/auth/forgot-password",
                                                    style: {
                                                        fontSize: 13,
                                                        color: "var(--color-primary)",
                                                        textDecoration: "none"
                                                    },
                                                    children: "Quên mật khẩu?"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/auth/page.tsx",
                                                    lineNumber: 926,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 919,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "auth-submit",
                                                disabled: isPending,
                                                children: loginMutation.isPending ? "Đang đăng nhập…" : "Đăng nhập"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 938,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth/page.tsx",
                                        lineNumber: 893,
                                        columnNumber: 15
                                    }, this),
                                    isRegister && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        className: "auth-form-content",
                                        onSubmit: handleRegister,
                                        noValidate: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Họ và tên",
                                                value: registerForm.fullName,
                                                onChange: (e)=>setRegisterForm((f)=>({
                                                            ...f,
                                                            fullName: e.target.value
                                                        })),
                                                placeholder: "Nguyễn Văn A",
                                                autoComplete: "name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 955,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Email",
                                                type: "email",
                                                value: registerForm.email,
                                                onChange: (e)=>setRegisterForm((f)=>({
                                                            ...f,
                                                            email: e.target.value
                                                        })),
                                                placeholder: "ten@email.com",
                                                autoComplete: "email"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 964,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SchoolSelect, {
                                                value: registerForm.schoolId,
                                                onChange: handleSchoolChange,
                                                schools: schools,
                                                isLoading: schoolsQuery.isLoading,
                                                isError: schoolsQuery.isError,
                                                isEmpty: !schoolsQuery.isLoading && !schoolsQuery.isError && schools.length === 0,
                                                onRetry: ()=>schoolsQuery.refetch()
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 976,
                                                columnNumber: 17
                                            }, this),
                                            registerForm.schoolId !== "" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: isFptSchool ? "Mã số sinh viên (FPT)" : "Mã số sinh viên (tùy chọn)",
                                                value: registerForm.studentCode,
                                                onChange: (e)=>setRegisterForm((f)=>({
                                                            ...f,
                                                            studentCode: e.target.value
                                                        })),
                                                placeholder: "VD: SE123456"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 992,
                                                columnNumber: 19
                                            }, this),
                                            needsCard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CardUpload, {
                                                preview: cardImage?.preview ?? null,
                                                fileName: cardImage?.name ?? null,
                                                onSelect: handleCardSelect,
                                                onClear: ()=>setCardImage(null)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 1011,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Mật khẩu",
                                                type: "password",
                                                value: registerForm.password,
                                                onChange: (e)=>setRegisterForm((f)=>({
                                                            ...f,
                                                            password: e.target.value
                                                        })),
                                                placeholder: "Tối thiểu 8 ký tự",
                                                autoComplete: "new-password"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 1019,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                label: "Xác nhận mật khẩu",
                                                type: "password",
                                                value: registerForm.confirmPassword,
                                                onChange: (e)=>setRegisterForm((f)=>({
                                                            ...f,
                                                            confirmPassword: e.target.value
                                                        })),
                                                placeholder: "Nhập lại mật khẩu",
                                                autoComplete: "new-password"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 1032,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "auth-submit",
                                                disabled: isPending,
                                                children: registerMutation.isPending ? "Đang đăng ký…" : "Tạo tài khoản"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 1046,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth/page.tsx",
                                        lineNumber: 950,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            color: "var(--color-mute)",
                                            textAlign: "center",
                                            display: "none"
                                        },
                                        className: "mobile-switch",
                                        children: [
                                            isRegister ? "Đã có tài khoản? " : "Chưa có tài khoản? ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: switchMode,
                                                style: {
                                                    background: "none",
                                                    border: "none",
                                                    color: "var(--color-primary)",
                                                    cursor: "pointer",
                                                    fontWeight: 700,
                                                    padding: 0,
                                                    fontSize: "inherit"
                                                },
                                                children: isRegister ? "Đăng nhập" : "Đăng ký"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth/page.tsx",
                                                lineNumber: 1067,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth/page.tsx",
                                        lineNumber: 1057,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auth/page.tsx",
                                lineNumber: 861,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth/page.tsx",
                        lineNumber: 855,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/auth/page.tsx",
                lineNumber: 801,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @media (max-width: 768px) {
          .mobile-switch { display: block !important; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/src/app/auth/page.tsx",
                lineNumber: 1087,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=src_31abaf6b._.js.map