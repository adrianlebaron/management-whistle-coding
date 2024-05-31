En un proyecto de `react + vite` el comando predeterminado para iniciar el servidor local es `npm run dev`, este inicia el servidor local en `http://localhost:5173`, y se ve asi en la terminal:

```js
npm run dev

> frontend@0.0.0 dev
> vite

  VITE v5.2.6  ready in 361 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

 Ahí es donde accederás en tu computadora para trabajar en tu aplicación localmente, pero muchas veces nos es necesario ver la aplicación local desde nuestro celular también, para eso tenemos que acceder a ella en el mismo puerto `5173` pero en lugar de http://localhost, debe ser nuestra IPv4 address, y la podemos conocer con el comando:

    ipconfig

este comando imprimirá en la terminal mucha información, solo tienes que encontrar la IPv4 address que esta abajo.

ahora sí en el navegador de tu celular puedes tratar de ir a tu direccion `IPv4:puerto` estando conectado a la misma red wifi a la que está tu computadora, por ejemplo `192.168.0.0:5173` pero el problema aquí es que en realidad no funcionará aún, esto es porque la configuración de vite solo permite a la computadora acceder al localhost pero no a ningún otro dispositivo como tu celular, para eso solo tienes que agregar --host al script de `package.json` como lo decía la pista al principio ↑

Agrega --host en package.json a `{"scripts":{"dev":"vite"}}` así:

```js
{
................
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
 .................
  },
```