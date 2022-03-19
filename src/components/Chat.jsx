import React, { useEffect, useState } from 'react'


/*Obtener los mensajes desde el servidor */
const obtenerMensajes = async (numero) => {
    const peticionMensaje = await fetch(`http://192.168.1.175:3000/${numero}`)
    const response = await peticionMensaje.json()
    return response
}

/*funcion para cargar el mensaje en la bd local */
const subirDocumento = async (obj) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }
    await fetch('http://localhost:3001/mensaje', options)
}

/*cambiar el estado a palomita en el servidor */
const cambiarEstado = async (numero) => {
    const body = {
        estado: 'palomita'
    }
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    await fetch(`http://192.168.1.175:3000/${numero}`, options)
}

/*Guarda el mensaje de manera local */
const guardarMensajesLocales = async (lista) => {
    lista.map(documento => {
        const obj = {
            numeroCelular: documento.idEm,
            fecha: documento.fecha,
            texto: documento.texto,
            EntradaSalida: '1',
            Estado: 'palomita'
        }
        subirDocumento(obj)
        
        })
    }
    
const leerLocal = async (numero) => {
    if (numero){
        const ip= `http://localhost:3001/mensaje/${numero}`
    const leerMensajesLocales = await fetch(ip)
    const response = await leerMensajesLocales.json()
    return response
    }else{
        const ip= `http://localhost:3001/mensaje/`
    const leerMensajesLocales = await fetch(ip)
    const response = await leerMensajesLocales.json()
    return response
    }
}

    
    const Chat = () => {
    const [mensajes, setMensajes] = useState([])
    const [mensajesVistos, setMensajesVistos] = useState([])
    const [numero, setNumero] = useState('7122229094')
    const [numeroContacto,setNumeroContacto] = useState('5578743884')
    const [mensaje,setMensaje] = useState('')
    
    const loop = () => {
        obtenerMensajes(numero).then((response) => {
            //guardar en base de datos local
            setMensajes(Object.values(response))
            
            guardarMensajesLocales(Object.values(response))
            
        })
        cambiarEstado(numero)
        //Leer los mensajes locales
        leerLocal(numeroContacto).then((response)=>{
                setMensajesVistos(Object.values(response))
        })
    }

    useEffect(() => {
        
        setInterval(loop,500)
        
    }, [numeroContacto]
    )



    function enviarMensaje(){
        const Objmensaje = {
            numeroCelular: numeroContacto,
            texto: mensaje,
            EntradaSalida:'0',
            Estado:'pendiente'
        }
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Objmensaje)
        }
        fetch('http://localhost:3001/mensaje',options)
        const ObjmensajeServidor = {
            idEm: '7122229094',
            idRec: numeroContacto,
            texto: mensaje,
            EntradaSalida:'0',
            Estado:'pendiente'
        }
        const optionsServer = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ObjmensajeServidor)
        }
        fetch('http://192.168.1.175:3000/',optionsServer)
    }

    return (
        <div className="container">
            <div className="header">
                <h1>CHAT</h1>
            </div>
            <div className="body" id="chat">

                {!mensajesVistos ? " " : mensajesVistos.map(mensaje => {

                    if(mensaje.EntradaSalida==="1"){
                        return <p className="mensaje" key={mensaje.idMensaje}><span>{mensaje.numeroCelular}</span><br />{mensaje.texto}</p>
                    }else{
                        return <p className="mensaje mensaje_usuario" key={mensaje.idMensaje}>{mensaje.texto}</p>
                    }
                })}
            </div>
            <div className="footer">
                <form >
                    <input type="text" placeholder="Contacto" id="nombre-contacto"  onChange={event => {setNumeroContacto(event.target.value)}} />
                    <input type="text" placeholder="Mensaje" id="mensaje" onChange={event => {setMensaje(event.target.value)}} />
                    <button id="btn-Enviar-Mensaje" onClick={enviarMensaje}>ENVIAR</button>
                </form>
            </div>
        </div>
    )
}

export default Chat