import React from 'react';
import {createStyles} from '@utils/createStyles';
import {FlatList} from 'react-native';
import {SignedPdfItem} from './SignedPdfItem';
import {useSignedPdfList} from '@contexts/SignedPdfListContext';
import {BouncedView} from '@components/Animated/BouncedView';

export function SignedPdfList() {
  const styles = useStyles();
  const {signedPdfs, isLoading, handleLoadSignedPdfs} = useSignedPdfList();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     handleLoadSignedPdfs();
  //   }, []),
  // );

  return (
    // <ScrollView style={styles.container}>
    <FlatList
      style={styles.container}
      data={signedPdfs}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <BouncedView bounciness={10}>
          <SignedPdfItem signedPdf={item} key={item.id} />
        </BouncedView>
      )}
      refreshing={isLoading}
      onRefresh={handleLoadSignedPdfs}
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
