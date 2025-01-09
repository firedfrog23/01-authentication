import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';

const Login = () => {

  const navigate = useNavigate('')

  const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContent)

  const [formState, setFormState] = useState({
    mode: 'Sign Up', // Can be 'Sign Up' or 'Login'
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMode = () => {
    setFormState((prev) => ({
      ...prev,
      mode: prev.mode === 'Sign Up' ? 'Login' : 'Sign Up',
      name: '',
      email: '',
      password: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    axios.defaults.withCredentials = true
  
    try {
      const endpoint = formState.mode === 'Sign Up'
        ? '/api/auth/register'
        : '/api/auth/login';
  
      const payload = {
        email: formState.email,
        password: formState.password,
      };
  
      if (formState.mode === 'Sign Up') {
        payload.name = formState.name;
      }
  
      
      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);
  
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        console.log(data)
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error during submission:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={()=>navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="absolute left-4 sm:left-20 top-5 w-28 sm:w-28 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {formState.mode === 'Sign Up' ? 'Create Account' : 'Login!'}
        </h2>
        <p className="text-center text-sm mb-6">
          {formState.mode === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
        </p>

        <form onSubmit={handleSubmit}>
          {formState.mode === 'Sign Up' && (
            <div className="flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="Person Icon" />
              <input
                className="bg-transparent outline-none w-full"
                type="text"
                name="name"
                placeholder="Full Name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Mail Icon" />
            <input
              className="bg-transparent outline-none w-full"
              type="email"
              name="email"
              placeholder="E-mail"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center mb-4 gap-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.person_icon} alt="Lock Icon" />
            <input
              className="bg-transparent outline-none w-full"
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
              required
            />
          </div>

          <p  onClick={() => navigate('/password-reset')}  className="mb-6 text-indigo-500 cursor-pointer">Forgot password?</p>
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
          >
            {formState.mode}
          </button>

          {formState.mode === 'Sign Up' ? (
            <p className="text-gray-500 text-center text-xs mt-4">
              Already have an account?{' '}
              <span
                onClick={toggleMode}
                className="text-blue-400 cursor-pointer underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-400 text-center text-xs mt-4">
              Don&apos;t have an account?{' '}
              <span
                onClick={toggleMode}
                className="text-blue-400 cursor-pointer underline"
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
