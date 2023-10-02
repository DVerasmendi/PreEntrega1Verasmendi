Hola! Mi nombre es Deiker Verasmendi, y este es mi proyecto final de JS.


La primeras 3 preentregas de mi proyecto se basaron en construir el simulador de cotización para proyectos webs, para la última entrega realice lo siguiente.

Cree un pequeño backend basado en el framework Flask de Python, este framework permite realizar peticiones restAPI entre el frontend y el backend de python.


En el frontend (html y js) de mi app de flask esta la implementación de la api de Mercado Pago, todo esta en version TEST.

El archivo principal donde se hace el llamado de la api de mercado pago se llama MP.html (ubicación: ProyectoFinalVerasmendi\backend\templates\mp.html), aca se hacen los diferentes fetch hacia el backend de mercadopago (Para solicitar el form de pago, ya que mercado pago para proteger la info del cliente no me permite acceder a estos datos, por ello, se hace la llamada de este form en un iframe) y mi backend, a su vez se trabaja con JSON . Todo lo que se solicitaba para la ultima entrega.

Preferí hacer esta implementacion para evitar seguir cargando mi cotizador de proyectos, y de igual forma poder usar esta pasarela de pago para futuros proyectos. 

De esta forma puedo llamar todas las veces que quiera este portal de pago desde cualquier pagina que desarrolle, unicamente pasandole los parametros por POST necesarios para que mercado pago y mi api se integren sin problemas.


- Para acceder via web a mi aplicación de cotizador pueden ingresar a:  https://ddbcotizador.cloudaustro.com/
- Para consultar si la API creada en el backend esta corriendo de forma exitosa pueden ingresar a:  https://mpfront.cloudaustro.com/

Tanto el cotizador como el Flask fueron levantados en contenedores de docker, en ubuntu. 
Para la pagina web del cotizador use un server Nginx en un contenedor.
Para el Flask utilice un contenedor basado en python 3.7.6.


Las tarejas que pueden usar para probar esta integración son las siguientes:

PAGO APROBADO : 
5416 7526 0258 2580	
11/25
123
cardholder: APRO
documento: otro
id:123456789

PAGO RECHAZADO : 
5416 7526 0258 2580	
11/25
123
cardholder: OTHE
documento: otro
id:123456789