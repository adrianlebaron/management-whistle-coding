### `NVM (Node Version Manager) para windows` es una herramienta muy útil y necesaria porque tenemos muchos proyectos viejos de `React` que solo funcionan con versiones viejas como 16 o anteriores, y también tenemos otros proyectos que usan versiones más nuevas, esta herramienta te ayudará para instalar y cambiarte de versiones de `node`, y tal vez la uses por otras razones.

# INSTALACION:

1- Ve al repositorio https://github.com/coreybutler/nvm-windows y da click en el boton azul que dice `download now!`

2- Ahi descarga el `.exe` más reciente

3- Abre el archivo ejecutador que has descargado y completa la instalación `Wizard`

4- En una terminal, revisa si se ha instalado correctamente con:

    nvm -v

ó con:

    nvm --version

# USO
1- Puedes enlistar las versiones de `node` que tienes actualmente instaladas en tu computadora con:

    nvm list

Este comando lo puedes ejecutar después de que instales una versión nueva para verificar que sí se instaló

2- Para instalar versiones de node pon la version especifica, con el siguiente comando por ejemplo:

    nvm install 20.10.0

3- Revisa de nuevo si se ha instalado con `nvm list` y te deberia salir la lista de versiones instaladas ahora incluyendo la que acabas de instalar si fue exitosa:

```js
C:\Users\hmanu>nvm list

  * 20.10.0 (Currently using 64-bit executable)
    19.9.0
    18.15.0
    16.20.2
    16.19.0
    15.14.0
    14.21.3
```

4- Para cambiarte de versión usa el siguiente comando especificando la versión a la que te quieres cambiar para que usar:

    nvm use 20.10.0

### Para ver más comandos y demás, ve al repo en la sección de `Usage`: https://github.com/coreybutler/nvm-windows?tab=readme-ov-file