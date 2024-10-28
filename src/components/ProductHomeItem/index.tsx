import {View, Text, Pressable, Image, Modal, Alert} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';

interface HeaderProps {
  title: string;
  images: string[];
  price: string;
  onPress?: (value: any) => void;
}

const ProductHomeItem: React.FC<HeaderProps> = ({
  title,
  images,
  onPress,
  price,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.container, pressed && styles.pressed]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: images[0]}}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </Pressable>
  );
};
export default React.memo(ProductHomeItem);
