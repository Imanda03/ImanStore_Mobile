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

const Routes = () => {
  const Stack = createNativeStackNavigator();

  const isLoggedIn: boolean = false;

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
