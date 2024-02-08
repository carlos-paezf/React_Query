import { type Product, productsAPI } from "..";


type GetProductsOptions = {
    filterKey?: string;
};


const sleep = ( seconds: number = 2 ): Promise<boolean> => {
    return new Promise( resolve => setTimeout( () => resolve( true ), seconds * 1000 ) );
};


export const getProducts = async ( { filterKey }: GetProductsOptions ) => {
    await sleep();

    const filterURL = filterKey ? `category=${ filterKey }` : '';

    const { data } = await productsAPI.get<Product[]>( `/products?${ filterURL }` );

    return data;
};