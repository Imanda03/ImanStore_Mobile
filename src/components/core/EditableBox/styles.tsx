import {StyleSheet} from 'react-native';
// import {colors} from '../../utils/color';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 5,
    backgroundColor: '#e8ebea',
    marginVertical: 12,
    borderRadius: 15,
  },
  content: {},
  title: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    color: '#4d5452',
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    color: '#030d0a',
    fontSize: 14,
    fontWeight: '500',
  },
});
