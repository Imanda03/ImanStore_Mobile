import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 8,
    borderRadius: 15,
    flex: 1,
  },
  title: {
    color: 'wheat',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
