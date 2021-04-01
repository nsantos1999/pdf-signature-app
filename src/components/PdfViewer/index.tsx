import React, {useState} from 'react';
import {createStyles} from '@utils/createStyles';
import {Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';

export type PdfViewerParams = {
  pdfUri: string | undefined;
  onPageSigleTab?: (
    pageNumber: number,
    pageWidth: number,
    pageHeight: number,
    x: number,
    y: number,
  ) => void;
};

type IPageSize = {
  width: number;
  height: number;
};

export function PdfViewer({pdfUri, onPageSigleTab}: PdfViewerParams) {
  const styles = useStyles();
  const [pageSize, setPageSize] = useState<IPageSize>({
    height: 0,
    width: 0,
  } as IPageSize);

  return (
    <View style={styles.container}>
      <Pdf
        source={{uri: pdfUri}}
        onError={error => {
          console.log(error);
        }}
        onLoadComplete={(numberOfPages: number, path: string, size) =>
          setPageSize(size)
        }
        onPageSingleTap={(page, x, y) =>
          onPageSigleTab &&
          onPageSigleTab(page, pageSize.width, pageSize.height, x, y)
        }
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
