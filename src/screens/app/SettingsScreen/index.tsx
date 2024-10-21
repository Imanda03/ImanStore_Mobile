import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Linking,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/core/Header';
import ListItem from '../../../components/ListItem';
import {styles} from './styles';
import EditableBox from '../../../components/core/EditableBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../../components/core/Button';
import {useQuery, useMutation} from 'react-query';
import {getProfileDetails, updateProfile} from '../../../services/AuthService'; // Import updateProfile
import {useAuth} from '../../../Context';

const Settings = ({navigation}: any) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  });
  const {logout, authToken, userId} = useAuth();

  const {
    data: profileData,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['profile', userId],
    () => getProfileDetails(authToken, userId),
    {
      enabled: !!authToken && !!userId,
    },
  );

  // Initialize values with profile data
  useEffect(() => {
    if (profileData && profileData?.userDetails) {
      setValues({
        name: profileData?.userDetails.username,
        email: profileData?.userDetails.email,
        contact: profileData?.userDetails.contactNumber,
        address: profileData?.userDetails.address,
      });
    }
  }, [profileData?.userDetails]);

  const mutation = useMutation(updateProfile, {
    onSuccess: () => {
      refetch(); // Refetch the profile data after successful update
      setEditing(false); // Exit editing mode after saving
    },
    onError: error => {
      console.error('Error updating profile:', error);
      // Optionally, show an error message to the user
    },
  });

  console.log('profile details', profileData?.userDetails);

  const onEditPress = () => {
    setEditing(true);
  };

  const onSave = () => {
    mutation.mutate({authToken, userId, ...values}); // Update with the new values
  };

  const onChange = (key: string, value: string) => {
    setValues(prevValues => ({...prevValues, [key]: value}));
  };

  const onItemPress = () => {
    const phone = '+9779803708637';
    Linking.openURL(`tel:${phone}`);
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{backgroundColor: '#dcdedc', height: '100%'}}>
        {/* Add a loading indicator here if desired */}
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={{backgroundColor: '#dcdedc', height: '100%'}}>
        <Text style={{color: 'red'}}>Failed to load profile data</Text>
      </SafeAreaView>
    );
  }

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
        {editing && (
          <Button style={styles.button} title="Save" onPress={onSave} />
        )}

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
