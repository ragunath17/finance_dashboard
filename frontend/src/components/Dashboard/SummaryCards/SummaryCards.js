import './SummaryCards.css';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const Card = ({ title, val, color, Icon }) => (
  <div className={`summary-card border-l-4 border-${color}-500 shadow-sm bg-white p-6 rounded-3xl flex items-center gap-4`}>
    <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-600`}><Icon size={24}/></div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</p>
      <p className="text-xl font-black text-slate-800">₹{val}</p>
    </div>
  </div>
);

const SummaryCards = ({ summary }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    <Card title="Balance" val={summary.net_balance} color="blue" Icon={Wallet} />
    <Card title="Income" val={summary.total_income} color="green" Icon={TrendingUp} />
    <Card title="Expense" val={summary.total_expense} color="red" Icon={TrendingDown} />
  </div>
);

export default SummaryCards;