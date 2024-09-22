import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface OrderProps {
  image: string;
  title: string;
  category: string;
  status?: string;
  onPress?: () => void;
}

const RenderOrder: React.FC<OrderProps> = ({
  image,
  title,
  category,
  status,
}) => {
  return (
    <View style={styles.container}>
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
            <MaterialIcons name="category" size={16} color="#031a03" />
            <Text style={styles.categoryTitle}> {category}</Text>
          </View>
        </View>
        <Text style={styles.status}>Delivery</Text>
      </View>
      <Ionicons
        style={styles.icon}
        name="arrow-redo-circle-sharp"
        size={30}
        color="black"
      />
    </View>
  );
};

export default React.memo(RenderOrder);
