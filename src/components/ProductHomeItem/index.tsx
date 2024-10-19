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
    <Pressable onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={{uri: images[0]}} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>Rs. {price}</Text>
    </Pressable>
  );
};
export default React.memo(ProductHomeItem);
