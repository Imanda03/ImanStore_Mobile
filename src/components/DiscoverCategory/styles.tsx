import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginVertical: 12,

    paddingVertical: 20,
    backgroundColor: '#bdc9be',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262b26',
  },

  content: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7a1e1b',
  },
});
