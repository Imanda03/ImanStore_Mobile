import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {Avatar} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import {categories} from '../../../data/Category';
import CategoryBox from '../../../components/CategoryBox';
import {products} from '../../../data/Products';
import ProductHomeItem from '../../../components/ProductHomeItem';

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
  image: string;
  category: any;
  price: string;
  description?: string;
}

interface RenderProductItemProps {
  item: ProductItem;
  index: number;
}
const HomeScreen = ({navigation}: any) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [keyword, setkeyword] = useState<string>();
  const [filteredProduct, setFilterProduct] = useState(products);

  useEffect(() => {
    if (selectedCategory && !keyword) {
      const updatedProduct = products.filter(
        product => product?.category === selectedCategory,
      );
      setFilterProduct(updatedProduct);
    } else if (selectedCategory && keyword) {
      const updatedProduct = products.filter(
        product =>
          product?.category === selectedCategory &&
          product?.title.toLowerCase().includes(keyword?.toLowerCase()),
      );
      setFilterProduct(updatedProduct);
    } else if (!selectedCategory && keyword) {
      const updatedProduct = products.filter(product =>
        product?.title.toLowerCase().includes(keyword?.toLowerCase()),
      );
      setFilterProduct(updatedProduct);
    } else if (!selectedCategory && !keyword) {
      setFilterProduct(products);
    }
  }, [selectedCategory, keyword]);

  const renderCategoryItem = ({item, index}: RenderCategoryItemProps) => {
    return (
      <CategoryBox
        onPress={() => setSelectedCategory(item?.id)}
        isSelected={item?.id === selectedCategory}
        isFirst={index === 0}
        title={item?.title}
        image={item?.image}
      />
    );
  };

  const renderProductItem = ({item, index}: RenderProductItemProps) => {
    const onProductPress = (product: any) => {
      navigation.navigate('InnerScreen', {
        screen: 'ProductDetails',
        params: product,
      });
    };
    return <ProductHomeItem onPress={() => onProductPress(item)} {...item} />;
  };

  const handleChangeSearch = (value: string) => {
    setkeyword(value);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#dcdedc', height: '100%'}}>
      <FlatList
        columnWrapperStyle={styles.products}
        numColumns={2}
        data={filteredProduct}
        renderItem={renderProductItem}
        keyExtractor={item => String(item.id)}
        ListFooterComponent={<View style={{height: 200}} />}
        ListHeaderComponent={
          <View style={{flex: 1}}>
            <View style={styles.topView}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Find</Text>
                <Text style={styles.text}>The Best Deals</Text>
              </View>
              <Avatar
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
                }}
                size={80}
                rounded
                icon={{name: 'home'}}
              />
            </View>
            <View style={{marginTop: -30}}>
              <TextInput
                style={styles.input}
                placeholder="Search..."
                right={<TextInput.Icon size={30} icon="magnify" />}
                underlineColor="transparent"
                onChangeText={handleChangeSearch}
              />
            </View>
            <FlatList
              horizontal
              data={categories}
              showsHorizontalScrollIndicator={false}
              renderItem={renderCategoryItem}
              style={styles.list}
              keyExtractor={(item, index) => String(index)}
            />

            <View style={styles.recommendedContainer}>
              <Text style={styles.recommendedText}>Recommended for you</Text>
              <TouchableOpacity>
                <Text style={styles.recommendedLink}>See All</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
