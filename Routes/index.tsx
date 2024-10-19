import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './Tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthRoute from './StackRoute/AuthRoute';
import HomeScreen from '../src/screens/app/HomeScreen';
import ProfileScreen from '../src/screens/app/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InnerScreen from './StackRoute/InnerScreen';
import {ProfileStack} from './StackRoute/ProfileStack';
import {useAuth} from '../src/Context';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Routes = () => {
  const Stack = createNativeStackNavigator();

  const {authToken} = useAuth(); // Get token from AuthContext
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (authToken !== null) {
      setIsLoading(false); // End loading state once token is checked
    }
  }, [authToken]);

  // if (isLoading) {
  //   // Optionally add a loading spinner or splash screen here
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  const isLoggedIn = !!authToken;

  console.log('userToken===>', authToken);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Tabs"
                component={Tabs}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="InnerScreen"
                component={InnerScreen}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="AuthRoute"
                component={AuthRoute}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Routes;
