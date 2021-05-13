import { ReactNode } from 'react';

import { DrawerProvider } from './drawer';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return <DrawerProvider>{children}</DrawerProvider>;
}