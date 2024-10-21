import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './style';
import {Pressable} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '../Button';

type InfoModalType = {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  modalVisible: boolean;
};

const index = ({title, onCancel, onConfirm, modalVisible}: InfoModalType) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <View style={styles.header}> */}
          <Entypo
            name="info-with-circle"
            color="#cc3300"
            size={30}
            style={styles.icon}
          />
          <Text style={styles.modalText}>{title}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onConfirm}
              style={{
                height: 40,
                backgroundColor: '#334d31',
                width: 90,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onCancel}
              style={{
                height: 40,
                width: 90,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                borderColor: '#334d31',
                borderWidth: 2,
              }}>
              <Text style={[styles.buttonText, {color: '#334d31'}]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default index;
