import {Dimensions, StyleSheet} from 'react-native';
// import {colors} from '../../utils/color';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = (width - 32) / 3.3;

export const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    backgroundColor: '#f7faf7',
    borderRadius: 6,
    marginHorizontal: 3,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
    transform: [{scale: 0.97}],
  },
  imageContainer: {
    width: '100%',
    height: ITEM_WIDTH, // Square image
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 4,
  },
  title: {
    color: '#515452',
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 2,
  },
  price: {
    color: '#010d05',
    fontWeight: '600',
    fontSize: 11,
  },
});
