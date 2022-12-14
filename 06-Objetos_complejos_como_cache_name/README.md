# Sección #06 - Objetos completos como cache name

Esta sección está enfocada en poder construir nombres de caché complejos para manejar posibles variaciones de nombres. Por ejemplo:

Buscar por varios labels + estado abierto o cerrado debería ser igual sin importar el orden de los factores.

Hasta el momento, hemos visto una única forma de nombrar el caché, la cual está bien, **pero si tenemos varios factores que pueden variar y queremos que sea insensible a su posición**, hay consideraciones diferentes, eso es lo que veremos en esta sección.
