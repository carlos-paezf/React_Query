# Sección 08 - Preparación y reforzamiento

Esta sección es un reforzamiento de lo visto anteriormente y también empezaremos a trabajar con un ejercicio diferente.

Puntualmente reforzaremos temas como:

- React Router 6+
- Parámetros de ruta
- Query Client
- PreFetch de queries
- Objetos como query keys
- Custom Hooks
- Integraciones con NextUI y Tailwind

En sí, el objetivo es empezar un nuevo proyecto que nos sirva para afianzar y reforzar lo aprendido anteriormente con un ejercicio real.

## Inicio del proyecto

Vamos a crear un nuevo proyecto de React TS + Vite, para lo cual usamos el siguiente comando:

```txt
$: pnpm create vite
```

El nombre del proyecto sera `react-query-store`, y para reconstruir los `node-modules` usaremos el comando `npm install` (Usaré npm y no pnpm para poder usar el theme de @nextui). Para levantar el proyecto podemos usar `npm dev`. También vamos a instalar algunos paquete a través de los siguientes comandos:

```txt
$: npm i -S react-router-dom@6 @nextui-org/react framer-motion
```

```txt
$: npm i -D autoprefixer postcss tailwindcss
```

El scaffolding inicial de nuestro proyecto será el siguiente:

```txt
|_ src
    |_ products
        |_ components
            |_ ProductCard.tsx
            |_ ProductList.tsx
        |_ layout
            |_ StoreLayout.tsx
        |_ pages
            |_ CompleteListPage.tsx
            |_ MenPage.tsx
            |_ NewProductPage.tsx
            |_ WomenPage.tsx
        |_ index.ts
    |_ router
        _ router.tsx
    |_ shared
        |_ components
            |_ AcmeLogo.tsx
            |_ NavBar.module.css
            |_ NavBar.tsx
        |_ index.ts
    |_ ErrorPage.tsx
    |_ index.css
    |_ main.tsx
|_ postcss.config.js
|_ tailwind.config.js
```

Dentro del archivo `tailwind.config.js` tendremos el siguiente código:

```js
/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// eslint-disable-next-line
const { nextui } = require( "@nextui-org/react" );


export default {
    content: [
        "./src/**/*.{html,js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [ nextui() ],
};
```

En el archivo `postcss.config.js` tendremos el siguiente código:

```js
export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
```

En el archivo `ErrorPage.tsx` tendremos el siguiente código:

```tsx
import { FC } from 'react';
import { Link } from 'react-router-dom';


export const ErrorPage: FC = () => {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>

            <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">Page Not Found</div>

            <button className="mt-5">
                <a href="" className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>
                    <span className="relative block px-8 py-3 bg-black border border-current">
                        <Link to="/">Go Home</Link>
                    </span>
                </a>
            </button>
        </main>
    );
};
```

En el archivo `ProductCard.tsx` tendremos el siguiente código:

```tsx
import { Card, Image } from "@nextui-org/react";
import { FC } from "react";


export const ProductCard: FC = () => {
    return (
        <Card className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
            <div className="w-full md:w-1/3 bg-white grid place-items-center">
                <Image src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                    alt="tailwind logo"
                    width={ 300 }
                    height={ 400 }
                    className="rounded-xl p-5 sm:p-0 bg-white" />
            </div>

            <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                <div className="flex justify-between item-center">
                    <p className="text-gray-500 font-medium hidden md:block">Vacations</p>
                </div>

                <h3 className="font-black text-gray-800 md:text-2xl text-xl">
                    The Majestic and Wonderful Bahamas
                </h3>

                <p className="md:text-lg text-gray-500 text-base">
                    The best kept secret of The Bahamas is the country’s sheer
                    size and diversity. With 16 major islands, The Bahamas is an unmatched destination
                </p>

                <p className="text-xl font-black text-gray-800">
                    $110 <span className="font-normal text-gray-600 text-base"> +impuesto</span>
                </p>
            </div>
        </Card>
    );
};
```

En el archivo `ProductList.tsx` tendremos el siguiente código:

```tsx
import { FC } from "react";
import { ProductCard } from "..";


export const ProductList: FC = () => {
    return (
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 justify-center max-w-max">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    );
};
```

En el archivo `StoreLayout.tsx` tendremos el siguiente código:

```tsx
import { FC } from "react";
import { NavBar } from "../../shared";
import { Outlet } from "react-router-dom";


export const StoreLayout: FC = () => {
    return (
        <div className="flex flex-col min-h-screen pb-10">
            <NavBar />

            <div className="flex px-10">
                <Outlet />
            </div>
        </div>
    );
};
```

En el archivo `CompleteListPage.tsx` tendremos el siguiente código:

```tsx
import { FC } from "react";
import { ProductList } from "..";


export const CompleteListPage: FC = () => {
    return (
        <div className="flex-col">
            <h1 className="text-2xl font-bold">Todos los productos</h1>
            <ProductList />
        </div>
    );
};
```

En el archivo `MenPage.tsx` tendremos el siguiente código:

```tsx
import { FC } from "react";
import { ProductList } from "..";


export const MenPage: FC = () => {
    return (
        <div className="flex-col">
            <h1 className="text-2xl font-bold">Productos para hombres</h1>

            <ProductList />

        </div>
    );
};
```

En el archivo `WomenPage.tsx` tendremos el siguiente código:

```ts
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
```

En el archivo `NewProductPage.tsx` tendremos el siguiente código:

```tsx
import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { FC } from "react";


export const NewProductPage: FC = () => {
    return (
        <div className="w-full flex-col">
            <h1 className="text-2xl font-bold">Nuevo producto</h1>
            <form className="w-full">
                <div className="flex justify-around items-center">
                    <div className="flex-col w-[500px]">
                        <Input className="mt-2" type="text" label="Titulo del producto" />
                        <Input className="mt-2" type="number" label="Precio del producto" />
                        <Input className="mt-2" type="url" label="Url del producto" />
                        <Textarea className="mt-2" label="Descripcion del producto" />
                        <select className="rounded-md p-3 mt-2 bg-gray-800 w-full">
                            <option value="men's clothing">Men's clothing</option>
                            <option value="women's clothing">Women's clothing</option>
                            <option value="jewelery">Jewelery</option>
                            <option value="electronics">Electronics</option>
                        </select>

                        <br />
                        <Button className="mt-2" color="primary">Crear</Button>
                    </div>

                    <div className="bg-white rounded-2xl p-10 flex items-center" style={ {
                        width: '500px',
                        height: '600px',
                    } }
                    >
                        <Image src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" />
                    </div>
                </div>
            </form>
        </div>
    );
};
```

En el archivo `AcmeLogo.tsx` tendremos el siguiente código:

```tsx
import { FC } from "react";

export const AcmeLogo: FC = () => (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);
```

En el archivo `NavBar.tsx` tendremos el siguiente código:

```tsx

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import styles from './NavBar.module.css';

import { FC } from "react";
import { AcmeLogo } from "./AcmeLogo";


const routes = [
    { to: '/', text: 'Todo' },
    { to: '/men', text: 'Hombres' },
    { to: '/women', text: 'Mujeres' },
];


export const NavBar: FC = () => {

    return (
        <Navbar>
            <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {
                    routes.map( ( { to, text } ) => (
                        <NavbarItem key={ to }>
                            <NavLink to={ to } className={ ( { isActive } ) => isActive ? styles.active : styles.inactive }>
                                { text }
                            </NavLink>
                        </NavbarItem>
                    ) )
                }
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={ NavLink } color="primary" to="/new" variant="flat">
                        Nuevo producto
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
```

En el archivo `NavBar.module.css` tendremos el siguiente código:

```css
.active {
    @apply text-blue-500;
    transition: all .2s;
}

.inactive {
    @apply text-gray-100;
    transition: all .2s;
}
```

En el archivo `router.tsx` tendremos el siguiente código:

```tsx
import { createBrowserRouter } from "react-router-dom";

import { ErrorPage } from '../ErrorPage';
import { CompleteListPage, MenPage, NewProductPage, StoreLayout, WomenPage } from "../products";


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
        ]
    }
] );
```

En el archivo `main.tsx` tendremos el siguiente código:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from 'react-router-dom';
import { router } from "./router/router.tsx";


ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <NextUIProvider>
            <main className="dark text-foreground bg-background">
                <RouterProvider router={ router } />
            </main>
        </NextUIProvider>
    </React.StrictMode>,
);
```

## Levantar el backend

Vamos a crear un backend rápido usando el paquete `json-server`, para lo cual, creamos el directorio `fake-backend` y corremos el siguiente comando:

```txt
$: npm init -y
```

Luego instalamos el paquete requerido:

```txt
$: pnpm i json-server
```

En un archivo llamado `db.json` guardaremos la data con la cual vamos a interactuar en el proyecto, y en el archivo `db-original.json` tendremos un backup de la información inicial. Y para poder usar dicha data, vamos a añadir un script para correr nuestro backend temporal:

```json
{
    ...
    "scripts": {
        "start": "json-server db.json --port 3100",
        ...
    },
    ...
}
```

Cuando ejecutamos en la terminal del backend `pnpm start`, vamos a ver el siguiente output:

```txt
$:  pnpm start

> fake-backend@1.0.0 start C:\Users\carlo\Documents\Cursos\React_Query\08-Preparacion_Refuerzo\fake-backend
> json-server db.json --port 3100

JSON Server started on PORT :3100
Press CTRL-C to stop
Watching db.json...

( ˶ˆ ᗜ ˆ˵ )

Index:
http://localhost:3100/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3100/products
```

## Configurar TanStack Query

Dentro del proyecto de React, vamos a realizar la instalación de TanStack Query. Los pasos a seguir se encuentran en la documentación oficial [TanStack Query](https://tanstack.com/query/latest). Cómo estaremos usando npm como gestor de paquetes para el proyecto frontend, vamos a realizar la instalación con el siguiente comando:

```txt
$: npm i @tanstack/react-query
```

Para usar de manera global del provider de React Query, vamos crear una carpeta llamada `src/plugins`, y dentro del mismo creamos un componente en el archivo `TanStackProvider.tsx` para determinar el provider, el cual es un HoC (Higher-order Component)

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';

const queryClient = new QueryClient();

export const TanStackProvider: FC<React.PropsWithChildren> = ( { children } ) => {
    return (
        <QueryClientProvider client={ queryClient }>
            { children }
        </QueryClientProvider>
    );
};
```

En el archivo `main.tsx` vamos a ubicar nuestro provider, teniendo en cuenta que debe abarcar todas las peticiones HTTP:

```tsx
...
import { TanStackProvider } from './plugins/TanStackProvider';

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <TanStackProvider>
            <NextUIProvider>
                <main className="dark text-foreground bg-background">
                    <RouterProvider router={ router } />
                </main>
            </NextUIProvider>
        </TanStackProvider>
    </React.StrictMode>,
);
```

Para instalar las DevTools usaremos el siguiente comando:

```txt
$: npm i @tanstack/react-query-devtools
```

Volvemos al provider y realizamos la configuración de las devtools:

```tsx
...
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
...
export const TanStackProvider: FC<React.PropsWithChildren> = ( { children } ) => {
    return (
        <QueryClientProvider client={ queryClient }>
            ...
            <ReactQueryDevtools initialIsOpen={ false } />
        </QueryClientProvider>
    );
};
```

## Acciones e interfaces

Vamos a crear un directorio para las interfaces de la data o funciones. Luego, usando la extensión "Paste JSON as Code" de QuickType, podemos copiar la data y extraer rápidamente la interfaz de la misma, en este caso, las siguientes, serán las interfaces que usaremos en el proyecto luego de realizar algunas modificaciones:

```ts
// Generated by https://quicktype.io

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: Rating;
}

export interface Rating {
    rate: number;
    count: number;
}
```

En el archivo barril `products/index.ts`, forzamos la exportación cómo tipo para evitar conflictos con TS:

```ts
export type { Product } from './interfaces/product';
```

Para las acciones o servicios, creamos el archivo `products/services/actions.ts`, y adicional, instalamos axios con el comando `npm i axios`, para luego crear la instancia de axios dentro de `products/api/productsAPI.ts`:

```ts
import axios from "axios";

const productsAPI = axios.create( {
    baseURL: 'http://localhost:3100'
} );

export { productsAPI };
```

En las acciones vamos a crear un primer bosquejo del método para obtener los productos:

```ts
import { type Product, productsAPI } from "..";


type GetProductsOptions = {
    filterKey?: string;
};


export const getProducts = async ( { filterKey }: GetProductsOptions ) => {
    const { data } = await productsAPI.get<Product[]>( '/products' );

    return data;
};
```

## useQuery - Listado de productos

Vamos a hacer la petición HTTP usando `useQuery`. Lo primero será crear un custom hook para mantener un código ordenado y legible:

```ts
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
```

Luego, en el componente de listado completo de productos hacemos uso del hook:

```ts
import { FC } from "react";
import { ProductList, useProducts } from "..";

export const CompleteListPage: FC = () => {
    const { isLoading, products } = useProducts( {} );

    return (
        <div className="flex-col">
            <h1 className="text-2xl font-bold">Todos los productos</h1>

            { isLoading && <p>Cargando...</p> }

            <ProductList products={ products } />
        </div>
    );
};
```

## Mostrar los productos

Ahora, vamos a listar los productos que obtenemos de la consulta al backend. En el componente `ProductList` vamos recibir props y recorrer el listado para usar el component `ProductCard`:

```tsx
import { FC } from "react";
import { Product, ProductCard } from "..";

type Props = {
    products: Product[];
};

export const ProductList: FC<Props> = ( { products } ) => {
    return (
        <div className="...">
            { products.map( product => <ProductCard key={ product.id } product={ product } /> ) }
        </div>
    );
};
```

En el componente `ProductCard` hacemos la siguiente modificación:

```tsx
import { Card, Image } from "@nextui-org/react";
import { FC } from "react";
import { Product } from "..";

type Props = {
    product: Product;
};

export const ProductCard: FC<Props> = ( { product } ) => {
    return (
        <Card className="...">
            <div className="...">
                <Image src={ product.image }
                    alt="tailwind logo"
                    width={ 300 }
                    height={ 400 }
                    className="..." />
            </div>

            <div className="...">
                <div className="...">
                    <p className="...">{ product.category }</p>
                </div>

                <h3 className="...">
                    { product.title }
                </h3>

                <p className="...">
                    { product.description.slice( 0, 75 ) }...
                </p>

                <p className="...">
                    ${ product.price }<span className="..."> +impuesto</span>
                </p>
            </div>
        </Card>
    );
};
```
