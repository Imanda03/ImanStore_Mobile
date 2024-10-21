import React, {ReactNode} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

interface ModalComponentProps {
  visible: boolean;
  title?: string;
  onClose: (event: GestureResponderEvent) => void;
  children: ReactNode; // Modal's content passed as children
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  visible,
  title = 'Modal Title',
  onClose,
  children,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Title displayed at the top */}
          {title && <Text style={styles.modalTitle}>{title}</Text>}

          {/* All modal content will be passed via children */}
          <View style={styles.contentContainer}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#262b26',
    marginBottom: 15,
  },
  contentContainer: {
    width: '100%',
  },
});
