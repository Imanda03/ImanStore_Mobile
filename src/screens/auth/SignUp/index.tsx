import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthHeader from '../../../components/core/AuthHeader';
import {styles} from './style';
import InputComponent from '../../../components/core/Input';
import ButtonComponent from '../../../components/core/Button';
import CheckBox from '../../../components/core/CheckBox';
import {useRegister} from '../../../services/AuthService';
import Toast from '../../../components/core/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../../Context';
import {useToast} from '../../../Context/ToastContext';

type FormData = {
  username: string;
  address: string;
  contactNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

const schema = yup.object().shape({
  username: yup.string().required('Full name is required'),
  address: yup.string().required('Address is required'),
  contactNumber: yup.string().required('Contact number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  agreeTerms: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms and privacy policy')
    .required(),
});

const SignUp = ({navigation}: any) => {
  const {mutate: register, isLoading, isError, error} = useRegister();
  const {showToast} = useToast();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      address: '',
      contactNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const onSubmit = (data: FormData) => {
    register(
      {...data, role: 'user'},
      {
        onSuccess: async data => {
          console.log('success', data);
          showToast(data.message, 'success');
          navigation.navigate('SignIn');
          control._defaultValues;
        },
        onError: (error: any) => {
          if (error?.response?.data) {
            // Check for the actual error message from the backend
            const backendMessage =
              error.response.data.message || 'Unable to register the user';
            showToast(backendMessage, 'error');
          } else {
            // Handle generic error cases
            showToast('Network error or server is down', 'error');
          }

          console.log('Error:', JSON.stringify(error, null, 2));
        },
      },
    );
  };
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const hideToast = () => {
    setToastMessage('');
  };

  return (
    <KeyboardAvoidingView style={{backgroundColor: '#dcdedc', height: '100%'}}>
      <ScrollView>
        <AuthHeader onBackPress={() => navigation.goBack()} title="Sign Up" />
        <View style={styles.container}>
          <View style={styles.GreetContainer}>
            <Text style={styles.greetContent}>Register Account</Text>
            <Text style={styles.greetText}>
              Welcome to ImanStore. Please register to create new account
            </Text>
          </View>

          <Controller
            control={control}
            name="username"
            render={({field: {onChange, value}}) => (
              <InputComponent
                placeholder="Full Name"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username.message}</Text>
          )}

          <Controller
            control={control}
            name="address"
            render={({field: {onChange, value}}) => (
              <InputComponent
                placeholder="Address"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.address && (
            <Text style={styles.errorText}>{errors.address.message}</Text>
          )}

          <Controller
            control={control}
            name="contactNumber"
            render={({field: {onChange, value}}) => (
              <InputComponent
                placeholder="Contact Number"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.contactNumber && (
            <Text style={styles.errorText}>{errors.contactNumber.message}</Text>
          )}

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

          <Controller
            control={control}
            name="confirmPassword"
            render={({field: {onChange, value}}) => (
              <InputComponent
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}
          <View>
            <View style={styles.agreeRow}>
              <Controller
                control={control}
                name="agreeTerms"
                render={({field: {onChange, value}}) => (
                  <CheckBox
                    checked={value}
                    onCheck={newValue => onChange(newValue)}
                  />
                )}
              />
              <View>
                <Text style={styles.agreeText}>
                  I agree with <Text style={styles.agreeTextBold}>Terms </Text>{' '}
                  & <Text style={styles.agreeTextBold}>Privacy</Text>
                </Text>
              </View>
            </View>
            {errors.agreeTerms && (
              <Text style={[styles.errorText, {marginTop: 5}]}>
                {errors.agreeTerms.message}
              </Text>
            )}
          </View>

          <View style={[styles.textContainer, {marginBottom: 20}]}>
            <Text style={styles.frontText}>Already Have Account? / </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 20}}>
            <ButtonComponent
              title="Register now"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </ScrollView>
      <Toast message={toastMessage} type={toastType} onHide={hideToast} />
    </KeyboardAvoidingView>
  );
};

export default SignUp;
