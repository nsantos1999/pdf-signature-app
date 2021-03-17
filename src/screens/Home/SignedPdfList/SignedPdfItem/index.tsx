import React from 'react';
import {createStyles} from '@utils/createStyles';
import {Image, View} from 'react-native';
import {PdfSigned} from '@interfaces/PdfSigned';
import {SignedPdfItemContent} from './Content';
import {SignedPdfItemActions} from './Actions';

export type SignedPdfItemProps = {
  pdfSigned: PdfSigned;
};

export function SignedPdfItem({pdfSigned}: SignedPdfItemProps) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              'https://img.flaticon.com/icons/png/512/337/337946.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF',
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.infoContainer}>
        <SignedPdfItemContent
          name={pdfSigned.name}
          signedAt={pdfSigned.signedAt}
        />
      </View>
      <View style={styles.actionsContainer}>
        <SignedPdfItemActions />
      </View>
    </View>
  );
}

const useStyles = createStyles(theme => ({
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
