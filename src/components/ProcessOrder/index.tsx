import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import RenderOrder from '../RenderOrder';
import {styles} from './styles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useQuery} from 'react-query';
import {useAuth} from '../../Context';
import {getOrder} from '../../services/OrderService';

interface ProductItem {
  id: number;
  products: {
    title: string;
    images: string[];
    category: {title: string};
    price: string;
    description?: string;
    quantity?: number;
  };
}

interface OrderQuantity {
  [key: number]: number;
}

const ProcessOrder = ({navigation}: any) => {
  const {authToken, userId} = useAuth();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderQuantities, setOrderQuantities] = useState<OrderQuantity>({});
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Refetch data when refreshing
    refetch().finally(() => setRefreshing(false));
  }, []);

  const {
    data: progressOrderList,
    error,
    isLoading,
    refetch, // Extract refetch function from useQuery to call on refresh
  } = useQuery(
    ['progressOrder', authToken],
    () => getOrder(authToken, userId),
    {
      enabled: !!authToken,
    },
  );

  useEffect(() => {
    if (progressOrderList?.orders) {
      const initialQuantities: OrderQuantity = {};
      progressOrderList.orders.forEach((item: ProductItem) => {
        initialQuantities[item.id] = 1;
      });
      setOrderQuantities(initialQuantities);
    }
  }, [progressOrderList?.orders]);

  useEffect(() => {
    if (progressOrderList?.orders) {
      const newTotal = progressOrderList.orders.reduce(
        (sum: any, item: any) => {
          const quantity = orderQuantities[item.id] || 1;
          return sum + Number(item.products.price) * quantity;
        },
        0,
      );
      setTotalPrice(newTotal);
    }
  }, [orderQuantities, progressOrderList?.orders]);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setOrderQuantities(prev => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  const renderProductItem = ({
    item,
    index,
  }: {
    item: ProductItem;
    index: number;
  }) => {
    const onProductPress = (product: any) => {
      navigation.navigate('InnerScreen', {
        screen: 'ProductDetails',
        params: product,
      });
    };

    return (
      <RenderOrder
        onPress={() => onProductPress(item?.products)}
        {...item?.products}
        productId={item.id}
        currentQuantity={orderQuantities[item.id] || 1}
        onQuantityChange={newQuantity =>
          handleQuantityChange(item.id, newQuantity)
        }
      />
    );
  };

  return (
    <View>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: 10,
            color: 'black',
          }}>
          Rs. {totalPrice.toFixed(2)}
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            width: '50%',
            height: '80%',
            paddingHorizontal: 10,
            borderRadius: 20,
            borderWidth: 0.5,
            borderColor: '#b3b3b3',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              marginVertical: 10,
              color: 'black',
            }}>
            Proceed To Payment
          </Text>
          <FontAwesomeIcon name="arrow-circle-right" color="black" size={24} />
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={1}
        data={progressOrderList?.orders}
        renderItem={renderProductItem}
        keyExtractor={(item: any) => String(item.id)}
        ListFooterComponent={<View style={{height: 200}} />}
        refreshing={refreshing} // Add refreshing state
        onRefresh={onRefresh} // Add onRefresh callback
        ListEmptyComponent={
          <View>
            <Text style={{color: 'black'}}>No Order Yet</Text>
          </View>
        }
      />
    </View>
  );
};

export default ProcessOrder;
