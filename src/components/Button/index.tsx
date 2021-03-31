import {Typography} from '@components/Typography';
import {useGlobalStyles} from '@styles/useGlobalStyles';
import {createStyles} from '@utils/createStyles';
import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {IColor, IThemePalette} from '../../interfaces/ITheme';

export type ButtonOptionsStyle = {
  pallete: keyof IThemePalette;
  color: keyof IColor;
  inverse: boolean;
};

export interface CustomButtonProps
  extends TouchableOpacityProps,
    Partial<ButtonOptionsStyle> {
  children: React.ReactNode;
}

export function Button({
  children,
  pallete = 'primary',
  color = 'main',
  inverse = false,
  ...restProps
}: CustomButtonProps) {
  const styles = useStyles({pallete, color, inverse});
  const globalStyles = useGlobalStyles();

  return (
    <TouchableOpacity
      {...restProps}
      style={[styles.button, globalStyles.shadow1]}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Typography isLight={!inverse} bold>
          {children}
        </Typography>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const {useStyles} = createStyles<ButtonOptionsStyle, any>(
  (theme, {color, pallete, inverse}) => ({
    button: {
      borderRadius: 5,
      backgroundColor: inverse ? '#fff' : theme.palette[pallete][color],
      borderColor: inverse ? theme.palette[pallete][color] : '#000',
      borderWidth: inverse ? 1 : 0,
      // paddingVertical: 20,
      paddingHorizontal: 50,
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
    },
  }),
);
