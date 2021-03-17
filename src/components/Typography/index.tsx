import {createStyles} from '@utils/createStyles';
import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

interface TypographyProps extends TextProps {}

export function Typography(props: TypographyProps) {
  const styles = useStyles();

  return (
    <Text style={styles.text} {...props}>
      Teste
    </Text>
  );
}

StyleSheet.create({
  container: {
    alignContent: 'center',
  },
});

const useStyles = createStyles(theme => ({
  text: {
    color: theme.palette.primary,
  },
}));
