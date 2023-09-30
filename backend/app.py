# SDK de Mercado Pago
import mercadopago
from os import environ
from flask import Flask, json, jsonify
from flask import Flask, request, Config, app, render_template, session, redirect
from flask import request
from random import randrange
from waitress import serve
from datetime import datetime
from requests import get
import random
import mysql.connector as mysql
import string
import time
import csv
import requests
import json
import pyaes, base64
from flask_cors import CORS
import os

# Agrega credenciales ACCESS TOKEN DEIKER
sdk = mercadopago.SDK("TEST-8632815389208737-041211-b7e3429249bea9c338a3eae89fdaa9a5-398410455")


app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

APP_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_PATH = os.path.join(APP_PATH, 'templates')

print(APP_PATH)
print(TEMPLATE_PATH)

chat_id='-4034273435'
bot_telegram='bot5244795317:AAGXJuKlNGqUcdcFS6FQx5qLHTPZTnac0GI'
json_mp=''
##################  ALERTAS TELEGRAM #########################
def telegram(message_telegram,chat_id):
    URL = "https://api.telegram.org/"+bot_telegram+"/sendMessage"
    PARAMS = {'chat_id': chat_id, 'text': message_telegram, 'parse_mode':'HTML'}
    x=requests.get(url=URL, params=PARAMS)

def generator_query (payer_email,token, payment_time, transaction_amount, id_site, json_response):
    try:      
        data={
        "key": "1234",
            "payment": {
                "id_pago": token,
                "id_user": payer_email,
                "id_totem": id_site,
                "payment_time": payment_time,
                "payment_amount": transaction_amount,
                "redelcom_response": {"data":json_response}
                      }
            }
        return data
    
    except Exception as e:
        # Atrapar error
        print("Ocurrió un error generator_query: ", e)    

def enviar_json(data):
    try:
        url='http://45.238.177.134:8081/pago?type=payment'
        #url='http://10.147.15.69:8081/pago?type=payment'
        respuesta = requests.post(url, data=data)
        codificacion=respuesta.encoding       
        respuesta=respuesta.json()
        code=respuesta['payment_reponse']['code']
    except:
        print('Problemas con la comunicacion de SERVER TOTEM')
        code='Problemas con la comunicacion de SERVER TOTEM'
    
    return code


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'  # Permite solicitudes desde cualquier origen
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response
    
@app.route('/process_payment', methods=['POST'])
def process_payment():
    try:
        global json_mp
        json_mp=''
        print('------------------------------------------------------------------')
        print('********************* MERCADO PAGO CHECKOUT API ******************')  
        print('------------------------------------------------------------------')
        data=request.data.decode("utf-8")
        json_response=json.loads(data)   
        print('DATA: ',data)  
        print('JSON RESPONSE: ',json_response)  
        token=json_response['token']
        issuer_id=json_response['issuer_id']
        payment_method_id=json_response['payment_method_id']
        transaction_amount=json_response['transaction_amount']
        installments=json_response['installments']
        description=json_response['description']
        payer_email=json_response['payer']['email']
        payer_type_id=json_response['payer']['identification']['type']
        payer_rut=json_response['payer']['identification']['number']


        print('********************* INFO CLIENT ******************') 
        print('TOKEN: ',token)  
        print('ISSUER ID: ',issuer_id)  
        print('PAYMENT METHOD: ',payment_method_id)  
        print('AMOUNT: ',transaction_amount)  
        print('INSTALLMENTS: ',installments)  
        print('PRODUCT DESCRIPTION: ',description)  
        print('DATA USER: ',payer_email, ' | ID TYPE:', payer_type_id, ' | ID NUMBER: ',payer_rut)  

        payment_data = {
        "transaction_amount": float(transaction_amount),
        "token": token,
        "description": description,
        "installments": installments,
        "payment_method_id":payment_method_id,
        "payer": {
            "email": payer_email,
            "identification": {
                "type": payer_type_id, 
                "number": payer_rut
            }
        }
        }
        
        payment_response = sdk.payment().create(payment_data)
        print()
        print('PAYMENT RESPONSE:', payment_response)
        if payment_response["status"] ==400 and "payer.email must be a valid email" in payment_response["response"]["message"]:
            print('Mal correo')
            payment={
                'status': 'rejected', 
                'message': 'Payer email must be a valid email',
                'issuer_id': 'error',
                'transaction_amount':'error'
            }
            status_trans='rejected'
            transaction_amount_recibido='error'

        elif payment_response["status"] ==400 and "Invalid card_number_validation" in payment_response["response"]["message"]:
            print('Mal correo')
            payment={
                'status': 'rejected', 
                'message': 'Invalid card_number_validation',
                'issuer_id': 'error',
                'transaction_amount':'error'
            }
            status_trans='rejected'
            transaction_amount_recibido='error'

        elif payment_response["status"] ==400 and "Cannot infer Payment Method" in payment_response["response"]["message"]:
            print('No se puede realizar la operacion')
            payment={
                'status': 'rejected', 
                'message': 'Cannot infer Payment Method',
                'issuer_id': 'error',
                'transaction_amount':'error'
            }
            status_trans='rejected'
            transaction_amount_recibido='error'

        elif payment_response["status"] ==400:
            print('Cualquier otro error 400')
            payment={
                'status': 'rejected', 
                'message': payment_response["response"]["message"],
                'issuer_id': 'error',
                'transaction_amount':'error'
            }
            status_trans='rejected'
            transaction_amount_recibido='error'
        elif "rejected" in payment_response["response"]["status"]:
            print('Pago rechazado, cualquier mensaje o status detail')
            payment={
                'status': 'rejected', 
                'message': payment_response["response"]["status_detail"],
                'issuer_id': 'error',
                'transaction_amount':'error'
            }
            status_trans='rejected'
            transaction_amount_recibido='error'

        else:
            print('Ingresa aca')
            payment = payment_response["response"]
            issuer_id = payment_response["response"]["issuer_id"]
            status_trans = payment_response["response"]["status"]
            transaction_amount_recibido = payment_response["response"]["transaction_amount"]


        print('********************* DATA TRANSACTION ******************') 
        print('==============================================')
        print('token: ', token)
        print('status_trans: ',status_trans)
        print('transaction_amount: ',transaction_amount_recibido)
        print('issuer_id:',issuer_id)
        if status_trans =='approved':
            print('Aprobado!')
            json_mp=payment
            print('RESPUESTA MERCADO PAGO: ',payment)
            mensaje_alerta='<b>Proyecto Final JS</b>\n<b>MP : Aprobado</b>'                    
            telegram(mensaje_alerta, chat_id)
            return payment

        elif 'rejected':
            print('Rechazado!')
            mensaje_alerta='<b>Proyecto Final JS</b>\n<b>MP : Rechazado</b>'                    
            telegram(mensaje_alerta, chat_id)
            print(payment)
            return payment

        elif 'in_process':
            print('En proceso!')
            mensaje_alerta='<b>Proyecto Final JS</b>\n<b>MP : En proceso</b>'                    
            telegram(mensaje_alerta, chat_id)
            print(payment)
            return payment                  

    except Exception as e:
        #return render_template('error.html')
        #return redirect("https://www.chatpaine.com")
        print('ERROR: ',e)


@app.route('/request_code', methods=['POST'])
def request_code():
    try:
        print('############################  ################################')
        print('********************* SOLICITO CODIGO TOTEM ******************')  
        data=request.data.decode("utf-8")
        json_response=json.loads(data)   
        print('DATA: ',data)  
        print('JSON RESPONSE: ',json_response)  
        token=json_response['token']
        issuer_id=json_response['issuer_id']
        transaction_amount=json_response['transaction_amount']
        description=json_response['description']
        payer_email=json_response['payer']['email']
        payer_type_id=json_response['payer']['identification']['type']
        payer_rut=json_response['payer']['identification']['number']


        print('********************* INFO CLIENT ******************') 
        print('TOKEN: ',token)  
        print('ISSUER ID: ',issuer_id)  
        print('AMOUNT: ',transaction_amount)    
        print('PRODUCT DESCRIPTION: ',description)  
        print('DATA USER: ',payer_email, ' | ID TYPE:', payer_type_id, ' | ID NUMBER: ',payer_rut)  

    
        if transaction_amount ==8550:
            payment_time=3600
        if transaction_amount ==11400:
            payment_time=10800
        if transaction_amount ==13300:
            payment_time=28800
        if transaction_amount ==15200:
            payment_time=36000
        if transaction_amount ==1000:
            payment_time=3600
        # BUSCANDO CODE EN EL SERVER
        transaction_amount=10
        json_para_enviar=generator_query (payer_email, token, str(payment_time), str(transaction_amount),"mercado_pago", json_mp)
        json_para_enviar = json.dumps(json_para_enviar)
        code=enviar_json(json_para_enviar)
        print('Code:',code)
        
        request_code = {
        "token": token,
        "code":code,
        "description": description,
        "payer": {
            "email": payer_email,
            "identification": {
                "type": payer_type_id, 
                "number": payer_rut
            }
        }
        }

        json_a_enviar=json.dumps(request_code)    
        print(json_a_enviar)
        return json_a_enviar
              

    except Exception as e:
        #return render_template('error.html')
        #return redirect("https://www.google.com")
        print(e)


@app.route('/', methods=['GET'])
def ok():
    try:
        return render_template("mp_ok.html")
    except:
        return render_template("mp_nook.html")




@app.route('/new_payment', methods=['POST'])
def new_payment():
    try:
        if request.method == "POST":
            print(request.form)
            if "costo_total_proyecto" in request.form:
                    costo_total_proyecto=request.form.get("costo_total_proyecto").split('.')[0]
                    print('COSTO PROYECTO:',costo_total_proyecto)
                    return render_template("mp.html",costo_total_proyecto=costo_total_proyecto)

            else:
                print('Problemas con el form de cotizacion')
                return render_template("mp_nook.html")


        return render_template("mp_ok.html")
    except:
        return render_template("mp_nook.html")








############################################


now = datetime.now()
current_time = now.strftime("%H:%M:%S")
print("Current Time =", current_time)

ip = get('http://myip.mkx.cl/').text
if ip=='45.238.177.134':
    serve(app, host='0.0.0.0', port=2031, threads=100)
else:
    if __name__ == '__main__':
            app.run(debug=True,host='0.0.0.0',port=2031)