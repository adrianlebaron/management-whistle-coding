Para trabajar en aplicaciones de Django es necesario configurar un entorno virtual de python (venv: virtual environment) *Esta guía es para Windows*

1- Siguiero que lo crees asi: Con tu proyecto de Django abierto en tu editor de código, abre una terminal posicionado en la carpeta raíz del proyecto, una buena práctica es que esté ignorado en .gitignore para que tu entorno no se suba al repo de github, y buenos nombres son venv, env o myenv, crea el entorno virtual con el comando:

nombre sugerido para el entorno virtual: ( env o venv )

```js
py -m venv nombreDeTuEntorno
```

2-  (Debes tener los Scripts de tu computadora habilitados para activarlo)
Para activar el venv ejecuta el comando:

```js
.\nombreDeTuEntorno\Scripts\activate
```

3- Si se activó, debe verse el (nombreDeTuEntorno) entre parentesis a la izquierda de la ruta de tu terminal.
Ahora instala las dependencias del proyecto una por una como veas que vayas necesitando, de esa manera agrega el nombre de la dependencia despues de install en el comando, o si el proyecto tiene buena documentacion deberá tener un archivo requirements.txt:

```js
pip install -r requirements.txt
```