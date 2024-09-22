import {View, Text, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';

interface HeaderProps {
  title: string;
  image: any;
  price: string;
  onPress?: (value: any) => void;
}

const ProductHomeItem: React.FC<HeaderProps> = ({
  title,
  image,
  onPress,
  price,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={{uri: image}} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
    </Pressable>
  );
};
export default React.memo(ProductHomeItem);
