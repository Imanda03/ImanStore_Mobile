import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    fontSize: 40,
    alignSelf: 'center',
    marginTop: 24,
    fontWeight: '800',
    color: '#f7fcf5',
  },
  buttonContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    gap: 15,
  },
  content: {
    marginTop: 5,
    marginHorizontal: 10,
    color: '#e6f2e1',
    fontSize: 18,
  },
});
