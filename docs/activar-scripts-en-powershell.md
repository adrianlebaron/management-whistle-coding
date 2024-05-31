1- Abrir una terminal de powershell como admin.
--------------------------------------------------

2- Verficar si los scripts son permitidos:
---------------------------------------------

```js
Get-ExecutionPolicy
```

Deberia salir «Restricted» que son restringidos

3- Cambiar configuracion:
------------------------------

```js
#comando para activar scripts:

Set-ExecutionPolicy Unrestricted

#indicar Si[S]
```

4- verficar:
-------------

```js
Get-ExecutionPolicy
```

Deberia salir «Unrestricted»

Eso indicaria que ya es posible correr scripts en tu powershell