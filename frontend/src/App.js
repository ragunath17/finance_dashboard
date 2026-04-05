import React, { useEffect, useState, useCallback } from 'react';
import { getSummary, getRecent } from './api';
import Auth from './components/Auth/Auth';
import SummaryCards from './components/Dashboard/SummaryCards/SummaryCards';
import TransactionForm from './components/Dashboard/TransactionForm/TransactionForm';
import TransactionList from './components/Dashboard/TransactionList/TransactionList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [data, setData] = useState({ summary: null, recent: [] });

  const fetchData = useCallback(() => {
    if (token) {
      Promise.all([getSummary(token), getRecent(token)])
        .then(([s, r]) => setData({ summary: s.data, recent: r.data.results || r.data }))
        .catch(() => logout());
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setData({ summary: null, recent: [] });
  };

  if (!token) return <Auth setToken={setToken} />;
  if (!data.summary) return <div className="h-screen flex items-center justify-center font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-slate-800 italic">DASHBOARD</h1>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="text-slate-400 tracking-widest uppercase">User: {data.summary.user}</span>
            <button onClick={logout} className="text-red-500 bg-red-50 px-4 py-2 rounded-full">Logout</button>
          </div>
        </header>

        <TransactionForm token={token} onRecordAdded={fetchData} />

        <SummaryCards summary={data.summary} />

        <TransactionList transactions={data.recent} />
      </div>
    </div>
  );
}

export default App;