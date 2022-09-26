import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '../../config/theme';

export default function DefaultAvatar({name, styles, fontSize}) {
  // VARIABLES
  const letters = (name && name.split(' ')) || ['Chat'];

  return (
    <View style={{...stylesRoot.container, ...styles.root}}>
      {letters[0] && (
        <>
          <Text style={{...stylesRoot.lettersStyle, fontSize}}>
            {letters[0][0].toUpperCase()}
          </Text>
          {letters[1] && (
            <Text style={{...stylesRoot.lettersStyle, fontSize}}>
              {letters[1][0].toUpperCase()}
            </Text>
          )}
        </>
      )}
    </View>
  );
}

const stylesRoot = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.background_basic_color_2,
    borderRadius: 50,
    flexShrink: 0,
  },
  lettersStyle: {
    fontWeight: '700',
    color: '#ffffff',
  },
});
