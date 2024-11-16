import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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
import {useAnimationUtils} from '../../utils/animationUtils';

interface Product {
  id: number;
  title: string;
  images: string[];
  category: {title: string};
  price: string;
  description?: string;
  quantity?: number;
}

interface ProductItem {
  id: number;
  products: Product;
  quantity: number;
}

interface OrderQuantity {
  [key: number]: {
    orderId: number;
    productId: number;
    quantity: number;
  };
}

const ProcessOrder = ({navigation}: any) => {
  const {authToken, userId} = useAuth();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderQuantities, setOrderQuantities] = useState<OrderQuantity>({});
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const {showToast} = useToast();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const headerAnimation = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonShake = useRef(new Animated.Value(0)).current;
  const listItemAnimations = useRef<{[key: string]: Animated.Value}>(
    {},
  ).current;

  const {fadeIn, slideIn, pulse, shake} = useAnimationUtils();

  // Fetch orders query
  const {
    data: progressOrderList,
    error,
    isLoading,
    refetch,
  } = useQuery(
    ['progressOrder', authToken],
    () => getOrder(authToken, userId),
    {
      enabled: !!authToken,
    },
  );

  // Payment mutations
  const {mutate: PaymentSheet, isLoading: paymentLoading} =
    fetchPaymentSheetParams(authToken);
  const {mutate: paymentSaved, isLoading: paymentSavedLoading} =
    PaymentSaved(authToken);

  // Delete order mutation
  const {mutate: deleteOrder} = useMutation(
    (orderId: number) => deleteUserOrder(authToken, orderId),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('progressOrder');
        showToast(data.message, 'success');
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message || 'Network error or server is down';
        showToast(message, 'error');
      },
    },
  );

  // Initialize order quantities
  useEffect(() => {
    if (progressOrderList?.orders) {
      const initialOrderQuantities: OrderQuantity = {};
      progressOrderList.orders.forEach((item: ProductItem) => {
        initialOrderQuantities[item.id] = {
          orderId: item.id,
          productId: item.products.id,
          quantity: item.quantity || 1,
        };
      });
      setOrderQuantities(initialOrderQuantities);
    }
  }, [progressOrderList?.orders]);

  console.log('order===>', orderQuantities);

  // Calculate total price
  useEffect(() => {
    if (progressOrderList?.orders) {
      const newTotal = progressOrderList.orders.reduce(
        (sum: number, item: ProductItem) => {
          const quantity = orderQuantities[item.id]?.quantity || 1;
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
      [orderId]: {
        ...prev[orderId],
        productId,
        orderId,
        quantity: newQuantity,
      },
    }));
  };

  const handlePaymentError = () => {
    shake(buttonShake);
  };

  const handlePayment = async () => {
    console.log('order checked', orderQuantities);
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
            showToast(initError.message, 'error');
            return;
          }

          const {error: presentError}: any = await presentPaymentSheet();

          if (presentError) {
            showToast(presentError.message, 'error');
            return;
          }

          const payloadData = {
            customerId: data.customer,
            ephemeralKey: data.ephemeralKey,
            paymentIntent: data.paymentIntent,
            totalPayment: totalPrice,
            orderQuantities: orderQuantities,
            userId: userId,
          };

          await paymentSaved(payloadData, {
            onSuccess: data => {
              showToast(data.message, 'success');
              queryClient.invalidateQueries('progressOrder');
              queryClient.invalidateQueries('completedOrder');
            },
            onError: (error: any) => {
              showToast(error.message, 'error');
            },
          });
        },
        onError: (error: any) => {
          handlePaymentError();
          showToast(error.message, 'error');
        },
      });
    } catch (err) {
      handlePaymentError();
      showToast('An unexpected error occurred', 'error');
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const renderProductItem = ({
    item,
    index,
  }: {
    item: ProductItem;
    index: number;
  }) => {
    const onProductPress = (product: Product) => {
      navigation.navigate('InnerScreen', {
        screen: 'ProductDetails',
        params: product,
      });
    };

    if (!listItemAnimations[item.id]) {
      listItemAnimations[item.id] = new Animated.Value(0);
    }

    return (
      <RenderOrder
        onPress={() => onProductPress(item.products)}
        {...item.products}
        productId={item.products.id}
        currentQuantity={orderQuantities[item.id]?.quantity || 1}
        onQuantityChange={newQuantity =>
          handleQuantityChange(item.products.id, item.id, newQuantity)
        }
        onDeleteOrder={() => deleteOrder(item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {progressOrderList?.orders?.length > 0 && (
        <View style={styles.header}>
          <Text style={styles.totalPrice}>Rs. {totalPrice}</Text>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => {
              pulse(buttonScale);
              handlePayment();
            }}>
            {paymentLoading ? (
              <>
                <Text style={styles.buttonText}>Please Wait...</Text>
                <ActivityIndicator size="small" color="#6e4d4d" />
              </>
            ) : (
              <>
                <Text style={styles.buttonText}>Proceed To Payment</Text>
                <FontAwesomeIcon
                  name="arrow-circle-right"
                  color="#6e4d4d"
                  size={24}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        numColumns={1}
        data={progressOrderList?.orders}
        renderItem={renderProductItem}
        keyExtractor={item => String(item.id)}
        ListFooterComponent={<View style={styles.footer} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              top: 50,
            }}>
            <Text
              style={{
                color: 'gray',
                fontSize: 18,
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              No orders yet!
            </Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 14,
                textAlign: 'center',
              }}>
              Your products will appear here once you've placed an order. Browse
              our store and start shopping today!
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default ProcessOrder;
