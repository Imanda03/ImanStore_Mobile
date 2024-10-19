import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';

interface HeaderProps {
  categoryImage: string;
  categoryTitle: any;
  productCount?: number;
  onPress?: (value: any) => void;
}

const DiscoverCategory: React.FC<HeaderProps> = ({
  categoryTitle,
  categoryImage,
  productCount,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{categoryTitle}</Text>
        <Text style={styles.content}>{productCount} New Collections</Text>
      </View>
      <Image
        style={{height: 80, width: '50%'}}
        source={{
          uri: categoryImage,
        }}
      />
    </TouchableOpacity>
  );
};

export default DiscoverCategory;
