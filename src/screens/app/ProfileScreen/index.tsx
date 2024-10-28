import React, {useRef, useEffect} from 'react';
import {Text, View, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Header from '../../../components/core/Header';
import ListItem from '../../../components/ListItem';
import {Avatar} from 'react-native-elements';
import {useAuth} from '../../../Context';
import {useToast} from '../../../Context/ToastContext';
import {useQuery} from 'react-query';
import {getProfileDetails} from '../../../services/AuthService';

const ProfileScreen = ({navigation}: any) => {
  const {logout, authToken, userId} = useAuth();
  const {showToast} = useToast();

  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery(['profile', userId], () => getProfileDetails(authToken, userId));

  const num = 10;

  const onLogout = () => {
    logout();
    showToast('Logout Successfully', 'success');
  };

  const onSettingsPress = () => {
    navigation.navigate('ProfileStack', {screen: 'Settings'});
  };

  const onMyListingPress = () => {
    navigation.navigate('Order');
  };

  // Animation refs
  const avatarScale = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Avatar bounce animation
  useEffect(() => {
    Animated.spring(avatarScale, {
      toValue: 1,
      friction: 3,
      tension: 160,
      useNativeDriver: true,
    }).start();
  }, [avatarScale]);

  // ListItem fade-in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dcdedc'}}>
      <Header
        title="Profile"
        onLogout={onLogout}
        showLogout
        style={{backgroundColor: '#91a39e'}}
      />
      <View style={styles.header}></View>

      {/* Animated Avatar */}
      <View style={styles.avatar}>
        <Animated.View>
          <Avatar
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
            }}
            size={150}
            rounded
          />
        </Animated.View>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{profileData?.userDetails?.username}</Text>
          <View>
            <Text style={styles.email}>{profileData?.userDetails?.email}</Text>
          </View>

          {/* Animated ListItems */}
          <Animated.View style={{opacity: fadeAnim}}>
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
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(ProfileScreen);
