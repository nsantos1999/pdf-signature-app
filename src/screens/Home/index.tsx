import {createStyles} from '@utils/createStyles';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {HomeFooter} from './Footer/intex';
import {SignedPdfList} from './SignedPdfList';

export function Home() {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <SignedPdfList />
      <HomeFooter />
    </SafeAreaView>
  );
}

const {useStyles} = createStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.primary.main,
    padding: 5,
  },
  content: {
    flex: 1,
  },
}));
