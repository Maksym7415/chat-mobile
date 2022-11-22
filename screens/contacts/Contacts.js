/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import Contacts from 'react-native-contacts';
import makeStyles from './styles';
import Header from './components/header';

const ContactsScreen = ({}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // STATES
  const [emailsContacts, setEmailsContacts] = React.useState([]);

  React.useLayoutEffect(() => {
    Contacts?.getAll().then(contacts => {
      setEmailsContacts(
        contacts.reduce((acc, contact) => {
          const emails = contact.emailAddresses?.map(item => item.email);
          if (emails) {
            return [...acc, ...emails];
          }
          return acc;
        }, []),
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.wrapperContacts}>
        {emailsContacts?.map(email => (
          <Text>{email}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ContactsScreen;
