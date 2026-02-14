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
"[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/BotaoCheckout.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BotaoCheckout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function BotaoCheckout({ texto = 'QUERO GARANTIR MINHA VAGA', className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
_c = BotaoCheckout;
var _c;
__turbopack_context__.k.register(_c, "BotaoCheckout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PrecoAncorado
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function PrecoAncorado() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border-t-4 border-gold rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-[family-name:var(--font-inter)] text-navy/50 text-sm mb-1",
                children: "Valor original:"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-[family-name:var(--font-inter)] text-red-500 text-2xl font-bold line-through mb-4",
                children: "R$ 197,00"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-[family-name:var(--font-inter)] text-navy/70 text-sm mb-1",
                children: "Por apenas"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-[family-name:var(--font-playfair)] text-green-cta text-4xl font-bold mb-1",
                children: "8x de R$ 9,83"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-[family-name:var(--font-inter)] text-navy/60 text-sm mb-6",
                children: [
                    "(Ou ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-ice pt-5 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-[family-name:var(--font-inter)] text-navy/50 text-xs",
                        children: "☕ Menos que um café por dia"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-[family-name:var(--font-inter)] text-navy/50 text-xs",
                        children: "🍔 Menos que um lanche no final de semana"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_c = PrecoAncorado;
var _c;
__turbopack_context__.k.register(_c, "PrecoAncorado");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$src$2f$components$2f$BotaoCheckout$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/BotaoCheckout.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$src$2f$components$2f$PrecoAncorado$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Projeto-Mae-Que-Ora/app/src/components/PrecoAncorado.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
                className: "text-gold text-lg",
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
function VslPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { dor, video } = router.query;
    const [mostrarOferta, setMostrarOferta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const videoId = VIDEO_IDS[video] || VIDEO_IDS.default;
    const headline = HEADLINES[dor] || HEADLINES.protecao;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VslPage.useEffect": ()=>{
            if (!dor) return;
            let intervalId;
            let backupTimeoutId;
            // Backup timeout: delay + 10s in case player fails
            backupTimeoutId = setTimeout({
                "VslPage.useEffect": ()=>{
                    setMostrarOferta(true);
                }
            }["VslPage.useEffect"], (DELAY_SECONDS + 10) * 1000);
            // Poll Vturb player every second
            intervalId = setInterval({
                "VslPage.useEffect": ()=>{
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
                }
            }["VslPage.useEffect"], 1000);
            return ({
                "VslPage.useEffect": ()=>{
                    clearInterval(intervalId);
                    clearTimeout(backupTimeoutId);
                }
            })["VslPage.useEffect"];
        }
    }["VslPage.useEffect"], [
        dor
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Mãe que Ora — A Revelação"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$script$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                src: `https://scripts.converteai.net/994289b0-78e5-4109-9d11-0ad683baa8d0/players/${videoId}/v4/player.js`,
                strategy: "afterInteractive"
            }, void 0, false, {
                fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "min-h-screen bg-snow flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "bg-navy py-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mx-auto px-4 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-gradient-to-b from-navy to-navy-light py-12 px-4 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mx-auto animate-fade-in-up",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block font-[family-name:var(--font-inter)] text-gold/80 text-xs font-semibold tracking-[0.2em] uppercase mb-4",
                                    children: "Uma mensagem para você, mãe"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-snow py-10 px-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-2 border-gold/40 rounded-2xl overflow-hidden shadow-xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    mostrarOferta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-snow px-4 pb-16 animate-fade-in-up",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GoldDivider, {}, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$src$2f$components$2f$PrecoAncorado$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-8 text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$src$2f$components$2f$BotaoCheckout$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                        fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                    lineNumber: 134,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-10 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/assets/garantia-7-dias.webp",
                                            alt: "Garantia de 7 dias",
                                            className: "w-28 h-auto mx-auto mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Projeto-Mae-Que-Ora/app/src/pages/vsl.js",
                                            lineNumber: 140,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-[family-name:var(--font-inter)] text-navy/60 text-sm max-w-sm mx-auto leading-relaxed",
                                            children: [
                                                "Você tem ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GoldDivider, {}, void 0, false, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "bg-navy py-6 px-4 text-center mt-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_s(VslPage, "DV1rQ4Qe6j9ojQx7FOHkvl5MUoY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Projeto$2d$Mae$2d$Que$2d$Ora$2f$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = VslPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "GoldDivider");
__turbopack_context__.k.register(_c1, "VslPage");
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

//# sourceMappingURL=%5Broot-of-the-server%5D__d7aa8d44._.js.map