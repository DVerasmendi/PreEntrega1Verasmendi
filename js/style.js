const plans = document.querySelectorAll(".plan");

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    plans.forEach((p) => {
      p.classList.remove("selected");
    });
    plan.classList.add("selected");
    const radioInput = plan.querySelector("input[type='radio']");
    radioInput.checked = true;

    // Mostrar un alert según la selección
    const planValue = radioInput.value.split('|')[0];
    let alertMessage = "";

    switch (planValue) {
      case "Plan Oro":
        Swal.fire({
            icon: 'info',
            title: '<h1 class="titulos_sweet_alert">Plan Oro</h1>',
            html: '<div class="image-container"><img src="../static/img/oro.png" alt="" style="width: 50px;"></div>' +
            '<div class="list-container_plan_alert">'+  
            '<h3 class="title_alert_plans">Beneficios</h3>'+
            '<ul class="list_plan">' +
            '<li>Website dinámica</li>' +
            '<li>Integraciones de pago</li>' +
            '<li>Asesoría en UX/UI</li>' +
            '<li>Asesoría en servers</li>' +
            '<li>Asesoría gratuita por 3 meses</li>' +
            '</ul>'+
            '</div>',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            customClass: {
            confirmButton: 'custom-swal-confirm-button'
            }
          }).then((result) => {
            if (result.isConfirmed) {
              // Acciones adicionales después de hacer clic en OK
            }          
          });
        break;
      case "Plan Plata":
        Swal.fire({
            icon: 'info',
            title: '<h1 class="titulos_sweet_alert">Plan Plata</h1>',
            html: '<div class="image-container"><img src="../static/img/plata.png" alt="" style="width: 50px;"></div>' +
            '<div class="list-container_plan_alert">'+  
            '<h3 class="title_alert_plans">Beneficios</h3>'+
            '<ul class="list_plan">' +
            '<li>Website dinámica</li>' +
            '<li>Integraciones de pago</li>' +
            '<li>Asesoría en UX/UI</li>' +
            '</ul>'+
            '</div>',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            customClass: {
              confirmButton: 'custom-swal-confirm-button'
            }
          }).then((result) => {
            if (result.isConfirmed) {
              // Acciones adicionales después de hacer clic en OK
            }    
          });
        break;
      case "Plan Bronce":
        Swal.fire({
            icon: 'info',
            title: '<h1 class="titulos_sweet_alert">Plan Bronce</h1>',
            html: '<div class="image-container"><img src="../static/img/bronce.png" alt="" style="width: 50px;"></div>' +
            '<div class="list-container_plan_alert">'+  
            '<h3 class="title_alert_plans">Beneficios</h3>'+
            '<ul class="list_plan">' +
            '<li>Website estática</li>' +
            '<li>Asesoría en UX/UI</li>' +
            '</ul>'+
            '</div>',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            customClass: {
              confirmButton: 'custom-swal-confirm-button'
            }
          }).then((result) => {
            if (result.isConfirmed) {
              // Acciones adicionales después de hacer clic en OK
            }    
          });
        break;
    }
  });
});

function calcular_iva(costo) {
    const iva=parseInt(costo*0.19);
    return iva
  }

  function costo_total_proyecto(costo,iva) {
    const costo_total=costo+iva
    return costo_total
  }

function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
const form = document.querySelector(".contacto-formulario");
const plantilla = document.querySelector(".plantilla");
const nombreSpan = document.getElementById("nombre");
const emailSpan = document.getElementById("email");
const planSpan = document.getElementById("plan");
const costoSpan = document.getElementById("costo");
const nombreInput = document.getElementById("name_form");
const emailInput = document.getElementById("email_form");
const fecha_actual = document.getElementById("fecha_actual");
const fecha_valido_hasta = document.getElementById("fecha_valido_hasta");
const costo_iva = document.getElementById("costo_iva");
const costo_total_span = document.getElementById("costo_total_span");
const pais_span = document.getElementById("pais_span");
const num_cotizacion_span = document.getElementById("num_cotizacion");

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    // Actualizar detalles del plan en la plantilla
    const radioInput = plan.querySelector("input[type='radio']");
    planSpan.textContent = radioInput.value.split('|')[0];
    const costo=parseFloat(radioInput.value.split('|')[1]);
    const planInfo = plan.querySelector(".plan-info");



    iva= calcular_iva(costo);
    costo_total=costo_total_proyecto(costo,iva)
    console.log('COSTO:'+costo+' | IVA: '+iva+' | COSTO TOTAL: '+costo_total)
    costoSpan.textContent = costo;
    costo_iva.textContent = iva;
    costo_total_span.textContent = costo_total;
    plan_total_con_iva.textContent=costo_total;
    num_cotizacion_span.textContent = getRandomInt(100, 999);

    // Mostrar la plantilla
    plantilla.style.display = "block";
  });
});


nombreInput.addEventListener("input", () => {
// Actualizar nombre en la plantilla
nombreSpan.textContent = nombreInput.value;
});

emailInput.addEventListener("input", () => {
// Actualizar nombre en la plantilla
emailSpan.textContent = emailInput.value;
});

// Obtener la fecha actual
const fechaActual = new Date();

// Formatear la fecha en el formato deseado
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1;
const año = fechaActual.getFullYear();

const fechaFormateada = `${dia}/${mes}/${año}`;


const fechaFormateada_valida_hasta = `${dia}/${mes+1}/${año}`;
// Actualizar el contenido del span con la fecha formateada
fecha_actual.textContent = fechaFormateada;
fecha_valido_hasta.textContent = fechaFormateada_valida_hasta;

// PARTE BANDERAS
const input = document.getElementById("inputPais");
const select = document.getElementById("selectPais");
const leftRadioButtonsContainer = document.getElementById("leftRadioButtons");
const rightRadioButtonsContainer = document.getElementById("rightRadioButtons");
const form_country = document.getElementById("form_country");

const radioButtons_div = document.getElementById("radioButtons");
radioButtons_div.style.display = "block";

input.addEventListener("input", function () {
const valorInput = input.value.toLowerCase();
radioButtons_div.style.display = "block";
const opcionesFiltradas = Array.from(select.options).filter(function (opcion) {
    return opcion.value.toLowerCase().includes(valorInput);
  });

  // Limpiar los radio buttons previos
  leftRadioButtonsContainer.innerHTML = "";
  rightRadioButtonsContainer.innerHTML = "";

  // Crear y agregar los nuevos radio buttons (máximo 4 opciones)
  var maxOpciones = Math.min(opcionesFiltradas.length, 4);

  for (var i = 0; i < maxOpciones; i++) {
    var opcion = opcionesFiltradas[i];

    var radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "pais";
    radioButton.classList.add("form-check-input");
    radioButton.value = opcion.value;

    var label = document.createElement("label");
    label.textContent = opcion.text;
    label.classList.add("form-check-label");

    var imagen = document.createElement("img");
    imagen.src =
      "https://flagcdn.com/48x36/" +
      opcion.value.toLowerCase() +
      ".png"; // Ajusta la ruta de la imagen según corresponda
    imagen.classList.add("imagen-label");

    label.appendChild(imagen);

    if (i < 2) {
        var leftRadioGroup = document.createElement("div");
        leftRadioGroup.classList.add("form-check");
        leftRadioGroup.classList.add("form-check-inline");
        leftRadioGroup.appendChild(imagen);
        leftRadioGroup.appendChild(radioButton);
        leftRadioGroup.appendChild(label);
        leftRadioButtonsContainer.appendChild(leftRadioGroup);
      } else {
        var rightRadioGroup = document.createElement("div");
        rightRadioGroup.classList.add("form-check");
        rightRadioGroup.classList.add("form-check-inline");
        rightRadioGroup.appendChild(imagen)
        rightRadioGroup.appendChild(radioButton);
        rightRadioGroup.appendChild(label);
        rightRadioButtonsContainer.appendChild(rightRadioGroup);
      }
    }
  
    // Asignar evento de clic a los labels para seleccionar el radio button correspondiente
  // Asignar evento de clic al div que contiene la imagen y el label
  const allDivs = document.querySelectorAll(".form-check-inline");
  allDivs.forEach(function(div) {
    div.addEventListener("click", function() {
        const radioButton = this.querySelector("input[type='radio']");
      if (radioButton) {
        radioButton.checked = true; // Seleccionar el radiobutton al hacer clic en el div
        select.value = radioButton.value; // Asignar el valor del radiobutton al select
        const selectedOption = select.options[select.selectedIndex];
        const selectedText = selectedOption.innerText;
        input.value = selectedText;
        pais_span.textContent = selectedText;
        radioButtons_div.style.display = "none";
      }
    });
  });
  
  });

input.addEventListener("focus", function() {
input.value = ""; // Borrar el contenido del input al hacer clic
});

/*Creacion del array con los diferentes items extras*/
// Array para almacenar elementos seleccionados
document.addEventListener("DOMContentLoaded", function () {
  // Obtén todos los elementos de tipo checkbox en la página
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  // Recorre todos los checkboxes y desmárcalos
  checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
  });
});


// Array para almacenar elementos seleccionados
const selectedItems = [];
let costoPlan = 100; // Precio del plan

// Función para manejar el evento de clic en la casilla de verificación
function handleCheckboxClick(checkbox, costo_total) {
    if (checkbox.checked) {
        // Si se selecciona, agregar al array y sumar 100 al costo total
        selectedItems.push(checkbox.value);
        // Calcular el costo total y actualizarlo
        costo_final_cotizacion=calculateTotalCost_plus(costo_total);
        console.log('SE HA AGREGADO UN NUEVO ITEM: +100 USD | ITEM: '+checkbox.value);
    } else {
        // Si se deselecciona, eliminar del array y restar 100 al costo total
        const index = selectedItems.indexOf(checkbox.value);
        if (index !== -1) {
            selectedItems.splice(index, 1);
            // Calcular el costo total y actualizarlo
            costo_final_cotizacion=calculateTotalCost_menos(costo_total);
            console.log('SE HA ELIMINADO UN ITEM: -100 USD | ITEM: '+checkbox.value);
        }
    }

    // Mostrar los elementos seleccionados en la consola (puedes personalizar esto)
    console.log("Elementos seleccionados:", selectedItems);

    // Actualizar la tabla de cotización
    updateTable(costo_final_cotizacion);
}

// Agregar eventos de clic para todas las casillas de verificación
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
    const costo_total_act = document.getElementById("costo_total_span").textContent;
    handleCheckboxClick(checkbox, costo_total_act);
    });
});

// Función para actualizar la tabla de cotización con elementos seleccionados
function updateTable(costo_final_cotizacion) {
    // Obtener el elemento de la tabla de cotización
    const cotizacionTable = document.getElementById("cotizacion_table");

    // Eliminar solo las filas previamente agregadas para los elementos seleccionados
    const selectedRows = document.querySelectorAll('.selected-row');
    selectedRows.forEach((row) => {
        cotizacionTable.removeChild(row);
    });

    // Agregar filas para los elementos seleccionados
    selectedItems.forEach((item) => {
        const newRow = document.createElement("tr");
        newRow.classList.add('selected-row'); // Agregar clase para identificar las filas seleccionadas
        newRow.style.backgroundColor = "#212529";
        newRow.innerHTML = `
            <td>1</td>
            <td>${item}</td>
            <td style="text-align: right;"><p><span>81</span> USD</p></td>
            <td style="text-align: right;"><p><span>19</span> USD</p></td>
            <td style="text-align: right;"><p><span>100</span> USD</p></td>
        `;
        cotizacionTable.appendChild(newRow);
    });

    // Mostrar el costo del plan en la tabla
     const costo_total_span = document.getElementById("costo_total_span");
    costo_total_span.textContent = costo_final_cotizacion;
    console.log('VALOR FINAL COTIZACION:'+costo_final_cotizacion);
    costo_total_span.textContent = costo_final_cotizacion.toFixed(2);
}

// Funcionnes para calcular el costo total
function calculateTotalCost_plus(costo_total) {
    let costo_final = parseFloat(costo_total)+ 100;
    return costo_final
}
function calculateTotalCost_menos(costo_total) {
  let costo_final = parseFloat(costo_total)- 100; 
  return costo_final
}


/* CLICK AL BOTON ENVIAR */
var boton_enviar_cotizacion = document.getElementById("boton_enviar_cotizacion");
boton_enviar_cotizacion.addEventListener("click", () => {
    var tipo_plan = document.getElementById("plan").textContent;

if (nombreInput.value!='' && emailInput.value!=''  && inputPais.value!=''){
  // //Class
      class Cliente{
      constructor(nombre, email, pais){
          this.nombre=nombre;
          this.email=email;
          this.pais=pais;
          this.cotizado=false;
      }
      //metodos
      enviar_cotizacion(){
          this.cotizado=true;
      }
      aumentarPrecio(porcentaje){
          this.precio=this.precio * porcentaje;
      }
      }
      const client=new Cliente(nombreInput.value, emailInput.value, pais_span.textContent);
      client.enviar_cotizacion();
      console.log(client);

    Swal.fire({
        icon: 'success',
        title: '<h1 class="titulos_sweet_alert">Cotización a enviar</h1>',
        html: '<div class="image-container"><img src="../static/img/contento.png" alt="" style="width: 50px;"></div>' +
        '<div class="list-container_plan_alert">'+  
        '<h3 class="title_alert_plans">' + tipo_plan + '</h3>'+
        '<p>Nombre: ' + client.nombre + '</p>'+
        '<p>Email: ' + client.email + '</p>'+
        '<p>Pais: ' + client.pais + '</p>'+
        '</div>',
        showCancelButton: false,
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        customClass: {
        confirmButton: 'custom-swal-confirm-button'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // Acciones adicionales después de hacer clic en OK
        }
    });
}
else{
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar todos los datos del formulario para poder cotizar.',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-swal-confirm-button'
        }
      });
}
  });
// //Class
// class Computadora{
//     constructor(tipo, marca, precio){
//         this.tipo=tipo;
//         this.marca=marca;
//         this.precio=precio;
//         this.vendido=false;
//     }
//     //metodos
//     venderCompu(){
//         this.vendido=true;
//     }
//     aumentarPrecio(porcentaje){
//         this.precio=this.precio * porcentaje;
//     }
// }

// const compu1=new Computadora('Desktop', 'Generica', 1000);
// const compu2=new Computadora('Notebook', 'Apple', 2000);
// const compu3=new Computadora('Desktop', 'HP', 1500);

// console.log(compu2);

// compu3.venderCompu();

// console.log(compu3);

// let aumento = parseInt(prompt('Ingresa el aumento que quieres aplicar'));
// compu1.aumentarPrecio(1+(aumento/100));

// console.log('Precio actualizado: U$'+compu1.precio);