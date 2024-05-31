## Borrar una rama local
- Querrás borrar una rama local por alguna razón u otra. O por la razón de que **las ramas de desarrollo** son "desechables" y es molesto tener una lista muy larga de ramas antiguas no usadas, tal vez querremos eliminarlas para que no se acumulen

1. Podemos borrar ramas locales con el comando:

        git branch --delete nombre-de-la-rama

## Como arreglar problema de carpetas o archivos no ignorados que sí queremos ignorar 
2. Hay muchos tipos de archivos y carpetas que no debemos subir a **Github** como _pycache_, node_modules, entornos virtuales de python, etcetera, los cuales debemos agregar a un archivo llamado **.gitignore** antes de hacer un commit y empujarlo por primera vez. Pero hay muchas ocasiones en las que eso ya sucedió y esos archivos y/o carpetas ya estan en git y github y por esa razón no estan siendo ignorados por el .gitignore. Cómo arreglamos esto y podemos hacer que ahora sí sean ignorados? Sí deberás agregar correctamente esos archivos y carpetas al .gitignore y luego correo el comando:

        git rm --cached /nombre-de-la-carpeta-o-archivo

## Sobre creación de ramas, puedes hacerlo de 2 maneras
1. Puedes crear tu rama en github, como en el ejemplo de la imagen abajo, dice crear rama desde main, esto significa que intencionalmente estoy primero posicionado en `main` y luego en ese campo "busco" o creo la nueva rama que aun no existe y me da el boton para crearla.

- Despues de crearla, regresa a la terminal de tu proyecto y correo este comando para que Git identifique la nueva rama que acabas de crear en Github

        git fetch

- Y luego ya que reconozca la nueva rama, te puedes cambiar a esa rama con el comando:

        git checkout nombre-de-tu-nueva-rama

2. La otra manera es crear la rama en la terminal tambien tomando en cuenta desde cual rama la crearás que será en la que estés posicionado en el momento y puedes checar en qué rama estas primero al ver el nombre de la rama en la esquina de la pantalla de VS Code o con el comando que da más certeza porque a veces no se refresca el nombre de la rama en VS Code.

Este comando te mostrará de color verde y con un * la rama en la que estás

        git branch

- Ahora sí puedes crear una nueva rama a partir de esta rama actual y al mismo tiempo te cambiarás a esa rama. con:

        git checkout -b nombre-de-tu-nueva-rama

- Nota que este comando para crear una nueva rama debe tener la bandera `-b`