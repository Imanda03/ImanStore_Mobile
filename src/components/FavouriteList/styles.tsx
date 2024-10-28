import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containerWrapper: {
    marginVertical: 5,
    marginHorizontal: '5%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#bdc9be',
    borderRadius: 15,
    // padding: 12,
    gap: 16,
    alignItems: 'center',
    minHeight: '10%',
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: '100%',
  },
  image: {
    height: 150,
    width: 130,
    borderRadius: 15,
  },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e1e1e1',
  },
  secondContainer: {
    flex: 1,
    flexDirection: 'column',
    // gap: 10,
    justifyContent: 'space-between',
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262b26',
    marginBottom: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    color: '#82644a',
  },
  description: {
    fontSize: 12,
    fontWeight: '500',
    color: '#80857f',
    lineHeight: 16,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262b26',
  },
  heartButton: {
    padding: 6,
  },
});
