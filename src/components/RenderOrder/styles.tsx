import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 15,
    backgroundColor: '#bdc9be',
    flexDirection: 'row',
    padding: 5,
    alignContent: 'center',
    borderRadius: 20,
    gap: 20,
  },
  image: {
    height: 90,
    width: '35%',
    borderRadius: 25,
  },
  secondContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#031a03',
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#031a03',
  },
  status: {
    backgroundColor: '#d1cac2',
    padding: 3,
    borderRadius: 10,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '400',
    color: '#874b07',
    width: 80,
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
