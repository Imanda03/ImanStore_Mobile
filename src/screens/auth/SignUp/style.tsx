import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  GreetContainer: {
    flexDirection: 'column',
    gap: 5,
    marginTop: 35,
    marginBottom: 20,
  },
  greetContent: {
    fontSize: 30,
    fontWeight: '500',
    color: 'black',
  },
  textContainer: {
    marginVertical: 30,
    flexDirection: 'row',
  },
  greetText: {
    fontSize: 14,
    fontWeight: '500',
  },
  frontText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#8e9094',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agreeText: {
    fontSize: 16,
    marginHorizontal: 13,
    // marginVertical: 13,
  },
  agreeTextBold: {
    fontWeight: 'bold',
  },
});
