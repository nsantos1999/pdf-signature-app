import {BouncedView, BouncedViewRef} from '@components/Animated/BouncedView';
import {Button} from '@components/Button';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
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
  const signatureRef = useRef<any>();
  const [saveExtStorageIsGranted, setSaveExtStorageIsGranted] = useState(
    Platform.OS === 'ios',
  );
  const [isDragged, setIsDragged] = useState(false);

  const navigation = useNavigation();

  const bouncedViewRef = useRef<BouncedViewRef>(null);

  useEffect(() => {
    if (isDragged) {
      bouncedViewRef.current?.startAnimation();
    }
  }, [isDragged]);

  useFocusEffect(
    React.useCallback(() => {
      Orientation.lockToLandscape();

      return () => Orientation.lockToPortrait();
    }, []),
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
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
          console.error(err);
          navigation.goBack();
        });
    }
  }, [navigation]);

  const finishSignature = useCallback(() => {
    if (signatureRef) {
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
        minStrokeWidth={7}
        maxStrokeWidth={7}
        viewMode={'landscape'}
      />
      <View style={styles.buttonGroups}>
        <BouncedView>
          <Button inverse onPress={resetSignature}>
            Limpar
          </Button>
        </BouncedView>
        <BouncedView ref={bouncedViewRef}>
          <Button
            disabled={!isDragged || !saveExtStorageIsGranted}
            onPress={finishSignature}>
            Salvar
          </Button>
        </BouncedView>
      </View>
    </View>
  );
}

const {useStyles} = createStyles({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signature: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 5,
  },

  buttonGroups: {
    padding: 10,
    flex: 0,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});
