import {BouncedView, BouncedViewRef} from '@components/Animated/BouncedView';
import {Typography} from '@components/Typography';
import {useGlobalStyles} from '@styles/useGlobalStyles';
import {createStyles} from '@utils/createStyles';
import React, {useRef} from 'react';
import {TouchableOpacity, TouchableOpacityProps, ViewStyle} from 'react-native';
import {IColor, IThemePalette} from '../../interfaces/ITheme';

export type ButtonOptionsStyle = {
  pallete: keyof IThemePalette;
  color: keyof IColor;
  inverse: boolean;
  disabled: boolean | undefined;
};

type StyleParams = {
  button: ViewStyle;
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
  disabled,
  ...restProps
}: CustomButtonProps) {
  const styles = useStyles({pallete, color, inverse, disabled});
  const globalStyles = useGlobalStyles();
  // const bouncedViewRef = useRef<BouncedViewRef>(null);

  return (
    // <BouncedView ref={bouncedViewRef}>
    <TouchableOpacity
      {...restProps}
      style={[styles.button, globalStyles.shadow1]}
      disabled={disabled}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Typography isLight={!inverse} bold>
          {children}
        </Typography>
      ) : (
        children
      )}
    </TouchableOpacity>
    // </BouncedView>
  );
}

const {useStyles} = createStyles<ButtonOptionsStyle, StyleParams>(
  (theme, {color, pallete, inverse, disabled}) => ({
    button: {
      borderRadius: 5,
      backgroundColor: inverse
        ? '#fff'
        : disabled
        ? theme.palette[pallete][color] + '80'
        : theme.palette[pallete][color],
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
