import {useTheme} from '@contexts/ThemeContext';
import {ITheme} from '@interfaces/ITheme';
import {StyleSheet} from 'react-native';

type CreateStylesParam<T> =
  | ((theme: ITheme) => T | StyleSheet.NamedStyles<T>)
  | StyleSheet.NamedStyles<T>;

export function createStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(param: CreateStylesParam<T>) {
  const useStyles = () => {
    const {theme} = useTheme();

    const result = typeof param === 'function' ? param(theme) : param;

    const styles = StyleSheet.create(result);

    return styles;
  };
  return {useStyles};
}
