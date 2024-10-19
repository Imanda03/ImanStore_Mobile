import {View, Text, AppStateStatus, Platform, AppState} from 'react-native';
import React, {useEffect} from 'react';
import Routes from './Routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {focusManager, QueryClient, QueryClientProvider} from 'react-query';
import {ToastProvider} from './src/Context/ToastContext';
import {AuthProvider} from './src/Context';

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
};
const App = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: 2}},
  });
  return (
    // <SafeAreaProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </QueryClientProvider>
    </AuthProvider>
    // </SafeAreaProvider>
  );
};

export default App;
