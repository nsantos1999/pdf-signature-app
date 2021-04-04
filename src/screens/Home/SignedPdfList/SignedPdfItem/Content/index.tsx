import React from 'react';
import {createStyles} from '@utils/createStyles';
import {View} from 'react-native';
import {Typography} from '@components/Typography';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
        <Typography isLight bold>
          {name}
        </Typography>
        <View style={styles.timeContent}>
          <Typography isLight size={12}>
            {moment(signedAt).format('DD/MM/YYYY HH:mm')}
          </Typography>
          <Icon name="clock" color="#fff" style={{marginHorizontal: 5}} />
        </View>
      </View>
    </View>
  );
}

const {useStyles} = createStyles({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 10,
  },
  titleContent: {
    height: '100%',
    justifyContent: 'space-around',
    // alignItems: 'center',
  },
  timeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
