import {StyleSheet} from 'react-native';

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
    color: 'black',
  },
  textContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    gap: 5,
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
});
