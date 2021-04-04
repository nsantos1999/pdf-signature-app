import {PdfViewer} from '@components/PdfViewer';
import React, {useImperativeHandle, useState, forwardRef} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';

type PdfViewerModalProps = {
  pdfUrl: string;
};

export type PdfViewerModalRef = {
  openModal: () => void;
};

const PdfViewerModal = forwardRef(
  ({pdfUrl}: PdfViewerModalProps, ref: React.Ref<PdfViewerModalRef>) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      openModal() {
        setIsOpen(true);
      },
    }));

    return (
      <Modal
        isVisible={isOpen}
        swipeDirection={['up', 'down']}
        propagateSwipe={true}
        onSwipeComplete={() => setIsOpen(false)}>
        <View style={{flex: 1}}>
          <PdfViewer pdfUri={pdfUrl} />
          {/* <Text>I am the modal content!</Text> */}
        </View>
      </Modal>
    );
  },
);

// function PdfViewerModal({pdfUrl}: PdfViewerModalProps) {

//   return (

//   );
// }

export {PdfViewerModal};
