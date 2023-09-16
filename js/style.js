const plans = document.querySelectorAll(".plan");
plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    plans.forEach((p) => {
      p.classList.remove("selected");
    });
    plan.classList.add("selected");
    const radioInput = plan.querySelector("input[type='radio']");
    radioInput.checked = true;

    // Mostrar un alert según la seleccion
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

  // Filtra las opciones del select por el texto
  const opcionesFiltradas = Array.from(select.options).filter(function (opcion) {
    return opcion.text.toLowerCase().includes(valorInput);
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
let costoPlan = 100; // Precio del item extra
// Funcion para manejar el evento de clic en la casilla de verificacion
function handleCheckboxClick(checkbox, costo_total) {
    const selectedItem = selectedItems.find((item) => item === checkbox.value);
    if (checkbox.checked && !selectedItem) {
        // Si se selecciona y no existe en el array, agregar al array y sumar 100 al costo total
        selectedItems.push(checkbox.value);
        costo_final_cotizacion = calculateTotalCost_plus(costo_total);
        console.log('SE HA AGREGADO UN NUEVO ITEM: +100 USD | ITEM: ' + checkbox.value);
    } else if (!checkbox.checked && selectedItem) {
        // Si se deselecciona y existe en el array, eliminar del array y restar 100 al costo total
        selectedItems.splice(selectedItems.indexOf(selectedItem), 1);
        costo_final_cotizacion = calculateTotalCost_menos(costo_total);
        console.log('SE HA ELIMINADO UN ITEM: -100 USD | ITEM: ' + checkbox.value);
    }

    // Mostrar los elementos seleccionados en la consola (puedes personalizar esto)
    console.log("Elementos seleccionados:", selectedItems);

    // Actualizar la tabla de cotizacion
    updateTable(costo_final_cotizacion);

    // Mantener el retorno
    return costo_final_cotizacion;
}

// Agregar eventos de clic para todas las casillas de verificacion
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        const costo_total_act = document.getElementById("costo_total_span").textContent;
        const costo_final = handleCheckboxClick(checkbox, costo_total_act);
        return costo_final;
    });
});

// Funcion para actualizar la tabla de cotizacion con elementos seleccionados
function updateTable(costo_final_cotizacion) {
    // Obtener el elemento de la tabla de cotizacion
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
    console.log('VALOR FINAL COTIZACION:' + costo_final_cotizacion);
    costo_total_span.textContent = costo_final_cotizacion.toFixed(2);
}

// Funcionnes para calcular el costo total
function calculateTotalCost_plus(costo_total) {
    let costo_final = parseFloat(costo_total) + 100;
    return costo_final;
}
function calculateTotalCost_menos(costo_total) {
    let costo_final = parseFloat(costo_total) - 100;
    return costo_final;
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
        title: '<h1 class="titulos_sweet_alert">Cotizacion a enviar</h1>',
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
 /////////  STORAGE /////////////
// Define la constante nuevaCotizacion con valores iniciales
const nuevaCotizacion = {
  nombre: '',
  email: '',
  plan: '',
};
// Funcion para actualizar nuevaCotizacion
function actualizarCotizacion() {
  // Obtén los valores actuales del nombre, email y plan
  const nombreInput = document.getElementById('name_form').value;
  const emailInput = document.getElementById('email_form').value;
  const planSeleccionado = document.querySelector('input[type="radio"][name="plan"]:checked');
  // Verifica si se ha seleccionado un plan
  if (planSeleccionado) {
    // Divide el valor del plan seleccionado para obtener el nombre
    const [planName] = planSeleccionado.value.split('|');
    // Actualiza la propiedad "plan" en nuevaCotizacion
    nuevaCotizacion.plan = planName;
  }
  // Actualiza las propiedades de nuevaCotizacion
  nuevaCotizacion.nombre = nombreInput;
  nuevaCotizacion.email = emailInput;
  // Imprime nuevaCotizacion en la consola
  console.log('nuevaCotizacion:', nuevaCotizacion);
  // Llama a la funcion para guardar en el localStorage
  guardarCotizacionEnLocalStorage();
}
// Funcion para observar cambios en el DOM
function observarCambiosDOM() {
  const nombreInput = document.querySelector('.main-containers__right-input[placeholder="Full name"]');
  const emailInput = document.querySelector('.main-containers__right-input[placeholder="Email Address"]');
  // Configura el observador para los cambios en el contenido de los elementos input
  const observer = new MutationObserver(() => {
    actualizarCotizacion();
  });

  // Observa los input de nombre y email
  observer.observe(nombreInput, { characterData: true, subtree: true });
  observer.observe(emailInput, { characterData: true, subtree: true });
}

// Llama a la funcion observarCambiosDOM para comenzar a observar cambios en el DOM
observarCambiosDOM();

// Funcion para guardar nuevaCotizacion en el localStorage
function guardarCotizacionEnLocalStorage() {
  // Convierte la cotizacion a formato JSON y guárdala en el localStorage
  localStorage.setItem('cotizacion', JSON.stringify(nuevaCotizacion));
}

// También puedes cargar los datos del usuario al cargar la página
window.addEventListener('load', function() {
  const cotizacionGuardada = localStorage.getItem('cotizacion');
  if (cotizacionGuardada) {
    const cotizacionParseada = JSON.parse(cotizacionGuardada);
    // Rellena los campos del formulario con los datos del usuario
    document.querySelector('.main-containers__right-input[placeholder="Full name"]').value = cotizacionParseada.nombre;
    document.querySelector('.main-containers__right-input[placeholder="Email Address"]').value = cotizacionParseada.email;
      // Verifica si se selecciono un plan anteriormente y marca el radio correspondiente
  radio_correspondiente= cotizacionParseada.plan;
  // Obtén todos los elementos de radio con el nombre "plan"
const radioButtons = document.querySelectorAll('input[type="radio"][name="plan"]');

// Recorre los radio buttons y busca una coincidencia en el valor
radioButtons.forEach(function(radioButton) {
  const [planName] = radioButton.value.split('|'); // Obtiene el nombre del plan del valor
  // Compara el plan guardado con el plan del radio button
  if (radio_correspondiente === planName) {
    planNames=planName.toLowerCase().split(' ')[1];
    // Obtén los divs
    const divs = document.querySelectorAll('div');
    // Recorre los divs
    divs.forEach((div) => {
      // Compara el ID del div con el texto
      if (div.id == planNames) {
        // Si coincide, agrega una clase nueva
        radioButton.checked = true; // Marca el radio button si hay coincidencia
        div.classList.add('plan', 'selected');
      }
    });
  }
});
  }
});

// Obtén todos los elementos de radio con el nombre "plan"
const radioButtons = document.querySelectorAll('input[type="radio"][name="plan"]');

// Agrega un evento change a cada radio
radioButtons.forEach(function(radioButton) {
  radioButton.addEventListener('change', function() {
    // Llama a la funcion para actualizar la cotizacion cuando se cambia la seleccion del plan
    actualizarCotizacion();
  });
});
// Llama a la funcion actualizarCotizacion inicialmente para capturar los valores iniciales
actualizarCotizacion();