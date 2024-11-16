import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface OrderProps {
  images: string[];
  title: string;
  category: {title: string};
  status?: string;
  onPress?: () => void;
  description?: string;
  price?: number | string;
  quantity?: number;
  productId: number;
  currentQuantity: number;
  onQuantityChange: (quantity: number) => void;
  onDeleteOrder?: () => void;
}

const RenderOrder: React.FC<OrderProps> = ({
  images,
  title,
  category,
  status,
  description,
  price,
  quantity: maxQuantity,
  productId,
  currentQuantity,
  onQuantityChange,
  onDeleteOrder,
}) => {
  const truncatedDescription =
    description && description.length > 60
      ? description.substring(0, 60) + '...'
      : description;

  const increaseQuantity = () => {
    onQuantityChange(currentQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (currentQuantity > 1) {
      onQuantityChange(currentQuantity - 1);
    }
  };

  const handleDelete = () => {
    if (onDeleteOrder) {
      onDeleteOrder();
    }
  };

  const truncatedTitle =
    title.length > 30 ? title.substring(0, 25) + '...' : title;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: images?.[0],
        }}
      />
      <View style={styles.secondContainer}>
        <View>
          <Text style={styles.title}>{truncatedTitle}</Text>

          <View style={styles.categoryContainer}>
            <MaterialIcons name="category" size={16} color="#031a03" />
            <Text style={styles.categoryTitle}> {category.title}</Text>
          </View>
        </View>
        <Text style={styles.description}> {truncatedDescription}</Text>
        <Text style={styles.title}>Rs. {price}</Text>
        <View style={styles.footerContainer}>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              disabled={currentQuantity === 1}
              style={{opacity: currentQuantity === 1 ? 0.5 : 1}}>
              <AntDesign name="minuscircleo" size={26} color="#031a03" />
            </TouchableOpacity>

            <Text style={styles.title}>{currentQuantity}</Text>
            <TouchableOpacity
              onPress={increaseQuantity}
              disabled={currentQuantity === maxQuantity}
              style={{opacity: currentQuantity === maxQuantity ? 0.5 : 1}}>
              <AntDesign name="pluscircleo" size={26} color="#031a03" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleDelete}>
            <AntDesign name="closecircleo" size={26} color="#872d2d" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(RenderOrder);
