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

## Navegar y cargar issue por número

Vamos a implementar una nueva pantalla que cargue la información de un issue de manera independiente. Para implementar esta funcionalidad vamos a hacer uso del hook `useNavigate` de react-router-dom:

```tsx
...
import { useNavigate } from 'react-router-dom'

export const IssueItem: FC<Props> = ( { issue: { number, ... } } ) => {
    const navigate = useNavigate()

    return (
        <div ... onClick={ () => navigate( `/issues/issue/${ number }` ) }>
            ...
        </div>
    )
}
```

Al momento que nosotros presionamos la tarjeta, vamos a navegar a una nueva pantalla, pero a su vez podemos observar que React Query nos marca como inactiva la información que tenemos almacenada en la cache, puesto que no está siendo usada en la generación de los componentes de la nueva vista. Luego de 5 minutos de inactividad eliminará la información, liberando memoria.

Dentro de nuestro componente de `<IssueView />` hacemos uso del parámetro que se ingresa desde la url para poder hacer una búsqueda mediante la API. Pero, primero necesitamos crear un customHook que nos permita hacer la petición, en este caso tenemos una pequeña diferencia al momento de llamar el fetcher ya que este recibe un valor por parámetro, por lo tanto ya no podemos invocar la función por referencia:

```tsx
import { useQuery } from "@tanstack/react-query"
import { IssueType } from "../types"
import { githubApiClient } from '../../api/githubApi'
import { sleep } from "../../helpers/sleep"

const fetcherGetIssue = async ( issueNumber: number ): Promise<IssueType> => {
    await sleep( 2 )
    const { data } = await githubApiClient.get<IssueType>( `/issues/${ issueNumber }` )
    return data
}

export const useIssue = ( issueNumber: number ) => {
    const issueQuery = useQuery(
        [ `issue`, issueNumber ],
        () => fetcherGetIssue( issueNumber )
    )

    return { issueQuery }
}
```

Regresamos al componente de la vista principal de la incidencia y obtenemos el parámetro de la url para enviarlo a nuestro custom hook:

```tsx
import { ..., useParams } from "react-router-dom"
import { useIssue } from "../hooks"


export const IssueView = () => {
    const { id = '0' } = useParams()

    const { issueQuery } = useIssue( Number( id ) )
    ...
}
```

## Información del Issue

Dentro de la vista principal del Issue vamos a cargar la información referente al mismo. Lo primero será definir si se está cargando la data, en cuyo caso se debe mostrar el icono de carga, posteriormente evaluamos que si no hay data, se debe navegar a la página anterior (si se ingresa mál en número de la issue, React Query hará una serie de peticiones, pero si persiste el error, efectuará lo que definamos, en este caso ir atrás). El primero comentario del issue será la información del mismo, por lo que le enviamos la información obtenida de la consulta al primer `<IssueComment />`

```tsx
import { Link, Navigate, useParams } from "react-router-dom"
import { LoadingIcon } from "../../shared/LoadingIcon"
import { IssueComment } from '../components'
import { useIssue } from "../hooks"


export const IssueView = () => {
    const { id = '0' } = useParams()

    const { issueQuery: { isLoading, data } } = useIssue( Number( id ) )

    if ( isLoading ) return <LoadingIcon />

    if ( !data ) return <Navigate to="./issues/list" />

    return (
        <div className="row mb-5">
            <div className="col-12 mb-3">
                <Link to="./issues/list">Go Back</Link>
            </div>

            <IssueComment issue={ data } />
        </div>
    )
}
```

El componente `<IssueComment />` se encarga de renderizar la información referente al issue o a un comentario.

```tsx
import { FC } from "react"
import ReactMarkdown from 'react-markdown'
import { IssueType } from "../types"

type Props = {
    issue: IssueType
}

export const IssueComment: FC<Props> = ( { issue: { user, body } } ) => {
    return (
        <div className="col-12">
            <div className="card border-white mt-2">
                <div className="card-header bg-dark">
                    <img src={ user.avatar_url } alt="User Avatar" className="avatar" />
                    <span className="mx-2">{ user.login } commented</span>
                </div>

                <div className="card-body text-dark">
                    <ReactMarkdown>{ body }</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}
```

React Query nos permite almacenar la información de las consultas en cache, logrando así que sea más rápida la consulta de los elementos y en caso de actualización, el usuario tenga la última información que se había mostrado mientras aplica el fetch.
