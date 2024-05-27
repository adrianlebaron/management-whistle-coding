<ul>
<li style="font-size: 22px; font-wegth:bold;">(Components)</li>


En la carpeta principal de nuestro proyecto, llamada 'src', creamos una carpeta especial llamada components. Esta carpeta es como nuestra caja de herramientas, donde guardamos los componentes principales y esenciales de nuestra aplicación. Estos componentes son como las herramientas que usamos para construir nuestra aplicación.

Por ejemplo, imaginemos que uno de nuestros componentes principales es el encabezado de nuestra página, que llamamos Header.js. Este componente podría contener el logotipo y la barra de navegación de nuestra aplicación. Otro componente esencial podría ser el pie de página, que llamamos Footer.js, que incluye información de contacto y enlaces importantes.

La ventaja de tener estos componentes en una carpeta dedicada es que se vuelven fácilmente accesibles y reutilizables en toda la aplicación. Si necesitamos usar el encabezado en una página o pantalla diferente, simplemente podemos llamar al archivo ( Header.js ) desde la carpeta de componentes, como si estuviéramos tomando una herramienta de nuestra caja de herramientas. Esto hace que nuestro código sea más legible y fácil de mantener para nosotros y para cualquier persona que trabaje en el proyecto.

Ejemplo:

```js 
|-- components/
|   |-- Header.js
|   |-- Footer.js
|   |-- ...
|
```
</ul>

<ul>
       <li style="font-size: 22px; font-wegth:bold;">(Pages)</li>


En nuestra aplicación,a detro de la carpeta 'src' la carpeta pages cumple un papel fundamental. Aquí es donde almacenaremos cada página de nuestro componente principal, como por ejemplo el login, registro y página principal (home). Cada una de estas páginas tendrá su propia carpeta dentro de pages(resaltando que solo se creara en caso de ser nesesario en caso contrario no dejar carpteas vacias), con el mismo nombre que la página correspondiente.

Por ejemplo, para la página de inicio de sesión (login), tendríamos una estructura así:

```js 
pages/
|
|---login/
|    |--Login.js
     | // Otros archivos relacionados con el login
     |--components/
     |    // Componentes específicos del login
     |
     |--services/
     |   // Servicios relacionados con el login
     |
     |--hooks/
     |  // Hooks personalizados para el login
     |
     |--styles/
     | // Estilos específicos del login
     | 
     |--utilities/
     |  // Utilidades relacionadas con el login    
```

De esta manera, cada página tiene su propia estructura organizada.

Es importante destacar que esta organización ayuda a mantener el código limpio y fácil de mantener, ya que cada parte de la aplicación está claramente separada y etiquetada según su función.


</ul>


<li style="font-size: 22px; font-wegth:bold;">Estructura Basica react js: </li>

```js
src/
|-- components/
|   |-- Header.js
|   |-- Footer.js
|   |-- ...
|
|-- pages/
|   |-- Home/
|   |   |-- Home.js
|   |   |-- components/
|   |   |    |-- HomeHeader.js
|   |   |-- hooks/
|   |   |    |-- useTop.js
|   |   |-- styled-components/
|   |   |    |-- Home.css
|   |   |    |-- ...
|   |-- Login/
|   |   |-- Login.js
|   |   |-- components/
|   |   |    |-- LoginForm.js
|   |   |-- hooks/
|   |   |    |-- useTop.js
|   |   |-- styled-components/
|   |   |    |-- Login.css
|   |
|   |-- Register/
|       |-- Register.js
|       |-- components/
|       |    |-- RegisterForm.js
|       |-- hooks/
|       |    |-- useTop.js
|       |-- styled-components/
|            |-- Register.css
|
|-- store/
|   |-- actions/
|   |   |-- actionTypes.js
|   |   |-- userActions.js
|   |   |-- ...
|   |
|   |-- reducers/
|   |   |-- userReducer.js
|   |   |-- ...
|   |
|   |-- store.js
|
|-- styles/
|   |-- GlobalStyles.js
|   |-- theme.js
|   |-- ...
|
|-- hooks/
|   |-- useCustomHook.js
|   |-- ...
|
|-- utils/
|   |-- api.js
|   |-- helpers.js
|   |-- ...
|
|-- App.js
|-- index.js

```