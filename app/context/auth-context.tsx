import { createContext, useContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';

const AuthContext = createContext(null);

 const AuthProvider = ({ children }:{children : ReactNode} ) => {

  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Restore from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []); // run once

  const login = (userData:string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;