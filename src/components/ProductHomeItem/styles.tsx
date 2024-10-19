import {Dimensions, StyleSheet} from 'react-native';
// import {colors} from '../../utils/color';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  title: {
    color: '#515452',
    paddingVertical: 8,
    fontWeight: '500',
  },
  image: {
    width: (width - 50) / 2,
    height: 200,
    borderRadius: 8,
  },
  price: {
    color: '#010d05',
    paddingBottom: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
