import {View, Text, AppStateStatus, Platform, AppState} from 'react-native';
import React, {useEffect} from 'react';
import Routes from './Routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

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
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
