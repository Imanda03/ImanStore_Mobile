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

interface ProductItem {
  id: number | string;
  image: string;
  title: any;
  itemNumber?: number;
}

interface RenderProductItemProps {
  item: ProductItem;
  index: number;
}
console.log('first', JSON.stringify(discoverCategory, null, 2));
const DiscoverScreen = ({navigation}: any) => {
  const [filteredProduct, setFilterProduct] = useState(discoverCategory);
  const [keyword, setkeyword] = useState<string>();

  useEffect(() => {
    if (keyword) {
      const updateData = discoverCategory.filter(category => {
        // console.log('first', keyword);
        return category?.title.toLowerCase().includes(keyword?.toLowerCase());
      });
      setFilterProduct(updateData);
    } else {
      setFilterProduct(discoverCategory);
    }
  }, [keyword, discoverCategory]);

  const handleChangeSearch = (value: string) => {
    setkeyword(value);
  };

  const renderProductItem = ({item, index}: RenderProductItemProps) => {
    const onProductPress = (product: any) => {
      // navigation.navigate('InnerScreen', {
      //   screen: 'ProductDetails',
      //   params: product,
      // });
    };
    return <DiscoverCategory onPress={() => onProductPress(item)} {...item} />;
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#dcdedc',
        height: '100%',
      }}>
      <ScrollView>
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
          keyExtractor={item => String(item.id)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscoverScreen;
