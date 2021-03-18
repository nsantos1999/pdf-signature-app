import React, {useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {PdfViewer} from '@components/PdfViewer';
import {useSignPdf} from '@contexts/SignPdfContext';
import {useNavigation} from '@react-navigation/core';
import {createStyles} from '@utils/createStyles';

export function DocumentPreview() {
  const styles = useStyles();
  const {pdf, setSignatureLocation} = useSignPdf();

  const navigation = useNavigation();

  const onPageSigleTab = useCallback(
    (page: number, x: number, y: number) => {
      setSignatureLocation({
        page,
        x,
        y,
      });
    },
    [setSignatureLocation],
  );

  useEffect(() => {
    if (!pdf) {
      navigation.goBack();
    }
  }, [pdf, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <PdfViewer pdfUri={pdf?.uri} onPageSigleTab={onPageSigleTab} />
    </SafeAreaView>
  );
}

const {useStyles} = createStyles({
  container: {
    flex: 1,
  },
});
