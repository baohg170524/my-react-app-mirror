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
"[project]/src/components/Notif.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Notif
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Notif(param) {
    let { n } = param;
    if (!n) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-slideDown",
        style: {
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 9999,
            background: n.t === 'e' ? '#ff4d6d' : '#3ddc84',
            color: '#000',
            padding: '12px 20px',
            fontWeight: 700,
            fontSize: 13,
            fontFamily: 'Inter,sans-serif',
            boxShadow: '0 4px 24px rgba(0,0,0,.5)'
        },
        children: n.m
    }, void 0, false, {
        fileName: "[project]/src/components/Notif.jsx",
        lineNumber: 4,
        columnNumber: 5
    }, this);
}
_c = Notif;
var _c;
__turbopack_context__.k.register(_c, "Notif");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/TeamAppealPage.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeamAppealPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function TeamAppealPage(param) {
    let { myTeam, onSubmit } = param;
    _s();
    const [f, setF] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: (myTeam === null || myTeam === void 0 ? void 0 : myTeam.name) || '',
        id: (myTeam === null || myTeam === void 0 ? void 0 : myTeam.id) || '',
        email: (myTeam === null || myTeam === void 0 ? void 0 : myTeam.email) || '',
        reason: ''
    });
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ok = f.name && f.id && f.email && f.reason;
    const go = ()=>{
        if (!ok) return;
        onSubmit(f);
        setDone(true);
    };
    if (done) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center min-h-96 animate-fadeUp",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 56,
                        height: 56,
                        background: 'rgba(118,185,0,.12)',
                        border: '2px solid #76b900',
                        borderRadius: 2,
                        margin: '0 auto 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24
                    },
                    children: "✓"
                }, void 0, false, {
                    fileName: "[project]/src/pages/TeamAppealPage.jsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xl font-bold mb-2",
                    style: {
                        color: '#76b900'
                    },
                    children: "Đơn đã được nộp thành công!"
                }, void 0, false, {
                    fileName: "[project]/src/pages/TeamAppealPage.jsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm",
                    style: {
                        color: '#757575'
                    },
                    children: "Ban giám khảo sẽ xem xét và phản hồi sớm nhất có thể."
                }, void 0, false, {
                    fileName: "[project]/src/pages/TeamAppealPage.jsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "btn btn-outline mt-6",
                    onClick: ()=>setDone(false),
                    children: "Nộp đơn khác"
                }, void 0, false, {
                    fileName: "[project]/src/pages/TeamAppealPage.jsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/TeamAppealPage.jsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/TeamAppealPage.jsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fadeUp",
        style: {
            maxWidth: 700,
            margin: '0 auto'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold m-0",
                        style: {
                            color: '#000'
                        },
                        children: "Đơn xin phúc khảo"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/TeamAppealPage.jsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mt-1",
                        style: {
                            color: '#757575'
                        },
                        children: "Điền đầy đủ thông tin để gửi yêu cầu phúc khảo điểm số."
                    }, void 0, false, {
                        fileName: "[project]/src/pages/TeamAppealPage.jsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/TeamAppealPage.jsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: '#fff',
                    border: '1px solid #cccccc',
                    borderRadius: 2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3.5 p-5",
                        style: {
                            background: '#f7f7f7',
                            borderBottom: '1px solid #cccccc'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm font-bold",
                                    style: {
                                        color: '#000'
                                    },
                                    children: "Đơn xin phúc khảo"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs",
                                    style: {
                                        color: '#757575'
                                    },
                                    children: "Điền đầy đủ thông tin để gửi yêu cầu phúc khảo."
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/TeamAppealPage.jsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/TeamAppealPage.jsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-5 mb-5",
                                style: {
                                    gridTemplateColumns: '1fr 1fr'
                                },
                                children: [
                                    [
                                        'Tên nhóm',
                                        'name',
                                        'VD: Nhóm Sao Băng'
                                    ],
                                    [
                                        'Mã nhóm',
                                        'id',
                                        'VD: T-001'
                                    ]
                                ].map((param)=>{
                                    let [lb, k, ph] = param;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-bold uppercase tracking-wider mb-2",
                                                style: {
                                                    color: '#757575'
                                                },
                                                children: lb
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                                lineNumber: 38,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: f[k],
                                                onChange: (e)=>setF({
                                                        ...f,
                                                        [k]: e.target.value
                                                    }),
                                                placeholder: ph,
                                                className: "input-field"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                                lineNumber: 39,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, k, true, {
                                        fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-bold uppercase tracking-wider mb-2",
                                        style: {
                                            color: '#757575'
                                        },
                                        children: "Gmail"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: f.email,
                                        onChange: (e)=>setF({
                                                ...f,
                                                email: e.target.value
                                            }),
                                        placeholder: "example@gmail.com",
                                        type: "email",
                                        className: "input-field"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-bold uppercase tracking-wider mb-2",
                                        style: {
                                            color: '#757575'
                                        },
                                        children: "Lý do phúc khảo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: f.reason,
                                        onChange: (e)=>setF({
                                                ...f,
                                                reason: e.target.value
                                            }),
                                        rows: 4,
                                        placeholder: "Trình bày lý do bạn muốn phúc khảo...",
                                        className: "input-field resize-y leading-relaxed",
                                        style: {
                                            height: 'auto'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: go,
                                className: "btn btn-primary w-full",
                                disabled: !ok,
                                children: "Xác nhận nộp đơn"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/TeamAppealPage.jsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/TeamAppealPage.jsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/TeamAppealPage.jsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/TeamAppealPage.jsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(TeamAppealPage, "MVxHV/7g0WX60WZSi+vLBlQTMY8=");
_c = TeamAppealPage;
var _c;
__turbopack_context__.k.register(_c, "TeamAppealPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INIT_APPEALS",
    ()=>INIT_APPEALS,
    "INIT_CRITERIA",
    ()=>INIT_CRITERIA,
    "INIT_SUBMISSIONS",
    ()=>INIT_SUBMISSIONS,
    "INIT_TEAMS",
    ()=>INIT_TEAMS,
    "MY_TEAM_ID",
    ()=>MY_TEAM_ID
]);
const INIT_CRITERIA = [
    {
        id: 'C-001',
        label: 'Innovation',
        labelVi: 'Tính sáng tạo',
        weight: 25,
        desc: 'Tính mới mẻ, sáng tạo của giải pháp',
        levels: [
            {
                range: '0–2',
                desc: 'Chưa có ý tưởng'
            },
            {
                range: '3–4',
                desc: 'Ý tưởng cơ bản'
            },
            {
                range: '5–7',
                desc: 'Ý tưởng tốt, có nét mới'
            },
            {
                range: '8–10',
                desc: 'Rất sáng tạo, giải pháp độc đáo'
            }
        ]
    },
    {
        id: 'C-002',
        label: 'Technical Quality',
        labelVi: 'Chất lượng kỹ thuật',
        weight: 30,
        desc: 'Chất lượng code, kiến trúc hệ thống',
        levels: [
            {
                range: '0–2',
                desc: 'Code rối, không hoạt động'
            },
            {
                range: '3–4',
                desc: 'Chạy được nhưng nhiều lỗi'
            },
            {
                range: '5–7',
                desc: 'Code sạch, xử lý lỗi ổn'
            },
            {
                range: '8–10',
                desc: 'Kiến trúc tốt, tối ưu, scalable'
            }
        ]
    },
    {
        id: 'C-003',
        label: 'Business Impact',
        labelVi: 'Tính ứng dụng',
        weight: 20,
        desc: 'Tính ứng dụng thực tế, khả năng thương mại hóa',
        levels: [
            {
                range: '0–2',
                desc: 'Không có giá trị thực tế'
            },
            {
                range: '3–4',
                desc: 'Ứng dụng hạn chế'
            },
            {
                range: '5–7',
                desc: 'Có thị trường tiềm năng'
            },
            {
                range: '8–10',
                desc: 'Tác động lớn, tiềm năng startup'
            }
        ]
    },
    {
        id: 'C-004',
        label: 'Presentation',
        labelVi: 'Thuyết trình',
        weight: 15,
        desc: 'Chất lượng thuyết trình, demo, slide',
        levels: [
            {
                range: '0–2',
                desc: 'Demo thất bại, slide kém'
            },
            {
                range: '3–4',
                desc: 'Trình bày sơ sài'
            },
            {
                range: '5–7',
                desc: 'Demo rõ ràng, slide ổn'
            },
            {
                range: '8–10',
                desc: 'Thuyết phục, demo ấn tượng'
            }
        ]
    },
    {
        id: 'C-005',
        label: 'Teamwork',
        labelVi: 'Làm việc nhóm',
        weight: 10,
        desc: 'Phối hợp nhóm, quản lý thời gian',
        levels: [
            {
                range: '0–2',
                desc: 'Không có bằng chứng phối hợp'
            },
            {
                range: '3–4',
                desc: 'Phối hợp kém, trễ deadline'
            },
            {
                range: '5–7',
                desc: 'Nhóm ổn, đúng tiến độ'
            },
            {
                range: '8–10',
                desc: 'Phối hợp xuất sắc, commit đều đặn'
            }
        ]
    }
];
const INIT_TEAMS = [
    {
        id: 'T-001',
        name: 'Team Alpha',
        email: 'alpha@gmail.com',
        scores: [
            8,
            7,
            8,
            7,
            8
        ],
        comments: [
            'Giải pháp dùng ML độc đáo',
            'Code sạch, DB cần tối ưu',
            'Tiềm năng startup',
            'Demo rõ',
            'Commit đều'
        ]
    },
    {
        id: 'T-002',
        name: 'Team Beta',
        email: 'beta@gmail.com',
        scores: [
            8.5,
            8,
            8.5,
            8,
            9
        ],
        comments: [
            '',
            '',
            '',
            '',
            ''
        ]
    },
    {
        id: 'T-003',
        name: 'Nhóm Đại Dương',
        email: 'daiduong@gmail.com',
        scores: [
            7,
            6,
            7,
            7,
            8
        ],
        comments: [
            'Ý tưởng tốt',
            'Kỹ thuật cần cải thiện',
            'Ứng dụng cao',
            'Slide ổn',
            'Nhóm đoàn kết'
        ]
    },
    {
        id: 'T-004',
        name: 'Phoenix Coders',
        email: 'phoenix.coders@gmail.com',
        scores: [
            6.5,
            7,
            6.5,
            6,
            7
        ],
        comments: [
            '',
            '',
            '',
            '',
            ''
        ]
    },
    {
        id: 'T-005',
        name: 'Team Epsilon',
        email: 'epsilon@gmail.com',
        scores: [
            9.2,
            9,
            9,
            9,
            9
        ],
        comments: [
            '',
            '',
            '',
            '',
            ''
        ]
    },
    {
        id: 'T-006',
        name: 'Team Zeta',
        email: 'zeta@gmail.com',
        scores: [
            5,
            5.5,
            5,
            5,
            6
        ],
        comments: [
            '',
            '',
            '',
            '',
            ''
        ]
    }
];
const INIT_APPEALS = [
    {
        id: 'A-001',
        teamId: 'T-003',
        teamName: 'Nhóm Đại Dương',
        email: 'daiduong@gmail.com',
        reason: 'Chúng tôi cho rằng phần kỹ thuật chưa được đánh giá đúng vì hệ thống đã chạy demo thành công nhưng điểm kỹ thuật khá thấp.',
        status: 'Chờ xử lý',
        date: '08/06/2026'
    },
    {
        id: 'A-002',
        teamId: 'T-004',
        teamName: 'Phoenix Coders',
        email: 'phoenix.coders@gmail.com',
        reason: 'Phần ý tưởng của nhóm mang tính sáng tạo cao, mong ban giám khảo xem xét lại điểm tiêu chí ý tưởng.',
        status: 'Đang xét',
        date: '07/06/2026'
    }
];
const INIT_SUBMISSIONS = [
    {
        id: 'S-001',
        teamId: 'T-001',
        teamName: 'Team Alpha',
        projectName: 'SmartFarm AI',
        repo: 'https://github.com/team-alpha/smartfarm-ai',
        submittedAt: '07/06/2026 14:32',
        status: 'Đã nhận'
    },
    {
        id: 'S-002',
        teamId: 'T-002',
        teamName: 'Team Beta',
        projectName: 'EduBot Platform',
        repo: 'https://github.com/team-beta/edubot-platform',
        submittedAt: '07/06/2026 15:10',
        status: 'Đã nhận'
    },
    {
        id: 'S-003',
        teamId: 'T-004',
        teamName: 'Phoenix Coders',
        projectName: 'HealthTrack',
        repo: 'https://github.com/phoenix-coders/healthtrack',
        submittedAt: '08/06/2026 09:05',
        status: 'Đã nhận'
    }
];
const MY_TEAM_ID = 'T-003';
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/team-appeal/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeamAppealRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Notif$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Notif.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeamAppealPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/TeamAppealPage.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function TeamAppealRoute() {
    _s();
    const myTeam = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_TEAMS"].find((t)=>t.id === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MY_TEAM_ID"]);
    const [notif, setNotif] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const sn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TeamAppealRoute.useCallback[sn]": function(m) {
            let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 's';
            setNotif({
                m,
                t
            });
            setTimeout({
                "TeamAppealRoute.useCallback[sn]": ()=>setNotif(null)
            }["TeamAppealRoute.useCallback[sn]"], 3000);
        }
    }["TeamAppealRoute.useCallback[sn]"], []);
    const handleSubmit = ()=>{
        sn('Đơn phúc khảo đã được gửi thành công!');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                fileName: "[project]/src/app/team-appeal/page.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Notif$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                n: notif
            }, void 0, false, {
                fileName: "[project]/src/app/team-appeal/page.jsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                style: {
                    minHeight: '100vh',
                    background: '#f7f7f7',
                    padding: '28px 32px',
                    fontFamily: 'Inter, sans-serif'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$TeamAppealPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    myTeam: myTeam,
                    onSubmit: handleSubmit
                }, void 0, false, {
                    fileName: "[project]/src/app/team-appeal/page.jsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/team-appeal/page.jsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(TeamAppealRoute, "nUrjbVAfncyBAwcVhBEj1uMXFEk=");
_c = TeamAppealRoute;
var _c;
__turbopack_context__.k.register(_c, "TeamAppealRoute");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_c75bac50._.js.map