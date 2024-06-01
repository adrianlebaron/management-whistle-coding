1. Abre una terminal de powershell como `administrador`.
-
2. Verfica si los scripts son permitidos:
-
``` yaml title="powershell"
Get-ExecutionPolicy
```

Podría salir `Restricted`, significa que estan restringidos y por eso no te funciona activar tu venv de python cuando corres por ejemplo: `.\env\Scripts\activate`

3. Para cambiarlos a `no restringidos` corre el siguiente comando:
-
``` yaml title="powershell"
Set-ExecutionPolicy Unrestricted

#indicar Sí[S]
```

4. Verifíca de nuevo:
-
``` title="powershell"
Get-ExecutionPolicy
```

Ahora te debería salir `Unrestricted`

Eso indica que ya es posible correr scripts en tu powershell como `.\env\Scripts\activate` exitosamente