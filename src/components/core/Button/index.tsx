import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './style';

interface ButtonProps {
  title: string;
  onPress?: (value: any) => void;
  style?: any;
  variant?: 'default' | 'borderOnly' | 'text';
}

const ButtonComponent = ({
  title,
  onPress,
  style,
  variant = 'default',
}: ButtonProps) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'borderOnly':
        return styles.borderOnly;
      case 'text':
        return styles.textOnly;
      default:
        return styles.default;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.container, getVariantStyle(), style]}
      onPress={onPress}>
      <Text style={[styles.title, variant === 'text' && styles.textVariant]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(ButtonComponent);
