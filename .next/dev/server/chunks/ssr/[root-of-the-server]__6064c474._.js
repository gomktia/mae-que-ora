module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/BotaoCheckout.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BotaoCheckout
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function BotaoCheckout({ texto = 'QUERO GARANTIR MINHA VAGA', className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
        href: "https://pay.kiwify.com.br/C10XqRz",
        target: "_blank",
        rel: "noopener noreferrer",
        className: `inline-block w-full max-w-md mx-auto bg-green-cta text-white text-center
                  font-[family-name:var(--font-inter)] font-bold text-lg tracking-wide
                  py-4 px-8 rounded-full shadow-lg
                  hover:bg-green-cta-hover hover:scale-105
                  transition-all duration-300 ease-out
                  animate-pulse-gentle cursor-pointer ${className}`,
        children: texto
    }, void 0, false, {
        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/BotaoCheckout.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PrecoAncorado
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function PrecoAncorado() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-white border-t-4 border-gold rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "font-[family-name:var(--font-inter)] text-navy/50 text-sm mb-1",
                children: "Valor original:"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "font-[family-name:var(--font-inter)] text-red-500 text-2xl font-bold line-through mb-4",
                children: "R$ 197,00"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "font-[family-name:var(--font-inter)] text-navy/70 text-sm mb-1",
                children: "Por apenas"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "font-[family-name:var(--font-playfair)] text-green-cta text-4xl font-bold mb-1",
                children: "8x de R$ 9,83"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "font-[family-name:var(--font-inter)] text-navy/60 text-sm mb-6",
                children: [
                    "(Ou ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        className: "text-navy",
                        children: "R$ 67,00"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                        lineNumber: 18,
                        columnNumber: 13
                    }, this),
                    " à vista)"
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "border-t border-ice pt-5 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "font-[family-name:var(--font-inter)] text-navy/50 text-xs",
                        children: "☕ Menos que um café por dia"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "font-[family-name:var(--font-inter)] text-navy/50 text-xs",
                        children: "🍔 Menos que um lanche no final de semana"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "font-[family-name:var(--font-inter)] text-navy/50 text-xs",
                        children: "💆 Menos que uma sessão de terapia"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VslPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$script$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/next/script.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$src$2f$components$2f$BotaoCheckout$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/BotaoCheckout.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$src$2f$components$2f$PrecoAncorado$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js [ssr] (ecmascript)");
;
;
;
;
;
;
;
const HEADLINES = {
    afastamento: 'Seu filho se afastou... mas Deus não desistiu dele',
    rebeldia: 'A rebeldia do seu filho tem uma raiz... e a oração pode alcançá-la',
    protecao: 'Blindar seu filho com oração é o maior ato de amor',
    diagnostico: 'Seu diagnóstico está pronto. O que descobrimos vai te surpreender...'
};
const VIDEO_IDS = {
    s10: '6976875aa19ff9c17f8fb644',
    s12: '695c31ac19650840e5c003e0',
    default: '6976875aa19ff9c17f8fb644'
};
const DELAY_SECONDS = 130;
function GoldDivider() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center gap-3 my-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "h-px w-12 bg-gradient-to-r from-transparent to-gold opacity-60"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "text-gold text-lg",
                children: "✦"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "h-px w-12 bg-gradient-to-l from-transparent to-gold opacity-60"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
function VslPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { dor, video } = router.query;
    const [mostrarOferta, setMostrarOferta] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const videoId = VIDEO_IDS[video] || VIDEO_IDS.default;
    const headline = HEADLINES[dor] || HEADLINES.protecao;
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!dor) return;
        let intervalId;
        let backupTimeoutId;
        // Backup timeout: delay + 10s in case player fails
        backupTimeoutId = setTimeout(()=>{
            setMostrarOferta(true);
        }, (DELAY_SECONDS + 10) * 1000);
        // Poll Vturb player every second
        intervalId = setInterval(()=>{
            try {
                const smartplayer = document.getElementById(`vid-${videoId}`);
                if (smartplayer && typeof smartplayer.getPlayedTime === 'function') {
                    const played = smartplayer.getPlayedTime();
                    if (played >= DELAY_SECONDS) {
                        setMostrarOferta(true);
                        clearInterval(intervalId);
                        clearTimeout(backupTimeoutId);
                    }
                }
            } catch (e) {
            // Player not ready yet
            }
        }, 1000);
        return ()=>{
            clearInterval(intervalId);
            clearTimeout(backupTimeoutId);
        };
    }, [
        dor
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Mãe que Ora — A Revelação"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Descubra como a oração pode transformar a vida do seu filho."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$script$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                src: `https://scripts.converteai.net/994289b0-78e5-4109-9d11-0ad683baa8d0/players/${videoId}/v4/player.js`,
                strategy: "afterInteractive"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "min-h-screen bg-snow flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: "bg-navy py-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mx-auto px-4 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "font-[family-name:var(--font-playfair)] text-gold text-xl font-bold tracking-wide",
                                children: "Mãe que Ora"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "bg-gradient-to-b from-navy to-navy-light py-12 px-4 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mx-auto animate-fade-in-up",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "inline-block font-[family-name:var(--font-inter)] text-gold/80 text-xs font-semibold tracking-[0.2em] uppercase mb-4",
                                    children: "Uma mensagem para você, mãe"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    className: "font-[family-name:var(--font-playfair)] text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-5",
                                    children: headline
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "bg-snow py-10 px-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "border-2 border-gold/40 rounded-2xl overflow-hidden shadow-xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        id: `vid-${videoId}`,
                                        style: {
                                            position: 'relative',
                                            width: '100%',
                                            padding: '56.25% 0 0 0'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-center font-[family-name:var(--font-inter)] text-navy/50 text-sm mt-4",
                                    children: "🔊 Verifique se o som está ligado"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    mostrarOferta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "bg-snow px-4 pb-16 animate-fade-in-up",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GoldDivider, {}, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$src$2f$components$2f$PrecoAncorado$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "mt-8 text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$src$2f$components$2f$BotaoCheckout$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 134,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "mt-10 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/assets/garantia-7-dias.webp",
                                            alt: "Garantia de 7 dias",
                                            className: "w-28 h-auto mx-auto mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                            lineNumber: 140,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "font-[family-name:var(--font-inter)] text-navy/60 text-sm max-w-sm mx-auto leading-relaxed",
                                            children: [
                                                "Você tem ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                    className: "text-navy",
                                                    children: "7 dias de garantia"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 146,
                                                    columnNumber: 28
                                                }, this),
                                                " incondicional. Se não ficar satisfeita, devolvemos 100% do seu investimento."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GoldDivider, {}, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                            lineNumber: 129,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                        className: "bg-navy py-6 px-4 text-center mt-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "font-[family-name:var(--font-inter)] text-white/60 text-xs",
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " Mãe que Ora — Todos os direitos reservados."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6064c474._.js.map