import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    height: 80,
    marginHorizontal: 15,
    borderColor: '#b3b3b3',
    padding: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'static',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    width: '50%',
    height: '80%',
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6e4d4d',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '800',
    marginVertical: 10,
    color: '#6e4d4d',
  },
  footer: {
    height: 200,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdedc',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});
