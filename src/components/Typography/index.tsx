import {createStyles} from '@utils/createStyles';
import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';

interface TypographyProps extends TextProps {
  children: any;
  isLight?: boolean;
  style?: TextStyle;
}

export function Typography({
  children,
  style,
  isLight = false,
  ...restProps
}: TypographyProps) {
  const styles = useStyles();

  // const fontColor = useMemo(() => isLight ?  , [isLight])

  return (
    <Text
      style={[styles.text, {color: isLight ? '#FFF' : '#000'}, style]}
      {...restProps}>
      {children}
    </Text>
  );
}

StyleSheet.create({
  container: {
    alignContent: 'center',
  },
});

const {useStyles} = createStyles(theme => ({
  text: {
    fontFamily: theme.typography.fontFamily.normal,
    // color: isLight ? '#fff' : '#000',
  },
}));
