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
