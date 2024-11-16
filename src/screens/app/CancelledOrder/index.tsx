import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {format} from 'date-fns';
import {useQuery} from 'react-query';
import {fetchCancelledOrder} from '../../../services/OrderService';
import {useAuth} from '../../../Context';
import Header from '../../../components/core/Header';
import {colors} from '../../../utils/colors';

const Cancelled = () => {
  const {logout, authToken, userId} = useAuth();

  const {data: orders} = useQuery(['cancelledOrder', userId], () =>
    fetchCancelledOrder(authToken, userId),
  );
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'cancelled_by_admin':
        return '#FF4B4B';
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      default:
        return '#757575';
    }
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const renderOrderItem = ({item}: any) => {
    const orderDate = new Date(item.createdAt);
    const formattedDate = format(orderDate, 'MMM dd, yyyy');
    const statusColor = getStatusColor(item.status);

    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <View style={[styles.statusBadge, {backgroundColor: statusColor}]}>
            <Text style={styles.statusText}>
              {item.status.replace(/_/g, ' ').toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.productInfo}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: item?.products?.images[0]}}
              style={styles.productImage}
            />
          </View>
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{item.products.title}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.price}>
              {formatPrice(item.products.price * item.quantity)}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.date}>Ordered on {formattedDate}</Text>
          {/* <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Cancelled Orders" showBack />
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View> */}
      <FlatList
        data={orders?.orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#bdc9be',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  date: {
    fontSize: 14,
    color: '#757575',
  },
  detailsButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Cancelled;
