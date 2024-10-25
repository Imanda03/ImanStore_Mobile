import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 15,
    backgroundColor: '#bdc9be',
    flexDirection: 'row',
    // padding: 5,
    alignContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Add subtle shadow for depth
  },
  image: {
    height: '100%',
    width: '35%',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  secondContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  infoSection: {
    flex: 1,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#031a03',
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#031a03',
  },
  status: {
    backgroundColor: '#d1cac2',
    padding: 5,
    borderRadius: 10,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '400',
    color: '#874b07',
    minWidth: 50,
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  description: {
    fontSize: 10,
    fontWeight: '500',
    color: '#80857f',
    // width: '70%',
    textAlign: 'justify',
    marginVertical: 5,
  },
  footer: {
    flexDirection: 'row',
    gap: 15,
  },
  footerContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
  },
});
