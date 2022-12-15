# Sección 07 - Paginaciones

Esta sección tiene por objetivo aprender:

1. Paginación tradicional
    - Siguiente página
    - Página anterior
    - Número de página
    - Caché por página y condiciones
2. Infinite Scroll
    - Cargar siguientes registros
    - Manejar caché del infinite scroll

## Estructura HTML necesaria

Antes de pasar a la programación de la nueva funcionalidad, vamos a implementar un pequeño diseño de dos botones y una etiqueta span, que nos sirva de base para las demás secciones:

```tsx
export const ListView = () => {
    ...
    return (
        <div className="row mt-5">
            <div className="col-8">
                ...
                <div className='d-flex mt-2 justify-content-between'>
                    <button className="btn btn-outline-primary">Prev</button>
                    <span>123</span>
                    <button className="btn btn-outline-primary">Next</button>
                </div>
            </div>
            ...
        </div>
    )
}
```

## Paginación - Next y Prev

En la función fetcher de las issues, vamos a hacer dinámico el número de la página, por lo que debemos recibirla por props:

```ts
interface Props {
    labels: string[]
    state?: StateType
    page: number
}

export const fetcherGetIssues = async ( { labels, state, page }: Props ): Promise<IssueType[]> => {
    ...
    params.append( 'page', page.toString() )
    ...
}
```

Luego, dentro del custom hook que definimos para nuestro listado de issues, vamos a crear un estado que controle el número de la página, además de que será exportado como getter junto a la propiedad del query y a los setters de las funciones que se encargan de incrementar o disminuir el valor del estado:

```tsx
export const useIssues = ( { labels, state }: Props ) => {
    const [ page, setPage ] = useState( 1 )

    const issuesQuery = useQuery(
        [ 'issues', { labels, state, page } ],
        () => fetcherGetIssues( { labels, state, page } ),
        ...
    )

    const nextPage = () => {
        if ( !issuesQuery.data?.length ) return

        setPage( page + 1 )
    }

    const prevPage = () => {
        if ( page <= 1 ) return

        setPage( page - 1 )
    }

    return { issuesQuery, page, nextPage, prevPage }
```

De regreso al componente de `<ListView />` desestructuramos las propiedades que retornamos del hook, y hacemos uso de las mismas en las secciones que se requieren.

```tsx
export const ListView = () => {
    ...
    const { ..., page, nextPage, prevPage } = useIssues( ... )
    ...
    return (
        <div ...>
            <div ...>
                {
                ...
                <div ...>
                    <button ... onClick={ prevPage }>Prev</button>
                    <span>{ page }</span>
                    <button ... onClick={ nextPage }>Next</button>
                </div>
            </div>
            ...
        </div>
    )
}
```

## Optimizaciones y validaciones

Es posible que el usuario nos "bombardee" con peticiones ya seas al next o al previous, lo que haremos será bloquear los botones mientras se hacen las peticiones, para lo cual haremos lo siguiente:

```tsx
export const ListView = () => {
    ...
    const { issuesQuery: { ..., isFetching }, ... } = useIssues( ... )
    ...
    return (
        <div ...>
            <div ...>
                ...
                <div className='d-flex mt-2 justify-content-between'>
                    <button ... disabled={ isFetching }>Prev</button>
                    ...
                    <button ... disabled={ isFetching }>Next</button>
                </div>
            </div>
            ...
        </div>
    )
}
```

Otra optimización será la de mostrar un mensaje en vez del número de la página al momento en que se está cargando la consulta, para lo cual modificamos el hook cuando retorna el getter de la página de la siguiente manera:

```tsx
export const useIssues = ( { labels, state }: Props ) => {
    ...
    return {
        ..., // properties
        page: issuesQuery.isFetching ? 'Loading' : page, // getters
        ... // setters
    }
}
```

Hay un bug al momento de seleccionar un label o cambiar de estado (abierto, cerrado), ya que el número de página no se resetea. Para solucionar esto, incluimos un `useEffect` dentro del hook para que restaure el estado de la paginación cada que cambie el state o los labels:

```tsx
import { useState, useEffect } from 'react'

export const useIssues = ( { labels, state }: Props ) => {
    ...
    useEffect( () => {
        setPage( 1 )
    }, [ state, labels ] )
    ...
}
```

Una nueva funcionalidad sería desactivar los botones de prev y next en otros casos especiales, por ejemplo:

```tsx
export const ListView = () => {
    ...
    return (
        <div ...>
            <div ...>
                ...
                <div ...>
                    <button ... disabled={ isFetching || page <= 1 }>Prev</button>
                    ...
                    <button ... disabled={ isFetching || !data || data?.length < 5 }>Next</button>
                </div>
            </div>
            ...
        </div>
    )
}
```

## Preparación para el infinite scroll

Para evitar complicaciones o confusión dentro del proyecto, hice una copia del proyecto dentro del cual aplicaré la estrategia del infinite scroll. Lo primero será reemplazar los botones de prev y next por un botón de load more:

```tsx
export const ListView = () => {
    ...
    return (
        <div ...>
            <div ...>
                ...
                <button className="btn btn-outline-primary mt-3" disabled={ isFetching }>Load more...</button>
            </div>
            ...
        </div>
    )
}
```
