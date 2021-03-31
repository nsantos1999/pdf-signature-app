import {createStyles} from '@utils/createStyles';

export function useGlobalStyles() {
  const globalStyles = useStyles();

  return globalStyles;
}

const {useStyles} = createStyles(() => ({
  shadow1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  shadow10: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
}));
