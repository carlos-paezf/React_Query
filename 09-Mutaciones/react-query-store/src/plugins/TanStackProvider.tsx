import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC } from 'react';


const queryClient = new QueryClient();


export const TanStackProvider: FC<React.PropsWithChildren> = ( { children } ) => {
    return (
        <QueryClientProvider client={ queryClient }>
            { children }
            <ReactQueryDevtools initialIsOpen={ false } />
        </QueryClientProvider>
    );
};
