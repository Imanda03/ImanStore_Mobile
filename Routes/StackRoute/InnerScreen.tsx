import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetails from '../../src/screens/app/ProductDetails';
import DiscoverList from '../../src/screens/app/DiscoverList';

const InnerScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="DiscoverLists"
        component={DiscoverList}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default InnerScreen;
