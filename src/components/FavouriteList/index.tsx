import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ProductProps {
  title: string;
  image: string;
  categoryName: string;
  price: string;
  description: string;
  onPress: () => void;
}

const FavoriteList: React.FC<ProductProps> = ({
  title,
  image,
  categoryName,
  price,
  description,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <View style={styles.secondContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.categoryContainer}>
            <MaterialIcons name="category" size={14} color="#82644a" />
            <Text style={styles.category}>{categoryName}</Text>
          </View>
        </View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, veniam.
        </Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.title}>Rs. {price}</Text>
          <TouchableOpacity>
            <Ionicons name="heart" size={24} color="#d1171d" />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

export default React.memo(FavoriteList);
