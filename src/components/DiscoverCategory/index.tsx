import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';

interface HeaderProps {
  title: any;
  image: string;
  itemNumber?: number;
  onPress?: (value: any) => void;
}

const DiscoverCategory: React.FC<HeaderProps> = ({
  title,
  image,
  itemNumber,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{itemNumber} New Collections</Text>
      </View>
      <Image
        style={{height: 80, width: '50%'}}
        source={{
          uri: image,
        }}
      />
    </View>
  );
};

export default DiscoverCategory;
