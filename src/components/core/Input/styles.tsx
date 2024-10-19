import {StyleSheet} from 'react-native';

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
    backgroundColor: '#e6e7eb',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 20,
    color: '#031a03',
  },
  eyeIcon: {
    padding: 15,
  },
});

export default styles;
