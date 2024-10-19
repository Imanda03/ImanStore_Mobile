import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/core/Header';
import {categories} from '../../../data/Category';
import {styles} from './styles';
import {products} from '../../../data/Products';
import FavoriteList from '../../../components/FavouriteList';

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

const FavoriteScreen = ({navigation}: any) => {
  const [filteredProduct, setFilterProduct] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    if (selectedCategory) {
      const updatedProduct = products.filter(
        product => product?.category === selectedCategory,
      );
      setFilterProduct(updatedProduct);
    }
  }, [selectedCategory]);

  const renderProductItem = ({item, index}: RenderProductItemProps) => {
    const onProductPress = (product: any) => {
      navigation.navigate('InnerScreen', {
        screen: 'ProductDetails',
        params: product,
      });
    };
    return <FavoriteList onPress={() => onProductPress(item)} {...item} />;
  };

  const renderCategoryItem = ({item, index}: RenderCategoryItemProps) => {
    const {title} = item;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{title}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: '#dcdedc', minHeight: '100%'}}>
      <Header title="Favorites" />
    </SafeAreaView>
  );
};

export default FavoriteScreen;
