import { useState, useEffect } from 'react'
import './TransactionForm.css';
import { createRecord } from '../../../api';
import axios from 'axios'; 

const TransactionForm = ({ token, onRecordAdded }) => {
  const [newRecord, setNewRecord] = useState({ 
    amount: '', 
    type: 'EXPENSE', 
    category: 'Food', 
    date: new Date().toISOString().split('T')[0], 
    notes: '',
    user: ''
  });

  const [userList, setUserList] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isAdmin = currentUser?.role === 'ADMIN';

  useEffect(() => {
    if (isAdmin) {
      axios.get('http://127.0.0.1:8000/api/users/list/', {
        headers: { Authorization: `Token ${token}` }
      })
      .then(res => setUserList(res.data))
      .catch(err => console.log("User list fetch failed", err));
    }
  }, [isAdmin, token]);

  const handleAddRecord = async (e) => {
    e.preventDefault();
    try {
      
      await createRecord(token, newRecord);
      onRecordAdded();
      setNewRecord({ ...newRecord, amount: '', notes: '' });
      alert("Record Added!");
    } catch (err) { 
      console.error(err.response?.data);
      alert("Error saving record."); 
    }
  };

  return (
    <form onSubmit={handleAddRecord} className="transaction-form bg-white p-6 rounded-3xl shadow-sm border mb-10 grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
      
      {isAdmin && (
        <div className="input-group">
          <label className="text-blue-600 font-bold">Assign to User</label>
          <select onChange={e => setNewRecord({ ...newRecord, user: e.target.value })} required>
            <option value="">Select User</option>
            {userList.map(u => (
              <option key={u.id} value={u.id}>{u.username} ({u.role})</option>
            ))}
          </select>
        </div>
      )}

      <div className="input-group">
        <label>Amount</label>
        <input type="number" value={newRecord.amount} onChange={e => setNewRecord({...newRecord, amount: parseFloat(e.target.value)})} required />
      </div>

      <div className="input-group">
        <label>Type</label>
        <select value={newRecord.type} onChange={e => setNewRecord({ ...newRecord, type: e.target.value })}>
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
      </div>

      <div className="input-group">
        <label>Category</label>
        <input value={newRecord.category} onChange={e => setNewRecord({ ...newRecord, category: e.target.value })} required />
      </div>

      <div className="input-group">
        <label>Date</label>
        <input type="date" value={newRecord.date} onChange={e => setNewRecord({ ...newRecord, date: e.target.value })} required />
      </div>

      <div className="input-group">
        <label>Notes</label>
        <input value={newRecord.notes} onChange={e => setNewRecord({ ...newRecord, notes: e.target.value })} />
      </div>

      <button type="submit" className="submit-btn bg-blue-600 text-white">ADD</button>
    </form>
  );
};

export default TransactionForm;