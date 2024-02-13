import { FC } from "react";
import { type Product, ProductCard, usePrefetchProduct } from "..";


type Props = {
    products: Product[];
};


export const ProductList: FC<Props> = ( { products } ) => {
    const { preFetchProduct } = usePrefetchProduct();

    return (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 justify-center max-w-max">
            { products.map( product => <ProductCard key={ product.id } product={ product } preFetchProduct={ preFetchProduct } /> ) }
        </div>
    );
};