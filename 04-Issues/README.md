# Sección 04 - Issues

Esta sección está dedicada a la carga de los issues y sus comentarios, la idea es aprender cómo manejar el caché, segmentarlo y ordenarlo para mejor lectura y comprensión.

Lo que será de mucha utilidad cuando queramos realizar cargas por adelantado de nuestras peticiones HTTP.

## Autenticación en GitHub

Vamos a ampliar la cuota que nos ofrece la API de GitHub, para lo cual iremos a la siguiente dirección: [Fine-grained personal access tokens](https://github.com/settings/tokens?type=beta), y generamos un nuevo token con la configuración por defecto de la mayoría de los elementos, excepto en la sección **Permisos**, en donde buscamos la opción de **Interaction limits** y seleccionamos *Access: Read-only*. Procedemos a generar y copiar el token dentro de una variable de entorno o podemos hacerlo dentro de la configuración de nuestro cliente a la api de GitGub:

```ts
export const githubApiClient = axios.create( {
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer <token>'
    }
} )
```

En estos momentos está ocurriendo un error con el endpoint para cargar los labels al momento de enviar la petición con el token. Para saltarnos este error, podemos aplicar la siguiente configuración:

```ts
const fetcherGetLabels = async (): Promise<LabelType[]> => {
    ...
    const { data } = await githubApiClient.get<LabelType[]>( '/labels', {
        headers: {
            Authorization: null
        }
    } )
    ...
}
```

## Cargar Issues de GitHub

Vamos a cargar las issues mediante un [endpoint](https://api.github.com/repos/facebook/react/issues). Lo primero será crear un custom hook similar al creado para los labels  (la interfaz para el tipo fue creada a partir de la respuesta que se generó cuando se hizo una petición al endpoint, luego mediante la extensión **Paste JSON as Code** se simplifico el trabajo de creación de interfaces):

```tsx
import { useQuery } from "@tanstack/react-query"
import { githubApiClient } from "../../api/githubApi"
import type { IssueType } from "../types"


const fetcherGetIssues = async (): Promise<IssueType[]> => {
    const { data } = await githubApiClient.get<IssueType[]>( '/issues' )
    return data
}


export const useIssues = () => {
    const issuesQuery = useQuery(
        [ 'issues' ],
        fetcherGetIssues
    )

    return { issuesQuery }
}
```

Este hook que acabamos de crear lo vamos a usar dentro del componente `<ListView />` con el objetivo de temporalmente verlo en dicha página en la sección de React Query:

```tsx
export const ListView = () => {
    ...
    const { issuesQuery } = useIssues()
    ...
}
```

## Mostrar issues en pantalla

Vamos a usar las propiedades `isLoading` y `data` de la query que definimos para las issues, esto con el fin de mostrar el icono de carga mientras se trae la información, y enviamos la data que se consulta mediante props.

```tsx
...
import { useIssues } from '../hooks'


export const ListView = () => {
    ...
    const { issuesQuery: { isLoading, data } } = useIssues()
    ...
    return (
        <div className="row mt-5">
            <div className="col-8">
                {
                    isLoading
                        ? <LoadingIcon />
                        : <IssueList issues={ data || [] } />
                }
            </div>

            ...
        </div>
    )
}
```

Claramente debemos definir los props dentro del componente de la lista de issues:

```tsx
import { FC } from "react"
import type { IssueType } from "../types"

type Props = {
    issues: IssueType[]
}

export const IssueList: FC<Props> = ( { issues } ) => {
    return (
        <div className="card border-white">
            ...

            <div className="card-body text-dark">
                {
                    issues.map( issue => <IssueItem key={ issue.id } /> )
                }
            </div>
        </div>
    )
}
```

Lo siguiente será personalizar cada tarjeta de Issues a partir de la información que se recorre desde el componente anterior:

```tsx
import { FC } from 'react'
import { FiCheckCircle, FiInfo, FiMessageSquare } from 'react-icons/fi'
import { IssueType, State } from '../types'

type Props = {
    issue: IssueType
}

export const IssueItem: FC<Props> = ( {
    issue: {
        state, title, number, user, comments
    }
} ) => {
    return (
        <div className="card mb-2 issue">
            <div className="card-body d-flex align-items-center">
                {
                    state === State.Open
                        ? <FiInfo size={ 30 } color="red" />
                        : <FiCheckCircle size={ 30 } color="green" />
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{ title }</span>
                    <span className="issue-subinfo">#{ number } opened 2 days ago by <span className="fw-bold">{ user.login }</span></span>
                </div>

                <div className="d-flex align-items-center">
                    <img src={ user.avatar_url } alt="User Avatar" className="avatar" />
                    <span className="px-2">{ comments }</span>
                    <FiMessageSquare />
                </div>
            </div>
        </div>
    )
}
```
