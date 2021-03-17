import {Typography} from '@components/Typography';
import {createStyles} from '@utils/createStyles';
import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {SignedPdfList} from './SignedPdfList';

export function Home() {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SignedPdfList />
      </View>
    </SafeAreaView>
  );
}

const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.primary.main,
    padding: 5,
  },
  content: {
    flex: 1,
  },
}));
