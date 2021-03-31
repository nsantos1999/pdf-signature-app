import {createStyles} from '@utils/createStyles';
import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';

type OptionsStyle = {
  isLight: boolean;
  color?: string;
  bold: boolean;
};

interface TypographyProps extends TextProps, Partial<OptionsStyle> {
  children: any;
  isLight?: boolean;
  style?: TextStyle;
}

export function Typography({
  children,
  style,
  isLight = false,
  color,
  bold = false,
  ...restProps
}: TypographyProps) {
  const styles = useStyles({isLight, color, bold});

  // const fontColor = useMemo(() => isLight ?  , [isLight])

  return (
    <Text style={[styles.text, style]} {...restProps}>
      {children}
    </Text>
  );
}

StyleSheet.create({
  container: {
    alignContent: 'center',
  },
});

const {useStyles} = createStyles<OptionsStyle, any>(
  (theme, {isLight, color, bold}) => ({
    text: {
      fontFamily: bold
        ? theme.typography.fontFamily.bold
        : theme.typography.fontFamily.normal,
      color: color ? color : isLight ? '#fff' : theme.palette.primary.dark,
    },
  }),
);
