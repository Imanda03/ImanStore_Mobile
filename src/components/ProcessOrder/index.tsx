import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RenderOrder from '../RenderOrder';
import {styles} from './styles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useAuth} from '../../Context';
import {deleteUserOrder, getOrder} from '../../services/OrderService';
import {useToast} from '../../Context/ToastContext';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {
  fetchPaymentSheetParams,
  PaymentSaved,
} from '../../services/PaymentService';

interface ProductItem {
  id: number;
  products: {
    id: number;
    title: string;
    images: string[];
    category: {title: string};
    price: string;
    description?: string;
    quantity?: number;
  };
}

interface OrderQuantity {
  [key: number]: {orderId: number; productId: number; quantity: number};
}

const ProcessOrder = ({navigation}: any) => {
  const {authToken, userId} = useAuth();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderQuantities, setOrderQuantities] = useState<OrderQuantity>({});
  const [refreshing, setRefreshing] = React.useState(false);
  const queryClient = useQueryClient();
  const {showToast} = useToast();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

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

  const {mutate: PaymentSheet, isLoading: paymentLoading} =
    fetchPaymentSheetParams(authToken);

  const {mutate: paymentSaved, isLoading: paymentSavedLoading} =
    PaymentSaved(authToken);

  useEffect(() => {
    if (progressOrderList?.orders) {
      const initialQuantities: OrderQuantity = {};
      progressOrderList.orders.forEach((item: ProductItem) => {
        initialQuantities[item.products.id] = {
          orderId: item.id,
          productId: item.products.id,
          quantity: 1, // default to 1 or whatever the initial quantity is
        };
      });
      setOrderQuantities(initialQuantities);
    }
  }, [progressOrderList?.orders]);

  useEffect(() => {
    if (progressOrderList?.orders) {
      const newTotal = progressOrderList.orders.reduce(
        (sum: any, item: any) => {
          const product = orderQuantities[item.products.id];
          const quantity = product ? product.quantity : 1;
          return sum + Number(item.products.price) * quantity;
        },
        0,
      );
      setTotalPrice(newTotal);
    }
  }, [orderQuantities, progressOrderList?.orders]);

  const handleQuantityChange = (
    productId: number,
    orderId: number,
    newQuantity: number,
  ) => {
    setOrderQuantities(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId], // maintain the orderId and productId
        quantity: newQuantity, // update only the quantity
      },
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
        productId={item.products.id}
        currentQuantity={
          orderQuantities[item.products.id]?.quantity || 1 // Use the quantity from the new structure
        }
        onQuantityChange={
          newQuantity =>
            handleQuantityChange(item.products.id, item.id, newQuantity) // Pass both productId and orderId
        }
        onDeleteOrder={() => handleDeleteOrder(item.id)}
      />
    );
  };
  console.log(orderQuantities);

  const handlePayment = async () => {
    try {
      await PaymentSheet(totalPrice, {
        onSuccess: async (data: any) => {
          const {error: initError} = await initPaymentSheet({
            merchantDisplayName: 'Example, Inc.',
            customerId: data.customer,
            customerEphemeralKeySecret: data.ephemeralKey,
            paymentIntentClientSecret: data.paymentIntent,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
              name: 'Jane Doe',
            },
          });

          if (initError) {
            console.error('initPaymentSheet Error', initError.message);
            showToast(initError.message, 'error');
            return;
          }

          const {error: presentError}: any = await presentPaymentSheet();

          if (presentError) {
            console.error('presentPaymentSheet Error', presentError.message);
            showToast(presentError.message, 'error');
            return;
          } else {
            const payloadData = {
              customerId: data.customer,
              ephemeralKey: data.ephemeralKey,
              paymentIntent: data.paymentIntent,
              totalPayment: totalPrice,
              orderQuantities: orderQuantities,
              userId: userId,
            };

            await paymentSaved(payloadData, {
              onSuccess: async data => {
                showToast(data.message, 'success');
                queryClient.invalidateQueries('progressOrder');
              },
              onError: (error: any) => {
                console.error('PaymentSheet Error', error.message);
                showToast(error.message, 'error');
              },
            });
          }
        },
        onError: (error: any) => {
          console.error('PaymentSheet Error', error.message);
          showToast(error.message, 'error');
        },
      });
    } catch (err) {
      console.error('handlePayment Error', err);
      showToast('An unexpected error occurred', 'error');
    }
  };

  const {mutate: deleteOrder} = useMutation(
    (orderId: number) => deleteUserOrder(authToken, orderId),
    {
      onSuccess: data => {
        // Invalidate and refetch orders after deletion
        queryClient.invalidateQueries('progressOrder');
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

  const handleDeleteOrder = (orderId: number) => {
    deleteOrder(orderId);
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
          Rs. {totalPrice}
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
            borderWidth: 1,
            borderColor: '#6e4d4d',
          }}
          onPress={handlePayment}>
          {paymentLoading ? (
            <>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '800',
                  marginVertical: 10,
                  color: '#6e4d4d',
                }}>
                Please Wait...
              </Text>
              <ActivityIndicator size="small" color="#6e4d4d" />
            </>
          ) : (
            <>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '800',
                  marginVertical: 10,
                  color: '#6e4d4d',
                }}>
                Proceed To Payment
              </Text>
              <FontAwesomeIcon
                name="arrow-circle-right"
                color="#6e4d4d"
                size={24}
              />
            </>
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={1}
        data={progressOrderList?.orders}
        renderItem={renderProductItem}
        keyExtractor={(item: any) => String(item.id)}
        ListFooterComponent={<View style={{height: 200}} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
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
