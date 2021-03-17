import {useTheme} from '@contexts/ThemeContext';
import {ITheme} from '@interfaces/ITheme';
import {StyleSheet} from 'react-native';

type CreateStylesCallback<T> = (theme: ITheme) => T | StyleSheet.NamedStyles<T>;

export function createStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(cb: CreateStylesCallback<T>) {
  return () => {
    const {theme} = useTheme();

    const result = cb(theme);

    const styles = StyleSheet.create(result);

    return styles;
  };
}
