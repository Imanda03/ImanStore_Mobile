import {View, Text, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
// import {colors} from '../../utils/color';

interface HeaderProps {
  title: string;
  image: string;
  onPress?: () => void;
  isFirst?: Boolean;
  isSelected?: any;
}

const CategoryBox: React.FC<HeaderProps> = ({
  title,
  image,
  onPress,
  isFirst,
  isSelected,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isFirst ? {marginLeft: 15} : {}]}>
      <View
        style={[
          styles.imageContainer,
          isSelected ? {backgroundColor: '#505c55'} : {},
        ]}>
        <Image style={styles.image} source={{uri: image}} />
      </View>

      <View>
        <Text
          style={[
            styles.title,
            isSelected ? {color: '#0e1210', fontWeight: '500'} : {},
          ]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
export default React.memo(CategoryBox);
