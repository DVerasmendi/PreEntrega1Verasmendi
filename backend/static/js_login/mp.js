document.addEventListener("DOMContentLoaded", function() {
const costo_total_proyecto= document.getElementById("costo_total_proyecto").value;
const p_costo_plan= document.getElementById("p_plan_seleccionado").textContent;

Swal.fire({
customClass: "sweetAlert sweetAlert2",
title: 'Monto de su cotización final',
icon: 'info',
customClass: {
    container: 'my-swal-container',
    popup: 'my-swal-popup',
    content: 'my-swal-content'
},
text:p_costo_plan,
showCancelButton: false,
allowOutsideClick: false, // Evita que se cierre al hacer clic fuera del cuadro de dialogo
allowEscapeKey: false, // Evita que se cierre al presionar la tecla Esc
allowEnterKey: false,
confirmButtonText: 'OK',
}
).then((result) => {
if (result.isConfirmed) {
    // AcciOn a realizar si se confirma la selecciOn
    const p_= document.getElementById("p_plan_seleccionado");
    p_.style.display="block";
    // SDK MercadoPago.js
    var str_amount = costo_total_proyecto.toString();
    // Public Key DEIKER 
    const mp = new MercadoPago('TEST-d2b2c312-0147-4149-ad43-f13f96bf4299');
    const cardForm = mp.cardForm({
    amount: str_amount,
    iframe: true,
    form: {
        id: "form-checkout",
        cardNumber: {
        id: "form-checkout__cardNumber",
        placeholder: "Card number",
        },
        expirationDate: {
        id: "form-checkout__expirationDate",
        placeholder: "MM/YY",
        },
        securityCode: {
        id: "form-checkout__securityCode",
        placeholder: "CCV",
        },
        cardholderName: {
        id: "form-checkout__cardholderName",
        placeholder: "Cardholder",
        },
        issuer: {
        id: "form-checkout__issuer",
        placeholder: "Issuing bank",
        },
        installments: {
        id: "form-checkout__installments",
        placeholder: "Dues",
        },
        identificationType: {
        id: "form-checkout__identificationType",
        placeholder: "ID",
        },
        identificationNumber: {
        id: "form-checkout__identificationNumber",
        placeholder: "ID",
        },
        cardholderEmail: {
        id: "form-checkout__cardholderEmail",
        placeholder: "Email",
        },
    },
    callbacks: {
        onFormMounted: error => {
        if (error) return console.warn("Form Mounted handling error: ", error);
        },
        onSubmit: event => {
        // Resto del codigo si no hay errores...
        let timerInterval
        Swal.fire({
        title: 'Procesando pago...',
        text: "Por favor no cierre ni abandone esta pagina mientras procesamos su pago",
        html: '',
        timer: 10000,
        timerProgressBar: true,
        allowOutsideClick: false, // Evita que se cierre al hacer clic fuera del cuadro de dialogo
        allowEscapeKey: false, // Evita que se cierre al presionar la tecla Esc
        allowEnterKey: false,
        didOpen: () => {
        Swal.showLoading()
        },
        willClose: () => {
        clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
        }
    })

        event.preventDefault();
        const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
        } = cardForm.getCardFormData();
        fetch("https://mpfront.cloudaustro.com/process_payment", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            token,
            issuer_id,
            payment_method_id,
            transaction_amount: Number(amount),
            installments: Number(installments),
            description: "Plan WiFi: " + str_amount,
            payer: {
                email,
                identification: {
                type: identificationType,
                number: identificationNumber,
                },
            },
            }),
        }).then(response => response.json())
            .then(data => {
            const status = data.status;
            const issuer_id = data.issuer_id;
            const transaction_amount_ok = data.transaction_amount;
            if (data.status === "approved") {
                Swal.fire({
                title: 'Pago aprobado con éxito',
                text: 'Nos pondremos en contacto con usted',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK'
                }).then((result) => {
                if (result.isConfirmed) {
                    // Redireccionar a la página de inicio de mi pagina web, por ahora esta off je je :)
                    window.location.href = 'https://www.google.com';
                }
                });
                
            }
            else if (data.status === "rejected") {
                if (data.status === "rejected" && data.message=="Payer email must be a valid email") {/* CORREO INCORRECTO*/
                const message = data.message;
                Swal.fire({
                customClass: "sweetAlert sweetAlert2",
                icon: 'error',
                title: "Error!",
                text: message,
                confirmButtonColor: '#3085d6',
                showCancelButton: false,
                allowOutsideClick: false, // Evita que se cierre al hacer clic fuera del cuadro de diálogo
                allowEscapeKey: false, // Evita que se cierre al presionar la tecla Esc
                allowEnterKey: false,
                confirmButtonText: "OK"
                }).then((result) => {
                location.reload(true);
                })
                }
                else if (data.status === "rejected" && data.message=="Invalid card_number_validation") {/* TARJETA INCORRECTA*/
                const message = data.message;
                Swal.fire({
                customClass: "sweetAlert sweetAlert2",
                icon: 'error',
                title: "Error!",
                text: message,
                confirmButtonColor: '#3085d6',
                showCancelButton: false,
                allowOutsideClick: false, // Evita que se cierre al hacer clic fuera del cuadro de diálogo
                allowEscapeKey: false, // Evita que se cierre al presionar la tecla Esc
                allowEnterKey: false,
                confirmButtonText: "OK"
                }).then((result) => {
                location.reload(true);
                })
                }
                else if (data.status === "rejected" && data.message=="Cannot infer Payment Method") {/* TARJETA INCORRECTA*/
                const message = data.message;
                Swal.fire({
                customClass: "sweetAlert sweetAlert2",
                icon: 'error',
                title: "Error!",
                text: message+ ' | Please check the card details',
                confirmButtonColor: '#3085d6',
                showCancelButton: false,
                allowOutsideClick: false, // Evita que se cierre al hacer clic fuera del cuadro de diálogo
                allowEscapeKey: false, // Evita que se cierre al presionar la tecla Esc
                allowEnterKey: false,
                confirmButtonText: "OK"
                }).then((result) => {
                location.reload(true);
                })
                }
                else if (data.status === "rejected") {/* Cualquier otro error*/
                const message = data.message;
                Swal.fire({
                customClass: "sweetAlert sweetAlert2",
                icon: 'error',
                title: "Error!",
                text: message+ ' | Please check the card details',
                confirmButtonColor: '#3085d6',
                showCancelButton: false,
                allowOutsideClick: false, // Evita que se cierre al hacer clic fuera del cuadro de diálogo
                allowEscapeKey: false, // Evita que se cierre al presionar la tecla Esc
                allowEnterKey: false,
                confirmButtonText: "OK"
                }).then((result) => {
                location.reload(true);
                }) 
                }
            }
            else { /*PENDIENTE */
                /* window.location.href = "rechazado.html";*/
            }
            })
        }
        ,
onError: (type, error) => {
    // Aqui captura el error y lo guarda en una variable
    const errorMessage = error ? error.toString() : 'Unknown error';
},
onCardTokenReceived: (error, token) => {
    if (error) {
    // Aquí obtienes el error completo
    const errorDetails = error ? error.toString() : 'Unknown error';
    const errorMessage2 = error.message;
    if (errorMessage2!== undefined){
        if(errorMessage2.includes("Invalid cardholder.identification.number")){
        Swal.fire(
        'Error!',
        errorMessage2,
        'error'
        ) 
    }
    }
    if (Object.keys(error[0]).length > 0) {
        if (error[0].field=='cardNumber'){
        var field=' Card Number';
        if (error[0].cause=='invalid_type'){
        var cause=error[0].cause;
        var message=error[0].message;
        } 
        else if (error[0].cause=='invalid_value'){
        var cause=error[0].cause;
        var message=error[0].message;
        }
        else if (error[0].cause=='invalid_length'){
        var cause=error[0].cause;
        var message=error[0].message;  
        }
        }
        else if (error[0].field=='securityCode'){
        var field='Security Code'
        if (error[0].cause=='invalid_type'){
        var cause=error[0].cause;
        var message=error[0].message;
        } 
        else if (error[0].cause=='invalid_value'){
        var cause=error[0].cause;
        var message=error[0].message;
        }
        else if (error[0].cause=='invalid_length'){
        var cause=error[0].cause;
        var message=error[0].message;  
        }
        }
        else if (error[0].field=='expirationDate'){
        var field='Expiration Date'
        if (error[0].cause=='invalid_type'){
        var cause=error[0].cause;
        var message=error[0].message;
        } 
        else if (error[0].cause=='invalid_value'){
        var cause=error[0].cause;
        var message=error[0].message;
        }
        else if (error[0].cause=='invalid_length'){
        var cause=error[0].cause;
        var message=error[0].message;  
        }
        }
        else if (error[0].code=='221'){
        var field='Cardholder Name';
        var message=error[0].message;
        }
        else if (error[0].code=='214'){
        var field='ID';
        var message=error[0].message;
        }

        console.log('OBJETO 1 - FIELD: '+ error[0].field +' || CAUSE: '+message)
        Swal.fire(
        'Error! <br>'+field,
        message,
        'error'
        ) 
    }  
    /***************************************************************************************/
    else if (Object.keys(error[1]).length > 0) {
        if (error[1].field=='cardNumber'){
        var field=' Card Number';
        if (error[1].cause=='invalid_type'){
        var cause=error[1].cause;
        var message=error[1].message;
        } 
        else if (error[1].cause=='invalid_value'){
        var cause=error[1].cause;
        var message=error[1].message;
        }
        else if (error[1].cause=='invalid_length'){
        var cause=error[1].cause;
        var message=error[1].message;  
        }
        }
        else if (error[1].field=='securityCode'){
        var field='Security Code'
        if (error[1].cause=='invalid_type'){
        var cause=error[1].cause;
        var message=error[1].message;
        } 
        else if (error[1].cause=='invalid_value'){
        var cause=error[1].cause;
        var message=error[1].message;
        }
        else if (error[1].cause=='invalid_length'){
        var cause=error[1].cause;
        var message=error[1].message;  
        }
        }
        else if (error[1].field=='expirationDate'){
        var field='Expiration Date'
        if (error[1].cause=='invalid_type'){
        var cause=error[1].cause;
        var message=error[1].message;
        } 
        else if (error[1].cause=='invalid_value'){
        var cause=error[1].cause;
        var message=error[1].message;
        }
        else if (error[1].cause=='invalid_length'){
        var cause=error[1].cause;
        var message=error[1].message;  
        }
        }  
        console.log('OBJETO 2 - FIELD: '+ error[1].field +' || CAUSE: '+message)
        Swal.fire(
        'Error! <br>'+field,
        message,
        'error'
        ) 
    }
    /***************************************************************************************/
    else if (Object.keys(error[2]).length > 0) {
        if (error[2].field=='cardNumber'){
        var field=' Card Number';
        if (error[2].cause=='invalid_type'){
        var cause=error[2].cause;
        var message=error[2].message;
        } 
        else if (error[2].cause=='invalid_value'){
        var cause=error[2].cause;
        var message=error[2].message;
        }
        else if (error[2].cause=='invalid_length'){
        var cause=error[2].cause;
        var message=error[2].message;  
        }
        }
        else if (error[2].field=='securityCode'){
        var field='Security Code'
        if (error[2].cause=='invalid_type'){
        var cause=error[2].cause;
        var message=error[2].message;
        } 
        else if (error[2].cause=='invalid_value'){
        var cause=error[2].cause;
        var message=error[2].message;
        }
        else if (error[2].cause=='invalid_length'){
        var cause=error[2].cause;
        var message=error[2].message;  
        }
        }
        else if (error[2].field=='expirationDate'){
        var field='Expiration Date'
        if (error[2].cause=='invalid_type'){
        var cause=error[2].cause;
        var message=error[2].message;
        } 
        else if (error[2].cause=='invalid_value'){
        var cause=error[2].cause;
        var message=error[2].message;
        }
        else if (error[2].cause=='invalid_length'){
        var cause=error[2].cause;
        var message=error[2].message;  
        }
        }  
        console.log('OBJETO 3 - FIELD: '+ error[2].field +' || CAUSE: '+message)
        Swal.fire(
        'Error! <br>'+field,
        message,
        'error'
        ) 
    }
    /***************************************************************************************/
    else if (Object.keys(error[3]).length > 0) {
        if (error[3].field=='cardNumber'){
        var field=' Card Number';
        if (error[3].cause=='invalid_type'){
        var cause=error[3].cause;
        var message=error[3].message;
        } 
        else if (error[3].cause=='invalid_value'){
        var cause=error[3].cause;
        var message=error[3].message;
        }
        else if (error[3].cause=='invalid_length'){
        var cause=error[3].cause;
        var message=error[3].message;  
        }
        }
        else if (error[3].field=='securityCode'){
        var field='Security Code'
        if (error[3].cause=='invalid_type'){
        var cause=error[3].cause;
        var message=error[3].message;
        } 
        else if (error[3].cause=='invalid_value'){
        var cause=error[3].cause;
        var message=error[3].message;
        }
        else if (error[3].cause=='invalid_length'){
        var cause=error[3].cause;
        var message=error[3].message;  
        }
        }
        else if (error[3].field=='expirationDate'){
        var field='Expiration Date'
        if (error[3].cause=='invalid_type'){
        var cause=error[3].cause;
        var message=error[3].message;
        } 
        else if (error[3].cause=='invalid_value'){
        var cause=error[3].cause;
        var message=error[3].message;
        }
        else if (error[3].cause=='invalid_length'){
        var cause=error[3].cause;
        var message=error[3].message;  
        }
        }  
        console.log('OBJETO 4 - FIELD: '+ error[3].field +' || CAUSE: '+message)
        Swal.fire(
        'Error! <br>'+field,
        message,
        'error'
        ) 
    }
    /***************************************************************************************/
    else if (Object.keys(error[4]).length > 0) {
        if (error[4].field=='cardNumber'){
        var field=' Card Number';
        if (error[4].cause=='invalid_type'){
        var cause=error[4].cause;
        var message=error[4].message;
        } 
        else if (error[4].cause=='invalid_value'){
        var cause=error[4].cause;
        var message=error[4].message;
        }
        else if (error[4].cause=='invalid_length'){
        var cause=error[4].cause;
        var message=error[4].message;  
        }
        }
        else if (error[4].field=='securityCode'){
        var field='Security Code'
        if (error[4].cause=='invalid_type'){
        var cause=error[4].cause;
        var message=error[4].message;
        } 
        else if (error[4].cause=='invalid_value'){
        var cause=error[4].cause;
        var message=error[4].message;
        }
        else if (error[4].cause=='invalid_length'){
        var cause=error[4].cause;
        var message=error[4].message;  
        }
        }
        else if (error[4].field=='expirationDate'){
        var field='Expiration Date'
        if (error[4].cause=='invalid_type'){
        var cause=error[4].cause;
        var message=error[4].message;
        } 
        else if (error[4].cause=='invalid_value'){
        var cause=error[4].cause;
        var message=error[4].message;
        }
        else if (error[4].cause=='invalid_length'){
        var cause=error[4].cause;
        var message=error[4].message;  
        }
        }  
        console.log('OBJETO 5 - FIELD: '+ error[4].field +' || CAUSE: '+message)
        Swal.fire(
        'Error! <br>'+field,
        message,
        'error'
        ) 
    }
    /***************************************************************************************/
    else if (Object.keys(error[5]).length > 0) {
        if (error[5].field=='cardNumber'){
        var field=' Card Number';
        if (error[5].cause=='invalid_type'){
        var cause=error[5].cause;
        var message=error[5].message;
        } 
        else if (error[5].cause=='invalid_value'){
        var cause=error[5].cause;
        var message=error[5].message;
        }
        else if (error[5].cause=='invalid_length'){
        var cause=error[5].cause;
        var message=error[5].message;  
        }
        }
        else if (error[5].field=='securityCode'){
        var field='Security Code'
        if (error[5].cause=='invalid_type'){
        var cause=error[5].cause;
        var message=error[5].message;
        } 
        else if (error[5].cause=='invalid_value'){
        var cause=error[5].cause;
        var message=error[5].message;
        }
        else if (error[5].cause=='invalid_length'){
        var cause=error[5].cause;
        var message=error[5].message;  
        }
        }
        else if (error[5].field=='expirationDate'){
        var field='Expiration Date'
        if (error[5].cause=='invalid_type'){
        var cause=error[5].cause;
        var message=error[5].message;
        } 
        else if (error[5].cause=='invalid_value'){
        var cause=error[5].cause;
        var message=error[5].message;
        }
        else if (error[5].cause=='invalid_length'){
        var cause=error[5].cause;
        var message=error[5].message;  
        }
        }  
        console.log('OBJETO 6 - FIELD: '+ error[5].field +' || CAUSE: '+message)
        Swal.fire(
        'Error! <br>'+field,
        message,
        'error'
        ) 
    }
    /***************************************************************************************/
    else if (Object.keys(error[6]).length > 0) {
        if (error[6].field=='cardNumber'){
        var field=' Card Number';
        if (error[6].cause=='invalid_type'){
        var cause=error[6].cause;
        var message=error[6].message;
        } 
        else if (error[6].cause=='invalid_value'){
        var cause=error[6].cause;
        var message=error[6].message;
        }
        else if (error[6].cause=='invalid_length'){
        var cause=error[6].cause;
        var message=error[6].message;  
        }
        }
        else if (error[6].field=='securityCode'){
        var field='Security Code'
        if (error[6].cause=='invalid_type'){
        var cause=error[6].cause;
        var message=error[6].message;
        } 
        else if (error[6].cause=='invalid_value'){
        var cause=error[6].cause;
        var message=error[6].message;
        }
        else if (error[6].cause=='invalid_length'){
        var cause=error[6].cause;
        var message=error[6].message;  
        }
        }
        else if (error[6].field=='expirationDate'){
        var field='Expiration Date'
        if (error[6].cause=='invalid_type'){
        var cause=error[6].cause;
        var message=error[6].message;
        } 
        else if (error[6].cause=='invalid_value'){
        var cause=error[6].cause;
        var message=error[6].message;
        }
        else if (error[6].cause=='invalid_length'){
        var cause=error[6].cause;
        var message=error[6].message;  
        }
        }  
        console.log('OBJETO 7 - FIELD: '+ error[6].field +' || CAUSE: '+message)
        Swal.fire(
        'Error! <br>'+field,
        message,
        'error'
        ) 
    }
    /***************************************************************************************/
    else if (Object.keys(error[7]).length > 0) {
        if (error[7].field=='cardNumber'){
        var field=' Card Number';
        if (error[7].cause=='invalid_type'){
        var cause=error[7].cause;
        var message=error[7].message;
        } 
        else if (error[7].cause=='invalid_value'){
        var cause=error[7].cause;
        var message=error[7].message;
        }
        else if (error[7].cause=='invalid_length'){
        var cause=error[7].cause;
        var message=error[7].message;  
        }
        }
        else if (error[7].field=='securityCode'){
        var field='Security Code'
        if (error[7].cause=='invalid_type'){
        var cause=error[7].cause;
        var message=error[7].message;
        } 
        else if (error[7].cause=='invalid_value'){
        var cause=error[7].cause;
        var message=error[7].message;
        }
        else if (error[7].cause=='invalid_length'){
        var cause=error[7].cause;
        var message=error[7].message;  
        }
        }
        else if (error[7].field=='expirationDate'){
        var field='Expiration Date'
        if (error[7].cause=='invalid_type'){
        var cause=error[7].cause;
        var message=error[7].message;
        } 
        else if (error[7].cause=='invalid_value'){
        var cause=error[7].cause;
        var message=error[7].message;
        }
        else if (error[7].cause=='invalid_length'){
        var cause=error[7].cause;
        var message=error[7].message;  
        }
        }  
        console.log('OBJETO 8 - FIELD: '+ error[7].field +' || CAUSE: '+message)
        Swal.fire(
        'Error! <br>'+field,
        message,
        'error'
        ) 
    }
    /***************************************************************************************/
    else if (Object.keys(error[8]).length > 0) {
        if (error[8].field=='cardNumber'){
        var field=' Card Number';
        if (error[8].cause=='invalid_type'){
        var cause=error[8].cause;
        var message=error[8].message;
        } 
        else if (error[8].cause=='invalid_value'){
        var cause=error[8].cause;
        var message=error[8].message;
        }
        else if (error[8].cause=='invalid_length'){
        var cause=error[8].cause;
        var message=error[8].message;  
        }
        }
        else if (error[8].field=='securityCode'){
        var field='Security Code'
        if (error[8].cause=='invalid_type'){
        var cause=error[8].cause;
        var message=error[8].message;
        } 
        else if (error[8].cause=='invalid_value'){
        var cause=error[8].cause;
        var message=error[8].message;
        }
        else if (error[8].cause=='invalid_length'){
        var cause=error[8].cause;
        var message=error[8].message;  
        }
        }
        else if (error[8].field=='expirationDate'){
        var field='Expiration Date'
        if (error[8].cause=='invalid_type'){
        var cause=error[8].cause;
        var message=error[8].message;
        } 
        else if (error[8].cause=='invalid_value'){
        var cause=error[8].cause;
        var message=error[8].message;
        }
        else if (error[8].cause=='invalid_length'){
        var cause=error[8].cause;
        var message=error[8].message;  
        }
        }  
        console.log('OBJETO 9 - FIELD: '+ error[8].field +' || CAUSE: '+message)
        Swal.fire(
        'Error! <br>'+field,
        message,
        'error'
        ) 
    }
    /***************************************************************************************/
    else if (Object.keys(error[9]).length > 0) {
        if (error[9].field=='cardNumber'){
        var field=' Card Number';
        if (error[9].cause=='invalid_type'){
        var cause=error[9].cause;
        var message=error[9].message;
        } 
        else if (error[9].cause=='invalid_value'){
        var cause=error[9].cause;
        var message=error[9].message;
        }
        else if (error[9].cause=='invalid_length'){
        var cause=error[9].cause;
        var message=error[9].message;  
        }
        }
        else if (error[9].field=='securityCode'){
        var field='Security Code'
        if (error[9].cause=='invalid_type'){
        var cause=error[9].cause;
        var message=error[9].message;
        } 
        else if (error[9].cause=='invalid_value'){
        var cause=error[9].cause;
        var message=error[9].message;
        }
        else if (error[9].cause=='invalid_length'){
        var cause=error[9].cause;
        var message=error[9].message;  
        }
        }
        else if (error[9].field=='expirationDate'){
        var field='Expiration Date'
        if (error[9].cause=='invalid_type'){
        var cause=error[9].cause;
        var message=error[9].message;
        } 
        else if (error[9].cause=='invalid_value'){
        var cause=error[9].cause;
        var message=error[9].message;
        }
        else if (error[9].cause=='invalid_length'){
        var cause=error[9].cause;
        var message=error[9].message;  
        }
        }  
        console.log('OBJETO 10 - FIELD: '+ error[9].field +' || CAUSE: '+message)
        Swal.fire(
        'Error! <br>'+field,
        message,
        'error'
        ) 
    }
    /***************************************************************************************/
    else if (Object.keys(error[10]).length > 0) {
        if (error[10].field=='cardNumber'){
        var field=' Card Number';
        if (error[10].cause=='invalid_type'){
        var cause=error[10].cause;
        var message=error[10].message;
        } 
        else if (error[10].cause=='invalid_value'){
        var cause=error[10].cause;
        var message=error[10].message;
        }
        else if (error[10].cause=='invalid_length'){
        var cause=error[10].cause;
        var message=error[10].message;  
        }
        }
        else if (error[10].field=='securityCode'){
        var field='Security Code'
        if (error[10].cause=='invalid_type'){
        var cause=error[10].cause;
        var message=error[10].message;
        } 
        else if (error[10].cause=='invalid_value'){
        var cause=error[10].cause;
        var message=error[10].message;
        }
        else if (error[10].cause=='invalid_length'){
        var cause=error[10].cause;
        var message=error[10].message;  
        }
        }
        else if (error[10].field=='expirationDate'){
        var field='Expiration Date'
        if (error[10].cause=='invalid_type'){
        var cause=error[10].cause;
        var message=error[10].message;
        } 
        else if (error[10].cause=='invalid_value'){
        var cause=error[10].cause;
        var message=error[10].message;
        }
        else if (error[10].cause=='invalid_length'){
        var cause=error[10].cause;
        var message=error[10].message;  
        }
        }  
        console.log('OBJETO 11 - FIELD: '+ error[10].field +' || CAUSE: '+message)
        Swal.fire(
        'Error! <br>'+field,
        message,
        'error'
        ) 
    }
    }}
}
});
}
});
});

