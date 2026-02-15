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
"[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuizPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/next/head.js [ssr] (ecmascript)");
;
;
;
;
/* ───────────────────────────────────────────
   Quiz de 15 etapas (sa + s1→s13 + loader s14)
   Fluxo linear de engajamento emocional.
   Todas as respostas levam à mesma próxima etapa.
   ─────────────────────────────────────────── */ const STEPS = [
    // 0 — sa (landing)
    {
        type: 'landing',
        headline: 'Existe uma oração capaz de transformar a vida do seu filho hoje.',
        highlight: 'Descubra qual é!',
        subtitle: 'Responda essas perguntas rápidas e receba um diagnóstico personalizado sobre a vida espiritual do seu filho(a) + as orações exatas que você precisa fazer hoje.',
        socialProof: 'Mais de 3.247 mães já descobriram o caminho certo para transformar a vida de seus filhos através da oração direcionada',
        cta: 'COMEÇAR MEU DIAGNÓSTICO AGORA'
    },
    // 1 — s1
    {
        question: 'O que tem pesado no seu coração em relação à vida do seu filho(a)?',
        options: [
            {
                emoji: '😔',
                text: 'Ele(a) não parece viver com a paz que deveria'
            },
            {
                emoji: '😟',
                text: 'Algo nele(a) me deixa inquieta, mesmo quando tudo parece normal'
            },
            {
                emoji: '😰',
                text: 'Sinto que ele(a) carrega um peso que não sei tirar'
            },
            {
                emoji: '💔',
                text: 'Meu coração sente que algo não está certo'
            }
        ]
    },
    // 2 — s2
    {
        question: 'Há quanto tempo isso te preocupa?',
        options: [
            {
                text: 'Menos de 1 mês'
            },
            {
                text: '1-6 meses'
            },
            {
                text: '6 meses - 1 ano'
            },
            {
                text: 'Mais de 1 ano'
            }
        ]
    },
    // 3 — s3
    {
        question: 'Sobre a vida do seu filho(a), qual pensamento volta com frequência?',
        options: [
            {
                emoji: '😔',
                text: 'Será que ele(a) está no caminho certo?'
            },
            {
                emoji: '😟',
                text: 'E se eu não estiver fazendo o suficiente?'
            },
            {
                emoji: '😰',
                text: 'Tenho medo de perdê-lo(a) para o mundo'
            },
            {
                emoji: '💔',
                text: 'Sinto que algo precisa mudar, mas não sei como'
            }
        ]
    },
    // 4 — s4
    {
        question: 'Quando você tenta entender o que está acontecendo, o que mais sente?',
        options: [
            {
                text: 'Confusão por não saber a causa'
            },
            {
                text: 'Angústia por não conseguir ajudar'
            },
            {
                text: 'Medo de estar falhando como mãe'
            },
            {
                text: 'Um aperto no coração difícil de explicar'
            }
        ]
    },
    // 5 — s5
    {
        question: 'Se você pudesse mudar UMA coisa na vida do seu filho(a), seria:',
        options: [
            {
                text: 'Mais paz e leveza'
            },
            {
                text: 'Mais proteção espiritual'
            },
            {
                text: 'Relacionamento mais próximo comigo'
            },
            {
                text: 'Propósito e direção de vida'
            }
        ]
    },
    // 6 — s6
    {
        question: 'Qual frase mais se aproxima do que você sente hoje?',
        options: [
            {
                emoji: '😔',
                text: 'Sinto que estou perdendo meu filho(a) aos poucos'
            },
            {
                emoji: '🌧️',
                text: 'Tenho medo do futuro dele(a)'
            },
            {
                emoji: '🔄',
                text: 'Já tentei de tudo e nada parece mudar'
            },
            {
                emoji: '🔮',
                text: 'Sinto que só Deus pode fazer algo por ele(a)'
            }
        ]
    },
    // 7 — s7
    {
        question: 'Qual é a MAIOR preocupação com seu filho(a)?',
        options: [
            {
                emoji: '😔',
                text: 'Comportamento e atitudes'
            },
            {
                emoji: '😟',
                text: 'Emoções e paz interior'
            },
            {
                emoji: '😰',
                text: 'Relacionamentos'
            },
            {
                emoji: '💔',
                text: 'Vida espiritual'
            }
        ]
    },
    // 8 — s8
    {
        question: 'Qual é a idade do seu filho(a)?',
        options: [
            {
                text: '0-5 anos'
            },
            {
                text: '6-12 anos'
            },
            {
                text: '13-17 anos'
            },
            {
                text: '18+ anos'
            }
        ]
    },
    // 9 — s9 (social proof)
    {
        type: 'social_proof',
        headline: 'Essas mães também sofreram muito pelos seus filhos...',
        highlight: 'Dê uma olhada, você vai se identificar!',
        cta: 'CONTINUAR'
    },
    // 10 — s10
    {
        question: 'Qual dessas frases mais representa o que você sente hoje?',
        options: [
            {
                emoji: '😔',
                text: 'Eu quero acreditar que ainda há esperança'
            },
            {
                emoji: '🌧️',
                text: 'Tenho chorado muito por causa disso'
            },
            {
                emoji: '🔄',
                text: 'Estou disposta a fazer qualquer coisa pelo meu filho(a)'
            },
            {
                emoji: '🔮',
                text: 'Preciso de uma direção, de um caminho'
            }
        ]
    },
    // 11 — s11
    {
        question: 'Você já tentou orar pelo seu filho(a) antes?',
        options: [
            {
                text: 'Sim, mas não vi resultado'
            },
            {
                text: 'Sim, e vi alguma mudança'
            },
            {
                text: 'Não, nunca tentei'
            },
            {
                text: 'Oro todos os dias, mas quero orar com mais direção'
            }
        ]
    },
    // 12 — s12
    {
        question: 'Se existisse um plano de oração de 14 dias específico para o seu filho(a), você faria?',
        options: [
            {
                text: 'Com certeza! Preciso disso!'
            },
            {
                text: 'Sim, se fosse algo prático e fácil de seguir'
            },
            {
                text: 'Talvez, depende do que inclui'
            },
            {
                text: 'Não tenho certeza'
            }
        ]
    },
    // 13 — s13
    {
        question: 'O que você estaria disposta a investir para ver a transformação na vida do seu filho(a)?',
        options: [
            {
                text: 'Qualquer valor se realmente funcionar'
            },
            {
                text: 'Algo acessível'
            },
            {
                text: 'O mínimo possível'
            },
            {
                text: 'Nada, quero algo gratuito'
            }
        ]
    },
    // 14 — s14 (loader)
    {
        type: 'loader',
        headline: 'Estamos Preparando Seu Diagnóstico...',
        subtitle: 'Analisando suas respostas para encontrar as orações perfeitas para o seu filho(a)'
    }
];
const TOTAL_QUESTIONS = STEPS.length;
/* ── Componentes auxiliares ─────────────────── */ function GoldDivider() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center gap-3 my-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "h-px w-12 bg-gradient-to-r from-transparent to-gold opacity-60"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "text-gold text-lg",
                children: "✦"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "h-px w-12 bg-gradient-to-l from-transparent to-gold opacity-60"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
function ProgressBar({ current, total }) {
    const pct = Math.round(current / total * 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "w-full max-w-md mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "font-[family-name:var(--font-inter)] text-navy/40 text-xs",
                        children: [
                            "Pergunta ",
                            current,
                            " de ",
                            total - 2
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "font-[family-name:var(--font-inter)] text-gold text-xs font-semibold",
                        children: [
                            pct,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "w-full h-2 bg-ice rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-500 ease-out",
                    style: {
                        width: `${pct}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                    lineNumber: 187,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                lineNumber: 186,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
        lineNumber: 177,
        columnNumber: 5
    }, this);
}
function OptionCard({ option, index, onSelect }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: ()=>onSelect(index),
        className: "group w-full text-left bg-white border border-ice rounded-xl p-5   shadow-sm hover:shadow-lg hover:border-gold/50   transition-all duration-300 ease-out cursor-pointer   animate-fade-in-up",
        style: {
            animationDelay: `${0.1 + index * 0.08}s`
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4",
            children: [
                option.emoji && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: "text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300",
                    children: option.emoji
                }, void 0, false, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                    lineNumber: 208,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: "font-[family-name:var(--font-inter)] text-navy text-sm sm:text-base leading-snug group-hover:text-gold transition-colors duration-300",
                    children: option.text
                }, void 0, false, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                    lineNumber: 212,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: "ml-auto flex-shrink-0 text-navy/20 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300",
                    children: "→"
                }, void 0, false, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                    lineNumber: 215,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
            lineNumber: 206,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
function QuizPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [transitioning, setTransitioning] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [loaderProgress, setLoaderProgress] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const currentStep = STEPS[step];
    const advance = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        setTransitioning(true);
        setTimeout(()=>{
            if (step < STEPS.length - 1) {
                setStep((s)=>s + 1);
            }
            setTransitioning(false);
        }, 300);
    }, [
        step
    ]);
    // Loader auto-redirect
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (currentStep.type !== 'loader') return;
        const duration = 5000; // 5 seconds
        const interval = 50;
        let elapsed = 0;
        const id = setInterval(()=>{
            elapsed += interval;
            setLoaderProgress(Math.min(100, Math.round(elapsed / duration * 100)));
            if (elapsed >= duration) {
                clearInterval(id);
                router.push('/vsl?dor=diagnostico');
            }
        }, interval);
        return ()=>clearInterval(id);
    }, [
        currentStep,
        router
    ]);
    // ── LANDING (sa) ──
    if (currentStep.type === 'landing') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                            children: "Mãe que Ora — Diagnóstico Espiritual"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                            lineNumber: 268,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                            name: "description",
                            content: "Descubra qual oração pode transformar a vida do seu filho. Diagnóstico espiritual personalizado para mães."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                            lineNumber: 269,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                    lineNumber: 267,
                    columnNumber: 9
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
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                    lineNumber: 278,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                lineNumber: 277,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                            className: "bg-gradient-to-b from-navy to-navy-light py-16 px-4 text-center flex-1 flex items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "max-w-2xl mx-auto animate-fade-in-up",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "inline-block font-[family-name:var(--font-inter)] text-gold/80 text-xs font-semibold tracking-[0.2em] uppercase mb-4",
                                        children: "Diagnóstico Espiritual Personalizado"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 286,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: "font-[family-name:var(--font-playfair)] text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5",
                                        children: [
                                            currentStep.headline,
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-gold",
                                                children: currentStep.highlight
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "font-[family-name:var(--font-inter)] text-white/70 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-6",
                                        children: currentStep.subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "font-[family-name:var(--font-inter)] text-gold/80 text-sm mb-8",
                                        children: [
                                            "✅ ",
                                            currentStep.socialProof
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 297,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: advance,
                                        className: "inline-block w-full max-w-md mx-auto bg-green-cta text-white text-center   font-[family-name:var(--font-inter)] font-bold text-lg tracking-wide   py-4 px-8 rounded-full shadow-lg   hover:bg-green-cta-hover hover:scale-105   transition-all duration-300 ease-out   animate-pulse-gentle cursor-pointer",
                                        children: currentStep.cta
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-center font-[family-name:var(--font-inter)] text-white/30 text-xs mt-6",
                                        children: "🔒 Suas respostas são 100% confidenciais"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 313,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                            lineNumber: 284,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                            className: "bg-navy py-6 px-4 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "font-[family-name:var(--font-inter)] text-white/30 text-xs",
                                children: [
                                    "© ",
                                    new Date().getFullYear(),
                                    " Mãe que Ora — Todos os direitos reservados."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                lineNumber: 320,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                            lineNumber: 319,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                    lineNumber: 275,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    // ── SOCIAL PROOF (s9) ──
    if (currentStep.type === 'social_proof') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Mãe que Ora — Diagnóstico"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                        lineNumber: 334,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                    lineNumber: 333,
                    columnNumber: 9
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
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                    lineNumber: 340,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                lineNumber: 339,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                            lineNumber: 338,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                            className: "flex-1 px-4 py-10 bg-snow",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "max-w-xl mx-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ProgressBar, {
                                        current: step,
                                        total: TOTAL_QUESTIONS
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 348,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "mt-8 animate-fade-in-up text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "font-[family-name:var(--font-playfair)] text-navy text-2xl sm:text-3xl font-bold leading-tight mb-2",
                                                children: currentStep.headline
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                                lineNumber: 351,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "font-[family-name:var(--font-inter)] text-gold text-base font-semibold mb-8",
                                                children: currentStep.highlight
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                                lineNumber: 354,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-3 mb-8",
                                                children: [
                                                    1,
                                                    2,
                                                    3,
                                                    4
                                                ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                        src: `/assets/depoimento-0${n}.png`,
                                                        alt: `Depoimento ${n}`,
                                                        className: "rounded-xl shadow-sm w-full h-auto"
                                                    }, n, false, {
                                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                                        lineNumber: 360,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                                lineNumber: 358,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: advance,
                                                className: "inline-block w-full max-w-sm mx-auto bg-green-cta text-white text-center   font-[family-name:var(--font-inter)] font-bold text-base tracking-wide   py-4 px-8 rounded-full shadow-lg   hover:bg-green-cta-hover hover:scale-105   transition-all duration-300 ease-out   animate-pulse-gentle cursor-pointer",
                                                children: currentStep.cta
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                                lineNumber: 369,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 350,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                            lineNumber: 346,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                            className: "bg-navy py-6 px-4 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "font-[family-name:var(--font-inter)] text-white/30 text-xs",
                                children: [
                                    "© ",
                                    new Date().getFullYear(),
                                    " Mãe que Ora — Todos os direitos reservados."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                lineNumber: 385,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                            lineNumber: 384,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                    lineNumber: 337,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    // ── LOADER (s14) ──
    if (currentStep.type === 'loader') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Mãe que Ora — Preparando Diagnóstico..."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                        lineNumber: 399,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                    lineNumber: 398,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                    className: "min-h-screen bg-navy flex flex-col items-center justify-center px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "max-w-md mx-auto text-center animate-fade-in-up",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-5xl block mb-4",
                                        children: "🙏"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 405,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: "font-[family-name:var(--font-playfair)] text-white text-2xl sm:text-3xl font-bold leading-tight mb-3",
                                        children: currentStep.headline
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 406,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "font-[family-name:var(--font-inter)] text-white/60 text-sm leading-relaxed",
                                        children: currentStep.subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 409,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                lineNumber: 404,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "w-full max-w-xs mx-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-full h-3 bg-white/10 rounded-full overflow-hidden mb-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-100 ease-linear",
                                            style: {
                                                width: `${loaderProgress}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                            lineNumber: 417,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 416,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "font-[family-name:var(--font-inter)] text-gold text-sm font-semibold",
                                        children: [
                                            loaderProgress,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                        lineNumber: 422,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                lineNumber: 415,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "font-[family-name:var(--font-inter)] text-white/30 text-xs mt-8",
                                children: "Por favor, não feche esta página..."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                lineNumber: 427,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                        lineNumber: 403,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                    lineNumber: 402,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    // ── QUESTION (padrão: s1→s13) ──
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Mãe que Ora — Diagnóstico"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Diagnóstico espiritual personalizado para mães que querem transformar a vida dos seus filhos."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                        lineNumber: 441,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                lineNumber: 439,
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
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                lineNumber: 450,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                        lineNumber: 448,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "flex-1 px-4 py-10 bg-snow",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "max-w-xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ProgressBar, {
                                    current: step,
                                    total: TOTAL_QUESTIONS
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                    lineNumber: 458,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GoldDivider, {}, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                    lineNumber: 460,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: `transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                            className: "font-[family-name:var(--font-playfair)] text-navy text-xl sm:text-2xl font-bold leading-tight text-center mb-8 animate-fade-in-up",
                                            children: currentStep.question
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                            lineNumber: 465,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: currentStep.options.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(OptionCard, {
                                                    option: opt,
                                                    index: i,
                                                    onSelect: advance
                                                }, i, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                                    lineNumber: 471,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                            lineNumber: 469,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                    lineNumber: 462,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GoldDivider, {}, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                    lineNumber: 476,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-center font-[family-name:var(--font-inter)] text-navy/40 text-xs",
                                    children: "🔒 Suas respostas são confidenciais e servem apenas para personalizar sua experiência."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                                    lineNumber: 478,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                            lineNumber: 457,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                        lineNumber: 456,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                        className: "bg-navy py-6 px-4 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "font-[family-name:var(--font-inter)] text-white/30 text-xs",
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " Mãe que Ora — Todos os direitos reservados."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                            lineNumber: 486,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                        lineNumber: 485,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/index.js",
                lineNumber: 447,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__1b75be0d._.js.map