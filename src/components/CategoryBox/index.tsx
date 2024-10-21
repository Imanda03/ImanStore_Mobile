import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';

interface HeaderProps {
  title: string;
  image: string;
  onPress?: () => void;
  isFirst?: boolean; // Use 'boolean' instead of 'Boolean' (lowercase)
  isSelected?: boolean; // Use 'boolean' instead of 'any'
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
          isSelected ? {backgroundColor: '#404a44'} : {},
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
