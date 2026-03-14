module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { jsxDEV: _jsxDEV } = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/*#__PURE__*/ _jsxDEV("div", {
    className: "relative min-h-[100vh] flex flex-col justify-center items-center overflow-x-hidden py-10 px-4 md:px-8",
    children: [
        /*#__PURE__*/ _jsxDEV("video", {
            className: "absolute top-0 left-0 w-full h-full object-cover",
            autoPlay: true,
            loop: true,
            muted: true,
            playsInline: true,
            src: "/globe.mp4"
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 2,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
        /*#__PURE__*/ _jsxDEV("div", {
            className: "absolute top-0 left-0 w-full h-full bg-black/70"
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 10,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
        /*#__PURE__*/ _jsxDEV("main", {
            className: "relative z-10 w-full max-w-[1200px] flex flex-col items-center",
            children: [
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "flex flex-col sm:flex-row sm:justify-between sm:items-center w-full mb-8 gap-4",
                    children: [
                        /*#__PURE__*/ _jsxDEV("h1", {
                            className: "text-3xl md:text-4xl font-bold text-white text-center sm:text-left",
                            children: "Kosovo Air Quality"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 14,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ _jsxDEV("input", {
                                    type: "text",
                                    placeholder: "Search city...",
                                    value: search,
                                    onChange: (e)=>setSearch(e.target.value),
                                    className: "px-4 py-2 rounded-full focus:outline-none text-sm sm:text-base"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 19,
                                    columnNumber: 9
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                /*#__PURE__*/ _jsxDEV("button", {
                                    onClick: toggleTheme,
                                    className: "p-3 rounded-full flex items-center justify-center hover:opacity-90 transition-all",
                                    children: theme === "light" ? /*#__PURE__*/ _jsxDEV(MoonIcon, {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 32,
                                        columnNumber: 13
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e) : /*#__PURE__*/ _jsxDEV(SunIcon, {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 27,
                                    columnNumber: 9
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 18,
                            columnNumber: 7
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 13,
                    columnNumber: 5
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                error && /*#__PURE__*/ _jsxDEV("p", {
                    className: "text-red-600 mb-4 text-center",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 40,
                    columnNumber: 15
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full justify-items-center",
                    children: noCityFound ? /*#__PURE__*/ _jsxDEV("p", {
                        className: "text-white text-center w-full col-span-full",
                        children: "Sorry, this city is not supported yet"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e) : filteredCities.map((cityKey)=>/*#__PURE__*/ _jsxDEV(AQICard, {
                            city: cityMapping[cityKey],
                            data: data[cityKey],
                            loading: loading
                        }, cityKey, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e))
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 42,
                    columnNumber: 5
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                /*#__PURE__*/ _jsxDEV("div", {
                    className: "mt-6 text-center w-full",
                    children: /*#__PURE__*/ _jsxDEV("p", {
                        className: "text-white text-xs md:text-sm opacity-80 mx-auto",
                        children: "AQI (Air Quality Index) shows how clean or polluted the air is. Dominant pollutant indicates the particle or gas (PM2.5, PM10, NO2, O3) contributing most to the current pollution."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 60,
                        columnNumber: 7
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 59,
                    columnNumber: 5
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 12,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
    ]
}, void 0, true, {
    fileName: "[project]/app/page.tsx",
    lineNumber: 1,
    columnNumber: 1
}, /*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1222724e._.js.map