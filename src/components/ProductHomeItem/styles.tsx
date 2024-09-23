import {Dimensions, StyleSheet} from 'react-native';
// import {colors} from '../../utils/color';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  title: {
    color: 'grey',
    paddingVertical: 8,
  },
  image: {
    width: (width - 50) / 2,
    height: 220,
    borderRadius: 8,
  },
  price: {
    color: 'black',
    paddingBottom: 8,
  },
});
