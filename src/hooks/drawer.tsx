import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

interface DrawerProviderProps {
  children: ReactNode;
}

type DrawerContextData = UseDisclosureReturn;

const DrawerContext = createContext<DrawerContextData>({} as DrawerContextData);

function DrawerProvider({ children }: DrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    if (router.asPath) {
      disclosure.onClose();
    }
  }, [router.asPath]);
  return (
    <DrawerContext.Provider value={disclosure}>
      {children}
    </DrawerContext.Provider>
  );
}

function useDrawer(): DrawerContextData {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('useDrawer must be used within an DrawerProvider');
  }

  return context;
}

export { DrawerProvider, useDrawer };