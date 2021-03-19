import React from 'react';
import {createStyles} from '@utils/createStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SignatureCanvas} from '@components/SignatureCanvas';

export function SignDocument() {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.constainer}>
      <SignatureCanvas onSave={data => console.log(data)} />
    </SafeAreaView>
  );
}

const {useStyles} = createStyles({
  constainer: {
    flex: 1,
  },
});
