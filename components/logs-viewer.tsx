'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import { Search, Trash2, RefreshCw, ChevronLeft, ChevronRight, Activity, AlertTriangle, Info, Bug, Terminal, Database, Bell, Zap, LogOut } from 'lucide-react';

interface Log {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  category: 'RAID_SPAWN' | 'REMINDER' | 'SYSTEM' | 'GENERAL';
  message: string;
  userId?: string;
  guildId?: string;
  channelId?: string;
}

interface LogStats {
  total: number;
  byLevel: Record<string, number>;
  lastHour: number;
}

const StatCard = memo(({ label, value, icon: Icon, gradient, isLoading }: any) => (
  <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-[1px]`}>
    <div className="h-full rounded-xl bg-slate-900/95 backdrop-blur p-4">
      {isLoading ? (
        <div className="space-y-2">
          <div className="h-3 w-16 bg-slate-700/50 rounded animate-pulse" />
          <div className="h-8 w-20 bg-slate-700/50 rounded animate-pulse" />
        </div>
      ) : (
        <>
          <p className="text-xs text-slate-400 mb-1">{label}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white">{value}</p>
            <Icon className="w-5 h-5 text-slate-400" />
          </div>
        </>
      )}
    </div>
  </div>
));

const LogItem = memo(({ log, isExpanded, onToggle }: any) => {
  const levelStyles = {
    ERROR: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: AlertTriangle },
    WARN: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: AlertTriangle },
    INFO: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: Info },
    DEBUG: { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', icon: Bug }
  };

  const categoryIcons = {
    RAID_SPAWN: Zap,
    REMINDER: Bell,
    SYSTEM: Terminal,
    GENERAL: Database
  };

  const style = levelStyles[log.level];
  const Icon = style.icon;
  const CategoryIcon = categoryIcons[log.category];

  return (
    <div className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
      <div className="p-3 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 p-1.5 rounded-lg ${style.bg} border ${style.border}`}>
            <Icon className={`w-3.5 h-3.5 ${style.text}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] text-slate-500 font-mono bg-slate-800/50 px-1.5 py-0.5 rounded">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${style.bg} ${style.text} border ${style.border}`}>
                {log.level}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-800/50 px-1.5 py-0.5 rounded">
                <CategoryIcon className="w-3 h-3" />
                <span>{log.category.replace('_', ' ')}</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
              {log.message}
            </p>
            
            {isExpanded && (
              <div className="mt-3 pt-3 border-t border-slate-800/50 grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-800/30 p-1.5 rounded">
                  <span className="text-slate-500">ID:</span>
                  <span className="ml-1 font-mono text-purple-400">{log.id.slice(0, 8)}</span>
                </div>
                {log.userId && (
                  <div className="bg-slate-800/30 p-1.5 rounded truncate">
                    <span className="text-slate-500">User:</span>
                    <span className="ml-1 font-mono text-cyan-400">{log.userId}</span>
                  </div>
                )}
                {log.guildId && (
                  <div className="bg-slate-800/30 p-1.5 rounded truncate">
                    <span className="text-slate-500">Guild:</span>
                    <span className="ml-1 font-mono text-pink-400">{log.guildId}</span>
                  </div>
                )}
                {log.channelId && (
                  <div className="bg-slate-800/30 p-1.5 rounded truncate">
                    <span className="text-slate-500">Channel:</span>
                    <span className="ml-1 font-mono text-blue-400">{log.channelId}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <ChevronRight className={`w-4 h-4 text-slate-600 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </div>
    </div>
  );
});

const LogSkeleton = () => (
  <div className="p-3 border-b border-slate-800/50">
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 bg-slate-800/50 rounded-lg animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <div className="h-4 w-16 bg-slate-800/50 rounded animate-pulse" />
          <div className="h-4 w-12 bg-slate-800/50 rounded animate-pulse" />
          <div className="h-4 w-20 bg-slate-800/50 rounded animate-pulse" />
        </div>
        <div className="h-4 w-full bg-slate-800/50 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-slate-800/50 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

export default function LogsViewer() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [stats, setStats] = useState<LogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ level: '', category: '', search: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('logs_access');
    window.location.reload();
  };

  const logsPerPage = 50;

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: logsPerPage.toString(),
        offset: ((currentPage - 1) * logsPerPage).toString(),
        ...(filters.level && { level: filters.level }),
        ...(filters.search && { search: filters.search })
      });

      const res = await fetch(`/api/logs?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      
      const data = await res.json();
      setLogs(data.logs || []);
      setTotalLogs(data.total || 0);
      setError(null);
    } catch (err) {
      setError('Failed to load logs');
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const res = await fetch('/api/logs/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Stats fetch failed');
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const clearLogs = async () => {
    try {
      await fetch('/api/logs', { method: 'DELETE' });
      setLogs([]);
      setTotalLogs(0);
      setShowClearConfirm(false);
      fetchStats();
    } catch (err) {
      setError('Failed to clear logs');
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const totalPages = Math.ceil(totalLogs / logsPerPage);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-6 h-6 text-purple-400" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">System Logs</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
          <p className="text-sm text-slate-400">Real-time Discord bot activity monitoring</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Total" value={stats?.total.toLocaleString() || '0'} icon={Database} gradient="from-purple-500 to-pink-500" isLoading={statsLoading} />
          <StatCard label="Last Hour" value={stats?.lastHour || '0'} icon={Activity} gradient="from-cyan-500 to-blue-500" isLoading={statsLoading} />
          <StatCard label="Errors" value={stats?.byLevel.ERROR || '0'} icon={AlertTriangle} gradient="from-red-500 to-rose-500" isLoading={statsLoading} />
          <StatCard label="Warnings" value={stats?.byLevel.WARN || '0'} icon={Zap} gradient="from-yellow-500 to-amber-500" isLoading={statsLoading} />
        </div>

        {/* Filters */}
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-950/50 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <select
              className="bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500/50"
              value={filters.level}
              onChange={(e) => setFilters({ ...filters, level: e.target.value })}
            >
              <option value="">All Levels</option>
              <option value="ERROR">Error</option>
              <option value="WARN">Warning</option>
              <option value="INFO">Info</option>
              <option value="DEBUG">Debug</option>
            </select>
            <button
              onClick={() => { fetchLogs(); fetchStats(); }}
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>

        {/* Logs */}
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl overflow-hidden">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <LogSkeleton key={i} />)
          ) : error ? (
            <div className="p-8 text-center">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                {error}
              </div>
            </div>
          ) : logs.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Terminal className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No logs found</p>
            </div>
          ) : (
            logs.map((log) => (
              <LogItem
                key={log.id}
                log={log}
                isExpanded={expandedLog === log.id}
                onToggle={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-3">
            <p className="text-xs text-slate-400">
              <span className="text-purple-400 font-semibold">{((currentPage - 1) * logsPerPage) + 1}-{Math.min(currentPage * logsPerPage, totalLogs)}</span> of {totalLogs}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-white flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>
              <div className="px-3 py-1.5 bg-purple-600 rounded-lg text-xs font-bold text-white">
                {currentPage}/{totalPages}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-white flex items-center gap-1"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-white mb-2">Clear All Logs</h3>
              <p className="text-sm text-slate-400 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={clearLogs}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
