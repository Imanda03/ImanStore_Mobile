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
  price: number | string;
  quantity?: number;
  id: number;
  orderQuantity: number;
}

const RenderCompletedOrder: React.FC<OrderProps> = ({
  images,
  title,
  category,
  status,
  description,
  price,
  orderQuantity,
}) => {
  const truncatedDescription =
    description && description.length > 100
      ? description.substring(0, 100) + '...'
      : description;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: images[0],
        }}
      />
      <View style={styles.secondContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.categoryContainer}>
            <MaterialIcons name="category" size={16} color="#031a03" />
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </View>
          <Text style={styles.description}>{truncatedDescription}</Text>
        </View>
        <View style={styles.priceSection}>
          <Text style={styles.title}>Rs. {orderQuantity * Number(price)}</Text>
          {status && <Text style={styles.status}>{status}</Text>}
        </View>
      </View>
      {/* {onDeleteOrder && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDeleteOrder}>
          <AntDesign name="delete" size={24} color="#c0392b" />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default React.memo(RenderCompletedOrder);
