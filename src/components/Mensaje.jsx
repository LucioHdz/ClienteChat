import React from 'react'

const Mensaje = ({clase, mensaje}) => {
  return (
    <p class={clase}><span>{mensaje.idEm}</span><br/>{mensaje.texto}</p>
  )
}

export default Mensaje