import React from 'react';
import {signedPdfMock} from '@mocks/signedPdf.mock';
import {createStyles} from '@utils/createStyles';
import {ScrollView} from 'react-native';
import {SignedPdfItem} from './SignedPdfItem';

export function SignedPdfList() {
  const styles = useStyles();

  return (
    <ScrollView style={styles.container}>
      {signedPdfMock.map((signedPdf, index) => (
        <SignedPdfItem pdfSigned={signedPdf} key={index} />
      ))}
    </ScrollView>
  );
}

const {useStyles} = createStyles(() => ({
  container: {
    flex: 1,
    padding: 5,
  },
}));
