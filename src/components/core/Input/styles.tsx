import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

const styles = StyleSheet.create({
  // input: {
  //   height: 60,
  //   padding: 20,
  //   borderRadius: 10,
  //   backgroundColor: '#e6e7eb',
  //   marginVertical: 10,
  // },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.background.input,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: '#949292',
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 20,
    color: colors.text.primary,
  },
  eyeIcon: {
    padding: 15,
  },
});

export default styles;
