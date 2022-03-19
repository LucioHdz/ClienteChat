import React from 'react'

const TarjetaContacto = ({contacto}) => {
  return (
    <p className="mensaje contactos__body--card">{contacto.nombre}<br/>{contacto.numero}</p>
  )
}

export default TarjetaContacto