import React, {useCallback} from 'react';
import {createStyles} from '@utils/createStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SignatureCanvas} from '@components/SignatureCanvas';
import {useSignPdf} from '@contexts/SignPdfContext';
import {useNavigation} from '@react-navigation/core';

export function SignDocument() {
  const {setSignature} = useSignPdf();
  const styles = useStyles();
  const navigation = useNavigation();

  const onSaveSignature = useCallback(
    data => {
      setSignature(data);
      navigation.navigate('SelectSignatureLocation');
    },
    [setSignature, navigation],
  );

  return (
    <SafeAreaView style={styles.constainer}>
      <SignatureCanvas onSave={onSaveSignature} />
    </SafeAreaView>
  );
}

const {useStyles} = createStyles({
  constainer: {
    flex: 1,
  },
});
