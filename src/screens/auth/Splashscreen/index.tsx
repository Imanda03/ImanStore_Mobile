import React from 'react';
import {
  SafeAreaView,
  Pressable,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {styles} from './Style';
import Button from '../../../components/core/Button';
import ButtonWithIcon from '../../../components/core/ButtonWithIcon';

const splashImg = require('../../../assets/splashIcon.png');

const SplashScreen = ({navigation}: any) => {
  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  const onSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={splashImg}
        style={{
          height: '100%',
        }}>
        <View style={styles.bgImage}>
          <View>
            <Text style={styles.title}>Welcome To Store</Text>
            <Text style={styles.content}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
              debitis.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <ButtonWithIcon
              title="Proceed to Login"
              startIconName="login"
              endIconName="arrow-right-thick"
              color="black"
              bgColor="#e3e1dc"
              onPress={() => navigation.navigate('SignIn')}
            />
            <ButtonWithIcon
              title="New User? Sign Up"
              startIconName="account-lock-open"
              endIconName="arrow-right-thick"
              color="wheat"
              bgColor="#30302f"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;
