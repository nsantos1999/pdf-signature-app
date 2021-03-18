import React from 'react';
import {createStyles} from '@utils/createStyles';
import {Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';

export type PdfViewerParams = {
  pdfUri: string | undefined;
  onPageSigleTab?: (page: number, x: number, y: number) => void;
};

export function PdfViewer({pdfUri, onPageSigleTab}: PdfViewerParams) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Pdf
        source={{uri: pdfUri}}
        onError={error => {
          console.log(error);
        }}
        onPageSingleTap={onPageSigleTab}
        style={styles.pdf}
      />
    </View>
  );
}

const {useStyles} = createStyles({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
