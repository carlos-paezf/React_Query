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
