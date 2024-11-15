import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode, JwtPayload} from 'jwt-decode'; // Correctly import jwt-decode

const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      if (decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return decoded.exp < currentTime; // Token is expired if current time > expiration time
      }
      return false; // If no `exp` field, treat it as valid
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Assume expired if decoding fails
    }
  };

  const logout = async () => {
    setAuthToken(null);
    setUserId(null);
    await AsyncStorage.removeItem('authToken');
  };

  const loadAuthData = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      if (isTokenExpired(token)) {
        await logout(); // Log out if token is expired
      } else {
        setAuthToken(token);
        const decoded: any = jwtDecode(token);
        setUserId(decoded.userId); // Adjust according to the token structure
      }
    }
  };

  useEffect(() => {
    loadAuthData(); // Check token validity when the app starts
  }, []);

  useEffect(() => {
    if (authToken) {
      const decoded: JwtPayload = jwtDecode(authToken);
      if (decoded.exp) {
        const expiresIn = decoded.exp * 1000 - Date.now(); // Time until expiration in milliseconds
        const timeout = setTimeout(() => {
          logout(); // Log out when the token expires
        }, expiresIn);

        return () => clearTimeout(timeout); // Clear timeout on cleanup
      }
    }
  }, [authToken]);

  const login = async (token: string) => {
    if (isTokenExpired(token)) {
      console.error('Cannot login with an expired token');
      return;
    }
    setAuthToken(token);
    const decoded: any = jwtDecode(token);
    setUserId(decoded.userId); // Adjust according to the token structure
    await AsyncStorage.setItem('authToken', token);
  };

  return (
    <AuthContext.Provider value={{authToken, userId, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
