# Sección #06 - Objetos completos como cache name

Esta sección está enfocada en poder construir nombres de caché complejos para manejar posibles variaciones de nombres. Por ejemplo:

Buscar por varios labels + estado abierto o cerrado debería ser igual sin importar el orden de los factores.

Hasta el momento, hemos visto una única forma de nombrar el caché, la cual está bien, **pero si tenemos varios factores que pueden variar y queremos que sea insensible a su posición**, hay consideraciones diferentes, eso es lo que veremos en esta sección.

## Manejar el estado de Open, Closed y All

Para manejar estos estados, debemos tener muy presente el enum `StateType` que hemos definido en nuestro tipos.

```ts
export enum StateType {
    Open = "open",
    Closed = "closed"
}
```

Lo siguiente será hacer una modificación en las props del componente `<IssueList />`, puesto que ahora necesitamos saber si nos comparten un estado y la función designada para su cambio. Aplicamos un un condicional para las clases de los anchor tag que nos permiten cambiar el estado de filtro de las issues, además, mediante la función que se envía por parámetro, determinados por cual estado se debe hacer el filtro de la lista:

```tsx
type Props = {
    issues: IssueType[]
    state?: StateType,
    onStateChange: ( state?: StateType ) => void
}


export const IssueList: FC<Props> = ( { issues, state, onStateChange } ) => {
    return (
        <div ...>
            <div ...>
                <ul ...>
                    <li className="nav-item">
                        <a className={ `nav-link ${ !state ? 'active' : '' }` }
                            onClick={ () => onStateChange() }>All</a>
                    </li>

                    <li className="nav-item">
                        <a className={ `nav-link ${ state === StateType.Open ? 'active' : '' }` }
                            onClick={ () => onStateChange( StateType.Open ) }>Open</a>
                    </li>

                    <li className="nav-item">
                        <a className={ `nav-link ${ state === StateType.Closed ? 'active' : '' }` }
                            onClick={ () => onStateChange( StateType.Closed ) }>Closed</a>
                    </li>
                </ul>
            </div>
            ...
        </div>
    )
}
```

En el componente padre nos encargamos de enviar las props al componente hijo de la siguiente manera:

```tsx
export const ListView = () => {
    ...
    const [ state, setState ] = useState<StateType>()
    ...
    return (
        <div ...>
            <div ...>
                {
                    isLoading
                        ? <LoadingIcon />
                        : <IssueList issues={ data || [] } state={ state } onStateChange={ ( newState ) => setState( newState ) } />
                }
            </div>
            ...
        </div>
    )
}
```

## Filtrar Issues - Open y Closed

Debemos enviar el estado y los labels a nuestro custom hook `useIssues` con el fin de realizar la consulta a la api. Lo primero será modificar nuestro hook para que reciba las props, a partir de las cuales usamos sus propiedades para ampliar el nombre del cache procurando que sin importar el orden que se envíen las propiedades se pueda ubicar el cache designado y no tenga que crear otro espacio en cache, para ello definimos los elementos dentro del nombre como un objeto. También debemos enviar los elementos que recibimos como argumentos a la función fetcher:

```tsx
type Props = {
    labels: string[]
    state?: StateType
}

export const useIssues = ( { labels, state }: Props ) => {
    const issuesQuery = useQuery(
        [ 'issues', { labels, state } ],
        () => fetcherGetIssues( labels, state ),
        ...
    )
    ...
}
```

La función fetcher recibirá los argumentos de la siguiente manera:

```ts
export const fetcherGetIssues = async ( labels: string[], state?: StateType ): Promise<IssueType[]> => {...}
```

Dentro de nuestro componente `<ListView />` enviamos los elementos solicitados y que van cambiando de acuerdo a la selección del cliente:

```tsx
export const ListView = () => {
    ...
    const { issuesQuery: { isLoading, data } } = useIssues( { labels: selectedLabels, state } )
    ...
}
```

Volviendo a nuestra función fetcher, vamos a configurar la consulta para filtrar las issues a partir de su estado. Creamos una constante para las params de la consulta, y añadimos el estado si este es diferente a undefined:

```ts
export const fetcherGetIssues = async ( labels: string[], state?: StateType ): Promise<IssueType[]> => {
    ...
    const params = new URLSearchParams()

    if ( state ) params.append( 'state', state )

    const { data } = await githubApiClient.get<IssueType[]>( '/issues', { params } )
    return data
}
```

## Filtrar Issues - Labels

Para hacer la consulta de las issue por los labels, la documentación de GitHub nos solicita que los enviamos separados por comas, por lo tanto, dentro de nuestro fetcher escribiremos las siguientes líneas de código:

```ts
export const fetcherGetIssues = async ( labels: string[], state?: StateType ): Promise<IssueType[]> => {
    ...
    if ( labels.length ) {
        params.append( 'labels', labels.join( ',' ) )
    }
    ...
}
```

Otro parámetro que enviaremos en la url será la página a mostrar y cantidad de resultados por página:

```ts
export const fetcherGetIssues = async ( labels: string[], state?: StateType ): Promise<IssueType[]> => {
    ...
    params.append( 'page', '1' )
    params.append( 'per_page', '5' )
}
```

Vamos a mostrar los labels de las issues desde el componente `<IssueItem />`:

```tsx
export const IssueItem: FC<Props> = ( { issue } ) => {
    ...
    return (
        <div ...> 
            <div ...>
                ...
                <div ...>
                    ...
                    <div>
                        {
                            issue.labels.map( label =>
                                <span key={ label.id }
                                    className="badge rounded-pill m1"
                                    style={ { background: `#${ label.color }`, color: 'black' } }>
                                    { label.name }
                                </span>
                            )
                        }
                    </div>
                </div>
                ...
            </div>
        </div>
    )
}
```
