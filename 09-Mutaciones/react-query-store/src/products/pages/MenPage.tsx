import { FC } from "react";
import { ProductList, useProducts } from "..";


export const MenPage: FC = () => {
    const { isLoading, products } = useProducts( {
        filterKey: "men's clothing"
    } );


    return (
        <div className="flex-col">
            <h1 className="text-2xl font-bold">Productos para hombres</h1>

            { isLoading && <p>Cargando...</p> }

            <ProductList products={ products } />
        </div>
    );
};