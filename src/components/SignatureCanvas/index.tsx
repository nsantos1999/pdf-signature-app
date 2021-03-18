import {createStyles} from '@utils/createStyles';
import React, {useRef} from 'react';
import {View} from 'react-native';
import SignatureCapture, {
  SaveEventParams,
} from 'react-native-signature-capture';

export type SignatureCanvasProps = {
  onSave: (result: SaveEventParams) => void;
};

export function SignatureCanvas({onSave}: SignatureCanvasProps) {
  const styles = useStyles();
  const signatureRef = useRef();

  return (
    <View style={styles.container}>
      <SignatureCapture
        style={styles.signature}
        ref={signatureRef}
        onSaveEvent={onSave}
        // onDragEvent={this._onDragEvent}
        saveImageFileInExtStorage={false}
        showNativeButtons={false}
        showTitleLabel={false}
        backgroundColor="transparent"
        strokeColor="#000"
        minStrokeWidth={4}
        maxStrokeWidth={4}
        viewMode={'landscape'}
      />
    </View>
  );
}

const {useStyles} = createStyles({
  container: {
    flex: 1,
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
});
