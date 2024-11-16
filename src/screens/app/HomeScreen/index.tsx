import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {Avatar} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import CategoryBox from '../../../components/CategoryBox';
import ProductHomeItem from '../../../components/ProductHomeItem';
import {useQuery, useQueryClient} from 'react-query';
import {getCategory} from '../../../services/CategoryService';
import {useAuth} from '../../../Context';
import {
  getProducts,
  getRecommendedProducts,
} from '../../../services/ProductService';
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
  const {authToken, userId} = useAuth();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [keyword, setKeyword] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useQuery(['category', authToken], () => getCategory(authToken), {
    enabled: !!authToken,
  });

  const {data: productData, isLoading: productLoading} = useQuery(
    ['products', authToken],
    () => getProducts(authToken),
    {
      enabled: !!authToken,
    },
  );
  const [filteredProduct, setFilteredProduct] = useState<any[]>(
    productData?.products,
  );

  const {data: recommendedProducts} = useQuery(
    ['recommendedProducts', authToken],
    () => getRecommendedProducts(authToken, userId),
    {
      enabled: !!authToken,
    },
  );

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
    setKeyword(value);
  };

  const bannerImages = [
    'https://my.canon/media/image/2024/07/29/8d6a2501a74246db963e7ad5d08b3cf0_Buddy+App+Banner_FA-02.jpg',
    'https://wholesalesuiteplugin.com/wp-content/uploads/2021/10/How-To-Create-A-WooCommerce-Product-List-On-One-Page.png',
    'https://i.ytimg.com/vi/VejBGcVD7Jw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBpSejHAm6aJ3EqmwZPQNwpeQrAgg',
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    queryClient.invalidateQueries('recommendedProducts', authToken, userId);
    queryClient.invalidateQueries('products', authToken);
    queryClient.invalidateQueries('category', authToken);

    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#e8e8e8', height: '100%'}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View>
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

          {recommendedProducts?.products &&
            recommendedProducts.products.length > 0 && (
              <View style={styles.recommendedContainer}>
                <Text style={styles.recommendedText}>Recommended for you</Text>
                {/* <TouchableOpacity>
                  <Text style={styles.recommendedLink}>See All</Text>
                </TouchableOpacity> */}
              </View>
            )}

          {recommendedProducts?.products && (
            <View>
              <FlatList
                horizontal
                data={recommendedProducts?.products}
                showsHorizontalScrollIndicator={true}
                renderItem={renderProductItem}
                keyExtractor={(item: any) => String(item.id)}
                contentContainerStyle={styles.products}
              />
            </View>
          )}

          <View>
            <AnimatedBanner
              images={bannerImages}
              onPress={index => {
                // console.log('Banner clicked:', index);
                // Handle banner press
              }}
            />
          </View>

          {filteredProduct && filteredProduct.length > 0 && (
            <>
              <View style={[styles.recommendedContainer]}>
                <Text style={styles.recommendedText}>New Products</Text>
                {/* <TouchableOpacity>
                  <Text style={styles.recommendedLink}>See All</Text>
                </TouchableOpacity> */}
              </View>

              <FlatList
                data={filteredProduct}
                numColumns={3}
                showsVerticalScrollIndicator={true}
                renderItem={renderProductItem}
                keyExtractor={(item: any) => String(item.id)}
                contentContainerStyle={{marginBottom: 150}}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginBottom: 16,
                  marginHorizontal: 15,
                }}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
