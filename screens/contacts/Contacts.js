/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import Contacts from 'react-native-contacts';
import makeStyles from './styles';
import Header from './components/header';
import ContactsItems from './components/contactsItems';
import {postCheckEmailsRequest} from '../../redux/contacts/requests';

const ContactsScreen = ({}) => {
  // HOOKS
  const theme = useTheme();
  const dispatch = useDispatch();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {contacts} = useSelector(({contactsSlice}) => contactsSlice);

  React.useLayoutEffect(() => {
    Contacts?.getAll().then(contactsLibery => {
      dispatch(
        postCheckEmailsRequest({
          data: {
            emails: contactsLibery.reduce((acc, contact) => {
              const emails = contact.emailAddresses?.map(item => item.email);
              if (emails) {
                return [...acc, ...emails];
              }
              return acc;
            }, []),
          },
        }),
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.wrapperContacts}>
        <ContactsItems data={contacts} />
      </View>
    </SafeAreaView>
  );
};

export default ContactsScreen;
