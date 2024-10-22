import {Dimensions, StyleSheet} from 'react-native';
// import {colors} from '../../../utils/color';

const {height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#e9f7ea',
  },
  footer: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  container: {
    borderWidth: 1,
  },
  Image: {
    width: '100%',
    height: height * 0.45,
  },
  content: {
    backgroundColor: '#f2fcf3',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    marginTop: -40,
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  descrisption: {
    color: 'gray',
    fontWeight: '400',
    marginVertical: 8,
  },
  bookmarkContainer: {
    backgroundColor: '#3f4540',
    padding: 18,
    borderRadius: 8,
    marginRight: 16,
  },
  backContainer: {
    backgroundColor: '#cdd1ce',
    padding: 8,
    margin: 24,
    borderRadius: 8,
    marginRight: 16,
    position: 'absolute',
  },

  btnContainer: {
    padding: 25,
    gap: 5,
  },
  modalContainer: {
    padding: 2,
    // margin: 4,
    borderRadius: 8,
    marginRight: 24,
    marginLeft: 24,
  },
  orText: {
    margin: 10,
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  quantityButton: {
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  stock: {
    backgroundColor: '#8f918e',
    height: 30,
    maxWidth: 90,
    textAlign: 'center',
    paddingTop: 5,
    borderRadius: 10,
    fontWeight: '600',
    color: '#f0d02b',
  },
});
