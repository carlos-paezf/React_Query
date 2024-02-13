# Sección 09: Mutaciones

Esta sección tiene por objetivo lo siguiente:

- Aprender sobre mutaciones
- Mutaciones optimistas
- Manejo de errores
- Actualizar e invalidar data
- Establecer data en caché manualmente después de la mutación
- Eliminación en caso de fallo en una actualización optimista

Inicialmente, se explicará la forma tradicional simple de hacer uso del useMutation, pero luego lo expandiremos para tener mutaciones optimistas que darán una experiencia de usuario muy buena y dar la apariencia de que su aplicación literalmente no tiene demora en las peticiones http.

## Continuación

Vamos a continuar con el proyecto de la sección anterior, por lo tanto, podemos copiar los proyectos front y back de la sección anterior. Para levantar el frontend usamos el comando `npm run dev` y para el proyecto back podemos usar `pnpm start`.

## React Hook Form

Vamos a usar el paquete React Hook Form, pero debemos tener en cuenta la complejidad al manejar inputs de una librería de terceros. Para hacer la instalación del paquete, usaremos el siguiente comando:

```txt
$: npm install react-hook-form
```

Dentro del componente `NewProduct` vamos a añadir el siguiente código:

```tsx
import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


type FormInputsType = {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};


export const NewProductPage: FC = () => {
    const { control, handleSubmit } = useForm<FormInputsType>();

    const onSubmit: SubmitHandler<FormInputsType> = ( data ) => { ... };

    return (
        <div ... >
            ...
            <form ... onSubmit={ handleSubmit( onSubmit ) }>
                <div ... >
                    <div ... >
                        ...
                        <Button type="submit" ... >Crear</Button>
                    </div>
                    ...
                </div>
            </form>
        </div>
    );
};
```

Ahora, vamos a añadir los controles a los inputs:

```tsx
export const NewProductPage: FC = () => {
    ...
    return (
        <div ... >
            ...
            <form className="w-full" onSubmit={ handleSubmit( onSubmit ) }>
                <div ... >
                    <div ... >
                        <Controller control={ control } name="title" rules={ { required: true } } render={ ( { field } ) =>
                            <Input value={ field.value } onChange={ field.onChange } ... />
                        } />


                        <Controller control={ control } name="price" rules={ { required: true } } render={ ( { field } ) =>
                            <Input value={ field.value?.toString() } onChange={ field.onChange } ... />
                        } />

                        <Controller control={ control } name="image" rules={ { required: true } } render={ ( { field } ) =>
                            <Input value={ field.value } onChange={ field.onChange } ... />
                        } />

                        <Controller control={ control } name="description" rules={ { required: true } } render={ ( { field } ) =>
                            <Textarea value={ field.value } onChange={ field.onChange } ... />
                        } />

                        <Controller control={ control } name="category" rules={ { required: true } } render={ ( { field } ) =>
                            <select value={ field.value } onChange={ field.onChange } ... >
                                ... 
                            </select>
                        } />
                        ...
                    </div>
                    ...
                </div>
            </form>
        </div>
    );
};
```
