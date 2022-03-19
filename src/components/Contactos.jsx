import React, { useEffect, useState } from 'react'
import TarjetaContacto from './TarjetaContacto'

const obtenerContactos = async () => {
    const peticionContactos = await fetch('http://localhost:3001/contactos')
    const response = await peticionContactos.json()
    return response
}

const Contactos = () => {
    const [personas, setPersonas] = useState()
    useEffect(() => {
        obtenerContactos().then((response) => {
            setPersonas(Object.values(response)[0])
        })}, []
    )










    return (
        <div className="container contactos">
            <div className="header">
                <h1>Contactos</h1>
            </div>
            <div className="body contactos__body" id="lista_contactos">
                {!personas?" ":personas.map(persona=>{
                    return <TarjetaContacto key={persona.numero} contacto={persona} />
                })}
            </div>
        </div>
    )
}

export default Contactos