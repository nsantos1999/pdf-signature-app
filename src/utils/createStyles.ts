import {useTheme} from '@contexts/ThemeContext';
import {ITheme} from '@interfaces/ITheme';
import {StyleSheet} from 'react-native';

type NamedStylesType = StyleSheet.NamedStyles<StyleSheet.NamedStyles<any>>;

type CreateStylesParam<T> =
  | ((theme: ITheme, params: T) => NamedStylesType)
  | NamedStylesType;

export function createStyles<T>(param: CreateStylesParam<T>) {
  function useStyles(useStyleProps: T = {} as T) {
    const {theme} = useTheme();

    const result =
      typeof param === 'function' ? param(theme, useStyleProps) : param;

    const styles = StyleSheet.create(result);

    return styles;
  }
  return {useStyles};
}
