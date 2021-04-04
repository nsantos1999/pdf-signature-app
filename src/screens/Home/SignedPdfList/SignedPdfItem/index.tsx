import React, {useRef} from 'react';
import {createStyles} from '@utils/createStyles';
import {TouchableOpacity, View} from 'react-native';
import {SignedPdfItemContent} from './Content';
import {SignedPdfItemActions} from './Actions';
import {ISignedPdfSchema} from '@schemas/SignedPdfSchema';
import {PdfViewer} from '@components/PdfViewer';
import {PdfViewerModal, PdfViewerModalRef} from './PdfModal';

export type SignedPdfItemProps = {
  signedPdf: ISignedPdfSchema;
};

export function SignedPdfItem({signedPdf}: SignedPdfItemProps) {
  const styles = useStyles();
  const modalRef = useRef<PdfViewerModalRef>(null);

  return (
    <>
      <PdfViewerModal pdfUrl={signedPdf.url} ref={modalRef} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            modalRef.current?.openModal();
          }}>
          <PdfViewer
            pdfUri={signedPdf.url}
            pdfHeight={100}
            pdfWidth={80}
            page={1}
          />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <SignedPdfItemContent
            name={signedPdf.title}
            signedAt={signedPdf.signedAt}
          />
        </View>
        <View style={styles.actionsContainer}>
          <SignedPdfItemActions />
        </View>
      </View>
    </>
  );
}

const {useStyles} = createStyles(theme => ({
  container: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: theme.palette.primary.light,
    padding: 5,
    // borderWidth: 5,
  },
  imageContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: theme.palette.secondary.light,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  actionsContainer: {
    flex: 0.1,
    // borderWidth: 2,
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
}));
