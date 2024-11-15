import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#2d3b37',
    height: 140,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderEndEndRadius: 20,
    borderBottomStartRadius: 20,
    padding: 5,
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
    height: 50,
    width: '85%',
    borderRadius: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,

    backgroundColor: '#c7d6cd',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingVertical: 5,
  },
  recommendedContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  recommendedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d3b37',
  },
  recommendedLink: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#694241',
  },
  products: {
    paddingHorizontal: 12,
    gap: 5,
    justifyContent: 'space-around',
  },
});
