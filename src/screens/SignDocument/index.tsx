import React from 'react';
import {createStyles} from '@utils/createStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

export function SignDocument() {
  const styles = useStyles();

  return <SafeAreaView style={styles.constainer}></SafeAreaView>;
}

const {useStyles} = createStyles({
  constainer: {
    flex: 1,
  },
});
