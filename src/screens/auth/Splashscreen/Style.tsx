import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 40,
    alignSelf: 'center',
    marginTop: 24,
    fontWeight: '800',
    color: colors.text.headerTitle,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    gap: 15,
  },
  content: {
    marginTop: 5,
    marginHorizontal: 10,
    color: colors.text.whitePrimary,
    fontSize: 18,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width,
    height: height,
  },
});
