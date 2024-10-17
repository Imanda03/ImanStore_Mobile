import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Linking,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/core/Header';
import ListItem from '../../../components/ListItem';
import {styles} from './styles';
import EditableBox from '../../../components/core/EditableBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {colors} from '../../../utils/color';
import Button from '../../../components/core/Button';

const Settings = ({navigation}: any) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [values, setValues] = useState({
    name: 'Anish Sharma',
    email: 'anish@gmail.com',
    contact: '9803708637',
    address: 'Gongabu-3, KTM',
  });

  const onEditPress = () => {
    setEditing(true);
  };

  const onSave = () => {
    setEditing(false);
  };

  const onChange = (key: any, value: any) => {
    setValues(V => ({...V, [key]: value}));
  };

  const onItemPress = () => {
    const phone = '+9779803708637';
    Linking.openURL(`tel: ${phone}`);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{backgroundColor: '#dcdedc', height: '100%'}}>
      <Header showBack onBackPress={goBack} title="Settings" />
      <ScrollView style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Pressable onPress={onEditPress}>
            <AntDesign name="edit" color="#030d0a" size={24} />
          </Pressable>
        </View>

        <EditableBox
          label="Name"
          onChnageText={(v: string) => onChange('name', v)}
          value={values.name}
          editable={editing}
        />
        <EditableBox
          label="Address"
          onChnageText={(v: string) => onChange('address', v)}
          value={values.address}
          editable={editing}
        />
        <EditableBox
          label="Contact Number"
          onChnageText={(v: string) => onChange('contact', v)}
          value={values.contact}
          editable={editing}
        />
        <EditableBox
          label="Email"
          onChnageText={(v: string) => onChange('email', v)}
          value={values.email}
          editable={editing}
        />
        {editing ? (
          <Button style={styles.button} title="Save" onPress={onSave} />
        ) : null}

        <Text style={[styles.sectionTitle, {marginTop: 40}]}>Help Center</Text>
        <ListItem onPress={onItemPress} style={styles.item} title="FAQ" />
        <ListItem
          onPress={onItemPress}
          style={styles.item}
          title="Contact Us"
        />
        <ListItem
          onPress={onItemPress}
          style={styles.item}
          title="Privacy and Terms"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
