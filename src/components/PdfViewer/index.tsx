import React, {useState} from 'react';
import {createStyles} from '@utils/createStyles';
import {Dimensions, View, ViewStyle} from 'react-native';
import Pdf from 'react-native-pdf';

type StyleOptions = {
  pdfWidth: number;
  pdfHeight: number;
};

type ICreateStyle = {
  container: ViewStyle;
  pdf: ViewStyle;
};

export interface PdfViewerParams extends Partial<StyleOptions> {
  pdfUri: string | undefined;
  onPageSigleTab?: (
    pageNumber: number,
    pageWidth: number,
    pageHeight: number,
    x: number,
    y: number,
  ) => void;
  page?: number;
}

type IPageSize = {
  width: number;
  height: number;
};

export function PdfViewer({
  pdfUri,
  onPageSigleTab,
  pdfHeight = Dimensions.get('window').height,
  pdfWidth = Dimensions.get('window').width,
  page,
}: PdfViewerParams) {
  const styles = useStyles({pdfHeight, pdfWidth});
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
        page={page}
        style={styles.pdf}
        singlePage={!!page}
      />
    </View>
  );
}

const {useStyles} = createStyles<StyleOptions, ICreateStyle>(
  (_, {pdfHeight, pdfWidth}) => ({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 25,
    },
    pdf: {
      flex: 1,
      width: pdfWidth,
      height: pdfHeight,
    },
  }),
);
