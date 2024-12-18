import React, {useState, useEffect} from 'react';
import {View, Text, AppStateStatus, Platform, AppState} from 'react-native';
import Routes from './Routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {focusManager, QueryClient, QueryClientProvider} from 'react-query';
import {ToastProvider} from './src/Context/ToastContext';
import {AuthProvider} from './src/Context';
import {StripeProvider} from '@stripe/stripe-react-native';
import LoadingScreen from './src/screens/LoadingScreen';

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    // Simulate a delay to show the loading screen
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => subscription.remove();
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: 2}},
  });

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <StripeProvider publishableKey="pk_test_51QCjNMJTZJqkV4e8TpxoVh4xJdydmGBjON4BzEWtK0085H8CtXWzBVayntyz3rmVALv69zj8R48Ai9BquN3IQaxk00azNEnN0B">
            <ToastProvider>
              {isLoading ? <LoadingScreen /> : <Routes />}
            </ToastProvider>
          </StripeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
