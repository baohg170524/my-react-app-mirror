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
"[project]/src/components/Navbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.ts [app-ssr] (ecmascript)");
"use client";
;
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
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsAuthenticated"])();
    const { data: user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCurrentUser"])();
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLogout"])();
    // Focus main on route change for keyboard/a11y
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const main = document.querySelector("main");
        if (main) main.focus();
    }, [
        pathname
    ]);
    const links = !isAuthenticated ? GUEST_LINKS : user?.role === "ADMIN" ? ADMIN_LINKS : user?.role === "MENTOR" ? MENTOR_LINKS : user?.role === "STUDENT" ? STUDENT_LINKS : GUEST_LINKS;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "primary-nav sticky-chrome",
            style: {
                position: "sticky",
                top: 0,
                zIndex: 30
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "primary-nav__brand",
                    style: {
                        fontSize: "var(--fs-heading-sm)",
                        textDecoration: "none"
                    },
                    children: [
                        "SWP",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "primary-nav__links",
                    children: links.map(({ label, href })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "primary-nav__cluster",
                    children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 12
                        },
                        children: [
                            user?.fullName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
}),
"[project]/src/components/Notif.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Notif
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Notif({ n }) {
    if (!n) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/src/utils.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STATUS_MAP",
    ()=>STATUS_MAP,
    "StatusBadge",
    ()=>StatusBadge,
    "calcScore",
    ()=>calcScore,
    "getRankBg",
    ()=>getRankBg,
    "getRankColor",
    ()=>getRankColor,
    "getRankIcon",
    ()=>getRankIcon,
    "totalWeight",
    ()=>totalWeight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const calcScore = (scores, criteria)=>{
    if (!scores || !criteria || scores.length === 0) return 0;
    const total = criteria.reduce((sum, c, i)=>sum + (scores[i] || 0) * (c.weight / 100), 0);
    return Math.round(total * 100) / 100;
};
const totalWeight = (criteria)=>criteria.reduce((s, c)=>s + Number(c.weight), 0);
const getRankColor = (r)=>r === 1 ? '#b8860b' : r === 2 ? '#757575' : r === 3 ? '#8b5a2b' : '#000000';
const getRankBg = (r)=>r === 1 ? 'rgba(255,215,0,.08)' : r === 2 ? 'rgba(0,0,0,.04)' : r === 3 ? 'rgba(205,127,50,.07)' : 'transparent';
const getRankIcon = (r)=>r === 1 ? '🥇' : r === 2 ? '🥈' : r === 3 ? '🥉' : `#${r}`;
const STATUS_MAP = {
    'Chờ xử lý': {
        cls: 'badge-warn',
        label: 'Chờ xử lý'
    },
    'Đang xét': {
        cls: 'badge-blue',
        label: 'Đang xét'
    },
    'Đã duyệt': {
        cls: 'badge-accent',
        label: 'Đã duyệt'
    },
    'Từ chối': {
        cls: 'badge-danger',
        label: 'Từ chối'
    }
};
const StatusBadge = ({ status })=>{
    const s = STATUS_MAP[status] || STATUS_MAP['Chờ xử lý'];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: s.cls,
        children: status
    }, void 0, false, {
        fileName: "[project]/src/utils.jsx",
        lineNumber: 23,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/EditModal.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.jsx [app-ssr] (ecmascript)");
;
;
;
function EditModal({ team, criteria, onClose, onSave }) {
    const [scores, setScores] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        ...team.scores
    ].concat(Array(Math.max(0, criteria.length - team.scores.length)).fill(0)));
    const [cmts, setCmts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        ...team.comments || []
    ].concat(Array(Math.max(0, criteria.length - (team.comments || []).length)).fill('')));
    const prev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcScore"])(team.scores, criteria);
    const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcScore"])(scores, criteria);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay",
        style: {
            padding: '24px 16px'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-box",
            style: {
                maxWidth: 680
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-start mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-lg font-bold",
                                    style: {
                                        color: '#e6f4ea'
                                    },
                                    children: "Chấm / Chỉnh sửa điểm số"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditModal.jsx",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs mt-1",
                                    style: {
                                        color: '#7da88a'
                                    },
                                    children: "Xem lại và điều chỉnh điểm số theo từng tiêu chí."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditModal.jsx",
                                    lineNumber: 17,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm mt-1.5 font-bold",
                                    style: {
                                        color: '#3ddc84'
                                    },
                                    children: [
                                        team.id,
                                        " · ",
                                        team.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/EditModal.jsx",
                                    lineNumber: 18,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/EditModal.jsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn-hover text-xl leading-none",
                            onClick: onClose,
                            style: {
                                background: 'transparent',
                                border: 'none',
                                color: '#7da88a'
                            },
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/src/components/EditModal.jsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/EditModal.jsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                criteria.map((c, i)=>{
                    const w = Math.round((scores[i] || 0) * (c.weight / 100) * 100) / 100;
                    const sc = scores[i] || 0;
                    const al = c.levels ? c.levels.findIndex((lv)=>{
                        const pts = lv.range.replace('–', '-').split('-').map(Number);
                        return sc >= pts[0] && sc <= (pts[1] ?? 10);
                    }) : -1;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl mb-3 p-5",
                        style: {
                            background: 'rgba(0,0,0,.25)',
                            border: '1px solid #1e3022'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-2 items-center mb-3",
                                style: {
                                    gridTemplateColumns: '1fr 70px 100px 110px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-bold text-sm",
                                                style: {
                                                    color: '#e6f4ea'
                                                },
                                                children: c.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EditModal.jsx",
                                                lineNumber: 36,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[11px] mt-0.5",
                                                style: {
                                                    color: '#7da88a'
                                                },
                                                children: [
                                                    c.labelVi,
                                                    " · ",
                                                    c.weight,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/EditModal.jsx",
                                                lineNumber: 37,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/EditModal.jsx",
                                        lineNumber: 35,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center text-xs",
                                        style: {
                                            color: '#7da88a'
                                        },
                                        children: [
                                            c.weight,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/EditModal.jsx",
                                        lineNumber: 39,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: "0",
                                        max: "10",
                                        step: "0.5",
                                        value: scores[i] || 0,
                                        onChange: (e)=>{
                                            const v = [
                                                ...scores
                                            ];
                                            v[i] = parseFloat(e.target.value) || 0;
                                            setScores(v);
                                        },
                                        className: "text-center rounded-lg text-lg font-black w-full focus:border-brand-accent",
                                        style: {
                                            background: 'rgba(61,220,132,.08)',
                                            border: '1.5px solid #1e3022',
                                            padding: '9px 4px',
                                            color: '#3ddc84',
                                            outline: 'none'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EditModal.jsx",
                                        lineNumber: 40,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right text-xl font-bold",
                                        style: {
                                            color: '#3ddc84'
                                        },
                                        children: w.toFixed(2)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EditModal.jsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/EditModal.jsx",
                                lineNumber: 34,
                                columnNumber: 15
                            }, this),
                            c.levels && c.levels.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `grid gap-1.5 mb-3`,
                                style: {
                                    gridTemplateColumns: `repeat(${Math.min(c.levels.length, 4)},1fr)`
                                },
                                children: c.levels.map((lv, li)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg p-2",
                                        style: {
                                            background: li === al ? 'rgba(61,220,132,.12)' : 'rgba(0,0,0,.2)',
                                            border: `1px solid ${li === al ? '#3ddc84' : '#1e3022'}`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] font-bold mb-0.5",
                                                style: {
                                                    color: li === al ? '#3ddc84' : '#4d7a5c'
                                                },
                                                children: lv.range
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EditModal.jsx",
                                                lineNumber: 53,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] leading-snug",
                                                style: {
                                                    color: li === al ? '#3ddc84' : '#7da88a'
                                                },
                                                children: lv.desc
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/EditModal.jsx",
                                                lineNumber: 54,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, li, true, {
                                        fileName: "[project]/src/components/EditModal.jsx",
                                        lineNumber: 52,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/EditModal.jsx",
                                lineNumber: 50,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] tracking-widest mb-1",
                                        style: {
                                            color: '#4d7a5c'
                                        },
                                        children: "NHẬN XÉT"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EditModal.jsx",
                                        lineNumber: 62,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: cmts[i] || '',
                                        rows: 2,
                                        onChange: (e)=>{
                                            const v = [
                                                ...cmts
                                            ];
                                            v[i] = e.target.value;
                                            setCmts(v);
                                        },
                                        placeholder: "Nhận xét cho tiêu chí này...",
                                        className: "input-field resize-y text-xs leading-relaxed"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/EditModal.jsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/EditModal.jsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this)
                        ]
                    }, c.id, true, {
                        fileName: "[project]/src/components/EditModal.jsx",
                        lineNumber: 32,
                        columnNumber: 13
                    }, this);
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid items-center rounded-xl p-5 mt-1",
                    style: {
                        gridTemplateColumns: '1fr 140px',
                        background: 'rgba(61,220,132,.12)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm",
                            style: {
                                color: '#7da88a'
                            },
                            children: [
                                "Tổng trước đó:",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    style: {
                                        color: '#e6f4ea'
                                    },
                                    children: prev.toFixed(2)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditModal.jsx",
                                    lineNumber: 76,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/EditModal.jsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-right",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-[10px] tracking-widest",
                                    style: {
                                        color: '#7da88a'
                                    },
                                    children: "TỔNG ĐIỂM MỚI"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditModal.jsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-3xl font-black leading-none",
                                    style: {
                                        color: '#3ddc84'
                                    },
                                    children: next.toFixed(2)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/EditModal.jsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/EditModal.jsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/EditModal.jsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-end gap-3 mt-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn-ghost",
                            onClick: onClose,
                            children: "Hủy"
                        }, void 0, false, {
                            fileName: "[project]/src/components/EditModal.jsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn-primary",
                            onClick: ()=>onSave(scores, cmts),
                            children: "✓ Xác nhận chỉnh sửa"
                        }, void 0, false, {
                            fileName: "[project]/src/components/EditModal.jsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/EditModal.jsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/EditModal.jsx",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/EditModal.jsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ExportModal.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExportModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.jsx [app-ssr] (ecmascript)");
;
;
function ExportModal({ ranked, criteria, onClose, sn }) {
    const doCSV = ()=>{
        const header = [
            'Hạng',
            'Mã đội',
            'Tên đội',
            ...criteria.map((c)=>c.label),
            'Tổng'
        ];
        const rows = ranked.map((t)=>[
                t.rank,
                t.id,
                t.name,
                ...(t.scores || []).map((s)=>(s || 0).toFixed(2)),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcScore"])(t.scores, criteria).toFixed(2)
            ]);
        const csv = [
            header,
            ...rows
        ].map((r)=>r.join(',')).join('\n');
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([
            '﻿' + csv
        ], {
            type: 'text/csv;charset=utf-8;'
        }));
        a.download = 'bang_xep_hang.csv';
        a.click();
        sn('Đã xuất báo cáo CSV!');
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay items-center",
        onClick: onClose,
        style: {
            padding: 0
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-box",
            style: {
                maxWidth: 400
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-lg font-bold mb-1",
                    style: {
                        color: '#3ddc84'
                    },
                    children: "Xuất báo cáo"
                }, void 0, false, {
                    fileName: "[project]/src/components/ExportModal.jsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm mb-6",
                    style: {
                        color: '#7da88a'
                    },
                    children: "Chọn định dạng xuất bảng xếp hạng"
                }, void 0, false, {
                    fileName: "[project]/src/components/ExportModal.jsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "btn-hover w-full p-4 flex items-center gap-3 text-left text-sm font-bold mb-3",
                    style: {
                        background: 'rgba(61,220,132,.12)',
                        border: '1.5px solid #3ddc84',
                        color: '#3ddc84'
                    },
                    onClick: doCSV,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: "Xuất CSV"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ExportModal.jsx",
                                lineNumber: 21,
                                columnNumber: 16
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] font-normal",
                                style: {
                                    color: '#7da88a'
                                },
                                children: "Mở bằng Excel, Google Sheets"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ExportModal.jsx",
                                lineNumber: 21,
                                columnNumber: 35
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ExportModal.jsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ExportModal.jsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "btn-ghost w-full mt-1",
                    onClick: onClose,
                    children: "Hủy"
                }, void 0, false, {
                    fileName: "[project]/src/components/ExportModal.jsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ExportModal.jsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ExportModal.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/pages/LeaderboardPage.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeaderboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.jsx [app-ssr] (ecmascript)");
;
;
function LeaderboardPage({ teams, criteria, sortBy, setSortBy, onEdit, onExport }) {
    const sorted = [
        ...teams
    ].sort((a, b)=>sortBy === 'score' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcScore"])(b.scores, criteria) - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcScore"])(a.scores, criteria) : sortBy === 'id' ? a.id.localeCompare(b.id) : a.name.localeCompare(b.name));
    const byScore = [
        ...teams
    ].sort((a, b)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcScore"])(b.scores, criteria) - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcScore"])(a.scores, criteria));
    const ranked = sorted.map((t)=>({
            ...t,
            rank: byScore.findIndex((x)=>x.id === t.id) + 1
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fadeUp",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start mb-7",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold m-0",
                                style: {
                                    color: '#000'
                                },
                                children: "Bảng xếp hạng"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LeaderboardPage.jsx",
                                lineNumber: 15,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm mt-1",
                                style: {
                                    color: '#757575'
                                },
                                children: "Tổng hợp điểm số & thứ hạng các đội thi."
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LeaderboardPage.jsx",
                                lineNumber: 16,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/LeaderboardPage.jsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: sortBy,
                                onChange: (e)=>setSortBy(e.target.value),
                                className: "input-field",
                                style: {
                                    width: 'auto',
                                    height: 44
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "score",
                                        children: "Sắp xếp: Điểm số"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.jsx",
                                        lineNumber: 20,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "id",
                                        children: "Sắp xếp: Mã đội"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.jsx",
                                        lineNumber: 21,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "name",
                                        children: "Sắp xếp: Tên đội"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/LeaderboardPage.jsx",
                                        lineNumber: 22,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/LeaderboardPage.jsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-primary flex items-center gap-2",
                                onClick: onExport,
                                children: "Xuất báo cáo"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LeaderboardPage.jsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/LeaderboardPage.jsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/LeaderboardPage.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 mb-6",
                style: {
                    gridTemplateColumns: 'repeat(3,1fr)'
                },
                children: [
                    {
                        l: 'Điểm cao nhất',
                        v: Math.max(...teams.map((t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcScore"])(t.scores, criteria))).toFixed(2)
                    },
                    {
                        l: 'Điểm trung bình',
                        v: (teams.reduce((a, t)=>a + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcScore"])(t.scores, criteria), 0) / teams.length).toFixed(2)
                    },
                    {
                        l: 'Tổng đội thi',
                        v: `${teams.length} đội`
                    }
                ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "callout-stat",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "callout-stat__number",
                                children: s.v
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LeaderboardPage.jsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "callout-stat__caption",
                                children: s.l
                            }, void 0, false, {
                                fileName: "[project]/src/pages/LeaderboardPage.jsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/pages/LeaderboardPage.jsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/LeaderboardPage.jsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-1.5 px-4 py-2.5 mb-1 text-xs font-bold uppercase tracking-widest",
                style: {
                    gridTemplateColumns: `56px 1fr ${criteria.map(()=>'72px').join(' ')} 84px 110px`,
                    color: '#757575',
                    borderBottom: '2px solid #000'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "HẠNG"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.jsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "ĐỘI"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.jsx",
                        lineNumber: 45,
                        columnNumber: 24
                    }, this),
                    criteria.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: c.label.split(' ')[0].slice(0, 6).toUpperCase()
                        }, i, false, {
                            fileName: "[project]/src/pages/LeaderboardPage.jsx",
                            lineNumber: 46,
                            columnNumber: 33
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: "TỔNG"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.jsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "HÀNH ĐỘNG"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/LeaderboardPage.jsx",
                        lineNumber: 47,
                        columnNumber: 48
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/LeaderboardPage.jsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            ranked.map((t, i)=>{
                const score = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcScore"])(t.scores, criteria);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card-hover grid gap-1.5 px-4 py-3.5 mb-1 items-center",
                    style: {
                        gridTemplateColumns: `56px 1fr ${criteria.map(()=>'72px').join(' ')} 84px 110px`,
                        background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRankBg"])(t.rank),
                        border: `1px solid ${t.rank <= 3 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRankColor"])(t.rank) + '55' : '#e5e5e5'}`,
                        borderRadius: 2,
                        animationDelay: `${i * 0.05}s`
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-bold",
                            style: {
                                fontSize: t.rank <= 3 ? 20 : 13,
                                color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRankColor"])(t.rank)
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRankIcon"])(t.rank)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/LeaderboardPage.jsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm font-bold",
                                    style: {
                                        color: '#000'
                                    },
                                    children: t.name
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/LeaderboardPage.jsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs",
                                    style: {
                                        color: '#757575'
                                    },
                                    children: t.id
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/LeaderboardPage.jsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/LeaderboardPage.jsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this),
                        criteria.map((_, ci)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center text-sm font-bold",
                                style: {
                                    color: '#1a1a1a'
                                },
                                children: (t.scores[ci] || 0).toFixed(1)
                            }, ci, false, {
                                fileName: "[project]/src/pages/LeaderboardPage.jsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center text-xl font-black",
                            style: {
                                color: '#76b900'
                            },
                            children: score.toFixed(2)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/LeaderboardPage.jsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "btn-hover px-2.5 py-1.5 text-xs font-bold",
                            onClick: ()=>onEdit(t),
                            style: {
                                background: 'rgba(118,185,0,.1)',
                                border: '1px solid rgba(118,185,0,.3)',
                                color: '#5a8d00',
                                borderRadius: 2
                            },
                            children: "Sửa điểm"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/LeaderboardPage.jsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this)
                    ]
                }, t.id, true, {
                    fileName: "[project]/src/pages/LeaderboardPage.jsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/LeaderboardPage.jsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/data.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/utils/scoreUtils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * utils/scoreUtils.js
 *
 * Pure helper functions for score calculation and formatting.
 * Logic must match backend scoring formula.
 *
 * BACKEND MATCH:
 *   Score = Σ (criteriaScore[i] * criteria[i].weight / 100)
 *   This mirrors the server-side calculation in ScoringService.cs
 */ // ── WEIGHTED SCORE ─────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "STATUS_LABELS",
    ()=>STATUS_LABELS,
    "calcScore",
    ()=>calcScore,
    "formatDate",
    ()=>formatDate,
    "formatDateTime",
    ()=>formatDateTime,
    "getStatusBadgeClass",
    ()=>getStatusBadgeClass,
    "getStatusLabel",
    ()=>getStatusLabel,
    "rankBg",
    ()=>rankBg,
    "rankColor",
    ()=>rankColor,
    "rankIcon",
    ()=>rankIcon,
    "totalWeight",
    ()=>totalWeight
]);
const calcScore = (scores, criteria)=>{
    if (!scores || !criteria || !scores.length) return 0;
    const total = criteria.reduce((sum, c, i)=>sum + (scores[i] || 0) * (c.weight / 100), 0);
    return Math.round(total * 100) / 100;
};
const totalWeight = (criteria)=>criteria.reduce((s, c)=>s + Number(c.weight), 0);
const rankColor = (r)=>r === 1 ? '#ffd700' : r === 2 ? '#c0c8d0' : r === 3 ? '#cd7f32' : '#A09890';
const rankBg = (r)=>r === 1 ? 'rgba(255,215,0,.06)' : r === 2 ? 'rgba(192,200,208,.04)' : r === 3 ? 'rgba(205,127,50,.05)' : 'transparent';
const rankIcon = (r)=>r === 1 ? '🥇' : r === 2 ? '🥈' : r === 3 ? '🥉' : `#${r}`;
const formatDateTime = (isoString)=>{
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh'
    });
};
const formatDate = (isoString)=>{
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleDateString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh'
    });
};
const STATUS_LABELS = {
    // Registration
    Confirmed: 'Đã xác nhận',
    Pending: 'Chờ duyệt',
    Approved: 'Đã duyệt',
    Rejected: 'Từ chối',
    // Appeal
    Waiting: 'Chờ xử lý',
    Reviewing: 'Đang xét',
    Accepted: 'Đã duyệt',
    // Submission
    Received: 'Đã nhận'
};
const getStatusLabel = (status)=>STATUS_LABELS[status] ?? status;
const getStatusBadgeClass = (status)=>{
    const map = {
        Confirmed: 'bdg-g',
        Approved: 'bdg-g',
        Accepted: 'bdg-g',
        Received: 'bdg-g',
        Pending: 'bdg-w',
        Waiting: 'bdg-w',
        Reviewing: 'bdg-b',
        Rejected: 'bdg-r'
    };
    return map[status] ?? 'bdg-w';
};
}),
"[project]/src/app/leaderboard/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeaderboardRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Navbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Notif$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Notif.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EditModal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/EditModal.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ExportModal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ExportModal.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$LeaderboardPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/LeaderboardPage.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$scoreUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/scoreUtils.js [app-ssr] (ecmascript)");
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
function LeaderboardRoute() {
    const [criteria] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INIT_CRITERIA"]);
    const [teams, setTeams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INIT_TEAMS"]);
    const [editT, setEditT] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showExp, setShowExp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('score');
    const [notif, setNotif] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const sn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((m, t = 's')=>{
        setNotif({
            m,
            t
        });
        setTimeout(()=>setNotif(null), 3000);
    }, []);
    const ranked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            ...teams
        ].sort((a, b)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$scoreUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcScore"])(b.scores, criteria) - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$scoreUtils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcScore"])(a.scores, criteria)), [
        teams,
        criteria
    ]);
    const saveEdit = (tid, scores, cmts)=>{
        setTeams((p)=>p.map((t)=>t.id === tid ? {
                    ...t,
                    scores,
                    comments: cmts
                } : t));
        setEditT(null);
        sn('Đã lưu điểm thành công!');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                fileName: "[project]/src/app/leaderboard/page.jsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Notif$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                n: notif
            }, void 0, false, {
                fileName: "[project]/src/app/leaderboard/page.jsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            editT && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EditModal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                team: editT,
                criteria: criteria,
                onClose: ()=>setEditT(null),
                onSave: (s, c)=>saveEdit(editT.id, s, c)
            }, void 0, false, {
                fileName: "[project]/src/app/leaderboard/page.jsx",
                lineNumber: 39,
                columnNumber: 9
            }, this),
            showExp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ExportModal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                ranked: ranked,
                criteria: criteria,
                onClose: ()=>setShowExp(false),
                sn: sn
            }, void 0, false, {
                fileName: "[project]/src/app/leaderboard/page.jsx",
                lineNumber: 44,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                style: {
                    minHeight: '100vh',
                    background: '#f7f7f7',
                    padding: '28px 32px',
                    fontFamily: 'Inter, sans-serif'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$LeaderboardPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    teams: teams,
                    criteria: criteria,
                    sortBy: sortBy,
                    setSortBy: setSortBy,
                    onEdit: setEditT,
                    onExport: ()=>setShowExp(true)
                }, void 0, false, {
                    fileName: "[project]/src/app/leaderboard/page.jsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/leaderboard/page.jsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=src_1558d6ea._.js.map