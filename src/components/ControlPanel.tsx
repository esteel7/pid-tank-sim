import React, { useMemo, useState } from 'react'
import type { Mode, PIDParams } from '@core/types'

interface Props{
  mode: Mode
  onMode: (m:Mode)=>void
  sp: number
  onSP: (v:number)=>void
  pid: PIDParams
  onPID: (p:PIDParams)=>void
  iManual: number
  onManual: (i:number)=>void
  running: boolean
  onStart: ()=>void
  onStop: ()=>void
  onReset: ()=>void
  onExport: ()=>void
}

export default function ControlPanel(props: Props){
  const { mode, onMode, sp, onSP, pid, onPID, iManual, onManual, running, onStart, onStop, onReset, onExport } = props
  const [local, setLocal] = useState(pid)

  const changed = useMemo(() => (local.Kp!==pid.Kp || local.Ki!==pid.Ki || local.Kd!==pid.Kd), [local, pid])

  return (
    <div className="card">
      <div className="header"><h1>Controles</h1>
        <div className="pill"><span className="label">Modo:</span>
          <select className="input" value={mode} onChange={(e)=>onMode(e.target.value as Mode)}>
            <option value="MANUAL_PUMP">Manual: Corriente bomba</option>
            <option value="PID">Automático: PID</option>
          </select>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns:'1fr 1fr 1fr 1fr' }}>
        <div>
          <label className="label">Setpoint [m]</label>
          <input className="number" type="number" step="0.05" value={sp} onChange={e=>onSP(Math.max(0, Number(e.target.value)))} />
        </div>
        <div>
          <label className="label">Kp</label>
          <input className="number" type="number" step="0.1" value={local.Kp} onChange={e=>setLocal({...local, Kp:Number(e.target.value)})} />
        </div>
        <div>
          <label className="label">Ki</label>
          <input className="number" type="number" step="0.01" value={local.Ki} onChange={e=>setLocal({...local, Ki:Number(e.target.value)})} />
        </div>
        <div>
          <label className="label">Kd</label>
          <input className="number" type="number" step="0.01" value={local.Kd} onChange={e=>setLocal({...local, Kd:Number(e.target.value)})} />
        </div>
      </div>

      <div className="row" style={{ marginTop:12 }}>
        <div style={{ flex:1 }}>
          <label className="label">Corriente manual i [A]</label>
          <input className="range" type="range" min={0} max={10} step={0.1} value={iManual} onChange={e=>onManual(Number(e.target.value))} />
          <div className="small">i = {iManual.toFixed(2)} A (solo en modo manual)</div>
        </div>
      </div>

      <div className="row-buttons">
        {!running ? <button className="btn" onClick={onStart}>Iniciar</button> : <button className="btn danger" onClick={onStop}>Pausar</button>}
        <button className="btn secondary" onClick={onReset}>Reset</button>
        <button className="btn" onClick={()=>{ onPID(local) }} disabled={!changed}>Aplicar PID</button>
        <button className="btn" onClick={onExport}>Exportar CSV</button>
      </div>

      <div className="footer">Sugerencia: comienza en modo manual para explorar el efecto de R, A, Kb y luego prueba el PID. Ajusta Kp/Ki/Kd y observa la saturación de la bomba.</div>
    </div>
  )
}
