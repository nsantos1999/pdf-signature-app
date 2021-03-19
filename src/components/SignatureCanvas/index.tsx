import {Button} from '@components/Button';
import {useNavigation} from '@react-navigation/core';
import {createStyles} from '@utils/createStyles';
import {ToastUtil} from '@utils/ToastUtil';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import SignatureCapture, {
  SaveEventParams,
} from 'react-native-signature-capture';

export type SignatureCanvasProps = {
  onSave: (result: SaveEventParams) => void;
};

export function SignatureCanvas({onSave}: SignatureCanvasProps) {
  const styles = useStyles();
  const signatureRef = useRef();
  const [saveExtStorageIsGranted, setSaveExtStorageIsGranted] = useState(
    Platform.OS === 'ios',
  );
  const [isDragged, setIsDragged] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    return () => Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissão',
          message: 'Precisamos de sua permissão para salvar sua assinatura',
        },
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setSaveExtStorageIsGranted(true);
          } else {
            ToastUtil.show({
              type: 'error',
              title: 'Ops',
              content: 'Não é possível assinar sem esta permissão',
            });
            navigation.goBack();
          }
        })
        .catch(err => {
          navigation.goBack();
        });
    }
  }, []);

  const finishSignature = useCallback(() => {
    console.log('Signature', 'Prepare to save...');
    if (signatureRef) {
      console.log('Signature', 'Saving...');
      signatureRef?.current?.saveImage();
    }
  }, [signatureRef]);

  const resetSignature = useCallback(() => {
    if (signatureRef) {
      setIsDragged(false);
      signatureRef?.current?.resetImage();
    }
  }, [signatureRef]);

  return (
    <View style={styles.container}>
      <SignatureCapture
        style={styles.signature}
        ref={signatureRef}
        onSaveEvent={onSave}
        onDragEvent={() => setIsDragged(true)}
        // onDragEvent={this._onDragEvent}
        saveImageFileInExtStorage={false}
        showNativeButtons={false}
        showTitleLabel={false}
        backgroundColor="transparent"
        // strokeColor="#000"
        minStrokeWidth={4}
        maxStrokeWidth={4}
        viewMode={'landscape'}
      />
      <View style={styles.buttonGroups}>
        <Button inverse>Limpar</Button>
        <Button disabled={!isDragged || !saveExtStorageIsGranted}>
          Salvar
        </Button>
      </View>
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

  buttonGroups: {
    padding: 10,
    flex: 0,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});
