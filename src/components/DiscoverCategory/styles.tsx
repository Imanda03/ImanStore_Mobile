import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingLeft: 20,
    paddingRight: 12,
    paddingVertical: 16,
    backgroundColor: '#bdc9be',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262b26',
    marginBottom: 8,
    width: '180%',
  },
  content: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7a1e1b',
    marginBottom: 16,
  },
  buttonContainer: {
    backgroundColor: '#262b26',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  imageContainer: {
    width: '37%',
    aspectRatio: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
