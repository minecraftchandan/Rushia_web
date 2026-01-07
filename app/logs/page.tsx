'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Key, ArrowLeft, Shield, AlertCircle } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import LogsViewer from '@/components/logs-viewer';

const hashKey = async (key: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const setSessionWithExpiry = (value: string, expiryMinutes: number) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + expiryMinutes * 60 * 1000,
  };
  sessionStorage.setItem('logs_access', JSON.stringify(item));
};

const getSessionWithExpiry = (): boolean => {
  const itemStr = sessionStorage.getItem('logs_access');
  if (!itemStr) return false;
  
  try {
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    if (now.getTime() > item.expiry) {
      sessionStorage.removeItem('logs_access');
      return false;
    }
    return item.value === 'true';
  } catch {
    return false;
  }
};

export default function LogsPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const SHORT_KEY = process.env.NEXT_PUBLIC_LOGS_SHORT_KEY || 'rushia-admin';
  const STORED_HASH = process.env.NEXT_PUBLIC_API_KEY;
  const USERNAME = process.env.NEXT_PUBLIC_LOGS_USERNAME || 'admin';

  useEffect(() => {
    const isValid = getSessionWithExpiry();
    setIsAuthed(isValid);
    setLoading(false);

    if (isValid) {
      const checkExpiry = setInterval(() => {
        if (!getSessionWithExpiry()) {
          setIsAuthed(false);
          clearInterval(checkExpiry);
        }
      }, 60000);
      return () => clearInterval(checkExpiry);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!key.trim()) {
      setError('Please enter an access key');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const hashedInput = await hashKey(key);
    const hashedShortKey = await hashKey(SHORT_KEY);
    
    if (key === SHORT_KEY || hashedInput === hashedShortKey || hashedInput === STORED_HASH || key === STORED_HASH) {
      setSessionWithExpiry('true', 15);
      setIsAuthed(true);
      setError('');
    } else {
      setError('Invalid access key');
      setTimeout(() => router.push('/'), 1500);
    }
  };

  if (loading) return null;

  if (!isAuthed) {
    return (
      <>
        <Navbar />
        <div 
          className="h-[calc(100vh-4rem)] flex items-center justify-center p-4 overflow-hidden relative"
          style={{
            backgroundImage: 'url(https://img.freepik.com/premium-vector/office-business-seamless-pattern-background-vector-illustration_153454-4035.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"></div>

          <div className="w-full max-w-md relative z-10">
            <button
              onClick={() => router.push('/')}
              className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
            
            <div className="bg-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
              <div className="p-10">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-500/20 rounded-2xl blur-xl"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Key className="w-14 h-14 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-bold text-white mb-3">
                    Administrator Access
                  </h1>
                  <p className="text-slate-400">
                    Authentication required to proceed
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" name="username" autoComplete="username" value={USERNAME} readOnly hidden />
                  
                  <div className="space-y-3">
                    <label htmlFor="password" className="block text-sm font-semibold text-slate-300 uppercase tracking-wide">
                      Access Key
                    </label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
                      <div className="relative">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-slate-300 transition-colors" />
                        <input
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="current-password"
                          placeholder="Enter your access key"
                          className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all text-base"
                          value={key}
                          onChange={(e) => setKey(e.target.value)}
                          autoFocus
                        />
                      </div>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="bg-red-950/50 border border-red-800/50 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-red-300 font-semibold">{error}</p>
                        {error === 'Invalid access key' && (
                          <p className="text-xs text-red-400 mt-1">Redirecting to home page...</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-slate-100 text-slate-900 py-4 rounded-xl font-semibold transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-base"
                  >
                    Authenticate
                  </button>
                </form>
              </div>
              
              <div className="px-10 py-6 bg-slate-800/50 border-t border-slate-700/50">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Restricted Area • Authorized Personnel Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <LogsViewer />
    </>
  );
}
