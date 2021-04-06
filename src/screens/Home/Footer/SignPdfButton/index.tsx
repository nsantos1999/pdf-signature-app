import React, {useCallback} from 'react';
import {createStyles} from '@utils/createStyles';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useGlobalStyles} from 'styles/useGlobalStyles';
import DocumentPicker from 'react-native-document-picker';
import {useSignPdf} from '@contexts/SignPdfContext';
import {ToastUtil} from '@utils/ToastUtil';
import {useNavigation} from '@react-navigation/core';
import {BouncedView} from '@components/Animated/BouncedView';

export function SignPdfButton() {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();
  const {setPdf} = useSignPdf();

  const navigation = useNavigation();

  const handleSelectDocument = useCallback(async () => {
    try {
      // startAnimation();

      // throw 'teste';
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      setPdf({
        uri: res.uri,
        name: res.name,
        size: res.size,
        type: res.type,
      });

      navigation.navigate('DocumentPreview');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        ToastUtil.show({
          type: 'error',
          title: 'Que pena 😢',
          content: 'Operação cancelada',
        });
      } else {
        throw err;
      }
    }
  }, [navigation, setPdf]);

  return (
    <BouncedView>
      <TouchableOpacity
        onPress={handleSelectDocument}
        style={[styles.button, globalStyles.shadow1]}>
        <Icon size={30} name="file-signature" color="#fff" />
      </TouchableOpacity>
    </BouncedView>
  );
}

const {useStyles} = createStyles(theme => ({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 70,
    width: 70,
    height: 70,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.main,
  },
}));
