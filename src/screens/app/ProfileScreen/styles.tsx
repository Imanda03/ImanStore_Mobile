import {StyleSheet} from 'react-native';
// import {colors} from '../../../utils/color';

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262b26',
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: '#262b26',
    marginBottom: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#91a39e',
    height: 100,
    borderEndEndRadius: 50,
    borderBottomStartRadius: 50,
  },
  avatar: {
    alignItems: 'center',
    marginTop: -80,
  },
});
