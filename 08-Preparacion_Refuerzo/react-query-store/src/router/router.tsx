import { createBrowserRouter } from "react-router-dom";

import { ErrorPage } from '../ErrorPage';
import { CompleteListPage, MenPage, NewProductPage, ProductByIdPage, StoreLayout, WomenPage } from "../products";


export const router = createBrowserRouter( [
    {
        path: '/',
        element: <StoreLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <CompleteListPage /> },
            { path: "men", element: <MenPage /> },
            { path: "women", element: <WomenPage /> },
            { path: "new", element: <NewProductPage /> },
            { path: "product/:id", element: <ProductByIdPage /> },
        ]
    }
] );