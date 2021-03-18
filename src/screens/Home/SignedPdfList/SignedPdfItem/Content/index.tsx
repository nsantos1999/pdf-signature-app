import React from 'react';
import {createStyles} from '@utils/createStyles';
import {View} from 'react-native';
import {Typography} from '@components/Typography';

export type SignedPdfItemContentProps = {
  name: string;
  signedAt: Date;
};

export function SignedPdfItemContent({
  name,
  signedAt,
}: SignedPdfItemContentProps) {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.titleContent}>
        <Typography isLight>{name}</Typography>
      </View>
      <View>
        <Typography isLight>{String(signedAt)}</Typography>
      </View>
    </View>
  );
}

const {useStyles} = createStyles(theme => ({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 10,
  },
  titleContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
