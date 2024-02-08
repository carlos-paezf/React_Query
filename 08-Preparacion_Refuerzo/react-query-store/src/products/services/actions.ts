import { type Product, productsAPI } from "..";


const sleep = ( seconds: number = 2 ): Promise<boolean> => {
    return new Promise( resolve => setTimeout( () => resolve( true ), seconds * 1000 ) );
};



type GetProductsOptions = {
    filterKey?: string;
};

export const getProducts = async ( { filterKey }: GetProductsOptions ): Promise<Product[]> => {
    await sleep();

    const filterURL = filterKey ? `category=${ filterKey }` : '';

    const { data } = await productsAPI.get<Product[]>( `/products?${ filterURL }` );

    return data;
};


export const getProductById = async ( id: number ): Promise<Product> => {
    const { data } = await productsAPI.get<Product>( `/products/${ id }` );

    return data;
};