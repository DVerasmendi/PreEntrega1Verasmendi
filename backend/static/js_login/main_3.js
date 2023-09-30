const tarjeta = document.querySelector('#tarjeta'),
	  btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
	  contenedor = document.querySelector('.contenedor'),
	  div_form_principal = document.querySelector('#div_form_principal'),

	  form_checkout= document.querySelector('#form_checkout'),


	  numeroTarjeta = document.querySelector('#tarjeta .numero'),
	  nombreTarjeta = document.querySelector('#tarjeta .nombre'),
	  logoMarca = document.querySelector('#logo-marca'),
	  firma = document.querySelector('#tarjeta .firma p'),
	  mes_ano = document.querySelector('#tarjeta .mes_ano'),
	  ccv = document.querySelector('#tarjeta .ccv');


// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active');
	}
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	div_form_principal.classList.toggle('active');
	formulario_clase = document.querySelector('#div_form_principal').classList.value;
	if (formulario_clase =='div_form_principal active'){
		div_form_principal.style.display = "block";
		//console.log('ABRE el form');

			// OBTENER INPUTS 
			var inputs = div_form_principal.getElementsByTagName('input');
			// Obtener el primer input dentro del div
			var input_cardname = inputs[0];
			// * Input nombre de tarjeta
			input_cardname.addEventListener('keyup', (e) => {
			let valorInput = e.target.value;
			input_cardname.value = valorInput.replace(/[0-9]/g, '');
			nombreTarjeta.textContent = valorInput;
			firma.textContent = valorInput;


			if(valorInput == ''){
				nombreTarjeta.textContent = 'Jhon Doe';
			}

			mostrarFrente();
		});

		//////// NUMERO DE TARJETA //////

		// //* Input numero de tarjeta
		// var iframe = document.querySelector('iframe');
		// var iframeInputs = iframe.contentWindow.document.getElementsByTagName('cardNumber');

		// // Obtener el primer input dentro del iframe
		// var primerInput = iframeInputs[0];

		// 	primerInput.addEventListener('keyup', (e) => {
		// 	console.log('INGRESA');
		// 	console.log(primerInput);
		// 	let valorInput = e.target.value;
		// 	console.log(valorInput);
		// 	form_checkout.cardNumber.value = valorInput

			
		// 	// Eliminamos espacios en blanco
		// 	.replace(/\s/g, '')
		// 	// Eliminar las letras
		// 	.replace(/\D/g, '')
		// 	// Ponemos espacio cada cuatro numeros
		// 	.replace(/([0-9]{4})/g, '$1 ')
		// 	// Elimina el ultimo espaciado
		// 	.trim();


			

		// 	if(valorInput == ''){
		// 		numeroTarjeta.textContent = '#### #### #### ####';

		// 		logoMarca.innerHTML = '';
		// 	}

		// 	if(valorInput[0] == 4){
		// 		logoMarca.innerHTML = '';
		// 		const imagen = document.createElement('img');
		// 		imagen.src = 'img/logos/visa.png';
		// 		logoMarca.appendChild(imagen);
		// 	} else if(valorInput[0] == 5){
		// 		logoMarca.innerHTML = '';
		// 		const imagen = document.createElement('img');
		// 		imagen.src = 'img/logos/mastercard.png';
		// 		logoMarca.appendChild(imagen);
		// 	}

		// 	// Volteamos la tarjeta para que el usuario vea el frente.
		// 	mostrarFrente();
		// });



			// // * CCV
			// formulario.inputCCV.addEventListener('keyup', () => {
			// 	if(!tarjeta.classList.contains('active')){
			// 		tarjeta.classList.toggle('active');
			// 	}

			// 	formulario.inputCCV.value = formulario.inputCCV.value
			// 	// Eliminar los espacios
			// 	.replace(/\s/g, '')
			// 	// Eliminar las letras
			// 	.replace(/\D/g, '');

			// 	ccv.textContent = formulario.inputCCV.value;
			// });
			// * Input fecha tarjeta
			// var input_dia_mes= document.querySelector('#form-checkout__expirationDate');
			// console.log(input_dia_mes)
			// input_dia_mes.addEventListener('keyup', (e) => {
			// 	console.log('INGRESA')
			// 	console.log(input_dia_mes.value)
			// 	let valorInput = e.target.value;
			// 	mes_ano.textContent = valorInput;
			// 	mostrarFrente();
			// });


	}else{
		/*console.log('CIERRA el form');*/
		div_form_principal.style.display = "none";
	}
});
