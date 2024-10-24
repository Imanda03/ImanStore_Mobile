import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useQuery} from 'react-query';
import {checkFavourite} from '../../services/FavouriteService';

interface ProductProps {
  title: string;
  images: string;
  categoryName: string;
  price: string;
  description: string;
  onPress: () => void;
  userId: number | string;
  id: number | string;
  authToken: string;
}

const FavoriteList: React.FC<ProductProps> = ({
  title,
  images,
  categoryName,
  price,
  description,
  onPress,
  userId,
  id,
  authToken,
}) => {
  const truncatedDescription =
    description.length > 100
      ? description.substring(0, 100) + '...'
      : description;

  const {data: favoriteData, isLoading} = useQuery(
    ['checkFavourite', {userId, productId: id}],
    () => checkFavourite(authToken, {userId, productId: id}),
    {
      enabled: !!authToken,
    },
  );

  const isFavorite = favoriteData?.exists;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: images[0],
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
        <Text style={styles.description}>{truncatedDescription}</Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.title}>Rs. {price}</Text>
          <TouchableOpacity>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-dislike-outline'}
              size={24}
              color={isFavorite ? '#d1171d' : '#262b26'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

export default React.memo(FavoriteList);
