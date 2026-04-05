import React from 'react';
import './TransactionList.css';
import { Clock } from 'lucide-react';

const TransactionList = ({ transactions }) => (
  <div className="transaction-list-container bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="p-6 font-bold border-b bg-slate-50/50 flex items-center gap-2"><Clock size={18}/> Recent Activity</div>
    <div className="divide-y">
      {transactions.map(t => (
        <div key={t.id} className="transaction-item p-4 flex justify-between items-center hover:bg-slate-50">
          <div><p className="cat-text">{t.category}</p><p className="note-text">{t.notes || '---'}</p></div>
          <p className={t.type === 'INCOME' ? 'income-amt' : 'expense-amt'}>
            {t.type === 'INCOME' ? '+' : '-'} ₹{t.amount}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default TransactionList;