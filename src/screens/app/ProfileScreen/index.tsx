import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Header from '../../../components/core/Header';
import React from 'react';
import ListItem from '../../../components/ListItem';
import {Avatar} from 'react-native-elements';
const ProfileScreen = ({navigation}: any) => {
  const num = 10;
  const onLogout = () => {
    console.log('Log out clicked');
  };

  const onSettingsPress = () => {
    navigation.navigate('ProfileStack', {screen: 'Settings'});
  };

  const onNewListingsPress = () => {
    navigation.navigate('CreateListings');
  };
  const onMyListingPress = () => {
    navigation.navigate('Order');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dcdedc'}}>
      <Header
        title="Profile"
        onLogout={onLogout}
        showLogout
        style={{backgroundColor: '#91a39e'}}
      />
      <View style={styles.header}></View>
      <View style={styles.avatar}>
        <Avatar
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
          }}
          size={150}
          rounded
          icon={{name: 'home'}}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Anish Sharma</Text>
          <View>
            <Text style={styles.email}>asis03ktm@gmail.com</Text>
          </View>

          <ListItem
            onPress={onMyListingPress}
            title="Orders"
            subtitle={`You have ${num} orders in progress`}
          />
          <ListItem
            onPress={onSettingsPress}
            title="Settings"
            subtitle="Account, FAQ, Contact"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(ProfileScreen);
