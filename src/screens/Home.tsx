import {createStyles} from '@utils/createStyles';
import React from 'react';
import {Text, View} from 'react-native';

export function Home() {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>Teste</Text>
    </View>
  );
}

const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary,
  },
}));
