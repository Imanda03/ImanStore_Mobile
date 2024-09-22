import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import HomeScreen from '../../src/screens/app/HomeScreen';
import ProfileScreen from '../../src/screens/app/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FavoriteScreen from '../../src/screens/app/FavoriteScreen';
import ShopScreen from '../../src/screens/app/ShopScreen';
import DiscoverScreen from '../../src/screens/app/DiscoverScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'bag-handle-sharp' : 'bag-handle-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }
          const iconColor = focused ? '#ffffff' : '#dcdedc';
          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
        headerShown: false,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[
                styles.tabLabel,
                {color: focused ? '#ffffff' : '#dcdedc'},
              ]}>
              {route.name}
            </Text>
          );
        },
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarButton: props => <TabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarButton: props => <TabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Order"
        component={ShopScreen}
        options={{
          tabBarButton: props => <TabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarButton: props => <TabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarButton: props => <TabBarButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const TabBarButton = ({accessibilityState, children, onPress, label}: any) => {
  const focused = accessibilityState.selected;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.tabBarButtonContainer}>
      <View
        style={[
          styles.tabBarButton,
          focused ? styles.tabBarButtonActive : null,
        ]}>
        {children}
        <Text
          style={[styles.tabLabel, {color: focused ? '#ffffff' : '#dcdedc'}]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    elevation: 5,
    backgroundColor: '#232e23',
    borderRadius: 20,
    height: 70,
  },
  tabBarItem: {
    padding: 5,
  },
  tabBarIcon: {
    marginTop: 10,
  },
  tabLabel: {
    fontSize: 12,
    textAlign: 'center',
    width: 60,
  },
  tabBarButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tabBarButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 8,
    // paddingHorizontal: 12,
  },
  tabBarButtonActive: {
    backgroundColor: '#777a77',
    borderRadius: 20,
    marginHorizontal: 10,
  },
});

export default Tabs;
