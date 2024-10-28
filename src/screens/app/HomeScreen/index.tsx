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
import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {getCategory} from '../../../services/CategoryService';
import {useAuth} from '../../../Context';
import {getProducts} from '../../../services/ProductService';
import AnimatedBanner from '../../../components/AnimatedBanner';

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
  images: string[];
  category: any;
  price: string;
  description?: string;
}

interface RenderProductItemProps {
  item: ProductItem;
  index: number;
}

const HomeScreen = ({navigation}: any) => {
  const {authToken} = useAuth();
  const {data: productData, error: productError} = useQuery(
    ['products', authToken],
    () => getProducts(authToken),
    {
      enabled: !!authToken,
    },
  );
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [keyword, setkeyword] = useState<string>();
  const [filteredProduct, setFilteredProduct] = useState<any[]>([]);

  const {
    data: categoryData,
    error: categoryError,
    isLoading,
  } = useQuery(['category', authToken], () => getCategory(authToken), {
    enabled: !!authToken,
  });

  useEffect(() => {
    if (productData && productData.products) {
      setFilteredProduct(productData.products);
    }
  }, [productData]);

  console.log('check env==> ', process.env.BASE_URL);

  useEffect(() => {
    if (selectedCategory && !keyword) {
      const updatedProduct = productData?.products.filter(
        (product: any) => product?.category_id === selectedCategory,
      );
      setFilteredProduct(updatedProduct);
    } else if (selectedCategory && keyword) {
      const updatedProduct = productData?.products.filter(
        (product: any) =>
          product?.category_id === selectedCategory &&
          product?.title.toLowerCase().includes(keyword?.toLowerCase()),
      );
      setFilteredProduct(updatedProduct);
    } else if (!selectedCategory && keyword) {
      const updatedProduct = productData?.products.filter((product: any) =>
        product?.title.toLowerCase().includes(keyword?.toLowerCase()),
      );
      setFilteredProduct(updatedProduct);
    } else if (!selectedCategory && !keyword) {
      setFilteredProduct(productData?.products);
    }
  }, [selectedCategory, keyword]);

  const handleCategoryPress = (id: string) => {
    setSelectedCategory((prevSelected: string | undefined) =>
      prevSelected === id ? undefined : id,
    );
  };

  const renderCategoryItem = ({item, index}: RenderCategoryItemProps) => {
    return (
      <CategoryBox
        onPress={() => handleCategoryPress(item.id)}
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
  const bannerImages = [
    'https://my.canon/media/image/2024/07/29/8d6a2501a74246db963e7ad5d08b3cf0_Buddy+App+Banner_FA-02.jpg',
    'https://wholesalesuiteplugin.com/wp-content/uploads/2021/10/How-To-Create-A-WooCommerce-Product-List-On-One-Page.png',
    'https://i.ytimg.com/vi/VejBGcVD7Jw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBpSejHAm6aJ3EqmwZPQNwpeQrAgg',
  ];

  return (
    <SafeAreaView style={{backgroundColor: '#e8e8e8', height: '100%'}}>
      <FlatList
        columnWrapperStyle={styles.products}
        numColumns={3}
        data={filteredProduct && filteredProduct.slice(0, 3)}
        renderItem={renderProductItem}
        keyExtractor={(item: any) => String(item.id)}
        ListEmptyComponent={<Text>No Products Found</Text>}
        ListFooterComponent={
          <View>
            <AnimatedBanner
              images={bannerImages}
              onPress={index => {
                console.log('Banner clicked:', index);
                // Handle banner press
              }}
            />
          </View>
        }
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
                size={55}
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
              data={categoryData?.categories}
              showsHorizontalScrollIndicator={false}
              renderItem={renderCategoryItem}
              style={styles.list}
              keyExtractor={item => String(item.id)}
            />

            {filteredProduct && filteredProduct.length > 0 && (
              <View style={styles.recommendedContainer}>
                <Text style={styles.recommendedText}>Recommended for you</Text>
                <TouchableOpacity>
                  <Text style={styles.recommendedLink}>See All</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
