import React, {useState} from 'react';
import {View, TextInput, Pressable, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import {colors} from '../../../utils/colors';

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
        placeholderTextColor={colors.text.grayPrimary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
      />
      {secureTextEntry && (
        <Pressable onPress={onEyePress} style={styles.eyeIcon}>
          <Entypo
            name={isPasswordVisible ? 'eye' : 'eye-with-line'}
            size={20}
            color={colors.button.primary}
          />
        </Pressable>
      )}
    </View>
  );
};

export default React.memo(InputComponent);
