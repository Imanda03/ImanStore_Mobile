import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  GestureResponderEvent,
} from 'react-native';

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectComponentProps {
  options: SelectOption[];
  placeholder?: string;
  onSelect: (value: string | number) => void;
  initialSelectedValue?: string | number;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  options,
  placeholder = 'Select an option',
  onSelect,
  initialSelectedValue,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    initialSelectedValue || null,
  );

  // Memoized to prevent unnecessary recalculations
  const selectedLabel = useMemo(() => {
    const selectedOption = options.find(
      option => option.value === selectedValue,
    );
    return selectedOption ? selectedOption.label : placeholder;
  }, [selectedValue, options]);

  const handleOpenModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleSelect = useCallback(
    (value: string | number) => {
      setSelectedValue(value);
      onSelect(value);
      handleCloseModal();
    },
    [onSelect, handleCloseModal],
  );

  const renderOption = useCallback(
    ({item}: {item: SelectOption}) => {
      return (
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleSelect(item.value)}>
          <Text style={styles.optionText}>{item.label}</Text>
        </TouchableOpacity>
      );
    },
    [handleSelect],
  );

  return (
    <>
      <TouchableOpacity
        style={styles.selectContainer}
        onPress={handleOpenModal}>
        <Text style={styles.selectText}>{selectedLabel}</Text>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={item => item.value.toString()}
              renderItem={renderOption}
            />
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default React.memo(SelectComponent);

const styles = StyleSheet.create({
  selectContainer: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#d1171d',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
