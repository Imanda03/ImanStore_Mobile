import {StyleSheet} from 'react-native';
// import {colors} from '../../utils/color';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 5,
    backgroundColor: 'white',
    marginVertical: 12,
    borderRadius: 4,
  },
  content: {},
  title: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 6,
    color: 'gray',
    fontSize: 12,
  },
});
