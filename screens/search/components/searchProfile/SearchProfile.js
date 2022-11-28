import React from 'react';
import {ScrollView} from 'react-native';
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

  // RENDER CONDITIONAL
  if (!searchSettingsQuestions?.response.length || isLoading) {
    return (
      <RenderConditionsList
        list={searchSettingsQuestions?.response}
        isLoading={isLoading}
        noResultsText="No get request"
      />
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}></ScrollView>
    </>
  );
};

export default SearchProfile;
