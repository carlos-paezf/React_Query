# Sección 05 - Optimizaciones

Aquí veremos puntualmente:

- Pre-fetch de queries
- Establecer data en el caché
- Establecer data en caché específico
- Cargar data bajo demanda
- QueryClient

## QueryClient - prefetchQuery

La idea de este módulo es que podamos pre-cargar la data de una issue al momento de mover el cursor por encima de la tarjeta asignada en la lista de issues, logrando así que la información se muestre "más rápido", aunque es necesario tener en cuenta el limite de peticiones que tenemos disponibles para una API, y a partir de allí determinar que estrategias nos sirven para disminuir el número de peticiones pero fortaleciendo la funcionalidad definida. Una estrategia sería ampliar el tiempo en que la información se considera *fresca*, esto se hace configurando que el tiempo de la propiedad `staleTime` sea mucho mayor al por defecto.

Primero vamos a optimizar un poco la ubicación de las funciones fetcher de nuestra aplicación. En vez de dejarlas en los hooks, las moveremos a una carpeta llamada `api/functions-fetcher` y centralizamos las exportaciones un archivo barril.

Ahora, dentro del componente `<IssueItem />` creamos una instancia del hook `useQueryClient` para hacer uso del contexto del cliente de queries que se proveyó a la aplicación. Definimos una función que nos permita hacer un prefetch de la información de los issues, bajo la misma configuración del nombre del cache que definimos para la consulta normal de una issue. En nuestros fetcher tenemos un delay de n segundos, con el objetivo de simular un retraso en la respuesta de la API, cuando entrabamos a la vista de un issue, debíamos sumar la demora de la carga de la información de la issue junto con el delay del fetch de los comentarios. Con la estrategia que acabamos de implementar, podemos reducir los tiempos de carga logrando que la aplicación le brinde una experiencia más rápida al usuario. Claro esta que si le damos click al issue inmediatamente que pasamos el cursor por encima del mismo, tendremos que aguantar el tiempo de carga.

```tsx
...
import { useQueryClient } from '@tanstack/react-query'
import { fetcherGetIssueInfo } from '../../api/functions-fetcher'
...

export const IssueItem: FC<Props> = ( { issue: { ..., number } } ) => {
    ...
    const queryClient = useQueryClient()

    const onMouseEnter = () => {
        queryClient.prefetchQuery(
            [ "issue", number ],
            () => fetcherGetIssueInfo( number )
        )
    }

    return (
        <div ... onMouseEnter={ onMouseEnter }>
            ...
        </div>
    )
}
```

A continuación podemos observar como mantenemos fresca la información del issue por `5` minutos, pero a su vez hacemos un prefetch de sus comentarios. En teoría, aprovechamos que los issues no se suelen editar constantemente, por lo que nos evitamos su refetch, pero los comentarios si se pueden actualizar con un poco más de constancia, por lo que mantenemos el tiempo de vencimiento de la data:

```tsx
export const IssueItem: FC<Props> = ( { issue: { ..., number } } ) => {
    ...
    const onMouseEnter = () => {
        queryClient.prefetchQuery(
            [ "issue", number ],
            () => fetcherGetIssueInfo( number ),
            {
                staleTime: 1000 * 60 * 5
            }
        )

        queryClient.prefetchQuery(
            [ "issue", number, "comments" ],
            () => fetcherGetIssueComments( number )
        )
    }
    ...
}
```

## QueryClient - setQueryData

Algo que podemos hacer al momento de tener un limite de consultas en una API, es hacer un preset en vez de un prefetch. Básicamente aprovechamos que cuando hacemos una consulta con el listado de issues estamos trayendo la información necesaria para cada una de las issues, por lo tanto no requerimos hacer otra consulta a la API, sino que hacemos uso de la data que se envía por props al componente `<IssueItem />` y la asignamos al cache respectivo del issue, y con ello logramos que al entrar a la vista principal del issue ya se pueda observar la información sin hacer un fetch, solo quedaría traer los comentarios.

Para asignar la data al cache y hacer el preset escribimos el siguiente código:

```tsx
...
export const IssueItem: FC<Props> = ( { issue } ) => {
    const { state, title, number, user, comments } = issue
    ...
    const queryClient = useQueryClient()
    ...
    const preSetData = () => {
        queryClient.setQueryData(
            [ "issue", number ],
            issue
        )
    }

    return (
        <div ... onMouseEnter={ preSetData }>
            ...
        </div>
    )
}
```

Cuando ingresamos a la aplicación y observamos la interacción con la red, podemos observar que se realiza una consulta para obtener todas las issues, y no vuelve a hacer peticiones sino hasta que se ingresa a una issue especifica y se cargan sus comentarios.
