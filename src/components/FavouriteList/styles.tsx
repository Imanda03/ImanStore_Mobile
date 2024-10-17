import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#bdc9be',
    marginVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    gap: 20,
    width: '90%',
    alignItems: 'center',
  },
  secondContainer: {
    flexDirection: 'column',
    gap: 3,
  },
  image: {
    height: 125,
    width: 130,
    borderRadius: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#262b26',
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#82644a',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  description: {
    fontSize: 10,
    fontWeight: '500',
    color: '#80857f',
    width: '45%',
    textAlign: 'justify',
  },
});
