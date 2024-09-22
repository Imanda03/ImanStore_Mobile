import {Dimensions, FlatList, Image, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';

const {width} = Dimensions.get('window');

const ImageCarousel = ({images}: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollEnd = (e: any) => {
    const horizontalOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(horizontalOffset / width);
    setActiveIndex(index);
  };

  const renderImage = ({item}: any) => {
    return <Image style={styles.image} source={{uri: item}} />;
  };
  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        style={styles.list}
        data={images}
        renderItem={renderImage}
        onMomentumScrollEnd={handleScrollEnd}
      />
      <View style={styles.pagination}>
        {images?.map((_: any, i: number) => (
          <View
            key={i}
            style={[
              styles.poginationLine,
              i === activeIndex ? styles.activeLine : {},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default React.memo(ImageCarousel);
