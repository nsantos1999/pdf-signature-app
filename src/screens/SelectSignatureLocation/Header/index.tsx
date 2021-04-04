import React from 'react';
import {createStyles} from '@utils/createStyles';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSignPdf} from '@contexts/SignPdfContext';
import {useNavigation} from '@react-navigation/core';

const ICON_SIZE = 23;

export function SelectSignatureLocationHeader() {
  const {
    handleResetPdfSigned,
    handleConfirmSignature,
    pdfSignedUrl,
  } = useSignPdf();

  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={[styles.leftContent, styles.content]}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            if (pdfSignedUrl) {
              handleResetPdfSigned();
            } else {
              navigation.goBack();
            }
          }}>
          <Icon name="arrow-back-ios" color="#fff" size={ICON_SIZE} />
        </TouchableOpacity>
      </View>
      <View style={[styles.rightContent, styles.content]}>
        <>
          {pdfSignedUrl ? (
            <>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleResetPdfSigned}>
                <Icon name="cancel" color="#fff" size={ICON_SIZE} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleConfirmSignature}>
                <Icon name="check" color="#fff" size={ICON_SIZE} />
              </TouchableOpacity>
            </>
          ) : null}
        </>
      </View>
    </View>
  );
}

const {useStyles} = createStyles(theme => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContent: {
    justifyContent: 'flex-start',
  },
  rightContent: {
    justifyContent: 'flex-end',
  },
  iconButton: {
    paddingHorizontal: 10,
  },
}));
