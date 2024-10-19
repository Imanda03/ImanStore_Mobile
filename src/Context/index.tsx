import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const loadToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  };

  useEffect(() => {
    loadToken(); // Load token when the app starts
  }, []);

  const login = async (token: string) => {
    setAuthToken(token);
    await AsyncStorage.setItem('authToken', token);
  };

  const logout = async () => {
    setAuthToken(null);
    await AsyncStorage.removeItem('authToken');
  };

  useEffect(() => {
    const handleStorageChange = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setAuthToken(token);
    };

    // You can add any event listeners for changes (like a refresh mechanism), but RN doesn't have a "storage" event like the browser.
  }, []);

  return (
    <AuthContext.Provider value={{authToken, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
