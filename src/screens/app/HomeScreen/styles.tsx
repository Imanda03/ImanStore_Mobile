import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#2d3b37',
    height: 160,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderEndEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  textContainer: {
    marginHorizontal: 15,
  },
  text: {
    color: 'wheat',
    fontSize: 28,
    fontWeight: '700',
  },
  input: {
    height: 60,
    width: '85%',
    borderRadius: 10,
    backgroundColor: '#c7d6cd',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingVertical: 24,
  },
  recommendedContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  recommendedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendedLink: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#694241',
  },
  products: {
    paddingHorizontal: 16,
  },
});
