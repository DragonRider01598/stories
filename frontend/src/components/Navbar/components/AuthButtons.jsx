import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const AuthButtons = () => {
   const { isLogged } = useContext(AuthContext);
   const navigate = useNavigate();

   const handleLogin = () => {
      navigate('/login');
   };

   const handleLogout = () => {
      navigate('/logout');
   };

   const handleSignUp = () => {
      navigate('/signup');
   };

   return (
         <div className="flex w-full sm:mr-3 justify-end items-center">
            {isLogged ? (
               <button
                  onClick={handleLogout}
                  className="w-20 border border-zinc-600 hover:border-zinc-300 px-3 py-2 rounded-2xl text-sm font-medium"
               >
                  Logout
               </button>
            ) : (
               <div className="flex flex-row gap-2">
                  <button
                     onClick={handleLogin}
                     className="w-20 border border-zinc-600 hover:border-zinc-300 px-3 py-2 rounded-2xl text-sm font-medium"
                  >
                     Login
                  </button>
                  <button
                     onClick={handleSignUp}
                     className="w-20 border border-zinc-600 hover:border-zinc-300 px-3 py-2 rounded-2xl text-sm font-medium"
                  >
                     Signup
                  </button>
               </div>
            )}
         </div>
   );
};

export default AuthButtons;