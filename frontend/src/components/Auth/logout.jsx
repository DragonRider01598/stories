import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { setIsLogged } = useContext(AuthContext);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
          method: 'DELETE',
          credentials: 'include',
        });
  
        if (response.ok) {
          const timeoutId = setTimeout(() => {
            setIsLogged(false);
            navigate('/');
          }, 1000);
  
          return () => clearTimeout(timeoutId);
        } else {
          console.error('Failed to log out');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };
  
    logoutUser(); 
  }, [navigate, setIsLogged]);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">You have logged out</h2>
        <p className="text-center">Redirecting to login page...</p>
      </div>
    </div>
  );
};

export default Logout;