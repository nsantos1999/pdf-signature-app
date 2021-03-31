import {useTheme} from '@contexts/ThemeContext';
import {ITheme} from '@interfaces/ITheme';
import {StyleSheet} from 'react-native';

type NamedStylesType<T> =
  | StyleSheet.NamedStyles<T>
  | StyleSheet.NamedStyles<any>;

type CreateStylesParam<T, K> =
  | ((theme: ITheme, params: T) => NamedStylesType<K>)
  | NamedStylesType<K>;

export function createStyles<
  T,
  K extends StyleSheet.NamedStyles<K> | StyleSheet.NamedStyles<any>
>(styleProp: CreateStylesParam<T, K>) {
  function useStyles(useStyleProps: T = {} as T) {
    const {theme} = useTheme();

    const result =
      typeof styleProp === 'function'
        ? styleProp(theme, useStyleProps)
        : styleProp;

    const styles = StyleSheet.create<typeof result>(result);

    return styles;
  }
  return {useStyles};
}
