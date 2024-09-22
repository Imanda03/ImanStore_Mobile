import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AuthHeader from '../../../components/core/AuthHeader';
import {styles} from './style';
import InputComponent from '../../../components/core/Input';
import ButtonComponent from '../../../components/core/Button';
import CheckBox from '../../../components/core/CheckBox';

const SignUp = ({navigation}: any) => {
  const [checked, setCHecked] = useState(false);

  return (
    <KeyboardAvoidingView style={{backgroundColor: '#dcdedc', height: '100%'}}>
      <ScrollView>
        <AuthHeader onBackPress={() => navigation.goBack()} title="Sign Up" />
        <View style={styles.container}>
          <View style={styles.GreetContainer}>
            <Text style={styles.greetContent}>Register Account</Text>
            <Text style={styles.greetText}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </Text>
          </View>
          <InputComponent placeholder="Full Name" />
          <InputComponent placeholder="Address" />
          <InputComponent placeholder="Contact Number" />
          <InputComponent placeholder="Email" />

          <View style={styles.agreeRow}>
            <CheckBox checked={checked} onCheck={setCHecked} />
            <Text style={styles.agreeText}>
              I agree with <Text style={styles.agreeTextBold}>Terms </Text> &{' '}
              <Text style={styles.agreeTextBold}>Privacy</Text>
            </Text>
          </View>

          <View style={[styles.textContainer, {marginBottom: 50}]}>
            <Text style={styles.frontText}>Already Have Account? / </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <ButtonComponent title="Register now" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
