'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import { Search, Trash2, RefreshCw, ChevronLeft, ChevronRight, Activity, AlertTriangle, Info, Bug, Terminal, Database, Bell, Zap, LogOut, Filter, X, Calendar, User, Hash, Gift } from 'lucide-react';

interface Log {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  category: 'RAID_SPAWN' | 'REMINDER' | 'SYSTEM' | 'GENERAL' | 'EXPEDITION' | 'DROP';
  message: string;
  userId?: string;
  guildId?: string;
  channelId?: string;
  reminderType?: string;
  action?: string;
  method?: string;
  error?: string;
}

interface LogStats {
  total: number;
  byLevel: Record<string, number>;
  lastHour: number;
}

const StatCard = memo(({ label, value, icon: Icon, gradient, isLoading }: any) => (
  <div className={`relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow`}>
    <div className="p-4">
      {isLoading ? (
        <div className="space-y-2">
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
            <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </>
      )}
    </div>
  </div>
));

const LogItem = memo(({ log, isExpanded, onToggle }: any) => {
  const levelStyles = {
    ERROR: { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-400', icon: AlertTriangle, dot: 'bg-red-500' },
    WARN: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-800', text: 'text-yellow-700 dark:text-yellow-400', icon: AlertTriangle, dot: 'bg-yellow-500' },
    INFO: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-400', icon: Info, dot: 'bg-blue-500' },
    DEBUG: { bg: 'bg-gray-50 dark:bg-gray-900/20', border: 'border-gray-200 dark:border-gray-800', text: 'text-gray-700 dark:text-gray-400', icon: Bug, dot: 'bg-gray-500' }
  };

  const categoryIcons = {
    RAID_SPAWN: Zap,
    REMINDER: Bell,
    EXPEDITION: Database,
    DROP: Gift,
    SYSTEM: Terminal,
    GENERAL: Info
  };

  const style = levelStyles[log.level];
  const Icon = style.icon;
  const CategoryIcon = categoryIcons[log.category];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-2 sm:gap-3 text-xs overflow-x-auto">
          <div className={`w-2 h-2 rounded-full ${style.dot} flex-shrink-0`} />
          
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 font-mono text-[10px] sm:text-xs min-w-[100px] sm:min-w-[140px]">
            <Calendar className="w-3 h-3 hidden sm:block" />
            <span className="whitespace-nowrap">{new Date(log.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          
          <span className={`px-2 py-0.5 rounded-md font-semibold ${style.bg} ${style.text} border ${style.border} text-[10px] sm:text-xs min-w-[50px] sm:min-w-[60px] text-center flex-shrink-0`}>
            {log.level}
          </span>
          
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md min-w-[80px] sm:min-w-[100px] flex-shrink-0">
            <CategoryIcon className="w-3 h-3 text-gray-600 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-300 font-medium text-[10px] sm:text-xs truncate">{log.category.replace('_', ' ')}</span>
          </div>
          
          <div className="flex-1 text-gray-900 dark:text-gray-100 truncate min-w-0 text-xs sm:text-sm">
            {log.message}
          </div>
          
          {log.userId && (
            <div className="hidden lg:flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md flex-shrink-0">
              <span className="text-gray-500 dark:text-gray-400 text-[10px]">User:</span>
              <span className="ml-1 font-mono text-cyan-600 dark:text-cyan-400 text-[10px]">{log.userId.slice(0, 12)}</span>
            </div>
          )}
          
          {log.reminderType && (
            <div className="hidden xl:flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md flex-shrink-0">
              <span className="text-gray-500 dark:text-gray-400 text-[10px]">Type:</span>
              <span className="ml-1 font-mono text-green-600 dark:text-green-400 text-[10px]">{log.reminderType}</span>
            </div>
          )}
          
          <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-2 bg-gray-50 dark:bg-gray-800/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 text-xs">
            <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs">ID:</span>
              <span className="ml-2 font-mono text-purple-600 dark:text-purple-400 text-[10px] sm:text-xs break-all">{log.id}</span>
            </div>
            {log.userId && (
              <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs">User ID:</span>
                <span className="ml-2 font-mono text-cyan-600 dark:text-cyan-400 text-[10px] sm:text-xs break-all">{log.userId}</span>
              </div>
            )}
            {log.guildId && (
              <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs">Guild ID:</span>
                <span className="ml-2 font-mono text-pink-600 dark:text-pink-400 text-[10px] sm:text-xs break-all">{log.guildId}</span>
              </div>
            )}
            {log.channelId && (
              <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs">Channel ID:</span>
                <span className="ml-2 font-mono text-blue-600 dark:text-blue-400 text-[10px] sm:text-xs break-all">{log.channelId}</span>
              </div>
            )}
            {log.reminderType && (
              <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs">Reminder Type:</span>
                <span className="ml-2 font-mono text-green-600 dark:text-green-400 text-[10px] sm:text-xs">{log.reminderType}</span>
              </div>
            )}
            {log.action && (
              <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs">Action:</span>
                <span className="ml-2 font-mono text-yellow-600 dark:text-yellow-400 text-[10px] sm:text-xs">{log.action}</span>
              </div>
            )}
            {log.method && (
              <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs">Method:</span>
                <span className="ml-2 font-mono text-orange-600 dark:text-orange-400 text-[10px] sm:text-xs">{log.method}</span>
              </div>
            )}
          </div>
          {log.error && (
            <div className="mt-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Error Details:</div>
              <div className="text-sm text-red-700 dark:text-red-400 font-mono break-all">{log.error}</div>
            </div>
          )}
          <div className="mt-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Full Message:</div>
            <div className="text-sm text-gray-900 dark:text-gray-100 break-all">{log.message}</div>
          </div>
        </div>
      )}
    </div>
  );
});

const LogSkeleton = () => (
  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
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
  const [filters, setFilters] = useState({ level: '', category: '', search: '', userId: '', reminderType: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('logs_access');
    window.location.reload();
  };

  const logsPerPage = 50;

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const apiKey = sessionStorage.getItem('api_key');
      const params = new URLSearchParams({
        limit: logsPerPage.toString(),
        offset: ((currentPage - 1) * logsPerPage).toString(),
        ...(filters.level && { level: filters.level }),
        ...(filters.category && { category: filters.category }),
        ...(filters.search && { search: filters.search }),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.reminderType && { reminderType: filters.reminderType })
      });

      const res = await fetch(`/api/logs?${params}`, {
        headers: { 'x-api-key': apiKey || '' }
      });
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
      const apiKey = sessionStorage.getItem('api_key');
      const res = await fetch('/api/logs/stats', {
        headers: { 'x-api-key': apiKey || '' }
      });
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
      const apiKey = sessionStorage.getItem('api_key');
      await fetch('/api/logs', {
        method: 'DELETE',
        headers: { 'x-api-key': apiKey || '' }
      });
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

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchLogs();
        fetchStats();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, fetchLogs, fetchStats]);

  const totalPages = Math.ceil(totalLogs / logsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">System Logs</h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">Real-time monitoring</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <StatCard label="Total Logs" value={stats?.total.toLocaleString() || '0'} icon={Database} gradient="from-blue-500 to-indigo-600" isLoading={statsLoading} />
          <StatCard label="Last Hour" value={stats?.lastHour || '0'} icon={Activity} gradient="from-cyan-500 to-blue-500" isLoading={statsLoading} />
          <StatCard label="Errors" value={stats?.byLevel.ERROR || '0'} icon={AlertTriangle} gradient="from-red-500 to-rose-600" isLoading={statsLoading} />
          <StatCard label="Warnings" value={stats?.byLevel.WARN || '0'} icon={Zap} gradient="from-yellow-500 to-amber-500" isLoading={statsLoading} />
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 sm:p-5 mb-4 sm:mb-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Main Search */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="relative group">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by message..."
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              <div className="relative group">
                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 group-focus-within:text-cyan-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Filter by User ID..."
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  value={filters.userId}
                  onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${showFilters ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${autoRefresh ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">{autoRefresh ? 'Live' : 'Auto'}</span>
              </button>
              <button
                onClick={() => { fetchLogs(); fetchStats(); }}
                className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {(filters.level || filters.category || filters.search || filters.userId || filters.reminderType) && (
                <button
                  onClick={() => setFilters({ level: '', category: '', search: '', userId: '', reminderType: '' })}
                  className="ml-auto px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
            </div>
            
            {/* Advanced Filters */}
            {showFilters && (
              <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">Level</label>
                    <select
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filters.level}
                      onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                    >
                      <option value="">All Levels</option>
                      <option value="ERROR">🔴 Error</option>
                      <option value="WARN">🟡 Warning</option>
                      <option value="INFO">🔵 Info</option>
                      <option value="DEBUG">⚪ Debug</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">Category</label>
                    <select
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                      <option value="">All Categories</option>
                      <option value="REMINDER">🔔 Reminder</option>
                      <option value="RAID_SPAWN">⚔️ Raid Spawn</option>
                      <option value="EXPEDITION">🗺️ Expedition</option>
                      <option value="DROP">🎁 Drop</option>
                      <option value="SYSTEM">⚙️ System</option>
                      <option value="GENERAL">📋 General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">Type</label>
                    <select
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filters.reminderType}
                      onChange={(e) => setFilters({ ...filters, reminderType: e.target.value })}
                    >
                      <option value="">All Types</option>
                      <option value="stamina">⚡ Stamina</option>
                      <option value="expedition">🗺️ Expedition</option>
                      <option value="raid">⚔️ Raid</option>
                      <option value="raidSpawn">🐉 Raid Spawn</option>
                      <option value="drop">🎁 Drop</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logs */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <LogSkeleton key={i} />)
          ) : error ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-red-600 dark:text-red-400 text-sm inline-block">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                {error}
              </div>
            </div>
          ) : logs.length === 0 ? (
            <div className="p-12 sm:p-16 text-center text-gray-500 dark:text-gray-400">
              <Terminal className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-20" />
              <p className="text-base sm:text-lg font-medium">No logs found</p>
              <p className="text-xs sm:text-sm mt-1">Try adjusting your filters</p>
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
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="text-blue-600 dark:text-blue-400 font-bold">{((currentPage - 1) * logsPerPage) + 1}-{Math.min(currentPage * logsPerPage, totalLogs)}</span> of <span className="text-gray-900 dark:text-white font-bold">{totalLogs}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all text-gray-700 dark:text-gray-200 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <div className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-xs sm:text-sm font-bold text-white shadow-md">
                {currentPage} / {totalPages}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all text-gray-700 dark:text-gray-200 flex items-center gap-2"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Clear All Logs?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">This action cannot be undone. All log entries will be permanently deleted.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={clearLogs}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
