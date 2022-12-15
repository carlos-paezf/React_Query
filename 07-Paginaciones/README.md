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
