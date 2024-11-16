import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {styles} from './style';

interface ButtonProps {
  title: string;
  onPress?: (value: any) => void;
  style?: any;
  variant?: 'default' | 'borderOnly' | 'text';
  loading?: boolean;
}

const ButtonComponent = ({
  title,
  onPress,
  style,
  variant = 'default',
  loading,
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
      {loading ? (
        <Text
          style={[
            styles.title,
            {justifyContent: 'center', alignContent: 'center'},
          ]}>
          Loading.. <ActivityIndicator color="white" />
        </Text>
      ) : (
        <Text style={[styles.title, variant === 'text' && styles.textVariant]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(ButtonComponent);
