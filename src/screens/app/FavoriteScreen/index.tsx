import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/core/Header';
import {categories} from '../../../data/Category';
import {styles} from './styles';
import {products} from '../../../data/Products';
import FavoriteList from '../../../components/FavouriteList';
import {useAuth} from '../../../Context';
import {useQuery} from 'react-query';
import {getFavouriteList} from '../../../services/FavouriteService';

interface RenderCategoryItemProps {
  item: CategoryItem;
  index: number;
}

interface CategoryItem {
  id: any;
  title: string;
  image: string;
}

interface ProductItem {
  product: {
    id: string | number;
    title: string;
    images: string;
    categoryName: any;
    price: string;
    description: string;
  };
}

interface RenderProductItemProps {
  item: ProductItem;
  index: number;
}

const FavoriteScreen = ({navigation}: any) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const {authToken, userId} = useAuth();

  const {data: favouriteList, error: productError} = useQuery(
    ['favouriteList', authToken],
    () => getFavouriteList(authToken, userId),
    {
      enabled: !!authToken,
    },
  );

  console.log('first', favouriteList);

  const renderProductItem = ({item, index}: RenderProductItemProps) => {
    const onProductPress = (product: any) => {
      navigation.navigate('InnerScreen', {
        screen: 'ProductDetails',
        params: product,
      });
    };
    return (
      <FavoriteList
        userId={userId}
        authToken={authToken}
        onPress={() => onProductPress(item?.product)}
        {...item?.product}
      />
    );
  };

  const hasFavorites =
    favouriteList &&
    favouriteList.favourites &&
    favouriteList.favourites.length > 0;

  return (
    <SafeAreaView style={{backgroundColor: '#dcdedc', minHeight: '100%'}}>
      <Header title="Favorites" />
      {hasFavorites ? (
        <FlatList
          data={favouriteList.favourites}
          renderItem={renderProductItem}
          keyExtractor={(item: any) => String(item.id)}
          ListFooterComponent={<View style={{height: 200}} />}
        />
      ) : (
        <View style={styles.noFavoritesContainer}>
          <Text style={styles.noFavoritesText}>No Favorite Products</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavoriteScreen;
