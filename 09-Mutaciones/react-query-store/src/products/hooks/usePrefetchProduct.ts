import { useQueryClient } from "@tanstack/react-query";
import { productsActions } from "..";


export const usePrefetchProduct = () => {
    const queryClient = useQueryClient();

    const preFetchProduct = ( id: number ) => {
        queryClient.prefetchQuery( {
            queryKey: [ 'product', id ],
            queryFn: () => productsActions.getProductById( id )
        } );
    };

    return { preFetchProduct };
};