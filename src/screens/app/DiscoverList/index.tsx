import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Header from '../../../components/core/Header';
import {styles} from './styles';
import {useAuth} from '../../../Context';
import {getDiscoverList} from '../../../services/DiscoverService';
import {useQuery} from 'react-query';
import FavoriteList from '../../../components/FavouriteList';

interface ProductItem {
  id: string | number;
  title: string;
  images: string[];
  categoryName: any;
  price: string;
  description: string;
}

interface RenderProductItemProps {
  item: ProductItem;
  index: number;
}

const DiscoverList = ({navigation, route}: any) => {
  const {authToken, userId} = useAuth();
  const routeData = route.params;

  const {data: discoverList, error: productError} = useQuery(
    ['discoverList', authToken],
    () => getDiscoverList(authToken, routeData.categoryId),
    {
      enabled: !!authToken,
    },
  );

  const goBack = () => {
    navigation.goBack();
  };

  const renderProductItem = ({item, index}: RenderProductItemProps) => {
    const onProductPress = (product: any) => {
      navigation.navigate('InnerScreen', {
        screen: 'ProductDetails',
        params: product,
      });
    };

    return (
      <FavoriteList
        authToken={authToken}
        onPress={() => onProductPress(item)}
        {...item}
        userId={userId}
      />
    );
  };

  const ListHeaderComponent = () => (
    <Header
      title={routeData?.categoryName || 'Discover'}
      onBackPress={goBack}
      showBack
    />
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {productError ? 'Error loading products' : 'No products found'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={discoverList}
        renderItem={renderProductItem}
        keyExtractor={item => String(item.id)}
        ListFooterComponent={<View style={styles.footer} />}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DiscoverList;
