### NVM (Node Version Manager) es una herramienta muy útil y necesaria porque tenemos muchos proyectos viejos de React que solo funcionan con versiones viejas como 16 o anteriores, y también tenemos otros proyectos que usan versiones más nuevas, esta herramienta te ayudará para instalar y cambiarte de versiones de node, y tal vez la uses por otras razones.

# INSTALACION
1- para instalar o actualizar `nvm`, corre uno de estos dos comandos:

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

ó:

    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

El comando que elijas descargará y correrá un **`script`**, este clona el repositorio de nvm en **`~/.nvm`** e intentará agregar las **`source lines`** del siguiente snippet al archivo correcto del perfil **(`~/.bash_profile`, `~/.zshrc`, `~/.profile`, o `~/.bashrc`)**

 ```js
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

2- Para verificar que se instaló corre:

    command -v nvm

## Para solucionar problemas ve a:
https://github.com/nvm-sh/nvm/tree/v0.39.7?tab=readme-ov-file#troubleshooting-on-macos

# USO
Ve al enlace de abajo para ver los distintos comandos para usarla como: instalar y usar versiones especificas, ver la lista de versiones que tienes instaladas, etc:
https://github.com/nvm-sh/nvm/tree/v0.39.7?tab=readme-ov-file#usage