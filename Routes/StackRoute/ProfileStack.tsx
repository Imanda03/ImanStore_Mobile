import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../../src/screens/app/SettingsScreen';

export const ProfileStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
