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
	}else{
		/*console.log('CIERRA el form');*/
		div_form_principal.style.display = "none";
	}
});
