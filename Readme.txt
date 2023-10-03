Hola! Mi nombre es Deiker Verasmendi, y este es mi proyecto final de JS.

Siguiendo la pauta de mi corrección anterior, el uso de LocalStorage si esta funcionando, pero solo en firefox, no se porque razón en chrome no me esta funcionando , incluso probe en modo incognito y nada, en firefox funciona en modo incognito y modo normal, posiblemente sea por politicas de bloqueo que cada navegador usa según su config o algo asi estuve investigando. 

Adjunto capturas de pruebas en chrome y firefox.

Chrome: Modo normal :https://prnt.sc/-WvUvcTWneZ1  Modo incognito : https://prnt.sc/n_6pOjgEdZV7

Firefox: Modo normal: https://prnt.sc/IlejkqQZdtPr Modo incognito : https://prnt.sc/mT3Xm65kPFFu

La primeras 3 preentregas de mi proyecto se basaron en construir el simulador de cotización para proyectos webs, para la última entrega realice lo siguiente.

Cree un pequeño backend basado en el framework Flask de Python, este framework permite realizar peticiones restAPI entre el frontend y el backend de python.


En el frontend (html y js) de mi app de flask esta la implementación de la api de Mercado Pago, todo esta en versión TEST.

El archivo principal donde se hace el llamado de la api de mercado pago se llama mp.js (ubicación: ProyectoFinalVerasmendi\backend\static\js_login\mp.js), acá se hacen los diferentes fetch hacia el backend de mercadopago (Para solicitar el form de pago, ya que mercado pago para proteger la info del cliente no me permite acceder a estos datos, por ello, se hace la llamada de este form en un iframe) y mi backend, a su vez se trabaja con JSON.

Preferí hacer esta implementacion para evitar seguir cargando mi cotizador de proyectos, y de igual forma poder usar esta pasarela de pago para futuros proyectos. 

De esta forma puedo llamar todas las veces que quiera este portal de pago desde cualquier pagina que desarrolle, únicamente pasándole los parametros por POST necesarios para que mercado pago y mi api se integren sin problemas.


- Para acceder via web a mi aplicación de cotizador pueden ingresar a:  https://ddbcotizador.cloudaustro.com/
- Para invocar la parte de pago debe presionar el boton de pagar cotización : https://prnt.sc/9s1k3PyGa_Fu
- Para consultar si la API creada en el backend esta corriendo de forma exitosa pueden ingresar a:  https://mpfront.cloudaustro.com/

Tanto el cotizador como el Flask fueron levantados en contenedores de docker, en server ubuntu. 
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