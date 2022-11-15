import React from 'react';
import {ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import makeStyles from './styles';
import RenderConditionsList from '../../../../components/renderConditionsList';

const SearchProfile = () => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const styles = makeStyles(theme);

  // SELECTORS
  const {searchSettingsQuestions, isLoading} = useSelector(
    ({searchSlice}) => searchSlice,
  );

  return (
    <>
      <RenderConditionsList
        list={searchSettingsQuestions?.response}
        isLoading={isLoading}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View></View>
      </ScrollView>
    </>
  );
};

export default SearchProfile;
