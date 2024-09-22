import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
// import {colors} from '../../utils/color';
import Input from '../Input';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onSearch?: (value: any) => void;
  onLogout?: (value: any) => void;
  showLogout?: Boolean;
  showSearch?: Boolean;
  showBack?: Boolean;
  keyword?: string;
  style?: any;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  onLogout,
  showLogout,
  showSearch,
  onSearch,
  keyword,
  showBack,
  style,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const onSearchClick = () => {
    setShowSearchInput((s: boolean) => !s);
  };

  return (
    <View style={[styles.mainContainer, {...style}]}>
      <View style={styles.container}>
        {showBack ? (
          <Pressable hitSlop={20} onPress={onBackPress}>
            <AntDesign name="arrowleft" size={24} color={'black'} />
          </Pressable>
        ) : showSearch ? (
          <Pressable hitSlop={20} onPress={onSearchClick}>
            <AntDesign name="search1" size={24} color={'black'} />
          </Pressable>
        ) : (
          <View style={styles.space} />
        )}
        <Text style={styles.title}>{title}</Text>

        {showLogout ? (
          <Pressable hitSlop={20} onPress={onLogout}>
            <MaterialIcons name="logout" size={30} color={'#262b26'} />
          </Pressable>
        ) : (
          <View style={styles.space} />
        )}
      </View>
      {showSearchInput ? (
        <Input
          //   onChangeText={onSearch}
          //   value={keyword}
          placeholder="Type your keyboard..."
        />
      ) : null}
    </View>
  );
};

export default React.memo(Header);
