import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useQuery} from 'react-query';
import {checkFavourite} from '../../services/FavouriteService';
import {styles} from './styles';

interface ProductProps {
  title: string;
  images: string[];
  category: any;
  price: string;
  description: string;
  onPress: () => void;
  userId: number;
  id: number | string;
  authToken: string;
}

const FavoriteList: React.FC<ProductProps> = ({
  title,
  images,
  category,
  price,
  description,
  onPress,
  userId,
  id,
  authToken,
}) => {
  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

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

  // Initial fade-in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, []);

  // Press animation handler
  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.97,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  // Heart animation
  const animateHeart = () => {
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.containerWrapper,
        // {
        //   opacity: fadeAnim,
        //   // transform: [{scale: scaleAnim}],
        // },
      ]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: images[0],
            }}
          />
          {isLoading && <View style={styles.imagePlaceholder} />}
        </View>

        <View style={styles.secondContainer}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>

            <View style={styles.categoryContainer}>
              <MaterialIcons name="category" size={14} color="#82644a" />
              <Text style={styles.category}>{category?.title}</Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={3}>
            {truncatedDescription}
          </Text>

          <View style={styles.bottomContainer}>
            <Text style={styles.price}>Rs. {price}</Text>
            <TouchableOpacity
              onPress={animateHeart}
              style={styles.heartButton}
              activeOpacity={0.7}>
              <Animated.View style={{transform: [{scale: heartScale}]}}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite ? '#d1171d' : '#262b26'}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default React.memo(FavoriteList);
