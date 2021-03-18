import React from 'react';
import {createStyles} from '@utils/createStyles';
import {View} from 'react-native';
import {SignPdfButton} from './SignPdfButton';

export function HomeFooter() {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <SignPdfButton />
    </View>
  );
}

const {useStyles} = createStyles(() => ({
  container: {
    flex: 0.2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
