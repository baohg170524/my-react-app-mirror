(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/providers/QueryProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryProvider",
    ()=>QueryProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function QueryProvider(param) {
    let { children } = param;
    _s();
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "QueryProvider.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
                defaultOptions: {
                    queries: {
                        staleTime: 60_000,
                        retry: 1,
                        refetchOnWindowFocus: false
                    },
                    mutations: {
                        retry: 0
                    }
                }
            })
    }["QueryProvider.useState"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/providers/QueryProvider.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(QueryProvider, "jAYk1TlFA5RoNlMRUK+oi5Kmr20=");
_c = QueryProvider;
var _c;
__turbopack_context__.k.register(_c, "QueryProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
var _process_env_NEXT_PUBLIC_API_URL;
const BASE_URL = (_process_env_NEXT_PUBLIC_API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL) !== null && _process_env_NEXT_PUBLIC_API_URL !== void 0 ? _process_env_NEXT_PUBLIC_API_URL : "https://api.sealswp391.xyz/api";
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: BASE_URL,
    timeout: 15_000,
    headers: {
        "Content-Type": "application/json"
    }
});
// ─── Request: attach access token ─────────────────────────────────────────────
apiClient.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = "Bearer ".concat(token);
        }
    }
    return config;
}, (error)=>Promise.reject(error));
function isAuthRoute(url) {
    if (!url) return false;
    return /\/auth\//i.test(url);
}
// ─── Response: unwrap BaseResponse envelope, handle 401 ───────────────────────
apiClient.interceptors.response.use((response)=>{
    const env = response.data;
    // Tolerate non-enveloped responses (defensive).
    if (env && typeof env === "object" && "success" in env && "data" in env) {
        if (!env.success) {
            var _env_message, _env_statusCode;
            const err = {
                message: (_env_message = env.message) !== null && _env_message !== void 0 ? _env_message : "Request failed",
                statusCode: (_env_statusCode = env.statusCode) !== null && _env_statusCode !== void 0 ? _env_statusCode : response.status
            };
            var _env_statusCode1;
            return Promise.reject({
                response: {
                    status: (_env_statusCode1 = env.statusCode) !== null && _env_statusCode1 !== void 0 ? _env_statusCode1 : response.status,
                    data: err
                },
                message: err.message
            });
        }
        return {
            ...response,
            data: env.data
        };
    }
    return response;
}, (error)=>{
    var _error_response, _error_response1, _error_config;
    // Normalise enveloped error bodies → ApiError shape.
    const body = (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.data;
    if (body && typeof body === "object" && "success" in body) {
        const env = body;
        error.response.data = {
            message: env.message,
            statusCode: env.statusCode
        };
    }
    if (((_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.status) === 401 && "object" !== "undefined" && !isAuthRoute((_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url)) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth";
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = apiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/api/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authApi",
    ()=>authApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/client.ts [app-client] (ecmascript)");
;
const authApi = {
    login: async (payload)=>{
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/Auth/login", payload);
        return data;
    },
    /** Backend register returns the created user — NOT auth tokens. */ register: async (payload)=>{
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/Auth/register", payload);
        return data;
    },
    logout: async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/Auth/logout");
    },
    refreshToken: async (refreshToken)=>{
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/Auth/refresh-token", {
            refreshToken
        });
        return data;
    },
    verifyEmail: async (token)=>{
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/Auth/verify-email", {
            params: {
                token
            }
        });
        return data;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/AuthContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * AuthContext — cầu nối giữa SU26 auth system và scoring-v2 role system.
 *
 * SU26's useLogin (hooks/useAuth.ts) lưu UserProfile vào localStorage:
 *   { id, email, fullName, role: "ADMIN" | "STUDENT" | "MENTOR" }
 *
 * Context này đọc localStorage và map sang role string của scoring-v2:
 *   "ADMIN"   → 'admin'
 *   "STUDENT" → 'team'
 *   "MENTOR"  → 'judge'
 *
 * Cũng hỗ trợ raw LoginResponse format ({ isAdmin, isStudent }) để
 * AuthContext.login() vẫn dùng được nếu cần.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthProvider(param) {
    let { children } = param;
    _s();
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Khôi phục session từ localStorage khi app khởi động.
    // SU26's useLogin đã lưu UserProfile → deriveRole đọc được.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            try {
                const raw = localStorage.getItem('currentUser');
                const token = localStorage.getItem('accessToken');
                if (raw && token) {
                    const user = JSON.parse(raw);
                    setRole(deriveRole(user));
                    var _user_userId, _ref;
                    setUserId((_ref = (_user_userId = user.userId) !== null && _user_userId !== void 0 ? _user_userId : user.id) !== null && _ref !== void 0 ? _ref : null);
                }
            } catch (e) {} finally{
                setLoading(false);
            }
        }
    }["AuthProvider.useEffect"], []);
    // Đăng nhập qua authApi — lưu UserProfile (cùng format với SU26's useLogin)
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[login]": async (email, password)=>{
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].login({
                email,
                password
            });
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            // Lưu ở format UserProfile (nhất quán với SU26's useLogin hook)
            const profile = {
                id: data.userId,
                email: data.email,
                fullName: data.fullName,
                role: data.isAdmin ? 'ADMIN' : data.isStudent ? 'STUDENT' : 'MENTOR'
            };
            localStorage.setItem('currentUser', JSON.stringify(profile));
            const r = deriveRole(profile);
            setRole(r);
            setUserId(data.userId);
            return r;
        }
    }["AuthProvider.useCallback[login]"], []);
    // Đăng nhập demo (dùng khi phát triển, không cần server)
    const loginDemo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[loginDemo]": (r)=>{
            setRole(r);
            setUserId("demo-".concat(r));
        }
    }["AuthProvider.useCallback[loginDemo]"], []);
    // Đăng xuất — xóa localStorage, SU26's useLogout cũng làm điều tương tự
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": async ()=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].logout();
            } catch (e) {}
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('currentUser');
            setRole(null);
            setUserId(null);
        }
    }["AuthProvider.useCallback[logout]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            role,
            userId,
            loading,
            login,
            loginDemo,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.jsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "bWBbcXE4x24ak8Ccua+eRSHSUg4=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
};
_s1(useAuth, "/dMy7t63NXD4eYACoT93CePwGrg=");
// Map user object → role string dùng trong scoring-v2
// Xử lý cả 2 format:
//   UserProfile (SU26 useLogin):   { role: "ADMIN" | "STUDENT" | "MENTOR" }
//   LoginResponse (AuthContext.login): { isAdmin: bool, isStudent: bool }
const deriveRole = (user)=>{
    if ((user === null || user === void 0 ? void 0 : user.role) === 'ADMIN' || (user === null || user === void 0 ? void 0 : user.isAdmin)) return 'admin';
    if ((user === null || user === void 0 ? void 0 : user.role) === 'STUDENT' || (user === null || user === void 0 ? void 0 : user.isStudent)) return 'team';
    if ((user === null || user === void 0 ? void 0 : user.role) === 'MENTOR') return 'judge';
    return 'judge';
};
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_38eabd81._.js.map