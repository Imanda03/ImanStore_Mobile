import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const loadAuthData = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      // Decode the userId from the token
      const decoded: any = jwtDecode(token);
      setUserId(decoded.userId); // Adjust according to the token structure
    }
  };

  useEffect(() => {
    loadAuthData(); // Load token and userId when the app starts
  }, []);

  const login = async (token: string) => {
    setAuthToken(token);
    // Decode the userId from the token
    const decoded: any = jwtDecode(token);
    setUserId(decoded.userId); // Adjust according to the token structure
    await AsyncStorage.setItem('authToken', token);
  };

  const logout = async () => {
    setAuthToken(null);
    setUserId(null);
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userId');
  };

  useEffect(() => {
    const handleStorageChange = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        setAuthToken(token);
        // Decode the userId from the token
        const decoded: any = jwtDecode(token);
        setUserId(decoded.userId); // Adjust according to the token structure
      } else {
        setAuthToken(null);
        setUserId(null);
      }
    };

    // Add any event listeners for changes if needed (RN doesn't have a "storage" event like browsers).
  }, []);

  return (
    <AuthContext.Provider value={{authToken, userId, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
