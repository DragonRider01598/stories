import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { isLogged, setIsLogged } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
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
  }, [email, password])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <a href="/" className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200 ease-in-out">
        Go Back
      </a>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="mb-2 bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md text-sm">
              Incorrect username or password.
            </div>
          )}
          <div className="text-sm text-gray-600 text-center mb-2">
            Do not have an Account?
            <a href="/signup" className="text-blue-500 hover:underline ml-1">Signup</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;