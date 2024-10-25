import {View, Text, FlatList} from 'react-native';
import React from 'react';
import RenderOrder from '../RenderOrder';
import {processOrderData} from '../../data/ProcessOrder';
import RenderCompletedOrder from '../RenderCompletedOrder';
import {useQuery} from 'react-query';
import {useAuth} from '../../Context';
import {fetchUserCompletedOrder} from '../../services/OrderService';

interface ProductItem {
  products: {
    title: string;
    id: number;
    category: any;
    price: string;
    description?: string;
    images: string[];
  };
  status: string;
  quantity: number;
}

interface RenderProductItemProps {
  item: ProductItem;
  index: number;
}

const CompletedOrder = ({navigation}: any) => {
  const {authToken, userId} = useAuth();

  const {
    data: orderCompletedList,
    error,
    isLoading,
    refetch,
  } = useQuery(
    ['completedOrder', authToken],
    () => fetchUserCompletedOrder(authToken, userId),
    {
      enabled: !!authToken,
    },
  );

  const renderProductItem = ({item, index}: RenderProductItemProps) => {
    const onProductPress = (product: any) => {
      navigation.navigate('InnerScreen', {
        screen: 'ProductDetails',
        params: product,
      });
    };
    return (
      <RenderCompletedOrder
        status={item.status}
        orderQuantity={item.quantity}
        {...item?.products}
      />
    );
  };

  return (
    <View>
      <FlatList
        // style={styles.products}
        numColumns={1}
        data={orderCompletedList?.orders}
        renderItem={renderProductItem}
        keyExtractor={(item: any) => String(item.id)}
        ListFooterComponent={<View style={{height: 200}} />}
      />
    </View>
  );
};

export default CompletedOrder;
