import { useState } from 'react';
import { registerUser, loginUser } from '../../api';

const Auth = ({ setToken }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', email: '', role: 'VIEWER' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerUser(formData);
        alert("Registered! Please Login.");
        setIsRegister(false);
      } else {
        const res = await loginUser({ username: formData.username, password: formData.password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
      }
    } catch (err) { alert("Auth Failed. Check Server."); }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-black text-center mb-6 text-slate-800">{isRegister ? 'Register' : 'Login'}</h2>
        <input className="w-full border p-3 rounded-xl mb-3" placeholder="Username" onChange={e => setFormData({...formData, username: e.target.value})} required />
        {isRegister && <input className="w-full border p-3 rounded-xl mb-3" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />}
        <input className="w-full border p-3 rounded-xl mb-3" type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} required />
        <button className="w-full bg-blue-600 text-white font-bold p-3 rounded-xl hover:bg-blue-700 transition">
          {isRegister ? 'Create Account' : 'Sign In'}
        </button>
        <p className="text-center mt-4 text-sm text-slate-500 cursor-pointer" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Switch to Login' : 'Switch to Register'}
        </p>
      </form>
    </div>
  );
};

export default Auth;