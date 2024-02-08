import { useParams } from "react-router-dom";
import { ProductCard, useProduct } from "..";


export const ProductByIdPage = () => {
    const { id } = useParams();

    const { product, isLoading } = useProduct( { id: Number( id )! } );

    return (
        <div className='flex-col'>
            { isLoading && <p>Cargando...</p> }

            { product && ( <ProductCard product={ product } fullDescription={ true } /> ) }
        </div>
    );
};
