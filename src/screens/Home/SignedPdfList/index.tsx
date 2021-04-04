import React from 'react';
import {createStyles} from '@utils/createStyles';
import {FlatList} from 'react-native';
import {SignedPdfItem} from './SignedPdfItem';
import {useSignedPdfList} from '@contexts/SignedPdfListContext';

export function SignedPdfList() {
  const styles = useStyles();
  const {signedPdfs} = useSignedPdfList();

  return (
    // <ScrollView style={styles.container}>
    <FlatList
      style={styles.container}
      data={signedPdfs}
      keyExtractor={item => item.id}
      renderItem={({item}) => <SignedPdfItem signedPdf={item} key={item.id} />}
    />
    //   {signedPdfMock.map((signedPdf, index) => (
    //     <SignedPdfItem pdfSigned={signedPdf} key={index} />
    //   ))}
    // </ScrollView>
  );
}

const {useStyles} = createStyles({
  container: {
    flex: 1,
    padding: 5,
  },
});
