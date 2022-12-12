# Sección 03. React Query - IssuesApp

En esta sección veremos:

- Configuración de React Query
- DevTools
- Caché
  - Fresh
  - Stale
  - Inactive
  - Fetching
- Propiedades como:
  - stale time
  - placeholderData
  - initialDate

La idea es empezar a entrar en el tema con ejercicios reales que nos permitan mejorar enormemente, la experiencia de usuario.

## Inicio del proyecto

Vamos a crear un nuevo proyecto de React con TypeScript usando la herramienta de Vite, para ello usamos el siguiente comando:

```txt
pnpm create vite
```

El nombre del proyecto sera `react-query-issues`, y luego reconstruimos los paquetes de node con el comando `pnpm install`. Para levantar el proyecto usamos el comando `pnpm dev` También vamos a instalar react-router-dom, react-markdown, react-icons y bootstrap con el siguiente comando:

```txt
pnpm i react-router-dom@6 react-markdown react-icons bootstrap@5.2.3 @popperjs/core@^2.11.6
```

Lo primero será crear un archivo de rutas dentro de la carpeta `router`. Definimos las rutas principales y las rutas hijas:

```tsx
import { createBrowserRouter, Navigate } from "react-router-dom"
import GitApp from "../../GitApp"
import { IssueView, ListView } from "../issues/views"


export const router = createBrowserRouter( [
    {
        path: '/issues',
        element: <GitApp />,
        children: [
            { path: 'list', element: <ListView /> },
            { path: 'issue/:id', element: <IssueView /> },
            { path: '*', element: <Navigate to="list" /> }
        ]
    },
    {
        path: '/',
        element: <Navigate to="issues/list" />
    },
    {
        path: '*',
        element: <h1>Not Found</h1>
    }
] )
```

Luego, proveemos las rutas Rutas a todas las aplicaciones dentro del archivo `main.tsx`, de manera que se gestionen las vistas para cada ruta:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'


ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
    <React.StrictMode>
        <RouterProvider router={ router } />
    </React.StrictMode>
)
```

Los demás componentes tienen contenido de manera static, la idea es que más adelante mediante React-Query podamos hacer más dinámica la aplicación.

## Instalación - React Query

Vamos a instalar TanStack React-Query con el siguiente comando:

```txt
pnpm i @tanstack/react-query
```

También vamos a instalar las herramientas de desarrollo que nos permitirá probar nuestra aplicación en modo de desarrollo:

```txt
pnpm i @tanstack/react-query-devtools
```

Una vez tengamos las instalaciones, creamos nuestra instancia cliente y la proveemos a toda la aplicación desde el archivo `main.tsx`:

```tsx
...
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()


ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
    <React.StrictMode>
        <QueryClientProvider client={ queryClient }>
            <RouterProvider router={ router } />
        </QueryClientProvider>
    </React.StrictMode>
)
```

Para hacer uso de las devtools, importamos el componente desde su paquete, y lo incluimos dentro del proveedor del cliente de React Query, de esta manera, podremos hacer seguimiento a la funcionalidad de nuestro cliente en la aplicación:

```tsx
...
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

...
ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
    <React.StrictMode>
        <QueryClientProvider client={ queryClient }>
            <RouterProvider router={ router } />
            <ReactQueryDevtools />
        </QueryClientProvider>
    </React.StrictMode>
)
```

Sabemos que todo va bien, si en la parte inferior izquierda de la aplicación aparece el logo de React Query, y al momento de dar click, se expande un componente de seguimiento de las peticiones.

## Label Issues - Facebook/React

Para esta sección necesitamos la documentación de [Labels API - Github](https://docs.github.com/en/rest/issues/labels?apiVersion=2022-11-28), y además vamos a usar las issues del repositorio [facebook/react](https://github.com/facebook/react/issues).

Comenzamos a crear de manera dinámica los labels en el componente `<LabelPicker />`, y para ello iniciamos creando una query de manera empírica. Creamos un fetcher que se encargue de cargar los labels de repositorio de react, y luego dentro del componente usamos el hook `useQuery`, mediante el cual designamos el nombre del espacio en cache, y pasamos por referencia el fetcher:

```tsx
import { useQuery } from "@tanstack/react-query"


const fetcherGetLabels = async () => {
    const res = await fetch( 'https://api.github.com/repos/facebook/react/labels' )
    return await res.json()
}


export const LabelPicker = () => {
    const labelsQuery = useQuery(
        [ 'labels' ],
        fetcherGetLabels
    )

    return (...)
}
```

## Axios y Tipo de dato LabelType

Vamos a instalar Axios con el siguiente comando:

```txt
pnpm i axios
```

Posteriormente creamos una carpeta llamada `api`, y dentro un archivo con la configuración para la conexión con la API de GitHub.

```ts
import axios from "axios"


export const githubApiClient = axios.create( {
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {}
} )
```

Procedemos a crear un Type para definir el tipo de respuesta de la petición:

```ts
export type LabelType = {
    id: number
    node_id: string
    url: string
    name: string
    color: string
    default: boolean
    description?: string
}
```

Volvemos a nuestro componente de `<LabelPicker />` y reemplazamos nuestra petición con la solicitud get al cliente de axios, y tipando la respuesta de la petición:

```tsx
import { githubApiClient } from "../../api/githubApi"
import { LabelType } from "../types/label"


const fetcherGetLabels = async (): Promise<LabelType[]> => {
    const { data } = await githubApiClient.get<LabelType[]>( '/labels' )
    return data
}
```

Ahora, vamos a reducir la cantidad de peticiones que se realizan a la api, configurando a react-query para que no haga fetch cuando la aplicación vuelva a ser enfocada por el cliente:

```tsx
export const LabelPicker = () => {
    const labelsQuery = useQuery(
        ...,
        {
            refetchOnWindowFocus: false
        }
    )

    return (...)
}
```

## useLabels + useQuery

Procedemos a crear un hook personalizado para controlar la petición que se hace mediante `useQuery`. En este hook almacenamos también el fetcher para la petición:

```tsx
import { useQuery } from "@tanstack/react-query"
import { githubApiClient } from "../../api/githubApi"
import { LabelType } from "../types/label"


const fetcherGetLabels = async (): Promise<LabelType[]> => {
    const { data } = await githubApiClient.get<LabelType[]>( '/labels' )
    return data
}


export const useLabels = () => {
    const labelsQuery = useQuery(
        [ 'labels' ],
        fetcherGetLabels,
        {
            refetchOnWindowFocus: false
        }
    )

    return { labelsQuery }
}
```

Dentro del componente `<LabelPicker />`, llamamos nuestro hook y comenzamos a usar algunas de sus propiedades:

```tsx
import { useLabels } from '../hooks/useLabels'


export const LabelPicker = () => {
    const { labelsQuery: { data, isLoading } } = useLabels()

    if ( isLoading ) return <h1>Loading...</h1>

    return (
        <>
            {
                data?.map( ( { id, color, name } ) => (
                    <span key={ id } className="badge rounded-pill m-1 label-picker"
                        style={ { border: `1px solid #${ color } `, color: `#${ color }` } }>
                        { name }
                    </span>
                ) )
            }

        </>
    )
}
```

Vamos a retrasar un poco la petición creando un helper con un setTimeout:

```ts
export const sleep = ( seconds: number = 1 ): Promise<boolean> => {
    return new Promise<boolean>( ( resolve ) =>
        setTimeout( () => resolve( true ), seconds * 1000 ) )
}
```

```tsx
const fetcherGetLabels = async (): Promise<LabelType[]> => {
    await sleep( 2 )
    const { data } = await githubApiClient.get<LabelType[]>( '/labels' )
    return data
}
```

## Fresh - Fetching - Paused - Stale - Inactive

En el hook del React Query podemos observar los estados del titulo de esta sección. **Fresh** hace referencia a que la data es reciente, es la última información que se ha consultado. **Fetching** se activa cada que se esta trayendo la información. **Paused** permite poner pausa a la petición que se está haciendo, aprovechando que estamos trabajando con promesas. **Stale** es una forma de decir que la data es "vieja" u "obsoleta". **Inactive** es el estado que tiene la información cuando la data no está siendo utilizada en la aplicación. Cuando se hace una petición, la misma cae un estado de *fetching*, pero posteriormente, aunque por un breve tiempo, entra en un estado de *fresh*, y por último al almacenar la información en cache, entonces la información pasa a tener el estado de *stale*.

Podemos configurar que la data se mantenga "fresca" por un tiempo determinado, con el objetivo de evitar un bombardeo de peticiones al endpoint en particular por acciones como enfocar la ventana. Para nuestro caso de las peticiones a GitHub, establecemos que las peticiones se realicen cada hora si no hay solicitud de refrescar por parte del usuario. Esto nos permite que la información se mantenga en el estado de *fetch* y no pase al estado de *stale*, sino dentro de 1 hora.

```tsx
export const useLabels = () => {
    const labelsQuery = useQuery(
        [ 'labels' ],
        fetcherGetLabels,
        {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 60
        }
    )

    return { labelsQuery }
}
```

## Icon Loader

Vamos a crear un nuevo componente que contenga un icono de carga que reemplace la palabra `Loading`, para ello creamos un nuevo componente llamado `LoadingIcon`:

```tsx
import { FaSpinner } from 'react-icons/fa'

export const LoadingIcon = () => <FaSpinner className='loader' />
```

La clase CSS la definimos en `styles.css`:

```css
.loader {
    animation: spin-animation 1.5s infinite linear;
    display: block;
}


@keyframes spin-animation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
```

Lo que resta es llamar este componente en los lugares donde mostramos la carga:

```tsx
import { LoadingIcon } from '../../shared/LoadingIcon'


export const LabelPicker = () => {
    ...
    if ( isLoading ) return <LoadingIcon />
    ...
}
```

## initialData y placeholderData

Vamos a crear una pequeña información que nos sirva de placeholder al momento de cargar la información, para ello, dentro de nuestro hook `useLabels` añadimos una nueva propiedad a la configuración llamada `placeholderData`, y añadimos una información de ejemplo, esto nos permite ver una determinada información durante el estado de `fetching`:

```tsx
export const useLabels = () => {
    const labelsQuery = useQuery(
        ...,
        {
            ...,
            placeholderData: [
                {
                    id: 791921801,
                    node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
                    url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
                    name: "❤️",
                    color: "ffffff",
                    default: false
                },
                {
                    id: 71502270,
                    node_id: "MDU6TGFiZWw3MTUwMjI3MA==",
                    url: "https://api.github.com/repos/facebook/react/labels/Component:%20Build%20Infrastructure",
                    name: "Component: Build Infrastructure",
                    color: "f9d0c4",
                    default: false
                }
            ]
        }
    )

    return { labelsQuery }
}
```

La propiedad `initialData` es similar a `placeholderData`, pero la primera se guarda en cache, por lo que si tenemos configurado que las peticiones automáticas se realicen en un determinado tiempo, entonces la data definida como inicial, sera almacenada en el cache y no se refrescara hasta que se haga una nueva solicitud.
