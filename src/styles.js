const CSS = `
.cfs-wrapper{position:relative;width:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;font-size:14px;box-sizing:border-box}
.cfs-wrapper *{box-sizing:border-box}

/* ── Control ── */
.cfs-control{display:flex;align-items:center;flex-wrap:wrap;gap:5px;min-height:44px;padding:6px 42px 6px 10px;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;cursor:pointer;transition:border-color .2s,box-shadow .2s;position:relative;user-select:none;outline:none}
.cfs-control:hover{border-color:#94a3b8}
.cfs-wrapper.cfs-open .cfs-control,.cfs-control:focus{border-color:#6366f1;box-shadow:0 0 0 3.5px rgba(99,102,241,.15)}

/* ── Placeholder & single value ── */
.cfs-placeholder{color:#94a3b8;flex:1;pointer-events:none}
.cfs-single-value{display:flex;align-items:center;gap:8px;flex:1;color:#0f172a;min-width:0}
.cfs-single-flag{font-size:20px;line-height:1;flex-shrink:0}
.cfs-single-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* ── Arrow ── */
.cfs-arrow{position:absolute;right:12px;top:50%;transform:translateY(-50%);width:18px;height:18px;display:flex;align-items:center;justify-content:center;color:#94a3b8;transition:transform .22s ease,color .15s;pointer-events:none}
.cfs-wrapper.cfs-open .cfs-arrow{transform:translateY(-50%) rotate(180deg);color:#6366f1}
.cfs-arrow svg{display:block}

/* ── Clear button ── */
.cfs-clear{position:absolute;right:34px;top:50%;transform:translateY(-50%);width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:#94a3b8;cursor:pointer;border-radius:50%;transition:color .15s,background .15s;flex-shrink:0}
.cfs-clear:hover{color:#ef4444;background:#fee2e2}
.cfs-clear svg{display:block;pointer-events:none}

/* ── Multi tags ── */
.cfs-tag{display:inline-flex;align-items:center;gap:3px;background:#ede9fe;color:#4f46e5;border-radius:6px;padding:3px 4px 3px 8px;font-size:12.5px;font-weight:500;max-width:160px;animation:cfs-tag-in .15s ease}
@keyframes cfs-tag-in{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
.cfs-tag-flag{font-size:14px;flex-shrink:0}
.cfs-tag-name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cfs-tag-remove{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;cursor:pointer;transition:background .15s;flex-shrink:0}
.cfs-tag-remove:hover{background:#c4b5fd}
.cfs-tag-remove svg{display:block;pointer-events:none}

/* ── Dropdown menu ── */
.cfs-menu{position:absolute;top:calc(100% + 6px);left:0;right:0;background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.12),0 4px 12px rgba(0,0,0,.06);z-index:9999;overflow:hidden;animation:cfs-menu-in .18s cubic-bezier(.34,1.56,.64,1);transform-origin:top center}
@keyframes cfs-menu-in{from{opacity:0;transform:scaleY(.9) translateY(-4px)}to{opacity:1;transform:scaleY(1) translateY(0)}}
.cfs-menu-top{top:auto;bottom:calc(100% + 6px);transform-origin:bottom center}

/* ── Search ── */
.cfs-search-wrap{padding:10px 10px 6px;border-bottom:1px solid #f1f5f9}
.cfs-search{width:100%;padding:8px 10px 8px 34px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:13px;background:#f8fafc;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:10px center;outline:none;transition:border-color .15s,box-shadow .15s;color:#0f172a;font-family:inherit}
.cfs-search:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.12);background-color:#fff}

/* ── Options list ── */
.cfs-options{max-height:260px;overflow-y:auto;padding:6px}
.cfs-options::-webkit-scrollbar{width:4px}
.cfs-options::-webkit-scrollbar-track{background:transparent}
.cfs-options::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:2px}
.cfs-options::-webkit-scrollbar-thumb:hover{background:#94a3b8}

/* ── Option item ── */
.cfs-option{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;transition:background .1s;color:#1e293b}
.cfs-option:hover,.cfs-option.cfs-focused{background:#f1f5f9}
.cfs-option.cfs-selected{background:#ede9fe;color:#4f46e5;font-weight:500}
.cfs-option.cfs-selected.cfs-focused{background:#e0d9fd}
.cfs-option-flag{font-size:22px;line-height:1;flex-shrink:0}
.cfs-option-name{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cfs-option-code{font-size:11px;color:#94a3b8;font-weight:600;font-family:monospace;letter-spacing:.03em;flex-shrink:0}
.cfs-option.cfs-selected .cfs-option-code{color:#a5b4fc}
.cfs-check{width:15px;height:15px;flex-shrink:0;color:#6366f1}

/* ── No results ── */
.cfs-no-options{padding:20px 12px;text-align:center;color:#94a3b8;font-size:13px}

/* ── Disabled ── */
.cfs-wrapper.cfs-disabled .cfs-control{cursor:not-allowed;opacity:.58;background:#f8fafc;pointer-events:none}

/* ── Dark theme ── */
.cfs-wrapper.cfs-theme-dark .cfs-control,
@media (prefers-color-scheme:dark){
  .cfs-wrapper:not(.cfs-theme-light) .cfs-control{background:#1e293b;border-color:#334155;color:#f1f5f9}
  .cfs-wrapper:not(.cfs-theme-light) .cfs-control:hover{border-color:#475569}
  .cfs-wrapper:not(.cfs-theme-light).cfs-open .cfs-control,.cfs-wrapper:not(.cfs-theme-light) .cfs-control:focus{border-color:#818cf8;box-shadow:0 0 0 3.5px rgba(129,140,248,.15)}
  .cfs-wrapper:not(.cfs-theme-light) .cfs-single-value{color:#f1f5f9}
  .cfs-wrapper:not(.cfs-theme-light) .cfs-placeholder{color:#475569}
  .cfs-wrapper:not(.cfs-theme-light) .cfs-menu{background:#1e293b;border-color:#334155;box-shadow:0 12px 40px rgba(0,0,0,.5)}
  .cfs-wrapper:not(.cfs-theme-light) .cfs-search-wrap{border-color:#334155}
  .cfs-wrapper:not(.cfs-theme-light) .cfs-search{background:#0f172a;border-color:#334155;color:#f1f5f9;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E")}
  .cfs-wrapper:not(.cfs-theme-light) .cfs-option{color:#e2e8f0}
  .cfs-wrapper:not(.cfs-theme-light) .cfs-option:hover,.cfs-wrapper:not(.cfs-theme-light) .cfs-option.cfs-focused{background:#0f172a}
  .cfs-wrapper:not(.cfs-theme-light) .cfs-option.cfs-selected{background:#1e1b4b;color:#a5b4fc}
  .cfs-wrapper:not(.cfs-theme-light) .cfs-tag{background:#1e1b4b;color:#a5b4fc}
  .cfs-wrapper:not(.cfs-theme-light) .cfs-no-options{color:#475569}
}
.cfs-wrapper.cfs-theme-dark .cfs-control{background:#1e293b;border-color:#334155;color:#f1f5f9}
.cfs-wrapper.cfs-theme-dark .cfs-control:hover{border-color:#475569}
.cfs-wrapper.cfs-theme-dark.cfs-open .cfs-control,.cfs-wrapper.cfs-theme-dark .cfs-control:focus{border-color:#818cf8;box-shadow:0 0 0 3.5px rgba(129,140,248,.15)}
.cfs-wrapper.cfs-theme-dark .cfs-single-value{color:#f1f5f9}
.cfs-wrapper.cfs-theme-dark .cfs-placeholder{color:#475569}
.cfs-wrapper.cfs-theme-dark .cfs-menu{background:#1e293b;border-color:#334155;box-shadow:0 12px 40px rgba(0,0,0,.5)}
.cfs-wrapper.cfs-theme-dark .cfs-search-wrap{border-color:#334155}
.cfs-wrapper.cfs-theme-dark .cfs-search{background:#0f172a;border-color:#334155;color:#f1f5f9;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E")}
.cfs-wrapper.cfs-theme-dark .cfs-option{color:#e2e8f0}
.cfs-wrapper.cfs-theme-dark .cfs-option:hover,.cfs-wrapper.cfs-theme-dark .cfs-option.cfs-focused{background:#0f172a}
.cfs-wrapper.cfs-theme-dark .cfs-option.cfs-selected{background:#1e1b4b;color:#a5b4fc}
.cfs-wrapper.cfs-theme-dark .cfs-tag{background:#1e1b4b;color:#a5b4fc}
.cfs-wrapper.cfs-theme-dark .cfs-no-options{color:#475569}
`;

export default CSS;
