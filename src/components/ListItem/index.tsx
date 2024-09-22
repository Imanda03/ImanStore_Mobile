import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
// import {colors} from '../../utils/color';

interface ListProps {
  title: string;
  subtitle?: string;
  onPress?: (value: any) => void;
  style?: any;
}

const ListItem = ({title, subtitle, onPress, style}: ListProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {!!subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Entypo name="arrow-with-circle-right" size={20} color={'gray'} />
    </Pressable>
  );
};

export default React.memo(ListItem);
