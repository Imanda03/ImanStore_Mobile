import {View, Text, Pressable, TextInput} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
// import {colors} from '../../utils/color';

interface ListProps {
  editable?: boolean;
  label?: string;
  onChnageText?: (value: any) => void;
  style?: any;
  value?: any;
}

const EditableBox = ({
  label,
  value,
  editable,
  onChnageText,
  style,
}: ListProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        editable={editable}
        value={value}
        onChangeText={onChnageText}
        style={styles.input}
      />
    </View>
  );
};

export default React.memo(EditableBox);
