import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {styles} from './styles';

interface HeaderProps {
  categoryImage: string;
  categoryTitle: string;
  productCount?: number;
  onPress?: () => void;
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
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Explore</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: categoryImage}}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default DiscoverCategory;
