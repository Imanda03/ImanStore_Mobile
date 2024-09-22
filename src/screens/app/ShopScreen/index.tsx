import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProcessOrder from '../../../components/ProcessOrder';
import CompleteOrder from '../../../components/CompleteOrder.tsx';

const ShopScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'process', title: 'Process', icon: 'bag-remove-outline'},
    {key: 'completed', title: 'Completed', icon: 'bag-check-outline'},
  ]);

  const renderScene = SceneMap({
    process: ProcessOrder,
    completed: CompleteOrder,
  });

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map(
      (x: any, i: number) => i,
    );

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route: any, i: number) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          const scale = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: number) =>
              inputIndex === i ? 1.1 : 1,
            ),
          });

          const backgroundColor = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) =>
              inputIndex === i ? '#777d75' : 'transparent',
            ),
          });

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.View
                style={[
                  styles.tabItemBackground,
                  {backgroundColor, transform: [{scale}]},
                ]}
              />
              <Ionicons name={route.icon} size={24} color="#090f06" />
              <Animated.Text style={[styles.tabItemText, {opacity}]}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Orders</Text>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

export default ShopScreen;
