import React from 'react'

export default function Toolbar(){
  return (
    <div className="header" style={{marginBottom:24}}>
      <h1>Simulador PID de Tanque</h1>
      <div className="small">Modelo: dh/dt = (Kb·i - h/R)/A</div>
    </div>
  )
}