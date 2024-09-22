import {View, Text, TextInput} from 'react-native';
import React from 'react';
import styles from './styles';

interface InputProps {
  placeholder?: string;
}

const InputComponent = ({placeholder}: InputProps) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'black'}
      />
    </View>
  );
};

export default React.memo(InputComponent);
