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
            ...
            <div className='d-flex mt-2 justify-content-between'>
                <button className="btn btn-outline-primary">Prev</button>
                <span>123</span>
                <button className="btn btn-outline-primary">Next</button>
            </div>
            ...
        </div>
    )
}
```
