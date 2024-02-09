# Sección 09: Mutaciones

Esta sección tiene por objetivo lo siguiente:

- Aprender sobre mutaciones
- Mutaciones optimistas
- Manejo de errores
- Actualizar e invalidar data
- Establecer data en caché manualmente después de la mutación
- Eliminación en caso de fallo en una actualización optimista

Inicialmente, se explicará la forma tradicional simple de hacer uso del useMutation, pero luego lo expandiremos para tener mutaciones optimistas que darán una experiencia de usuario muy buena y dar la apariencia de que su aplicación literalmente no tiene demora en las peticiones http.
