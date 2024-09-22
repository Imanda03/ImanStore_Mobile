import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ButtonProps {
  title: string;
  onPress?: (value: any) => void;
  style?: any;
  startIconName: string;
  endIconName: string;
  color: string;
  bgColor: string;
}

const ButtonWithIcon = ({
  title,
  onPress,
  style,
  startIconName,
  endIconName,
  color,
  bgColor,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: bgColor}]}
      onPress={onPress}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name={startIconName}
          size={28}
          color={color}
          style={styles.iconLeft}
        />
        <Text style={[styles.title, {color: color}]}>{title}</Text>
        <MaterialCommunityIcons
          name={endIconName}
          size={28}
          color={color}
          style={styles.iconRight}
        />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ButtonWithIcon);
