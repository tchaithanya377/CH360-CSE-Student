import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase'; // Import auth from your firebase.js file
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login Successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/nodues');
    }catch (err) {
      console.error("Firebase Login Error:", err.code, err.message);
      toast.error(err.message || "Login Failed! Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
          
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = async () => {
    if (!email) {
      toast.error('Please enter your email to reset password.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Check your inbox.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(err.message || 'Failed to send password reset email.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-black rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login to CampusHub360</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleForgetPassword}
            className="text-purple-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-purple-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
