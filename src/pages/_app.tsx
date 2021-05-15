import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider, QueryClient } from 'react-query';

import { AppProvider } from '../hooks';

import { theme } from '../styles/theme';
import { makeServer } from '../services/mirage';

// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }

makeServer();

const queryClient = new QueryClient

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ChakraProvider>

      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default MyApp;
