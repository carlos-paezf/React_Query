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
