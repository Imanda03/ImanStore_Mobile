import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Button from '../../../components/core/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImageCarsousel from '../../../components/core/ImageCarsousel';
import {Linking} from 'react-native';
// import {colors} from '../../../utils/color';
import {useState} from 'react';
import Modal from 'react-native-modal';
import ButtonWithIcon from '../../../components/core/ButtonWithIcon';

const ProductDetails = ({route, navigation}: any) => {
  const product = route?.params || {};
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onBackPress = () => {
    navigation.goBack();
  };

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
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.descrisption}>{product.description}</Text>
        </View>
        <TouchableOpacity onPress={onBackPress} style={styles.backContainer}>
          <FontAwesome name="arrow-left" size={20} color="#212b24" />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.bookmarkContainer}>
          <FontAwesome name="bookmark-o" size={24} color="#cdd1ce" />
        </TouchableOpacity>
        <ButtonWithIcon
          title="Order Now"
          startIconName="basket-plus"
          endIconName="arrow-u-right-bottom-bold"
          color="#cdd1ce"
          bgColor="#212b24"
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
