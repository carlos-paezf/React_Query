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

