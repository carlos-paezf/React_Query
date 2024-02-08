import { useQuery } from "@tanstack/react-query";
import { productsActions } from "..";


type Options = {
    id: number;
};


export const useProduct = ( { id }: Options ) => {
    const { isLoading, isError, error, data: product, isFetching } = useQuery( {
        queryKey: [ "product", id ],
        queryFn: () => productsActions.getProductById( id ),
        staleTime: 1000 * 60 * 60
    } );

    return { error, isError, isFetching, isLoading, product };
};
