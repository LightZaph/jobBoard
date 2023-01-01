import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const localData = localStorage.getItem('user');
    if (!localData.login) {
      return null;
    } else {
      return localData ? JSON.parse(localData) : {};
    }
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
