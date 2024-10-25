import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 54,
    marginVertical: 10,
  },
  title: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: '500',
    paddingHorizontal: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
