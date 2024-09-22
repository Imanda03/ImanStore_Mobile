import {Dimensions, StyleSheet} from 'react-native';
// import {colors} from '../../utils/color';

const {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  image: {
    width: width,
    height: height * 0.45,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  list: {},
  poginationLine: {
    height: 4,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 5,
  },
  activeLine: {
    backgroundColor: 'black',
    width: 30,
  },
});
