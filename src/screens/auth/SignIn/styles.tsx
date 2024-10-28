import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  GreetContainer: {
    flexDirection: 'column',
    gap: 5,
    marginTop: 40,
    marginBottom: 20,
  },
  greetContent: {
    fontSize: 30,
    fontWeight: '500',
    color: colors.text.primary,
  },
  textContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    gap: 5,
  },

  frontText: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.text.grayPrimary,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text.primary,
  },
  errorText: {
    color: colors.text.error,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
});
