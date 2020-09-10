import { useMediaQuery } from '@material-ui/core';

export const useMobileComponents = (): boolean =>
  useMediaQuery('(max-width: 1500px)', { noSsr: true });
