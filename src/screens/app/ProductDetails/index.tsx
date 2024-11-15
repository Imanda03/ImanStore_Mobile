import React, {useState, useRef, useEffect} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  checkFavourite,
  toggleFavourite,
} from '../../../services/FavouriteService';
import {useAuth} from '../../../Context';
import {useToast} from '../../../Context/ToastContext';
import ImageCarsousel from '../../../components/core/ImageCarsousel';
import ButtonWithIcon from '../../../components/core/ButtonWithIcon';
import InfoModal from '../../../components/core/InfoModal';
import {styles} from './styles';
import {addOrder} from '../../../services/OrderService';

const ProductDetails = ({route, navigation}: any) => {
  const product = route?.params || {};
  const {authToken, userId} = useAuth();
  const queryClient = useQueryClient();
  const {showToast} = useToast();

  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const bookmarkScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const contentTranslate = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const {data: favoriteData} = useQuery(
    ['checkFavourite', userId, product?.id],
    () => checkFavourite(authToken, {userId, productId: product?.id}),
    {
      enabled: !!authToken,
    },
  );

  const isFavorite = favoriteData?.exists;

  const mutation = useMutation(
    (status: 'add' | 'remove') => {
      return toggleFavourite(authToken, {
        userId: userId,
        productId: product?.id,
        status: status,
      });
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(['checkFavourite', userId, product?.id]);
        queryClient.invalidateQueries('favouriteList', userId);
        queryClient.invalidateQueries('recommendedProducts', authToken, userId);
        queryClient.invalidateQueries([
          'discoverList',
          authToken,
          product?.category_id,
        ]);
        showToast(data.message, 'success');
      },
      onError: (error: any) => {
        if (error?.response?.data) {
          showToast(error.response.data.message, 'error');
        } else {
          showToast('Network error or server is down', 'error');
        }
      },
    },
  );

  const {mutate: AddOrder, isLoading: orderLoading} = addOrder(authToken);

  const handleToggleFavorite = () => {
    const status = isFavorite ? 'remove' : 'add';
    Animated.sequence([
      Animated.timing(bookmarkScale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bookmarkScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    mutation.mutate(status);
  };

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const handleSubmitModal = () => {
    const data: any = {
      userId: userId,
      productId: product.id,
      status: 'created',
    };
    AddOrder(data, {
      onSuccess: data => {
        showToast(data.message, 'success');
        queryClient.invalidateQueries('progressOrder', userId);
        setIsModalVisible(false);
      },
      onError: (error: any) => {
        setIsModalVisible(false);
        if (error?.response?.data) {
          showToast(error.response.data.message, 'error');
        } else {
          showToast('Network error or server is down', 'error');
        }
      },
    });
  };

  const onBackPress = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Animated Header Background */}
      <Animated.View
        style={[
          styles.headerBackground,
          {
            opacity: headerOpacity,
          },
        ]}
      />

      <ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <Animated.View style={{opacity: fadeAnim}}>
          {product?.images?.length ? (
            <ImageCarsousel images={product.images} />
          ) : (
            <Image style={styles.Image} source={{uri: product.image}} />
          )}
        </Animated.View>

        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                {translateY: contentTranslate},
                {translateY: slideAnim},
              ],
              opacity: fadeAnim,
            },
          ]}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>Rs. {product.price}</Text>
          <View style={styles.stockContainer}>
            <Text style={styles.stock}>{`${product.quantity} on stock`}</Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>
        </Animated.View>
      </ScrollView>

      <TouchableOpacity
        onPress={onBackPress}
        style={[styles.backContainer, {opacity: 0.9}]}>
        <FontAwesome name="arrow-left" size={20} color="#212b24" />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.footer,
          {
            transform: [{translateY: slideAnim}],
            opacity: fadeAnim,
          },
        ]}>
        <Animated.View style={{transform: [{scale: bookmarkScale}]}}>
          <TouchableOpacity
            style={[
              styles.bookmarkContainer,
              isFavorite && styles.bookmarkContainerActive,
            ]}
            onPress={handleToggleFavorite}>
            <FontAwesome
              name={isFavorite ? 'bookmark-multiple' : 'bookmark-off-outline'}
              size={24}
              color={isFavorite ? '#ffffff' : '#cdd1ce'}
            />
          </TouchableOpacity>
        </Animated.View>

        <ButtonWithIcon
          title="Add to Cart"
          startIconName="basket-plus"
          endIconName="arrow-u-right-bottom-bold"
          color="#cdd1ce"
          bgColor="#212b24"
          onPress={handleOpenModal}
          disabled={orderLoading}
        />
      </Animated.View>

      <InfoModal
        modalVisible={isModalVisible}
        title={`Are you sure you want to add ${product.title} to cart`}
        onConfirm={handleSubmitModal}
        onCancel={handleCloseModal}
      />
    </SafeAreaView>
  );
};

export default React.memo(ProductDetails);
