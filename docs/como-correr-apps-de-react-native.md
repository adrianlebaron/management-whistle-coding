- Primero, nstalar `node_modules` con:

        npm install

- Luego, instalar todo con:

        npx expo install

- Ahora, corre el servidor local de expo con:

        npx expo start --go

- Para poder acceder debes temporalmente borrar `"projectId":"..."` del archivo `app.json`, pero si al final vas a subir commits de cambios, vuelve a poner el `"projectId":"..."` como estaba al principio.

- El servidor del backend debe correr con:

        py manage.py runserver 0.0.0.0:8000

- Debes tener instalada en tu celular la app de `Expo` y con ella escanea código QR que sale en la terminal.