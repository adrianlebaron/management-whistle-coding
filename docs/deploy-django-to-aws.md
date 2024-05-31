## 1. Instalación de la interfaz de línea de comandos de elastic beanstalk AWS EB CLI
Instalala globalmente en tu computadora abriendo cualquier terminal

    pip install awsebcli

Para comprobar la instalación de la CLI y ver que funciona corre:

    eb --version

Te debería salir la versión que tienes, por ejemplo:

    EB CLI 3.20.8

## 2. Inicializa tu aplicación en Elastic Beanstalk usando la CLI
- Deberás tener un usuario IAM con los permisos correctos para poder tener acceso a desplegar aplicaciones a Elastic Beanstalk, debes tener a la mano la **_Access Key ID_** y la **_Secret Access Key_**, contacta al project manager si necesitas crear un usuario, o solo obtener los permisos correctos.
- Ahora abre tu aplicacion de django en tu editor de código (VS Code) y abre ahí una terminal en la carpeta raíz del proyecto del backend de django, a la altura dónde se encuentra el archivo _manage.py_ corre el siguiente comando para inicializar una nueva aplicación en Elastic Beanstalk en AWS, a partir de este comando te preguntará muchas cosas a las que tendrás que responder con teclas al escoger las opciones deseadas

        eb init

- Lo primero que te preguntará es en cuál región quieres tenerla, elige la opción de: us west 2 Oregon con el numero correcto, casi siempre es la opción número 3

- Si es la primera vez que despliegas una aplicación, aquí te pedirá tus credenciales de AWS mencionadas al principio de esta sección número 2

- Detectará que estás usando Python, responde Sí, luego tienes que seleccionar una versión de plataforma, puedes elegir la más reciente

- Elige Sí para SSH (secure shell conection)

- Luego necesitas generar un RSA Keypair, que te permitirá acceder a la SSH más adelante.

- Hasta este punto ya habrás creado una aplicación nueva en Elastic Beanstalk, puedes verla en la consola de AWS en Elastic Beanstalk accediendo con tu usuario, contraseña y el ID del equipo (pregunta al project manager si no sabes cual es)

## 3. Crea el Entorno para la aplicación
- Regresa a la terminal en VS code posicionado en la carpeta raiz del proyecto de django como lo estabas antes y corre el siguiente comando para crear el entorno de tu aplicación:

        eb create

- Te hará varias preguntas también, 

- La primera es el prefijo del dominio predeterminado que te da Elastic Beanstalk con la palabra -dev al final pero mejor crea uno sin la palabra dev para que se vea mejor, como el nombre de la aplicacion en sí, ejemplo: `lebaron-today`

- La segunda pregunta es seleccionar el tipo de `load balancer`, hay tres: `classic, application, network`, elige el de `application`

- La tercera es: Quieres habilitar `Spot Fleet requests` para el entorno? elige que no

- Esto tomará un rato, y si el entorno de la aplicación se creó exitosamente con todo lo demás en AWS, aparecerá esto en la terminal:
![](https://i.imgur.com/ZHg9b91.png)

## 4. Personaliza y configura el proyecto de Django
- De aquí en adelante tedrás que configurar varias cosas en el proyecto de Django como en carpetas y archivos, después también configurar el mismo entorno en la `consola de Elastic Beanstalk`. Primero configuremos el proyecto de Django y luego el entorno en la consola de Elastic Beanstalk.

- Deberás instalar una lista o serie de dependencias necesarias para producción en tu entorno virtual de python activado: **_boto3, psycopg, django-storages_** después de instalar todo lo necesario para producción crea un nuevo requirements.txt por buena práctica, con el comando:

        pip freeze > requirements.txt

### En **_SETTINGS.PY_** haz lo siguiente:
- Cambia `DEBUG = True` a `DEBUG = False`
- En `ALLOWED_HOSTS` agrega el dominio predeterminado que creó Elastic Beanstalk para tu entorno que es como algo asi: `nombre-de-tu-aplicacion.us-west-2-elasticbeanstalk.com` y agrega el dominio que el project manager comprará y que utilizará tu backend.
- En `DATABASES`  agrega el siguiente bloque de código:

```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['RDS_DB_NAME'],
        'USER': os.environ['RDS_USERNAME'],
        'PASSWORD': os.environ['RDS_PASSWORD'],
        'HOST': os.environ['RDS_HOSTNAME'],
        'PORT': os.environ['RDS_PORT'],
    }
}
```

- Luego agrega el siguiente bloque de código para configurar los archivos estáticos que usará Elastic Beanstalk con el Bucket de S3 usando la dependencia de Boto3, puedes agregar este bloque de código arriba de la sección del código de STATIC FILES:

``` py linenums="1" title="settings.py"
if 'AWS_STORAGE_BUCKET_NAME' in os.environ:
    STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

    AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
    AWS_S3_REGION_NAME = os.environ['AWS_S3_REGION_NAME']

    AWS_S3_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
    AWS_S3_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
```
### Crea nueva carpeta y archivos:
- En la carpeta raíz de tu proyecto de Django crea una carpeta llamada `.ebextensions` con dos archivos dentro llamados: `01_packages.config` y `02_django.config`.
- Dentro de `01_packages.config` pon:

```js
packages:
    yum:
        git: []
        postgresql15: []
```
- Dentro de `02_django.config` pon el siguiente bloque de código, pero debes cambiar las líneas de código: `WSGIPath... y DJANGO_SETTINGS_MODULE:` al nombre correcto de tu proyecto de django porque es la ruta hacia la application y hacia el archivo settings

```js
option_settings:
    aws:elasticbeanstalk:container:python:
//CAMBIA CONDE DICE backend AL NOMBRE DE TU PROYECTO DE DJANGO// ↓
        WSGIPath: backend.wsgi:application
    aws:elasticbeanstalk:application:environment:
//CAMBIA CONDE DICE backend AL NOMBRE DE TU PROYECTO DE DJANGO// ↓
        DJANGO_SETTINGS_MODULE: backend.settings
    aws:elasticbeanstalk:environment:proxy:staticfiles:
        /static: static

container_commands:
    01_migrate:
        command: "source /var/app/venv/*/bin/activate && python3 manage.py migrate --noinput"
        leader_only: true
    02_collectstatic:
        command: "source /var/app/venv/*/bin/activate && python3 manage.py collectstatic --noinput"
        leader_only: true
```

- Los comandos de `01_migrate` y `02_collectstatic` son para migrar la base de datos de producción al hacer el deploy y aplicar los archivos estaticos y de estilos:

## 5. Personaliza y configura el entorno en Elastic Beanstalk y sus servicios relacionados

- Primero configura la base de datos en la sección de **_ Networking and database_** (Esto creará su respectiva base de datos en el servicio de AWS RDS Relational Data Base)
    1. Selecciona Engine: postgres
    2. Engine version la mas reciente
    3. Instance class db.t3.micro
    4. Storage 10 GB
    5. El usuario puede permanecer ebroot y créale una contraseña que recuerdes
    6. Guarda los cambios y revisa que se actualice exitosamente el entorno

- Esta sección es para que la aplicación de Django esté en HTTPS en internet y se requerirá que ya esté comprado el dominio que se usará para esta aplicación de django, si no está comprado todavía, contacta al project manager y omite estos siguientes pasos: 
    1. Ve al servicio de AWS llamado **_Certificate Manager_** y obtén un nuevo certificado SSL para el dominio, solo tienes que poner el dominio correctamente y dejar las validaciones como están por DNS

    2. Luego entra en el certificado que acabas de solicitar que está en estatus pendiente, y da click en el botón de **_Create records in Route 53_** y después de esto el estatus cambiará a Issued en color verde y estará listo para usarse en el entorno de Elastic Beanstalk

    3. De regreso en Elastic Beanstalk, en **_Configure instance traffic and scaling_** en la sección de **_Listeners_** agrega un nuevo puerto 443 protocolo HTTPS para que sea seguro y selecciona el certificado que acabas de solicitar

    4. En **_Route 53_** en la ruta hospedada de tu dominio de backend agrega un registro tipo A que sea alias y agrega tu entorno de Elastic Beanstalk para que dirija el tráfico a ese dominio correctamente, sin este registro el dominio no hospedará tu aplicación de Django como esperas.

- Agrega 5 **_Environment Properties_** en **_Updates, monitoring, and logging_** a mero abajo:
    1. AWS_ACCESS_KEY_ID para esta crea un usuario con el nombre descriptivo de tu aplicacion ya que solo será usado para acceder al bucket de S3 de tu aplicacion, crealo en IAM con permiso AmazonS3FullAccess y creale a ese usuario Access key para que obtengas la Access key y la Secret Key para ponerlas en las variables de entorno.
    2.  AWS_SECRET_ACCESS_KEY el valor de esta es el del mismo usuario que creaste
    3.  AWS_S3_REGION_NAME debería ser la región del bucket que tienes que crear en S3 créalo en la región de Oregon y el valor para esta variable será us-west-2 El bucket debe estar configurado de la siguiente manera: quita la checkbox de Block all public access y todo lo demas igual y crealo con un nombre descriptivo sobre la aplicacion de elastic beanstalk
    4.  AWS_STORAGE_BUCKET_NAME el nombre del bucket que acabas de crear

- Después de tener todo tu proyecto correctamente configurado para producción, despliega una nueva actualizacion a Elastic Beanstalk, los deploys se hacen desde el último commit, así que haz un commit con:

        git add .

        git commit -m "tu mensaje"

- Ahora sí haz un deploy de actualización del entorno con:

        eb deploy

- Revisa:
    1. que se haya hecho el despliegue de actualización de manera exitosa al entorno de la aplicación de Elastic Beanstalk en la terminal de da el resultado, si falló consulta los `logs` que se encuentran en le panel del entorno de Elastic Beanstalk, descarga y ve los ultimos 100 y mira la sección de eb-engine. Si aun sigues batallando con el error del despliegue contacta al project manager para que te ayude.

    2. Revisa en el entorno en la console de Elastic Beanstalk que se haya creado la Path /static con el Directory static

## 6. Crea un superusuario usando SSH
- En la terminal de tu proyecto corre el comando `eb ssh` que te llevará a la Secure Shell conection de Amazon para poder correr comandos de python para por ejemplo crear el super usuario!
    1.  corre el siguiente comando:

            sudo cat /opt/elasticbeanstalk/deployment/env
    
    2. Luego correo el siguiente

            export $(sudo cat /opt/elasticbeanstalk/deployment/env | xargs)

    3. luego corre para encontrar la carpeta de proyecto

            sudo find / -iname "nombre-de-tu-proyecto"

    4. Entra a la carpeta de tu proyecto con

            cd /var/app/current/

    5. y ya corre el comando para crear el super usuario con su contraseña, con este usuario podrás acceder al panel de admin de django en tu sitio desplegado

            /var/app/venv/staging-LQM1lest/bin/python manage.py createsuperuser

Listo! todo debería estar listo para tu aplicación django servida en Elastic Beanstalk de AWS.