import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  input: {
    height: 60,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#c7d6cd',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  filter: {
    backgroundColor: '#c7d6cd',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    borderRadius: 40,
  },
});
