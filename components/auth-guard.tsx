'use client';

import { useState, useEffect } from 'react';
import { Lock, Key } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const ACCESS_KEY = process.env.NEXT_PUBLIC_API_KEY || 'cea78a4e85c2438165c9bb90d8bf41a2a4e5fca0e0e487b4b7fdd20cec6be7ba';

  useEffect(() => {
    const stored = localStorage.getItem('logs_access_key');
    if (stored === ACCESS_KEY) {
      setIsAuthed(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === ACCESS_KEY) {
      localStorage.setItem('logs_access_key', key);
      setIsAuthed(true);
      setError('');
    } else {
      setError('Invalid access key');
    }
  };

  if (isAuthed) return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-purple-600/20 rounded-full">
              <Lock className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white text-center mb-2">Access Required</h2>
          <p className="text-sm text-slate-400 text-center mb-6">Enter your access key to view logs</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="password"
                placeholder="Access Key"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Access Logs
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
