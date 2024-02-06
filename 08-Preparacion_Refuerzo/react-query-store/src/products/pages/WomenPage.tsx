import { FC } from "react";
import { ProductList } from "..";


export const WomenPage: FC = () => {
    return (
        <div className="flex-col">
            <h1 className="text-2xl font-bold">Productos para mujeres</h1>
            <ProductList />
        </div>
    );
};