import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useFlow = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
   const [isLogged, setIsLogged] = useState(false);
   const [username, setUsername] = useState(null);
 
   useEffect(() => {
     const authenticateUser = async () => {
       try {
         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
           method: 'GET',
           credentials: 'include',
         });
         
         const data = await response.json();

         if (response.ok && data.isLogged) {
           setIsLogged(true);
           setUsername(data.username);
         } else {
           setIsLogged(false);
           setUsername(null);
         }
       } catch (error) {
         console.error('Error during authentication:', error);
         setIsLogged(false);
         setUsername(null);
       }
     };
 
     authenticateUser();
   }, []);

  return (
    <AuthContext.Provider
      value={
        {
         isLogged,
         setIsLogged,
         username, 
         setUsername
        }}>
      {children}
    </AuthContext.Provider>
  );
};