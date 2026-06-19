(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/services/api/schools.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "schoolsApi",
    ()=>schoolsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/client.ts [app-client] (ecmascript)");
;
var _process_env_NEXT_PUBLIC_SCHOOLS_API_URL;
/**
 * School list is served by the deployed API (not the local backend).
 * Absolute URL overrides apiClient's baseURL for this request only.
 */ const SCHOOLS_URL = (_process_env_NEXT_PUBLIC_SCHOOLS_API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SCHOOLS_API_URL) !== null && _process_env_NEXT_PUBLIC_SCHOOLS_API_URL !== void 0 ? _process_env_NEXT_PUBLIC_SCHOOLS_API_URL : "https://api.sealswp391.xyz/api/Schools";
const schoolsApi = {
    list: async function() {
        let pageSize = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100, pageNumber = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(SCHOOLS_URL, {
            params: {
                PageNumber: pageNumber,
                PageSize: pageSize
            }
        });
        return data;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/api/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$schools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/schools.ts [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/services/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/auth.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
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
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}
function hasToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return !!localStorage.getItem("accessToken");
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
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: AUTH_KEYS.me,
        queryFn: {
            "useCurrentUser.useQuery": async ()=>readPersistedUser()
        }["useCurrentUser.useQuery"],
        enabled: hasToken(),
        staleTime: Infinity,
        retry: false
    });
}
_s(useCurrentUser, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useIsAuthenticated() {
    _s1();
    const { data } = useCurrentUser();
    return !!data;
}
_s1(useIsAuthenticated, "f6tqn24vfBJlNRKVJlk4Giv1nB0=", false, function() {
    return [
        useCurrentUser
    ];
});
function useLogin() {
    _s2();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLogin.useMutation": (payload)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].login(payload)
        }["useLogin.useMutation"],
        onSuccess: {
            "useLogin.useMutation": (data)=>{
                persistTokens(data.accessToken, data.refreshToken);
                const profile = loginResponseToProfile(data);
                persistUser(profile);
                queryClient.setQueryData(AUTH_KEYS.me, profile);
                // replace (not push) so Back doesn't return to the login screen
                router.replace("/");
            }
        }["useLogin.useMutation"]
    });
}
_s2(useLogin, "OMPBWmuGqcicNpy0gW6DnCxqRr0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useRegister() {
    _s3();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useRegister.useMutation": (payload)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].register(payload)
        }["useRegister.useMutation"]
    });
}
_s3(useRegister, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useLogout() {
    _s4();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].logout,
        onSuccess: {
            "useLogout.useMutation": ()=>{
                clearTokens();
                queryClient.clear();
                router.push("/auth");
            }
        }["useLogout.useMutation"],
        onError: {
            "useLogout.useMutation": ()=>{
                clearTokens();
                queryClient.clear();
                router.push("/auth");
            }
        }["useLogout.useMutation"]
    });
}
_s4(useLogout, "OMPBWmuGqcicNpy0gW6DnCxqRr0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const ADMIN_LINKS = [
    {
        label: "Sự kiện",
        href: "/"
    },
    {
        label: "Tiêu chí",
        href: "/criteria"
    },
    {
        label: "Chấm điểm",
        href: "/scoring"
    },
    {
        label: "Xếp hạng",
        href: "/leaderboard"
    },
    {
        label: "Bài nộp",
        href: "/submission"
    },
    {
        label: "Phúc khảo",
        href: "/appeals"
    },
    {
        label: "Phê duyệt",
        href: "/approval"
    }
];
const MENTOR_LINKS = [
    {
        label: "Sự kiện",
        href: "/"
    },
    {
        label: "Chấm điểm",
        href: "/scoring"
    },
    {
        label: "Xếp hạng",
        href: "/leaderboard"
    },
    {
        label: "Bài nộp",
        href: "/submission"
    },
    {
        label: "Phúc khảo",
        href: "/appeals"
    }
];
const STUDENT_LINKS = [
    {
        label: "Sự kiện",
        href: "/"
    },
    {
        label: "Xếp hạng",
        href: "/team-ranking"
    },
    {
        label: "Nộp bài",
        href: "/submit-project"
    },
    {
        label: "Phúc khảo",
        href: "/team-appeal"
    },
    {
        label: "Đăng ký",
        href: "/dang-ky"
    }
];
const GUEST_LINKS = [
    {
        label: "Sự kiện",
        href: "/"
    }
];
function Navbar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsAuthenticated"])();
    const { data: user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrentUser"])();
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLogout"])();
    // Focus main on route change for keyboard/a11y
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const main = document.querySelector("main");
            if (main) main.focus();
        }
    }["Navbar.useEffect"], [
        pathname
    ]);
    const links = !isAuthenticated ? GUEST_LINKS : (user === null || user === void 0 ? void 0 : user.role) === "ADMIN" ? ADMIN_LINKS : (user === null || user === void 0 ? void 0 : user.role) === "MENTOR" ? MENTOR_LINKS : (user === null || user === void 0 ? void 0 : user.role) === "STUDENT" ? STUDENT_LINKS : GUEST_LINKS;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "primary-nav sticky-chrome",
            style: {
                position: "sticky",
                top: 0,
                zIndex: 30
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "primary-nav__brand",
                    style: {
                        fontSize: "var(--fs-heading-sm)",
                        textDecoration: "none"
                    },
                    children: [
                        "SWP",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: "var(--color-primary)"
                            },
                            children: "·"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 70,
                            columnNumber: 14
                        }, this),
                        "SE1907"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "primary-nav__links",
                    children: links.map((param)=>{
                        let { label, href } = param;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: href,
                                style: {
                                    color: pathname === href ? "var(--color-primary)" : "var(--color-on-dark)",
                                    fontWeight: pathname === href ? 700 : 400,
                                    fontSize: "var(--fs-body-md)",
                                    textDecoration: "none"
                                },
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, this)
                        }, href, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "primary-nav__cluster",
                    children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 12
                        },
                        children: [
                            (user === null || user === void 0 ? void 0 : user.fullName) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: "var(--fs-body-sm)",
                                    color: "var(--color-on-dark-mute)"
                                },
                                children: user.fullName
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 98,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>logout.mutate(),
                                disabled: logout.isPending,
                                className: "btn btn-outline-on-dark btn-sm",
                                children: logout.isPending ? "Đang đăng xuất…" : "Đăng xuất"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 107,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 96,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/auth",
                        className: "btn btn-outline-on-dark btn-sm",
                        children: "Đăng nhập"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 117,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Navbar.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_s(Navbar, "GSrpqDfcRF7Jj9jig+0Oby/+Mck=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsAuthenticated"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrentUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLogout"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/api/client.ts [app-client] (ecmascript) <export default as apiClient>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api/client.ts [app-client] (ecmascript)");
}),
"[project]/src/features/user/api/user.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "userApi",
    ()=>userApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/services/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__apiClient$3e$__ = __turbopack_context__.i("[project]/src/services/api/client.ts [app-client] (ecmascript) <export default as apiClient>");
;
const userApi = {
    getProfile: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__apiClient$3e$__["apiClient"].get("/users/me/profile").then((r)=>r.data),
    getProjectSummary: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__apiClient$3e$__["apiClient"].get("/users/me/project-summary").then((r)=>r.data)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/user/mocks/user.mock.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_USER_PROFILE",
    ()=>MOCK_USER_PROFILE
]);
const MOCK_USER_PROFILE = {
    id: "user-001",
    email: "nguyen.van.a@fpt.edu.vn",
    fullName: "Nguyễn Văn A",
    role: "STUDENT",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=NVA&backgroundColor=76b900&fontColor=ffffff",
    createdAt: "2026-01-15T08:00:00.000Z",
    stats: {
        eventsJoined: 12,
        projectScore: 78,
        rank: 4
    },
    announcement: {
        id: "ann-001",
        text: "🎓 Kỳ nộp báo cáo cuối kỳ SU26 kết thúc vào 20/07/2026. Vui lòng hoàn thành trước hạn.",
        ctaLabel: "Xem chi tiết",
        ctaUrl: "/announcements/ann-001"
    },
    projectSummary: {
        semesterName: "Summer 2026",
        projectName: "EduConnect Platform",
        completionPct: 65,
        teamSize: 5
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/user/hooks/useUserProfile.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUserProfile",
    ()=>useUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$user$2f$api$2f$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/user/api/user.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$user$2f$mocks$2f$user$2e$mock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/user/mocks/user.mock.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const USE_MOCK = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_USE_MOCK === "true";
const USER_STORAGE_KEY = "currentUser";
/** Profile captured at login (the backend exposes no /users/me endpoint). */ function readPersistedUser() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}
function useUserProfile() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "user",
            "profile"
        ],
        queryFn: {
            "useUserProfile.useQuery": async ()=>{
                if (USE_MOCK) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$user$2f$mocks$2f$user$2e$mock$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_USER_PROFILE"];
                // The backend has no /users/me/profile endpoint — use the profile saved
                // at login. Only fall back to the API if nothing was persisted.
                const persisted = readPersistedUser();
                if (persisted) return persisted;
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$user$2f$api$2f$user$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userApi"].getProfile();
            }
        }["useUserProfile.useQuery"],
        staleTime: 5 * 60_000,
        retry: 1
    });
}
_s(useUserProfile, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/user/components/UserProfileHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserProfileHeader",
    ()=>UserProfileHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$user$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/user/hooks/useUserProfile.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function InitialsFallback(param) {
    let { name, size = 48 } = param;
    const initials = name.split(" ").map((w)=>w[0]).slice(0, 2).join("").toUpperCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: size,
            height: size,
            borderRadius: "var(--radius-full)",
            background: "var(--color-primary)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size * 0.35,
            fontWeight: 700,
            flexShrink: 0
        },
        "aria-hidden": "true",
        children: initials
    }, void 0, false, {
        fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = InitialsFallback;
function SkeletonPulse(param) {
    let { w, h } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: w,
            height: h,
            background: "var(--color-surface-elevated)",
            borderRadius: "var(--radius-sm)",
            animation: "pulse 1.4s ease-in-out infinite"
        }
    }, void 0, false, {
        fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c1 = SkeletonPulse;
const ROLE_LABEL = {
    STUDENT: "Sinh viên",
    MENTOR: "Mentor",
    ADMIN: "Quản trị viên"
};
function UserProfileHeader() {
    _s();
    const { data: profile, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$user$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const [avatarError, setAvatarError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    var _profile_fullName, _ROLE_LABEL_profile_role;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: '\n        @keyframes pulse {\n          0%, 100% { opacity: 1; }\n          50%       { opacity: 0.4; }\n        }\n        .profile-header {\n          position: relative;\n          background: var(--color-surface-dark);\n          overflow: hidden;\n          padding: 36px 48px;\n        }\n        .profile-header::before {\n          content: "";\n          position: absolute;\n          inset: 0;\n          background-image: radial-gradient(circle, rgba(118,185,0,0.1) 1px, transparent 1px);\n          background-size: 24px 24px;\n          pointer-events: none;\n        }\n        .profile-cs { position: absolute; width: 12px; height: 12px; background: var(--color-primary); }\n        .profile-cs-tl { top: 0; left: 0; }\n        .profile-cs-br { bottom: 0; right: 0; }\n        .stat-block {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          gap: 2px;\n          padding: 0 24px;\n          border-left: 1px solid var(--color-hairline-strong);\n        }\n        .stat-value { font-size: var(--fs-display-lg); font-weight: 700; color: var(--color-primary); line-height: 1; }\n        .stat-label { font-size: var(--fs-utility-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-on-dark-mute); }\n      '
            }, void 0, false, {
                fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "profile-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "profile-cs profile-cs-tl"
                    }, void 0, false, {
                        fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "profile-cs profile-cs-br"
                    }, void 0, false, {
                        fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            zIndex: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 24
                        },
                        children: [
                            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 64,
                                    height: 64,
                                    borderRadius: "var(--radius-full)",
                                    background: "var(--color-surface-elevated)",
                                    flexShrink: 0,
                                    animation: "pulse 1.4s ease-in-out infinite"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this) : profile && !avatarError && profile.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: profile.avatar,
                                alt: profile.fullName,
                                width: 64,
                                height: 64,
                                loading: "lazy",
                                onError: ()=>setAvatarError(true),
                                style: {
                                    borderRadius: "var(--radius-full)",
                                    border: "2px solid var(--color-primary)",
                                    flexShrink: 0,
                                    objectFit: "cover"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InitialsFallback, {
                                name: (_profile_fullName = profile === null || profile === void 0 ? void 0 : profile.fullName) !== null && _profile_fullName !== void 0 ? _profile_fullName : "?",
                                size: 64
                            }, void 0, false, {
                                fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1
                                },
                                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonPulse, {
                                            w: "180px",
                                            h: 24
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                                            lineNumber: 121,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonPulse, {
                                            w: "80px",
                                            h: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                                            lineNumber: 122,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--color-error)",
                                        fontSize: "var(--fs-body-sm)"
                                    },
                                    children: "Không thể tải thông tin người dùng."
                                }, void 0, false, {
                                    fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this) : profile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: {
                                                margin: 0,
                                                fontSize: "var(--fs-heading-xl)",
                                                fontWeight: 700,
                                                color: "var(--color-on-dark)",
                                                lineHeight: 1.2
                                            },
                                            children: profile.fullName
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                                            lineNumber: 128,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "badge-tag",
                                            "aria-label": profile.role,
                                            style: {
                                                marginTop: 6,
                                                display: "inline-block",
                                                background: "rgba(118,185,0,0.15)",
                                                color: "var(--color-primary)",
                                                border: "1px solid var(--color-primary)"
                                            },
                                            children: (_ROLE_LABEL_profile_role = ROLE_LABEL[profile.role]) !== null && _ROLE_LABEL_profile_role !== void 0 ? _ROLE_LABEL_profile_role : profile.role
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                                            lineNumber: 131,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : null
                            }, void 0, false, {
                                fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/user/components/UserProfileHeader.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(UserProfileHeader, "I6uz3n7pxL/a6d49TeOLhp2Z7GM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$user$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"]
    ];
});
_c2 = UserProfileHeader;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "InitialsFallback");
__turbopack_context__.k.register(_c1, "SkeletonPulse");
__turbopack_context__.k.register(_c2, "UserProfileHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/user/components/AnnouncementBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnnouncementBanner",
    ()=>AnnouncementBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$user$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/user/hooks/useUserProfile.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AnnouncementBanner() {
    _s();
    const { data: profile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$user$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"])();
    const ann = profile === null || profile === void 0 ? void 0 : profile.announcement;
    const [manuallyDismissed, setManuallyDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const storageKey = ann ? "dismissed-announcement-".concat(ann.id) : null;
    const storedDismissed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])({
        "AnnouncementBanner.useSyncExternalStore[storedDismissed]": ()=>({
                "AnnouncementBanner.useSyncExternalStore[storedDismissed]": ()=>{}
            })["AnnouncementBanner.useSyncExternalStore[storedDismissed]"]
    }["AnnouncementBanner.useSyncExternalStore[storedDismissed]"], {
        "AnnouncementBanner.useSyncExternalStore[storedDismissed]": ()=>storageKey ? localStorage.getItem(storageKey) === "true" : false
    }["AnnouncementBanner.useSyncExternalStore[storedDismissed]"], {
        "AnnouncementBanner.useSyncExternalStore[storedDismissed]": ()=>false
    }["AnnouncementBanner.useSyncExternalStore[storedDismissed]"]);
    if (!ann || manuallyDismissed || storedDismissed) return null;
    function dismiss() {
        localStorage.setItem(storageKey, "true");
        setManuallyDismissed(true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "banner",
        style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 48px",
            background: "rgba(118,185,0,0.06)",
            borderLeft: "3px solid var(--color-primary)",
            borderBottom: "var(--border-hairline)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 6,
                    height: 6,
                    background: "var(--color-primary)",
                    flexShrink: 0
                }
            }, void 0, false, {
                fileName: "[project]/src/features/user/components/AnnouncementBanner.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    margin: 0,
                    flex: 1,
                    fontSize: "var(--fs-body-sm)",
                    color: "var(--color-body-text)",
                    lineHeight: "var(--lh-body)"
                },
                children: ann.text
            }, void 0, false, {
                fileName: "[project]/src/features/user/components/AnnouncementBanner.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            ann.ctaLabel && ann.ctaUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: ann.ctaUrl,
                style: {
                    fontSize: "var(--fs-caption-md)",
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    textDecoration: "none",
                    whiteSpace: "nowrap"
                },
                children: [
                    ann.ctaLabel,
                    " →"
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/user/components/AnnouncementBanner.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: dismiss,
                "aria-label": "Đóng thông báo",
                style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-mute)",
                    fontSize: 18,
                    lineHeight: 1,
                    padding: "4px 6px",
                    flexShrink: 0
                },
                children: "×"
            }, void 0, false, {
                fileName: "[project]/src/features/user/components/AnnouncementBanner.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/user/components/AnnouncementBanner.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(AnnouncementBanner, "xu5BLFp6jKpcSnHqYm+FOxh/mjw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$user$2f$hooks$2f$useUserProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserProfile"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
_c = AnnouncementBanner;
var _c;
__turbopack_context__.k.register(_c, "AnnouncementBanner");
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
"[project]/src/features/events/components/EventFilterTabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventFilterTabs",
    ()=>EventFilterTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const TABS = [
    {
        id: "all",
        label: "Tất cả"
    },
    {
        id: "my",
        label: "Của tôi"
    }
];
function EventFilterTabs(param) {
    let { active, onChange } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "tablist",
        "aria-label": "Lọc sự kiện",
        style: {
            display: "flex",
            gap: "var(--space-sm)"
        },
        children: TABS.map((param)=>{
            let { id, label } = param;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                role: "tab",
                id: "tab-".concat(id),
                "aria-selected": active === id,
                "aria-controls": "tabpanel-events",
                className: "pill-tab".concat(active === id ? " is-active" : ""),
                onClick: ()=>onChange(id),
                children: label
            }, id, false, {
                fileName: "[project]/src/features/events/components/EventFilterTabs.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/features/events/components/EventFilterTabs.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = EventFilterTabs;
var _c;
__turbopack_context__.k.register(_c, "EventFilterTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventCard",
    ()=>EventCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
"use client";
;
;
function formatDate(iso) {
    return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).format(new Date(iso));
}
function EventCard(param) {
    let { event, onJoin, isJoining, joinError } = param;
    const joinDisabled = event.status === "closed" || isJoining;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "card",
        style: {
            padding: "var(--space-xl)",
            gap: "var(--space-sm)",
            cursor: "default",
            position: "relative",
            minHeight: 200
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 10,
                    height: 10,
                    background: event.status === "open" ? "var(--color-primary)" : "var(--color-ash)"
                }
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventCard.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "flex-end"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "badge-tag",
                    style: {
                        background: event.status === "open" ? "rgba(118,185,0,0.1)" : "var(--color-surface-soft)",
                        color: event.status === "open" ? "var(--color-primary)" : "var(--color-stone)",
                        border: "1px solid ".concat(event.status === "open" ? "var(--color-primary)" : "var(--color-hairline)")
                    },
                    children: event.status === "open" ? "Mở" : "Đã đóng"
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventCard.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventCard.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/events/".concat(event.id),
                style: {
                    textDecoration: "none"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "card__title",
                    style: {
                        margin: 0,
                        color: "var(--color-ink)",
                        transition: "color 150ms"
                    },
                    onMouseEnter: (e)=>e.currentTarget.style.color = "var(--color-primary)",
                    onMouseLeave: (e)=>e.currentTarget.style.color = "var(--color-ink)",
                    children: event.title
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventCard.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventCard.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    margin: 0,
                    fontSize: "var(--fs-caption-md)",
                    color: "var(--color-mute)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: 12,
                        height: 12,
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: 2.5,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                x: "3",
                                y: "4",
                                width: "18",
                                height: "18",
                                rx: "2"
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventCard.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M16 2v4M8 2v4M3 10h18"
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/EventCard.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/events/components/EventCard.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    formatDate(event.startDate)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/EventCard.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-xs)",
                    flex: 1
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "badge-tag",
                    style: {
                        fontSize: "var(--fs-utility-xs)"
                    },
                    children: event.submissionType
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventCard.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventCard.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: "var(--space-sm)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn btn-primary btn-sm",
                        style: {
                            width: "100%",
                            minHeight: 44
                        },
                        disabled: joinDisabled,
                        onClick: ()=>onJoin(event.id),
                        "aria-label": "Tham gia: ".concat(event.title),
                        children: isJoining ? "Đang xử lý…" : "Tham gia"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventCard.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    joinError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: "6px 0 0",
                            fontSize: "var(--fs-caption-sm)",
                            color: "var(--color-error)"
                        },
                        children: joinError
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/EventCard.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/EventCard.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventCard.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = EventCard;
var _c;
__turbopack_context__.k.register(_c, "EventCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventGrid",
    ()=>EventGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventCard.tsx [app-client] (ecmascript)");
"use client";
;
;
function SkeletonCard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card",
        style: {
            minHeight: 200,
            gap: "var(--space-md)",
            padding: "var(--space-xl)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: "@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}"
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventGrid.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            [
                80,
                "100%",
                60,
                40
            ].map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: i === 1 ? 20 : 12,
                        width: w,
                        background: "var(--color-surface-soft)",
                        borderRadius: "var(--radius-sm)",
                        animation: "pulse 1.4s ease-in-out ".concat(i * 0.1, "s infinite")
                    }
                }, i, false, {
                    fileName: "[project]/src/features/events/components/EventGrid.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: "auto",
                    height: 44,
                    background: "var(--color-surface-soft)",
                    borderRadius: "var(--radius-sm)",
                    animation: "pulse 1.4s ease-in-out 0.4s infinite"
                }
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/EventGrid.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/EventGrid.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = SkeletonCard;
function EventGrid(param) {
    let { events, isLoading, joiningId, joinError, onJoin } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "tabpanel-events",
        role: "tabpanel",
        className: "grid-auto grid-3",
        style: {
            minHeight: 200
        },
        children: isLoading ? [
            1,
            2,
            3
        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SkeletonCard, {}, i, false, {
                fileName: "[project]/src/features/events/components/EventGrid.tsx",
                lineNumber: 47,
                columnNumber: 30
            }, this)) : events.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                gridColumn: "1 / -1",
                minHeight: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-mute)",
                fontSize: "var(--fs-body-sm)",
                border: "var(--border-hairline)",
                borderRadius: "var(--radius-sm)"
            },
            children: "Không có sự kiện nào."
        }, void 0, false, {
            fileName: "[project]/src/features/events/components/EventGrid.tsx",
            lineNumber: 49,
            columnNumber: 9
        }, this) : events.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventCard"], {
                event: event,
                onJoin: onJoin,
                isJoining: joiningId === event.id,
                joinError: joiningId === event.id ? joinError : null
            }, event.id, false, {
                fileName: "[project]/src/features/events/components/EventGrid.tsx",
                lineNumber: 66,
                columnNumber: 11
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/features/events/components/EventGrid.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c1 = EventGrid;
var _c, _c1;
__turbopack_context__.k.register(_c, "SkeletonCard");
__turbopack_context__.k.register(_c1, "EventGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/CreateEventForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateEventForm",
    ()=>CreateEventForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
// ─── Factories ────────────────────────────────────────────────────────────────
const emptyTrack = ()=>({
        trackName: "",
        description: "",
        templateId: "",
        submissionLinks: [],
        judgeUserIds: [],
        mentorUserIds: []
    });
const emptyRound = ()=>({
        roundName: "",
        roundNumber: "",
        startDate: "",
        endDate: "",
        advancementRule: "",
        tracks: [
            emptyTrack()
        ]
    });
const emptyEvent = ()=>({
        eventName: "",
        season: "",
        year: "",
        startDate: "",
        endDate: "",
        description: "",
        eventCoordinatorIds: [],
        rounds: [
            emptyRound()
        ]
    });
/** Submission link types offered as checkboxes per track. */ const SUBMISSION_LINK_OPTIONS = [
    {
        key: "github",
        label: "Link GitHub"
    },
    {
        key: "doc",
        label: "Link Doc"
    },
    {
        key: "other",
        label: "Link khác"
    }
];
// ─── Helpers ──────────────────────────────────────────────────────────────────
/** datetime-local value → ISO string (empty stays empty). */ function toIso(local) {
    if (!local) return "";
    const d = new Date(local);
    return Number.isNaN(d.getTime()) ? local : d.toISOString();
}
// ─── Small field primitives ───────────────────────────────────────────────────
function Field(param) {
    let { label, children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: 6
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "t-caption-xs",
                style: {
                    color: "var(--color-mute)"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_c = Field;
function TextField(param) {
    let { label, value, onChange, type = "text", placeholder } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
        label: label,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            className: "text-input",
            type: type,
            value: value,
            placeholder: placeholder,
            onChange: (e)=>onChange(e.target.value)
        }, void 0, false, {
            fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
            lineNumber: 121,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
_c1 = TextField;
function TextArea(param) {
    let { label, value, onChange, placeholder } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
        label: label,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
            className: "text-input",
            rows: 3,
            value: value,
            placeholder: placeholder,
            style: {
                height: "auto",
                resize: "vertical",
                fontFamily: "inherit"
            },
            onChange: (e)=>onChange(e.target.value)
        }, void 0, false, {
            fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
            lineNumber: 145,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
_c2 = TextArea;
function Checkbox(param) {
    let { label, checked, onChange } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "checkbox",
                checked: checked,
                onChange: (e)=>onChange(e.target.checked),
                style: {
                    width: 16,
                    height: 16,
                    accentColor: "var(--color-primary)"
                }
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "t-body-sm",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
_c3 = Checkbox;
/** Small muted helper line under a field. */ function Hint(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "t-caption-sm",
        style: {
            color: "var(--color-mute)",
            marginTop: -2
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
_c4 = Hint;
/** Add/remove multiple accounts as chips. Empty list is allowed (optional). */ function MultiTagInput(param) {
    let { label, values, onChange, placeholder, hint } = param;
    _s();
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const add = ()=>{
        const v = draft.trim();
        if (!v) return;
        if (!values.includes(v)) onChange([
            ...values,
            v
        ]);
        setDraft("");
    };
    const removeAt = (i)=>onChange(values.filter((_, idx)=>idx !== i));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: 6
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "t-caption-xs",
                style: {
                    color: "var(--color-mute)"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this),
            values.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6
                },
                children: values.map((v, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "4px 8px",
                            background: "var(--color-surface-soft)",
                            border: "var(--border-hairline)",
                            borderRadius: "var(--radius-sm)",
                            fontSize: "var(--fs-caption-sm)"
                        },
                        children: [
                            v,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>removeAt(i),
                                "aria-label": "Xóa ".concat(v),
                                style: {
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    lineHeight: 1,
                                    fontSize: 15,
                                    color: "var(--color-mute)",
                                    cursor: "pointer"
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                                lineNumber: 235,
                                columnNumber: 15
                            }, this)
                        ]
                    }, v, true, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 221,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 219,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: "var(--space-sm)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "text-input",
                        value: draft,
                        placeholder: placeholder,
                        onChange: (e)=>setDraft(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === "Enter") {
                                e.preventDefault();
                                add();
                            }
                        },
                        style: {
                            flex: 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn btn-outline btn-sm",
                        onClick: add,
                        style: {
                            cursor: "pointer",
                            flexShrink: 0
                        },
                        children: "Thêm"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Hint, {
                children: hint
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 280,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
}
_s(MultiTagInput, "gHCBSv/yb0KbDhJakBLSyTMaewQ=");
_c5 = MultiTagInput;
// ─── Track editor ─────────────────────────────────────────────────────────────
function TrackCard(param) {
    let { track, index, canRemove, onChange, onRemove } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "var(--color-canvas)",
            border: "var(--border-hairline)",
            borderRadius: "var(--radius-sm)",
            padding: "var(--space-md)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-md)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "t-caption-md",
                        style: {
                            color: "var(--color-primary)"
                        },
                        children: [
                            "Track ",
                            index + 1
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this),
                    canRemove && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn btn-outline btn-sm",
                        onClick: onRemove,
                        style: {
                            cursor: "pointer"
                        },
                        children: "Xóa track"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 317,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
                label: "Tên track",
                value: track.trackName,
                onChange: (v)=>onChange({
                        trackName: v
                    })
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextArea, {
                label: "Mô tả",
                value: track.description,
                onChange: (v)=>onChange({
                        description: v
                    })
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 329,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
                label: "Template ID",
                value: track.templateId,
                onChange: (v)=>onChange({
                        templateId: v
                    })
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "t-caption-xs",
                        style: {
                            color: "var(--color-mute)"
                        },
                        children: "Loại link nộp bài"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "var(--space-md)"
                        },
                        children: SUBMISSION_LINK_OPTIONS.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Checkbox, {
                                label: opt.label,
                                checked: track.submissionLinks.includes(opt.key),
                                onChange: (on)=>onChange({
                                        submissionLinks: on ? [
                                            ...track.submissionLinks,
                                            opt.key
                                        ] : track.submissionLinks.filter((k)=>k !== opt.key)
                                    })
                            }, opt.key, false, {
                                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                                lineNumber: 339,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 337,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 333,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiTagInput, {
                label: "Judge (tùy chọn)",
                values: track.judgeUserIds,
                onChange: (next)=>onChange({
                        judgeUserIds: next
                    }),
                placeholder: "Email hoặc ID tài khoản",
                hint: "Có thể để trống — sau này sẽ thêm judge bằng cách tìm kiếm tài khoản."
            }, "judge", false, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiTagInput, {
                label: "Mentor (tùy chọn)",
                values: track.mentorUserIds,
                onChange: (next)=>onChange({
                        mentorUserIds: next
                    }),
                placeholder: "Email hoặc ID tài khoản"
            }, "mentor", false, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 364,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
        lineNumber: 301,
        columnNumber: 5
    }, this);
}
_c6 = TrackCard;
// ─── Round editor ─────────────────────────────────────────────────────────────
function RoundCard(param) {
    let { round, index, canRemove, onChange, onRemove, onTrackChange, onAddTrack, onRemoveTrack } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "var(--color-surface-soft)",
            border: "var(--border-hairline)",
            borderRadius: "var(--radius-sm)",
            padding: "var(--space-lg)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-md)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "t-body-strong",
                        children: [
                            "Vòng ",
                            index + 1
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 409,
                        columnNumber: 9
                    }, this),
                    canRemove && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn btn-outline btn-sm",
                        onClick: onRemove,
                        style: {
                            cursor: "pointer"
                        },
                        children: "Xóa vòng"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 411,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 408,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "var(--space-md)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
                        label: "Tên vòng",
                        value: round.roundName,
                        onChange: (v)=>onChange("roundName", v)
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 423,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
                        label: "Số thứ tự vòng",
                        type: "number",
                        value: round.roundNumber,
                        onChange: (v)=>onChange("roundNumber", v)
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 424,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 422,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--space-md)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
                        label: "Bắt đầu",
                        type: "datetime-local",
                        value: round.startDate,
                        onChange: (v)=>onChange("startDate", v)
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 432,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
                        label: "Kết thúc",
                        type: "datetime-local",
                        value: round.endDate,
                        onChange: (v)=>onChange("endDate", v)
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 438,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 431,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
                label: "Quy tắc lên vòng (advancement rule)",
                value: round.advancementRule,
                onChange: (v)=>onChange("advancementRule", v)
            }, void 0, false, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 445,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-md)"
                },
                children: [
                    round.tracks.map((track, ti)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TrackCard, {
                            track: track,
                            index: ti,
                            canRemove: round.tracks.length > 1,
                            onChange: (patch)=>onTrackChange(ti, patch),
                            onRemove: ()=>onRemoveTrack(ti)
                        }, ti, false, {
                            fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                            lineNumber: 454,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn btn-outline btn-sm",
                        onClick: onAddTrack,
                        style: {
                            alignSelf: "flex-start",
                            cursor: "pointer"
                        },
                        children: "+ Thêm track"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 463,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 452,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
        lineNumber: 397,
        columnNumber: 5
    }, this);
}
_c7 = RoundCard;
function CreateEventForm(param) {
    let { onCancel } = param;
    _s1();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyEvent);
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const setField = (key, value)=>setForm((f)=>({
                ...f,
                [key]: value
            }));
    // ── round operations ──
    const addRound = ()=>setForm((f)=>({
                ...f,
                rounds: [
                    ...f.rounds,
                    emptyRound()
                ]
            }));
    const removeRound = (ri)=>setForm((f)=>({
                ...f,
                rounds: f.rounds.filter((_, i)=>i !== ri)
            }));
    const updateRound = (ri, key, value)=>setForm((f)=>({
                ...f,
                rounds: f.rounds.map((r, i)=>i === ri ? {
                        ...r,
                        [key]: value
                    } : r)
            }));
    // ── track operations ──
    const addTrack = (ri)=>setForm((f)=>({
                ...f,
                rounds: f.rounds.map((r, i)=>i === ri ? {
                        ...r,
                        tracks: [
                            ...r.tracks,
                            emptyTrack()
                        ]
                    } : r)
            }));
    const removeTrack = (ri, ti)=>setForm((f)=>({
                ...f,
                rounds: f.rounds.map((r, i)=>i === ri ? {
                        ...r,
                        tracks: r.tracks.filter((_, j)=>j !== ti)
                    } : r)
            }));
    const updateTrack = (ri, ti, patch)=>setForm((f)=>({
                ...f,
                rounds: f.rounds.map((r, i)=>i === ri ? {
                        ...r,
                        tracks: r.tracks.map((t, j)=>j === ti ? {
                                ...t,
                                ...patch
                            } : t)
                    } : r)
            }));
    // ── submit (UI-only: build payload, log + preview) ──
    function buildPayload() {
        return {
            eventName: form.eventName,
            season: form.season,
            year: Number(form.year) || 0,
            startDate: toIso(form.startDate),
            endDate: toIso(form.endDate),
            description: form.description,
            eventCoordinatorIds: form.eventCoordinatorIds,
            rounds: form.rounds.map((r)=>({
                    roundName: r.roundName,
                    roundNumber: Number(r.roundNumber) || 0,
                    startDate: toIso(r.startDate),
                    endDate: toIso(r.endDate),
                    advancementRule: r.advancementRule,
                    tracks: r.tracks.map((t)=>({
                            trackName: t.trackName,
                            description: t.description,
                            templateId: t.templateId,
                            submissionLinks: t.submissionLinks,
                            judgeUserIds: t.judgeUserIds,
                            mentorUserIds: t.mentorUserIds
                        }))
                }))
        };
    }
    function handleSubmit(e) {
        e.preventDefault();
        const payload = buildPayload();
        // UI-only for now — not wired to an API.
        console.log("[CreateEventForm] payload:", payload);
        setPreview(JSON.stringify(payload, null, 2));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        style: {
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-xl)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-md)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
                        label: "Tên sự kiện",
                        value: form.eventName,
                        onChange: (v)=>setField("eventName", v)
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 572,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "var(--space-md)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
                                label: "Mùa (season)",
                                value: form.season,
                                onChange: (v)=>setField("season", v)
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                                lineNumber: 574,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
                                label: "Năm",
                                type: "number",
                                value: form.year,
                                onChange: (v)=>setField("year", v)
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                                lineNumber: 575,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 573,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "var(--space-md)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
                                label: "Bắt đầu",
                                type: "datetime-local",
                                value: form.startDate,
                                onChange: (v)=>setField("startDate", v)
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                                lineNumber: 578,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextField, {
                                label: "Kết thúc",
                                type: "datetime-local",
                                value: form.endDate,
                                onChange: (v)=>setField("endDate", v)
                            }, void 0, false, {
                                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                                lineNumber: 584,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 577,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextArea, {
                        label: "Mô tả",
                        value: form.description,
                        onChange: (v)=>setField("description", v)
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 591,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MultiTagInput, {
                        label: "Event Coordinator (có thể nhiều người, tùy chọn)",
                        values: form.eventCoordinatorIds,
                        onChange: (next)=>setForm((f)=>({
                                    ...f,
                                    eventCoordinatorIds: next
                                })),
                        placeholder: "Email hoặc ID tài khoản"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 593,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 571,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-lg)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "t-heading-sm",
                        style: {
                            margin: 0
                        },
                        children: "Các vòng thi"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 604,
                        columnNumber: 9
                    }, this),
                    form.rounds.map((round, ri)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoundCard, {
                            round: round,
                            index: ri,
                            canRemove: form.rounds.length > 1,
                            onChange: (key, value)=>updateRound(ri, key, value),
                            onRemove: ()=>removeRound(ri),
                            onTrackChange: (ti, patch)=>updateTrack(ri, ti, patch),
                            onAddTrack: ()=>addTrack(ri),
                            onRemoveTrack: (ti)=>removeTrack(ri, ti)
                        }, ri, false, {
                            fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                            lineNumber: 608,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn btn-outline btn-sm",
                        onClick: addRound,
                        style: {
                            alignSelf: "flex-start",
                            cursor: "pointer"
                        },
                        children: "+ Thêm vòng"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 620,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 603,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: "var(--space-md)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "btn btn-primary",
                        style: {
                            cursor: "pointer"
                        },
                        children: "Tạo sự kiện"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 632,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn btn-outline",
                        onClick: onCancel,
                        style: {
                            cursor: "pointer"
                        },
                        children: "Hủy"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 635,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 631,
                columnNumber: 7
            }, this),
            preview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-sm)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "t-caption-md",
                        style: {
                            color: "var(--color-primary)"
                        },
                        children: "Payload (UI demo — chưa gửi API, xem thêm ở console)"
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 643,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        style: {
                            margin: 0,
                            padding: "var(--space-md)",
                            background: "var(--color-surface-soft)",
                            border: "var(--border-hairline)",
                            borderRadius: "var(--radius-sm)",
                            fontSize: "var(--fs-caption-sm)",
                            overflowX: "auto",
                            whiteSpace: "pre-wrap"
                        },
                        children: preview
                    }, void 0, false, {
                        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                        lineNumber: 646,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
                lineNumber: 642,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/events/components/CreateEventForm.tsx",
        lineNumber: 569,
        columnNumber: 5
    }, this);
}
_s1(CreateEventForm, "Rc1TlsP53SSof6BOSIR/ENWdXHY=");
_c8 = CreateEventForm;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "Field");
__turbopack_context__.k.register(_c1, "TextField");
__turbopack_context__.k.register(_c2, "TextArea");
__turbopack_context__.k.register(_c3, "Checkbox");
__turbopack_context__.k.register(_c4, "Hint");
__turbopack_context__.k.register(_c5, "MultiTagInput");
__turbopack_context__.k.register(_c6, "TrackCard");
__turbopack_context__.k.register(_c7, "RoundCard");
__turbopack_context__.k.register(_c8, "CreateEventForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/events/components/EventSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EventSection",
    ()=>EventSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/hooks/useEvents.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventFilterTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventFilterTabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/EventGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$CreateEventForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/events/components/CreateEventForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function EventSection() {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("list");
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [joiningId, setJoiningId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [joinError, setJoinError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const allQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAllEvents"])();
    const myQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMyEvents"])();
    const active = filter === "all" ? allQuery : myQuery;
    var _active_data;
    const events = (_active_data = active.data) !== null && _active_data !== void 0 ? _active_data : [];
    const isLoading = active.isLoading;
    const joinMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useJoinEvent"])();
    function handleJoin(id) {
        setJoiningId(id);
        setJoinError(null);
        joinMutation.mutate(id, {
            onSuccess: ()=>setJoiningId(null),
            onError: (err)=>{
                var _response_data, _response, _this;
                setJoiningId(null);
                var _response_data_message;
                const msg = (_response_data_message = (_this = err) === null || _this === void 0 ? void 0 : (_response = _this.response) === null || _response === void 0 ? void 0 : (_response_data = _response.data) === null || _response_data === void 0 ? void 0 : _response_data.message) !== null && _response_data_message !== void 0 ? _response_data_message : "Tham gia thất bại. Thử lại sau.";
                setJoinError(msg);
            }
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container",
        style: {
            paddingTop: "var(--space-section)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card",
            style: {
                padding: "var(--space-xxl)",
                gap: "var(--space-xl)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "var(--space-md)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "t-heading-md",
                            style: {
                                margin: 0
                            },
                            children: mode === "create" ? "Tạo sự kiện" : "Sự kiện"
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventSection.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn btn-outline btn-sm",
                            onClick: ()=>setMode((m)=>m === "create" ? "list" : "create"),
                            style: {
                                cursor: "pointer"
                            },
                            children: mode === "create" ? "← Quay lại" : "+ Tạo sự kiện"
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventSection.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/events/components/EventSection.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                mode === "create" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$CreateEventForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateEventForm"], {
                    onCancel: ()=>setMode("list")
                }, void 0, false, {
                    fileName: "[project]/src/features/events/components/EventSection.tsx",
                    lineNumber: 60,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventFilterTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventFilterTabs"], {
                            active: filter,
                            onChange: setFilter
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventSection.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$components$2f$EventGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventGrid"], {
                            events: events,
                            isLoading: isLoading,
                            joiningId: joiningId,
                            joinError: joinError,
                            onJoin: handleJoin
                        }, void 0, false, {
                            fileName: "[project]/src/features/events/components/EventSection.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/events/components/EventSection.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/features/events/components/EventSection.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(EventSection, "wMGhbIZkVEqWo8T2ZT/Vb6KkvTA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAllEvents"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMyEvents"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$events$2f$hooks$2f$useEvents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useJoinEvent"]
    ];
});
_c = EventSection;
var _c;
__turbopack_context__.k.register(_c, "EventSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_6cfce0c6._.js.map