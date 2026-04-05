import { useState } from 'react'
import './TransactionForm.css';
import { createRecord } from '../../../api';

const TransactionForm = ({ token, onRecordAdded }) => {
  const [newRecord, setNewRecord] = useState({ amount: '', type: 'EXPENSE', category: 'Food', notes: '' });

  const handleAddRecord = async (e) => {
    e.preventDefault();
    try {
      await createRecord(token, newRecord);
      onRecordAdded();
    } catch (err) { 
      const errorMsg = JSON.stringify(err.response?.data);
      alert("Error saving record."); }
  };

  return (
    <form onSubmit={handleAddRecord} className="transaction-form bg-white p-6 rounded-3xl shadow-sm border mb-10 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
      <div className="input-group">
        <label>Amount</label>
        <input type="number" onChange={e => setNewRecord({...newRecord, amount: parseFloat(e.target.value)})} required />
      </div>
      <div className="input-group">
        <label>Type</label>
        <select onChange={e => setNewRecord({ ...newRecord, type: e.target.value })}>
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
      </div>
      <div className="input-group">
        <label>Category</label>
        <input onChange={e => setNewRecord({ ...newRecord, category: e.target.value })} required />
      </div>
      <div className="input-group">
        <label>Notes</label>
        <input onChange={e => setNewRecord({ ...newRecord, notes: e.target.value })} />
      </div>
      <button type="submit" className="submit-btn">ADD</button>
    </form>
  );
};

export default TransactionForm;