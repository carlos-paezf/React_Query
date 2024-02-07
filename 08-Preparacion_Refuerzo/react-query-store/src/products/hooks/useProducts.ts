import { useQuery } from "@tanstack/react-query";
import { productsActions } from "..";


interface UseProductsOptions {
    filterKey?: string;
}


export const useProducts = ( { filterKey }: UseProductsOptions ) => {
    const { isLoading, isError, error, data: products = [], isFetching } = useQuery( {
        queryKey: [ "products", filterKey ],
        queryFn: () => productsActions.getProducts( { filterKey } ),
        staleTime: 1000 * 60 * 60
    } );

    return { error, isError, isFetching, isLoading, products };
};
