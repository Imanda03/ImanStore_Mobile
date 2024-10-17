import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  itemContainer: {
    // borderWidth: 2,
    height: 35,
    width: 80,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    borderRadius: 15,
    backgroundColor: '#6f7574',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 10,
  },
  itemText: {
    color: '#d2d4d3',
    fontSize: 12,
  },
  products: {
    paddingHorizontal: 12,
  },
});
