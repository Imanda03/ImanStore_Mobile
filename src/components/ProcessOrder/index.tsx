import {View, Text, FlatList} from 'react-native';
import React from 'react';
import RenderOrder from '../RenderOrder';
import {processOrderData} from '../../data/ProcessOrder';

interface ProductItem {
  title: string;
  image: string;
  category: any;
  price: string;
  description?: string;
}

interface RenderProductItemProps {
  item: ProductItem;
  index: number;
}

const ProcessOrder = ({navigation}: any) => {
  const renderProductItem = ({item, index}: RenderProductItemProps) => {
    const onProductPress = (product: any) => {
      navigation.navigate('InnerScreen', {
        screen: 'ProductDetails',
        params: product,
      });
    };
    return <RenderOrder onPress={() => onProductPress(item)} {...item} />;
  };

  return (
    <View>
      <FlatList
        // style={styles.products}
        numColumns={1}
        data={processOrderData}
        renderItem={renderProductItem}
        keyExtractor={item => String(item.id)}
        ListFooterComponent={<View style={{height: 200}} />}
      />
    </View>
  );
};

export default ProcessOrder;
