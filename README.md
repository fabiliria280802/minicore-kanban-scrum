# minicore-kanban-scrum

MVP version of a minicore web application that help teams to organize their HUs

### Diagrama de ingeniera

Link: https://drive.google.com/file/d/1g5HUbeq30TZHfMhvyQ3Bis0RwYMtuMIT/view?usp=sharing

el Actor simboliza al usuario que interactúa con el sistema de una aplicación web. La interacción principal es el Login, que es el caso de uso principal y representa el proceso por el cual el usuario intenta acceder al sistema proporcionando sus credenciales de acceso.
<br/><br/>
Si el proceso de login no es exitoso, se desencadena el caso de uso Invalid login. Este escenario podría involucrar mostrar un mensaje de error al usuario o la posibilidad de que el usuario reintente ingresar sus datos.
<br/><br/>
Paralelamente, existe un caso de uso Register, el cual ofrece al usuario la opción de crear una nueva cuenta en caso de que aún no posea una. Este caso de uso es una ruta alternativa al flujo principal de login y es esencial para nuevos usuarios que deseen acceder al sistema.
<br/><br/>
Una vez que el usuario ha ingresado correctamente al sistema, se llega al caso de uso list-task. Este representa las acciones o funcionalidades principales a las que el usuario tiene acceso tras ser autenticado con éxito, como podría ser una lista de tareas pendientes dentro de la aplicación.
<br/><br/>
Las líneas punteadas en el diagrama, etiquetadas como "include", indican que el caso de uso Login es un paso previo necesario para los casos de uso Invalid login, Register, y list-task es la pestaña inmediata que se abre tras un login exitoso. Esto refleja la dependencia de estos casos de uso del proceso de login, siendo este último el punto central a través del cual se accede a las funciones adicionales.
<br/><br/>
En un contexto de aplicación real, el proceso de Login funciona como la verificación inicial de las credenciales del usuario. Si estas no son válidas, se activa el caso de uso Invalid login. Para aquellos usuarios que necesiten crear una cuenta, se dirigirán hacia el caso de uso Register. Y una vez que el usuario está autenticado, puede navegar hacia el caso de uso list-task, que representa el acceso a la funcionalidad clave de la aplicación tras el inicio de sesión.

## Validación por back:

La función loginUser actúa como un controlador en un servidor web, encargado de procesar las solicitudes de inicio de sesión provenientes de los usuarios. Al inicio, la función se encarga de obtener las credenciales de acceso, específicamente el nombre de usuario y la contraseña, directamente del cuerpo de la solicitud enviada al servidor.
<br/><br/>
Con las credenciales en mano, procede a realizar una consulta a la base de datos. En esta consulta, busca en la tabla correspondiente a los usuarios, intentando hallar una entrada que coincida exactamente con el nombre de usuario y la contraseña proporcionados.
<br/><br/>
Si durante la ejecución de la consulta se encuentra con algún error, por ejemplo, un fallo en la conexión con la base de datos, la función reacciona enviando una respuesta al cliente con un código de estado HTTP 500. Este código indica que ha ocurrido un error interno del servidor, y acompaña este estado con un mensaje explicativo que apunta a un problema al consultar la base de datos.
<br/><br/>
En el caso de que la consulta se ejecute sin errores pero no se encuentre ninguna coincidencia para las credenciales proporcionadas, la función interpreta esto como un fallo en la autenticación. Ante esta situación, responde al cliente con un código de estado HTTP 404, que se traduce en un mensaje claro: "Usuario no encontrado o contraseña incorrecta".
<br/><br/>
Cuando la consulta tiene éxito y se identifica al usuario con las credenciales correctas, el sistema pasa a verificar el rol de este dentro de la aplicación. Si el usuario se identifica con el rol de Administrador, la función envía de vuelta al cliente la información del usuario, añadiendo a esta la propiedad isAdmin con un valor de true, lo que indica sus privilegios administrativos.
<br/><br/>
Si el usuario validado no tiene privilegios de administrador, la función aún así devuelve la información del usuario, pero esta vez, la propiedad isAdmin viene con un valor de false, negando el acceso a las funciones administrativas.
<br/><br/>
En esencia, esta función se ocupa no solo de validar las credenciales del usuario sino también de determinar y comunicar si el usuario cuenta con privilegios de administrador, enviando esta información de regreso al cliente que inició la solicitud de inicio de sesión.

## Códigos para probar local

Correr el backend:
```
npm run dev
```

Correr el frontend:
```
ng serve --o
```

## Video explicativo backend

https://clipchamp.com/watch/4gclg5aTy1u

## Reference

https://www.youtube.com/watch?v=2jRYxuuWGFI
https://www.youtube.com/watch?v=ivmY43PdXbw
https://www.youtube.com/watch?v=lxYB79ANJM8