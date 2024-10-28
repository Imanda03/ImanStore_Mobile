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
import {colors} from '../../../utils/colors';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const splashImg = require('../../../assets/splashIcon.png');

const SplashScreen = ({navigation}: any) => {
  const logoScale = useSharedValue(1);
  const buttonOpacity = useSharedValue(0);

  React.useEffect(() => {
    // Animate logo on mount
    logoScale.value = withSpring(1.2, {}, finished => {
      if (finished) {
        logoScale.value = withSpring(1);
        buttonOpacity.value = withTiming(1, {duration: 800});
      }
    });
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{scale: logoScale.value}],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));
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
              color={colors.text.dark}
              bgColor={colors.button.secondary}
              onPress={() => navigation.navigate('SignIn')}
            />
            <ButtonWithIcon
              title="New User? Sign Up"
              startIconName="account-lock-open"
              endIconName="arrow-right-thick"
              color={colors.text.whitePrimary}
              bgColor={colors.button.primary}
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SplashScreen;
