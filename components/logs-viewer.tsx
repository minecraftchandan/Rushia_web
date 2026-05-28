'use client';

import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Search, RefreshCw, Activity, AlertTriangle, Info, Bug, Terminal, Database, Bell, Zap, LogOut, X, User, Hash, Download, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

interface Log {
  id: string; timestamp: string; level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  category: string; message: string; userId?: string; guildId?: string;
  channelId?: string; event?: string; action?: string; type?: string;
  method?: string; error?: string; metadata?: Record<string, any>;
}

const LEVEL_STYLES: Record<string, any> = {
  ERROR: { badge: 'bg-red-500/15 text-red-400 border-red-500/30', dot: 'bg-red-500', row: 'border-l-red-500/60' },
  WARN:  { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30', dot: 'bg-amber-500', row: 'border-l-amber-500/60' },
  INFO:  { badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30', dot: 'bg-cyan-500', row: 'border-l-cyan-500/60' },
  DEBUG: { badge: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30', dot: 'bg-zinc-500', row: 'border-l-zinc-500/60' },
};

function relativeTime(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

function syntaxHighlight(obj: any) {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
    let cls = 'text-yellow-300';
    if (/^"/.test(match)) cls = /:$/.test(match) ? 'text-cyan-300' : 'text-green-300';
    else if (/true|false/.test(match)) cls = 'text-blue-300';
    else if (/null/.test(match)) cls = 'text-zinc-500';
    return `<span class="${cls}">${match}</span>`;
  });
}

const LogRow = memo(({ log, expanded, onToggle, flash }: { log: Log; expanded: boolean; onToggle: () => void; flash: boolean }) => {
  const s = LEVEL_STYLES[log.level] || LEVEL_STYLES.INFO;
  const [showFull, setShowFull] = useState(false);
  const msg = log.message;
  const truncated = msg.length > 120;

  const fullDoc = {
    id: log.id, timestamp: log.timestamp, level: log.level,
    message: log.message,
    userId: log.userId, guildId: log.guildId, channelId: log.channelId,
    metadata: {
      category: log.category, action: log.action, type: log.type,
      method: log.method, error: log.error,
      userId: log.userId, guildId: log.guildId, channelId: log.channelId,
      ...log.metadata,
    },
  };

  return (
    <div className={`border-l-2 ${s.row} border-b border-zinc-800/60 transition-all duration-300 ${flash ? 'animate-pulse bg-zinc-700/20' : 'hover:bg-zinc-800/30'}`}>
      <div className="flex items-start gap-3 px-4 py-2.5 cursor-pointer select-none" onClick={onToggle}>
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot} mt-2 shrink-0`} />
        <span className="text-zinc-500 font-mono text-[11px] w-20 shrink-0 mt-0.5" title={new Date(log.timestamp).toISOString()}>
          {relativeTime(log.timestamp)}
        </span>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${s.badge} shrink-0 w-14 text-center`}>{log.level}</span>
        <span className="text-zinc-400 text-[11px] bg-zinc-800 px-1.5 py-0.5 rounded shrink-0 hidden sm:block">{log.category}</span>
        <span className="text-zinc-200 text-xs font-mono flex-1 min-w-0 leading-relaxed">
          {truncated && !showFull ? (
            <>{msg.slice(0, 120)}<button className="text-cyan-400 ml-1 hover:underline" onClick={e => { e.stopPropagation(); setShowFull(true); }}>more</button></>
          ) : msg}
          {truncated && showFull && <button className="text-cyan-400 ml-1 hover:underline" onClick={e => { e.stopPropagation(); setShowFull(false); }}>less</button>}
        </span>
        {log.userId && <span className="text-zinc-500 font-mono text-[10px] hidden lg:block shrink-0">{log.userId.slice(-8)}</span>}
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-1">
          <div className="flex flex-wrap gap-2 mb-2">
            {log.event     && <span className="text-[10px] bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-zinc-400">event: <span className="text-cyan-400">{log.event}</span></span>}
            {log.category  && <span className="text-[10px] bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-zinc-400">category: <span className="text-cyan-400">{log.category}</span></span>}
            {log.action    && <span className="text-[10px] bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-zinc-400">action: <span className="text-green-400">{log.action}</span></span>}
            {log.type      && <span className="text-[10px] bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-zinc-400">type: <span className="text-amber-400">{log.type}</span></span>}
            {log.method    && <span className="text-[10px] bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-zinc-400">method: <span className="text-purple-400">{log.method}</span></span>}
            {log.userId    && <span className="text-[10px] bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-zinc-400">userId: <span className="text-cyan-300 font-mono">{log.userId}</span></span>}
            {log.guildId   && <span className="text-[10px] bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-zinc-400">guildId: <span className="text-cyan-300 font-mono">{log.guildId}</span></span>}
            {log.channelId && <span className="text-[10px] bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-zinc-400">channelId: <span className="text-cyan-300 font-mono">{log.channelId}</span></span>}
            {log.error     && <span className="text-[10px] bg-red-500/10 border border-red-500/30 rounded px-2 py-0.5 text-zinc-400">error: <span className="text-red-400">{log.error}</span></span>}
          </div>
          <pre
            className="bg-zinc-900 border border-zinc-700/50 rounded-lg p-4 text-xs font-mono overflow-x-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: syntaxHighlight(fullDoc) }}
          />
        </div>
      )}
    </div>
  );
});
LogRow.displayName = 'LogRow';

export default function LogsViewer() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [newLogs, setNewLogs] = useState<Log[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set());
  const [live, setLive] = useState(false);
  const [pinned, setPinned] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [total, setTotal] = useState(0);
  const [range, setRange] = useState('24h');
  const [statsRange, setStatsRange] = useState('1h');
  const [filters, setFilters] = useState({ level: '', search: '', userId: '', guildId: '', category: '' });
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const topRef = useRef<HTMLDivElement>(null);
  const latestIdRef = useRef<string | null>(null);

  const apiKey = () => typeof window !== 'undefined' ? sessionStorage.getItem('api_key') || '' : '';

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(filters.search), 300);
    return () => clearTimeout(t);
  }, [filters.search]);

  const fetchLogs = useCallback(async (prepend = false) => {
    try {
      if (!prepend) setLoading(true);
      const p = new URLSearchParams({
        limit: perPage.toString(), offset: ((page - 1) * perPage).toString(),
        ...(filters.level && { level: filters.level }),
        ...(filters.category && { category: filters.category }),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.guildId && { guildId: filters.guildId }),
        ...(range !== '7d' && { range }),
      });
      const res = await fetch(`/api/logs?${p}`, { headers: { 'x-api-key': apiKey() } });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const fetched: Log[] = data.logs || [];

      if (prepend && latestIdRef.current) {
        const idx = fetched.findIndex(l => l.id === latestIdRef.current);
        const fresh = idx > 0 ? fetched.slice(0, idx) : [];
        if (fresh.length > 0) {
          if (pinned) {
            setLogs(prev => [...fresh, ...prev]);
            const ids = new Set(fresh.map(l => l.id));
            setFlashIds(ids);
            setTimeout(() => setFlashIds(new Set()), 1500);
          } else {
            setNewLogs(prev => [...fresh, ...prev]);
          }
        }
      } else {
        setLogs(fetched);
        setTotal(data.total || 0);
        setError(null);
      }
      if (fetched.length > 0) latestIdRef.current = fetched[0].id;
    } catch {
      setError('Failed to reach API');
    } finally {
      setLoading(false);
    }
  }, [page, perPage, filters.level, filters.category, debouncedSearch, filters.userId, filters.guildId, range, pinned]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`/api/logs/stats?range=${statsRange}`, { headers: { 'x-api-key': apiKey() } });
      if (res.ok) setStats(await res.json());
    } catch {}
  }, [statsRange]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  // live polling
  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => { fetchLogs(true); fetchStats(); }, 3000);
    return () => clearInterval(t);
  }, [live, fetchLogs, fetchStats]);

  // stats auto-refresh every 5s
  useEffect(() => {
    const t = setInterval(fetchStats, 5000);
    return () => clearInterval(t);
  }, [fetchStats]);

  // keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setPage(p => Math.max(1, p - 1));
      if (e.key === 'ArrowRight') setPage(p => Math.min(Math.ceil(total / perPage), p + 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [total, perPage]);

  const clearFilters = () => { setFilters({ level: '', search: '', userId: '', guildId: '', category: '' }); setPage(1); };
  const hasFilters = Object.values(filters).some(Boolean) || range !== '24h';

  const exportData = (fmt: 'json' | 'csv') => {
    if (fmt === 'json') {
      const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'logs.json'; a.click();
    } else {
      const cols = ['id', 'timestamp', 'level', 'category', 'message', 'userId', 'guildId'];
      const rows = logs.map(l => cols.map(c => JSON.stringify((l as any)[c] ?? '')).join(','));
      const blob = new Blob([[cols.join(','), ...rows].join('\n')], { type: 'text/csv' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'logs.csv'; a.click();
    }
  };

  const totalPages = Math.ceil(total / perPage);
  const inRange = stats?.inRange || {};
  const errorRate = stats?.errorRate || '0.0';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
      <div ref={topRef} />

      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold text-zinc-100 tracking-tight">Bot Logs</span>
            <span className="text-[10px] text-zinc-600 hidden sm:block">TTL 7d</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Live toggle */}
            <button
              onClick={() => setLive(v => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${live ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${live ? 'bg-green-400 animate-pulse' : 'bg-zinc-600'}`} />
              Live
            </button>
            {live && (
              <button
                onClick={() => setPinned(v => !v)}
                className={`px-2.5 py-1.5 rounded-md text-[11px] border transition-all ${pinned ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}
              >
                {pinned ? 'Pinned' : 'Frozen'}
              </button>
            )}
            <button onClick={() => { fetchLogs(); fetchStats(); }} className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 transition-all">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => exportData('json')} className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 transition-all" title="Export JSON">
              <Download className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => exportData('csv')} className="px-2.5 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 text-[11px] transition-all">CSV</button>
            <button onClick={() => { sessionStorage.removeItem('logs_access'); window.location.reload(); }}
              className="p-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">

        {/* Stats bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-zinc-500 uppercase tracking-widest">Stats</span>
            <div className="flex gap-1">
              {['1h', '6h', '24h', '7d'].map(r => (
                <button key={r} onClick={() => setStatsRange(r)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${statsRange === r ? 'bg-cyan-500/20 text-cyan-400' : 'text-zinc-600 hover:text-zinc-400'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'ERROR', val: inRange.ERROR ?? 0, color: 'text-red-400' },
              { label: 'WARN',  val: inRange.WARN  ?? 0, color: 'text-amber-400' },
              { label: 'INFO',  val: inRange.INFO  ?? 0, color: 'text-cyan-400' },
              { label: 'DEBUG', val: inRange.DEBUG ?? 0, color: 'text-zinc-400' },
              { label: 'TOTAL', val: inRange.total ?? 0, color: 'text-zinc-200' },
              { label: 'ERR %', val: `${errorRate}%`,    color: parseFloat(errorRate) > 5 ? 'text-red-400' : 'text-green-400' },
            ].map(({ label, val, color }) => (
              <div key={label} className="bg-zinc-800/50 rounded-lg px-3 py-2.5">
                <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">{label}</p>
                <p className={`text-xl font-bold tabular-nums ${color}`}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Level pills */}
            <div className="flex gap-1">
              {['ALL', 'ERROR', 'WARN', 'INFO', 'DEBUG'].map(l => {
                const active = l === 'ALL' ? !filters.level : filters.level === l;
                const s = LEVEL_STYLES[l];
                return (
                  <button key={l} onClick={() => { setFilters(f => ({ ...f, level: l === 'ALL' ? '' : l })); setPage(1); }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-all ${active ? (s ? `${s.badge}` : 'bg-zinc-700 text-zinc-200 border-zinc-600') : 'bg-zinc-800/50 text-zinc-600 border-zinc-700/50 hover:border-zinc-600'}`}>
                    {l}
                  </button>
                );
              })}
            </div>

            {/* Time range */}
            <div className="flex gap-1 ml-auto">
              {['1h', '6h', '24h', '7d'].map(r => (
                <button key={r} onClick={() => { setRange(r); setPage(1); }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all ${range === r ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' : 'bg-zinc-800/50 text-zinc-600 border-zinc-700/50 hover:border-zinc-600'}`}>
                  {r}
                </button>
              ))}
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-zinc-200 transition-all">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
              <input type="text" placeholder="Search message..." value={filters.search}
                onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-8 pr-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors" />
            </div>
            <div className="relative">
              <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
              <input type="text" placeholder="User ID..." value={filters.userId}
                onChange={e => setFilters(f => ({ ...f, userId: e.target.value }))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-8 pr-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors" />
            </div>
            <div className="relative">
              <Hash className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
              <input type="text" placeholder="Guild ID..." value={filters.guildId}
                onChange={e => setFilters(f => ({ ...f, guildId: e.target.value }))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-8 pr-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors" />
            </div>
            <select value={filters.category} onChange={e => { setFilters(f => ({ ...f, category: e.target.value })); setPage(1); }}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-cyan-500/50 transition-colors">
              <option value="">All Categories</option>
              <option value="BOSS">Boss</option>
              <option value="REMINDER">Reminder</option>
              <option value="DROP">Drop</option>
              <option value="DROP_COUNT">Drop Count</option>
              <option value="SYSTEM">System</option>
              <option value="WISHLIST">Wishlist</option>
              <option value="GENERAL">General</option>
            </select>
          </div>
        </div>

        {/* New logs banner */}
        {!pinned && newLogs.length > 0 && (
          <button onClick={() => { setLogs(prev => [...newLogs, ...prev]); setNewLogs([]); topRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            className="w-full py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-xs font-semibold hover:bg-cyan-500/20 transition-all">
            ↑ {newLogs.length} new log{newLogs.length > 1 ? 's' : ''} — click to jump
          </button>
        )}

        {/* Log table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="flex items-center gap-3 px-4 py-2 border-b border-zinc-800 bg-zinc-800/40">
            <span className="w-1.5 shrink-0" />
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider w-20 shrink-0">Time</span>
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider w-14 shrink-0">Level</span>
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider hidden sm:block w-24 shrink-0">Category</span>
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider flex-1">Message</span>
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider hidden lg:block w-20 shrink-0">User</span>
            <span className="w-3.5 shrink-0" />
          </div>

          {loading ? (
            <div className="space-y-0">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex gap-3 px-4 py-3 border-b border-zinc-800/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 animate-pulse mt-1.5 shrink-0" />
                  <div className="w-20 h-3 bg-zinc-800 rounded animate-pulse shrink-0" />
                  <div className="w-14 h-3 bg-zinc-800 rounded animate-pulse shrink-0" />
                  <div className="flex-1 h-3 bg-zinc-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <AlertTriangle className="w-10 h-10 text-red-500/50" />
              <p className="text-zinc-500 text-sm">{error}</p>
              <button onClick={() => fetchLogs()} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-xs text-zinc-300 transition-all">
                Retry
              </button>
            </div>
          ) : logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Terminal className="w-12 h-12 text-zinc-800" />
              <p className="text-zinc-600 text-sm font-semibold">No logs match your filters</p>
              <p className="text-zinc-700 text-xs">Try adjusting the time range or clearing filters</p>
              {hasFilters && <button onClick={clearFilters} className="mt-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-xs text-zinc-300 transition-all">Clear filters</button>}
            </div>
          ) : (
            logs.map(log => (
              <LogRow key={log.id} log={log} expanded={expanded === log.id}
                onToggle={() => setExpanded(expanded === log.id ? null : log.id)}
                flash={flashIds.has(log.id)} />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-zinc-600">Per page:</span>
              {[50, 100, 200].map(n => (
                <button key={n} onClick={() => { setPerPage(n); setPage(1); }}
                  className={`px-2 py-0.5 rounded text-[11px] border transition-all ${perPage === n ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' : 'bg-zinc-800 text-zinc-600 border-zinc-700 hover:text-zinc-400'}`}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-zinc-600 hidden sm:block">
                {((page - 1) * perPage) + 1}–{Math.min(page * perPage, total)} of {total}
              </span>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 disabled:opacity-30 hover:bg-zinc-700 transition-all">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-md text-[11px] text-zinc-300 tabular-nums">
                {page} / {totalPages}
              </span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="p-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 disabled:opacity-30 hover:bg-zinc-700 transition-all">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
