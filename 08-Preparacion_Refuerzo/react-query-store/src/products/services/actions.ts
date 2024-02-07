import { type Product, productsAPI } from "..";


type GetProductsOptions = {
    filterKey?: string;
};


export const getProducts = async ( { filterKey }: GetProductsOptions ) => {
    const { data } = await productsAPI.get<Product[]>( '/products' );

    return data;
};