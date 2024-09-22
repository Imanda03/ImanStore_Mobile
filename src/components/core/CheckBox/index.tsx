import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

interface CheckBoxInterface {
  checked?: boolean;
  onCheck?: (isChecked: boolean) => void;
}

const CheckBoxComponent = ({checked, onCheck}: CheckBoxInterface) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onCheck) return onCheck(!checked);
      }}
      activeOpacity={0.6}>
      {checked ? (
        <FontAwesome name="check-square" size={24} />
      ) : (
        <Fontisto name="checkbox-passive" size={24} />
      )}
    </TouchableOpacity>
  );
};

export default React.memo(CheckBoxComponent);
