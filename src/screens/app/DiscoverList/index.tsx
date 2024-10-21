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
  images: string;
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

  return (
    <View style={styles.container}>
      <FlatList
        // columnWrapperStyle={styles.products}
        // numColumns={1}
        data={discoverList}
        renderItem={renderProductItem}
        keyExtractor={(item: any) => String(item.id)}
        ListFooterComponent={<View style={{height: 200}} />}
        ListHeaderComponent={
          <Header
            title={routeData.categoryTitle}
            showBack
            onBackPress={goBack}
          />
        }
      />
    </View>
  );
};

export default DiscoverList;
