import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 8,
    borderRadius: 15,
    flex: 1,
    justifyContent: 'center',
  },
  default: {
    backgroundColor: colors.primary,
  },
  borderOnly: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  textOnly: {
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textVariant: {
    color: colors.primary, // Text-only buttons should have the text color set to the primary color.
  },
});
