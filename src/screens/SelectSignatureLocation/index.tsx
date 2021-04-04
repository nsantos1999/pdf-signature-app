import React, {useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {PdfViewer} from '@components/PdfViewer';
import {useSignPdf} from '@contexts/SignPdfContext';
import {useNavigation} from '@react-navigation/core';
import {createStyles} from '@utils/createStyles';
import {SelectSignatureLocationHeader} from './Header';

export function SelectSignatureLocation() {
  const styles = useStyles();
  const {pdf, signPdf, pdfSignedUrl} = useSignPdf();

  const navigation = useNavigation();

  const onPageSigleTab = useCallback(
    async (
      pageNumber: number,
      pageWidth: number,
      pageHeight: number,
      x: number,
      y: number,
    ) => {
      await signPdf({
        pageNumber,
        pageWidth,
        pageHeight,
        x,
        y,
      });

      // navigation.navigate('SignDocument');
    },
    [signPdf],
  );

  useEffect(() => {
    if (!pdf) {
      navigation.goBack();
    }
  }, [pdf, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <SelectSignatureLocationHeader />
      <PdfViewer
        pdfUri={pdfSignedUrl ? pdfSignedUrl : pdf?.uri}
        onPageSigleTab={onPageSigleTab}
      />
    </SafeAreaView>
  );
}

const {useStyles} = createStyles({
  container: {
    flex: 1,
  },
});
