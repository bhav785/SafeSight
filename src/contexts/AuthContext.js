import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const mockUsers = [
  { email: 'hospital1@example.com', password: 'password123', role: 'hospital', hospitalId: 'miot' },
  { email: 'hospital2@example.com', password: 'password123', role: 'hospital', hospitalId: 'mgm' },

  { email: 'police1@example.com', password: 'password123', role: 'police' },
  { email: 'police2@example.com', password: 'password123', role: 'police' },
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [hospitalId, setHospitalId] = useState(null);

  const login = async (email, password) => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
      setUserRole(user.role);

      if (user.role === 'hospital') {
        setHospitalId(user.hospitalId);
      }

      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserRole(null);
    setHospitalId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, hospitalId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);