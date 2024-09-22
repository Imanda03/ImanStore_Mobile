import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AuthHeader from '../../../components/core/AuthHeader';
import InputComponent from '../../../components/core/Input';
import ButtonComponent from '../../../components/core/Button';
import {styles} from './styles';

const SignIn = ({navigation}: any) => {
  return (
    <KeyboardAvoidingView style={{backgroundColor: '#dcdedc', height: '100%'}}>
      <AuthHeader onBackPress={() => navigation.goBack()} title="Sign In" />
      <ScrollView style={styles.container}>
        <View style={styles.GreetContainer}>
          <Text style={styles.greetContent}>Hey 👋</Text>
          <Text style={styles.greetContent}>Login Now!</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.frontText}>I Am A Old User/ </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Create New</Text>
          </TouchableOpacity>
        </View>
        <InputComponent placeholder="Username" />
        <InputComponent placeholder="Password" />
        <View style={[styles.textContainer, {marginBottom: 80}]}>
          <Text style={styles.frontText}>Forgot Password/ </Text>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <ButtonComponent title="Login now" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
