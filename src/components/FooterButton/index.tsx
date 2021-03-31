import React from 'react';
import {createStyles} from '@utils/createStyles';
import {View} from 'react-native';
import {Button, CustomButtonProps} from '@components/Button';
import {useGlobalStyles} from '@styles/useGlobalStyles';

interface FooterButtonProps extends CustomButtonProps {
  children: React.ReactNode;
}

export function FooterButton({children, ...restProps}: FooterButtonProps) {
  const styles = useStyles();
  const globalStyles = useGlobalStyles();

  return (
    <View style={[styles.container, globalStyles.shadow10]}>
      <Button {...restProps}>{children}</Button>
    </View>
  );
}

const {useStyles} = createStyles(theme => ({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    flex: 1,
    padding: 20,
    width: '100%',
  },
}));
