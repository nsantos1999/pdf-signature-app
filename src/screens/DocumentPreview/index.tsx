import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {PdfViewer} from '@components/PdfViewer';
import {useSignPdf} from '@contexts/SignPdfContext';
import {useNavigation} from '@react-navigation/core';
import {createStyles} from '@utils/createStyles';
import {FooterButton} from '@components/FooterButton';

export function DocumentPreview() {
  const styles = useStyles();
  const {pdf} = useSignPdf();

  const navigation = useNavigation();

  // const onPageSigleTab = useCallback(
  //   (page: number, x: number, y: number) => {
  //     setSignatureLocation({
  //       page,
  //       x,
  //       y,
  //     });

  //     navigation.navigate('SignDocument');
  //   },
  //   [setSignatureLocation, navigation],
  // );

  useEffect(() => {
    if (!pdf) {
      navigation.goBack();
    }
  }, [pdf, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <PdfViewer pdfUri={pdf?.uri} />
      </View>
      <FooterButton onPress={() => navigation.navigate('SignDocument')}>
        Assinar
      </FooterButton>
    </SafeAreaView>
  );
}

const {useStyles} = createStyles({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
