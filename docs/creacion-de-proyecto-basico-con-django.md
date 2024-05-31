1. Instalar Django globalmente:
-----------------------------------

Si no tienes activados tus scripts de tu powershell seguir estos pasos :(https://managewhistle.com/posts/39)

Si aún no tienes Django instalado globalmente, puedes hacerlo ejecutando el siguiente comando en tu terminal. Se recomienda instalar la versión LTS (Long Term Support) de Django para mayor estabilidad y mantenimiento a largo plazo:

Ejemplo:

```js
pip install django==4.2.10
```

2. Crear un nuevo proyecto Django:
-----------------------------------------

Empezaremos creando un nuevo proyecto nos ubicaremos en la carpeta que deseamos guardar nuestro proyecto abriremos una (Cmd) desde la carpte donde lo almacenaremos y ejecutamos este comando:

```js
django-admin startproject myproject
```
Donde (myproject) es el nombre de tu proyecto.


3. Instalar y configurar un entorno virtual:
----------------------------------------------

Al crear nuestro proyecto en la consola escribiremos este comando abrira nuestro projecto en un visual code:

```js
C:\Users\Programacion> code myproject
```

Estando en la carpeta principal de nuestro projecto crearemos nustro entorno virtual,
Es una buena práctica utilizar un entorno virtual para cada proyecto de Django. Esto te permite aislar las dependencias de cada proyecto y evitar conflictos entre ellas:

```js
myproject
|
|
|--myproject
|  |--__pycache__/
|  |--__init__.py
|  |--asgi.py
|  |--settings.py
|  |--urls.py
|  |--wsgi.py
|  
|--env
|  |--include
|  |--Lib
|  |--Scripts
|  |  |--activate
```

Instalación de virtualenv:

```js
pip install virtualenv
```

Creación de un entorno virtual:

En Windows::

```js
python -m venv env
```

En macOS:

```js
python3 -m venv env
```

Donde (env) es el nombre que le quieres dar a tu entorno virtual.

Activación del entorno virtual:

En Windows:

```js
.\env\Scripts\activate
```

En macOS:

```js
source  env/bin/activate
```

4. Ejecutar el servidor de desarrollo y instalar django en entrno virtual:
-----------------------------------------------------------------------------

primero despues de que el etorno este activo al deve inicar con (env) eh istalaremos django:

```js
(env) PS C:\Users\Programacion\myproject> pip install django==4.2.10
```
Despues de instalar django corrermos en nustro servidor de desarollo con el siguiente comando:

```js
 python manage.py runserver
```

Esto iniciará el servidor de desarrollo en http://127.0.0.1:8000/. Puedes abrir este enlace en tu navegador para ver la página de inicio de Django.

5. Crear una aplicación:
--------------------------

Las aplicaciones en Django son módulos reutilizables que realizan funciones específicas. Para crear una aplicación, puedes ejecutar el siguiente comando en el directorio de tu proyecto:

```js
python manage.py startapp myapp
```

Donde myapp es el nombre de tu aplicación.

6. Configurar la aplicación en el proyecto:
----------------------------------------------

Después de crear la aplicación, debes agregarla al archivo settings.py de tu proyecto. Busca la lista INSTALLED_APPS y agrega el nombre de tu aplicación:

```js
INSTALLED_APPS = [
    ...
    'myapp',
]
```


```js
myproject
|
|--myproject
|  |--__pycache__/
|  |--__init__.py
|  |--asgi.py
|  |--settings.py
|  |--urls.py
|  |--wsgi.py
|  
|--env
```

7. Crear modelos, vistas y plantillas:
-----------------------------------------

Puedes comenzar a desarrollar tu aplicación creando modelos, vistas y plantillas según sea necesario para tu proyecto.


8. Ejecutar migraciones:
---------------------------

Después de definir tus modelos, necesitas ejecutar las migraciones para aplicar estos cambios a tu base de datos:

```js
python manage.py makemigrations
python manage.py migrate
```

9. Crear un superusuario:
-----------------------------

Para acceder al panel de administración de Django ( http://127.0.0.1:8000/admin/), necesitas crear un superusuario, detendremos nuestro server de desarollo en  nustra terminal con (CTRL + C) para ejecutar este comando:

```js
python manage.py createsuperuser
```

Sigue las instrucciones en pantalla para completar la creación del superusuario.

¡Listo! Ahora has configurado y comenzado un proyecto Django básico. Puedes comenzar a desarrollar tu aplicación según tus necesidades.