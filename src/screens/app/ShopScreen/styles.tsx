import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#262b26',
  },
  container: {
    flex: 1,
    backgroundColor: '#dcdedc',
  },
  //   header: {
  //     fontSize: 24,
  //     fontWeight: 'bold',
  //     padding: 16,
  //     textAlign: 'center',
  //     color: '#333',
  //   },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#c7c9c7',
    elevation: 14,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0,
    shadowRadius: 20,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  tabItemBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  tabItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#090f06',
  },
});
