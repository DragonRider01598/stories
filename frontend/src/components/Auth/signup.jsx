import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { setIsLogged } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, name, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setIsLogged(true);
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      } else {
        console.error("Login failed:", data.error);
        setError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(true);
    }
  };

  useEffect(() => {
    setError(false);
  }, [email, username, name, password])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative">
      <a href="/" className="absolute top-4 left-4 bg-blue-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-900 transition duration-200 ease-in-out">
        Go Back
      </a>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-400">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border-0 focus:outline-none bg-gray-700 text-gray-300"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-md border-0 focus:outline-none bg-gray-700 text-gray-300"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md border-0 focus:outline-none bg-gray-700 text-gray-300"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-400 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border-0 focus:outline-none bg-gray-700 text-gray-300"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="mb-2 bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md text-sm">
              This Email or Username is already in use.
            </div>
          )}
          <div className="text-sm text-gray-400 text-center mb-2">
            Already have an Account?
            <a href="/login" className="text-blue-500 hover:underline ml-1">Login</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;