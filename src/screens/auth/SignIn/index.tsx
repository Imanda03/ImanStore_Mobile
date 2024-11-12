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
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useLogin} from '../../../services/AuthService';
import {useToast} from '../../../Context/ToastContext';
import {useAuth} from '../../../Context';
import {colors} from '../../../utils/colors';

type FormData = {
  email: string;
  password: string;
};

const SignIn = ({navigation}: any) => {
  const {mutate: login, isLoading, isError, error} = useLogin();
  const {showToast} = useToast();

  const {login: loginToGlobalState} = useAuth();

  const schema = yup.object().shape({
    email: yup.string().required('email is required'),
    password: yup.string().required('Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    login(data, {
      onSuccess: async data => {
        showToast(data.message, 'success');

        loginToGlobalState(data.token);
        control._defaultValues;
      },
      onError: (error: any) => {
        if (error?.response?.data) {
          // Check for the actual error message from the backend
          const backendMessage =
            error.response.data.message || 'Unable to login the user';
          showToast(backendMessage, 'error');
        } else {
          // Handle generic error cases
          console.log('error', error.message);
          showToast('Network error or server is down', 'error');
        }
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{backgroundColor: colors.background.auth, height: '100%'}}>
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
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}}) => (
            <InputComponent
              placeholder="Email"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, value}}) => (
            <InputComponent
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
        <View style={[styles.textContainer, {marginBottom: 80}]}>
          <Text style={styles.frontText}>Forgot Password/ </Text>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <ButtonComponent
          title="Register now"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
