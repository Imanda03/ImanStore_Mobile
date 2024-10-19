import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {styles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DiscoverCategory from '../../../components/DiscoverCategory';
import {discoverCategory} from '../../../data/DiscoverCategory';
import {useAuth} from '../../../Context';
import {getDiscover} from '../../../services/DiscoverService';
import {useQuery} from 'react-query';

interface ProductItem {
  id: number | string;
  categoryImage: string;
  categoryTitle: any;
  productCount?: number;
}

interface RenderProductItemProps {
  item: ProductItem;
  index: number;
}
const DiscoverScreen = ({navigation}: any) => {
  const {authToken} = useAuth();

  const {data: discoverData, error: productError} = useQuery(
    ['discover', authToken],
    () => getDiscover(authToken),
    {
      enabled: !!authToken,
    },
  );

  console.log('=====>', discoverData);

  const [filteredProduct, setFilterProduct] = useState([]);
  useEffect(() => {
    if (discoverData) {
      setFilterProduct(discoverData);
    }
  }, [discoverData]);

  const [keyword, setkeyword] = useState<string>();

  useEffect(() => {
    if (keyword) {
      const updateData = discoverData.filter(
        (category: {categoryTitle: string}) => {
          // console.log('first', keyword);
          return category?.categoryTitle
            .toLowerCase()
            .includes(keyword?.toLowerCase());
        },
      );
      setFilterProduct(updateData);
    } else {
      setFilterProduct(discoverData);
    }
  }, [keyword, discoverCategory]);

  const handleChangeSearch = (value: string) => {
    setkeyword(value);
  };

  const renderProductItem = ({item, index}: RenderProductItemProps) => {
    const onProductPress = (product: any) => {
      navigation.navigate('InnerScreen', {
        screen: 'DiscoverLists',
        params: product,
      });
    };
    return <DiscoverCategory onPress={() => onProductPress(item)} {...item} />;
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#dcdedc',
        height: '100%',
      }}>
      <View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            right={<TextInput.Icon size={30} icon="magnify" />}
            underlineColor="transparent"
            onChangeText={handleChangeSearch}
          />
          <TouchableOpacity style={styles.filter}>
            <MaterialIcons name="air-filter" size={30} color="#2a4026" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredProduct}
          renderItem={renderProductItem}
          keyExtractor={(item, index) => String(index)}
          ListFooterComponent={<View style={{height: 200}} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default DiscoverScreen;
