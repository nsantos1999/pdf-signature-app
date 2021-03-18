import Toast from 'react-native-toast-message';

export type ToastType = 'success' | 'error' | 'info';

export type ToastUtilShowParams = {
  type?: ToastType;
  title?: string;
  content: string;
};

export class ToastUtil {
  static show({type = 'success', title, content}: ToastUtilShowParams) {
    Toast.show({
      type,
      text1: title,
      text2: content,
    });
  }
}
