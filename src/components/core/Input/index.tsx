import React, {useState} from 'react';
import {View, TextInput, Pressable, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';

interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const InputComponent = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onEyePress = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#8a968e"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
      />
      {secureTextEntry && (
        <Pressable onPress={onEyePress} style={styles.eyeIcon}>
          <Entypo
            name={isPasswordVisible ? 'eye' : 'eye-with-line'}
            size={20}
            color="#000"
          />
        </Pressable>
      )}
    </View>
  );
};

export default React.memo(InputComponent);
