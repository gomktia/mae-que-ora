(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VslPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$script$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/next/script.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/next/image.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const VIDEO_IDS = {
    s10: '6976875aa19ff9c17f8fb644',
    s12: '695c31ac19650840e5c003e0',
    default: '6976875aa19ff9c17f8fb644'
};
const HEADLINES = {
    afastamento: 'Seu filho se afastou... mas Deus não desistiu dele',
    rebeldia: 'A rebeldia do seu filho tem uma raiz... e a oração pode alcançá-la',
    protecao: 'Blindar seu filho com oração é o maior ato de amor',
    diagnostico: 'Seu diagnóstico está pronto. O que descobrimos vai te surpreender...'
};
const DELAY_SECONDS = 130;
function GoldDivider() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center gap-3 my-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-px w-12 bg-gradient-to-r from-transparent to-gold opacity-60"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-gold text-2xl",
                children: "✦"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c = GoldDivider;
function GuaranteeSeal() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center mt-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-32 h-32 mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/assets/garantia-7-dias.webp",
                    alt: "Garantia de 7 Dias",
                    layout: "fill",
                    objectFit: "contain"
                }, void 0, false, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-[family-name:var(--font-inter)] text-white/90 text-[16px] text-center max-w-sm leading-relaxed tracking-wide",
                children: [
                    "Você tem ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        className: "text-gold",
                        children: "7 dias de garantia incondicional"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 45,
                        columnNumber: 18
                    }, this),
                    ".",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    "Se não amar, devolvemos 100% do seu dinheiro."
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_c1 = GuaranteeSeal;
function TestimonialCard({ src, index }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full max-w-md mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg border border-gold/20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            src: src,
            alt: `Depoimento ${index + 1}`,
            width: 500,
            height: 600,
            layout: "responsive",
            loading: "lazy",
            className: "w-full h-auto"
        }, void 0, false, {
            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c2 = TestimonialCard;
function BonusCard({ title, items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-navy-light/40 border border-gold/30 rounded-2xl p-6 mb-6 shadow-md backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-4xl",
                    children: "🎁"
                }, void 0, false, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-[family-name:var(--font-playfair)] text-gold text-2xl font-bold mb-2 leading-tight",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-2",
                            children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "font-[family-name:var(--font-inter)] text-white/90 text-lg leading-[1.7] tracking-[0.02em]",
                                    children: [
                                        "• ",
                                        item
                                    ]
                                }, i, true, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                    lineNumber: 73,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
            lineNumber: 71,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_c3 = BonusCard;
function VslPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { dor, video } = router.query;
    const [mostrarOferta, setMostrarOferta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [childName, setChildName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('seu filho(a)');
    // VSL Logic
    const videoId = VIDEO_IDS[video] || (VIDEO_IDS[router.query.video] ? VIDEO_IDS[router.query.video] : VIDEO_IDS.default);
    // Headline Logic
    const headlineText = HEADLINES[dor] || HEADLINES.diagnostico;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VslPage.useEffect": ()=>{
            // Load Child Name
            const savedName = localStorage.getItem('filhonome');
            if (savedName) setChildName(savedName);
            // Delay Logic
            const backupTimeout = setTimeout({
                "VslPage.useEffect.backupTimeout": ()=>setMostrarOferta(true)
            }["VslPage.useEffect.backupTimeout"], DELAY_SECONDS * 1000);
            // Check local storage for debug or if user already saw offer? 
            // Implementing simpler robust interval check for Vturb
            const checkInterval = setInterval({
                "VslPage.useEffect.checkInterval": ()=>{
                // Always try to find the player instance or just rely on time
                // Since we can't easily hook into external player without their API explicitly loaded in window
                // The simplistic backupTimeout is the most reliable fallback.
                // We will stick to the backupTimeout for reliability in this context
                }
            }["VslPage.useEffect.checkInterval"], 1000);
            return ({
                "VslPage.useEffect": ()=>{
                    clearTimeout(backupTimeout);
                    clearInterval(checkInterval);
                }
            })["VslPage.useEffect"];
        }
    }["VslPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Mãe que Ora — A Revelação"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Descubra o plano de oração para transformar a vida do seu filho."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "min-h-screen bg-navy text-white flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "bg-navy-light py-5 shadow-md z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mx-auto px-4 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-[family-name:var(--font-playfair)] text-gold text-2xl font-bold tracking-wide",
                                children: "Mãe que Ora"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                lineNumber: 135,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-gradient-to-b from-navy to-navy-light pt-8 pb-10 px-4 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-3xl mx-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "font-[family-name:var(--font-playfair)] text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mb-6",
                                        children: headlineText
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-[family-name:var(--font-inter)] text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-8",
                                        children: "Assista a este vídeo curto para entender como começar."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl border border-gold/20 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        id: `vid-${videoId}`,
                                        style: {
                                            position: 'relative',
                                            width: '100%',
                                            padding: '56.25% 0 0 0'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                id: `thumb-${videoId}`,
                                                src: `https://images.converteai.net/994289b0-78e5-4109-9d11-0ad683baa8d0/players/${videoId}/thumbnail.jpg`,
                                                style: {
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    display: 'block'
                                                },
                                                alt: "Thumbnail"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                lineNumber: 158,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                id: `backdrop-${videoId}`,
                                                style: {
                                                    position: 'absolute',
                                                    top: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    webkitBackdropFilter: 'blur(5px)',
                                                    backdropFilter: 'blur(5px)'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                lineNumber: 164,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$script$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        id: "vturb-script",
                                        src: `https://scripts.converteai.net/994289b0-78e5-4109-9d11-0ad683baa8d0/players/${videoId}/v4/player.js`,
                                        strategy: "afterInteractive"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-2 text-white/60 text-sm font-[family-name:var(--font-inter)] animate-pulse",
                                children: "🔊 Por favor, certifique-se de que seu som está ligado."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    mostrarOferta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-fade-in-up",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "bg-navy px-4 py-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-2xl mx-auto text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GoldDivider, {}, void 0, false, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                            lineNumber: 188,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-[family-name:var(--font-playfair)] text-white text-3xl sm:text-4xl font-bold leading-tight mb-6",
                                            children: [
                                                "Este é o caminho para transformar a vida de ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gold",
                                                    children: childName
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 190,
                                                    columnNumber: 63
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-[family-name:var(--font-inter)] text-white/90 text-[20px] leading-[1.7] tracking-[0.02em] mb-8 text-left sm:text-center",
                                            children: [
                                                "Você não precisa mais lutar sozinha. Com o ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Guia Mãe que Ora"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 193,
                                                    columnNumber: 62
                                                }, this),
                                                ", você terá o passo a passo exato para interceder por ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gold font-bold",
                                                    children: childName
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 193,
                                                    columnNumber: 149
                                                }, this),
                                                " e ver as promessas de Deus se cumprirem."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                            lineNumber: 192,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-left mt-10 space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-[family-name:var(--font-playfair)] text-white text-2xl font-bold mb-6 text-center",
                                                    children: "O que está incluso:"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 198,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BonusCard, {
                                                    title: "Guia Oficial Mãe que Ora",
                                                    items: [
                                                        'O plano completo de 14 dias',
                                                        'Orações diárias poderosas',
                                                        'Fundamentos bíblicos'
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 202,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BonusCard, {
                                                    title: "Bônus 1: Consagração Materna 2026",
                                                    items: [
                                                        'Ritual de entrega e confiança',
                                                        'Áudios guiados para momentos de paz'
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 206,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BonusCard, {
                                                    title: "Bônus 2: Comunidade Exclusiva",
                                                    items: [
                                                        'Grupo de apoio com outras mães',
                                                        'Troca de experiências e testemunhos'
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 210,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BonusCard, {
                                                    title: "Bônus 3: E-book Orações de Guerra",
                                                    items: [
                                                        'Para momentos de crise extrema',
                                                        'Palavras de autoridade espiritual'
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 214,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BonusCard, {
                                                    title: "Bônus 4: Guia de Jejum para Mães",
                                                    items: [
                                                        'Como jejuar pelo seu filho',
                                                        'Tipos de jejum e propósitos'
                                                    ]
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 218,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                            lineNumber: 197,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-12 bg-navy-light p-8 rounded-3xl border-2 border-gold/50 shadow-[0_0_40px_rgba(212,175,55,0.15)]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-[family-name:var(--font-inter)] text-white/60 text-lg mb-2 uppercase tracking-widest font-bold",
                                                    children: "Oferta Especial de Lançamento"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-[family-name:var(--font-inter)] text-white/50 text-xl font-medium mb-4",
                                                    children: [
                                                        "De ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "line-through text-red-400",
                                                            children: "R$ 197,00"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                            lineNumber: 230,
                                                            columnNumber: 24
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 229,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-[family-name:var(--font-playfair)] text-gold text-5xl sm:text-6xl font-bold mb-2",
                                                    children: "R$ 67,00"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 232,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-[family-name:var(--font-inter)] text-white/80 text-lg mb-8",
                                                    children: [
                                                        "ou em ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "8x de R$ 9,83"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                            lineNumber: 236,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 235,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "https://pay.kiwify.com.br/YOUR_LINK_HERE",
                                                    target: "_blank",
                                                    className: "group relative flex items-center justify-center w-full bg-gradient-to-r from-gold to-yellow-500 text-navy    font-[family-name:var(--font-inter)] font-bold text-[22px] sm:text-[26px] tracking-wide uppercase   h-[80px] rounded-full shadow-[0_0_30px_rgba(255,215,0,0.5)]   hover:scale-105 hover:shadow-[0_0_50px_rgba(255,215,0,0.7)]   transition-all duration-300 ease-in-out animate-pulse-gentle cursor-pointer",
                                                    children: "SIM, QUERO SALVAR MEU FILHO"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 240,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 flex items-center justify-center gap-2 text-white/60 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "🔒"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                            lineNumber: 253,
                                                            columnNumber: 21
                                                        }, this),
                                                        " Pagamento 100% Seguro"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                    lineNumber: 252,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                            lineNumber: 225,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GuaranteeSeal, {}, void 0, false, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                            lineNumber: 258,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-8 text-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://pay.kiwify.com.br/YOUR_LINK_HERE",
                                                className: "text-white/60 underline hover:text-gold transition-colors text-sm",
                                                children: "Prefiro continuar vendo meu filho sofrer (Não recomendado)"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                lineNumber: 262,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                            lineNumber: 261,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "bg-navy-light/20 py-12 px-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-2xl mx-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-[family-name:var(--font-playfair)] text-white text-3xl font-bold text-center mb-10",
                                            children: "O que outras mães estão dizendo"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                            lineNumber: 273,
                                            columnNumber: 17
                                        }, this),
                                        [
                                            1,
                                            2,
                                            3,
                                            4,
                                            5,
                                            6
                                        ].map((num, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TestimonialCard, {
                                                src: `/assets/depoimento-0${num}.png`,
                                                index: i
                                            }, i, false, {
                                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                lineNumber: 279,
                                                columnNumber: 19
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-12 text-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://pay.kiwify.com.br/YOUR_LINK_HERE",
                                                target: "_blank",
                                                className: "inline-block bg-gold text-navy    font-[family-name:var(--font-inter)] font-bold text-xl uppercase tracking-wide   py-5 px-10 rounded-full shadow-lg   hover:scale-105 transition-all duration-300",
                                                children: "QUERO FAZER PARTE"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                                lineNumber: 287,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                            lineNumber: 286,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 272,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 183,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "bg-navy py-10 px-4 text-center border-t border-white/5 mt-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-[family-name:var(--font-inter)] text-white/40 text-sm",
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " Mãe que Ora — Todos os direitos reservados.",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] mt-2 block opacity-60",
                                    children: "Os resultados podem variar de pessoa para pessoa. Este site não é afiliado ao Facebook ou Google."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 308,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(VslPage, "dnRAvijCKCK+Bm/g+k9H+FN+7kE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c4 = VslPage;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "GoldDivider");
__turbopack_context__.k.register(_c1, "GuaranteeSeal");
__turbopack_context__.k.register(_c2, "TestimonialCard");
__turbopack_context__.k.register(_c3, "BonusCard");
__turbopack_context__.k.register(_c4, "VslPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/vsl";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__64f2a303._.js.map