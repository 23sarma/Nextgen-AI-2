import React, { useState } from 'react';
import { UserCircleIcon } from './components/icons';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (email.trim() && password.trim()) {
        onLoginSuccess();
      } else {
        setError('Email and password cannot be empty.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-cyan-500/10"></div>
      <div className="relative w-full max-w-md bg-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl shadow-2xl shadow-cyan-500/10 p-8">
        <div className="text-center mb-8">
          <UserCircleIcon className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white">NextGen AI Access</h1>
          <p className="text-gray-400 mt-2">Authentication Required</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter any email"
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter any password"
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          {error && <p className="text-red-400 text-xs italic mb-4 text-center">{error}</p>}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-600"
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
