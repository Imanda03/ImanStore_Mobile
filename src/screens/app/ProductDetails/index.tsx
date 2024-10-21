import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
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
import SelectComponent from '../../../components/core/Select';
import {styles} from './styles';

const ProductDetails = ({route, navigation}: any) => {
  const product = route?.params || {};
  const {authToken, userId} = useAuth();
  const queryClient = useQueryClient();
  const {showToast} = useToast();

  const onBackPress = () => {
    navigation.goBack();
  };

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

        queryClient.invalidateQueries([
          'discoverList',
          authToken,
          product?.category_id,
        ]);

        showToast(data.message, 'success');
      },
      onError: (error: any) => {
        if (error?.response?.data) {
          const backendMessage = error.response.data.message;
          showToast(backendMessage, 'error');
        } else {
          showToast('Network error or server is down', 'error');
        }
      },
    },
  );

  const handleToggleFavorite = () => {
    const status = isFavorite ? 'remove' : 'add';
    mutation.mutate(status);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1); // State for quantity

  const handleSelect = (value: string | number) => {
    console.log('Selected value:', value);
  };

  const options = [
    {label: 'Option 1', value: 1},
    {label: 'Option 2', value: 2},
    {label: 'Option 3', value: 3},
  ];

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSubmitModal = () => {
    console.log('Submit button pressed with quantity:', quantity);
    setIsModalVisible(!isModalVisible); // Close modal after submit action
  };

  // const increaseQuantity = () => {
  //   setQuantity(prev => prev + 1);
  // };

  // const decreaseQuantity = () => {
  //   setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Prevent negative quantity
  // };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        {product?.images?.length ? (
          <ImageCarsousel images={product.images} />
        ) : (
          <Image style={styles.Image} source={{uri: product.image}} />
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>Rs. {product.price}</Text>
          <Text style={styles.descrisption}>{product.description}</Text>
        </View>
        <TouchableOpacity onPress={onBackPress} style={styles.backContainer}>
          <FontAwesome name="arrow-left" size={20} color="#212b24" />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.bookmarkContainer}
          onPress={handleToggleFavorite}>
          <FontAwesome
            name={isFavorite ? 'bookmark-multiple' : 'bookmark-off-outline'}
            size={24}
            color={isFavorite ? '#ffffff' : '#cdd1ce'}
          />
        </TouchableOpacity>
        <ButtonWithIcon
          title="Add to Cart"
          startIconName="basket-plus"
          endIconName="arrow-u-right-bottom-bold"
          color="#cdd1ce"
          bgColor="#212b24"
          onPress={handleOpenModal}
        />
      </View>

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
