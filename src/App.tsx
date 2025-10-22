import React, { useMemo, useState } from 'react'
import Toolbar from '@components/Toolbar'
import Tank from '@components/Tank'
import Charts from '@components/Charts'
import ControlPanel from '@components/ControlPanel'
import { useSimulation } from '@hooks/useSimulation'
import { toCSV, downloadCSV } from '@core/csv'

export default function App(){
  const { state, running, start, stop, reset, setSP, setPID, setMode, setManual, hMax, data } = useSimulation()
  const [iManual, setIManual] = useState(0)

  const series = useMemo(() => {
    const rows = data()
    return {
      t: rows.map(r=>Number(r.t.toFixed(2))),
      i: rows.map(r=>Number(r.i.toFixed(3))),
      h: rows.map(r=>Number(r.h.toFixed(3))),
      sp: rows.map(r=>Number(r.sp.toFixed(3)))
    }
  }, [state.t])

  return (
    <div className="container">
      <Toolbar />
      <div className="row">
        <div className="left">
          <Tank h={state.h} hMax={hMax} pumpOn={state.i>0.01} />
          <div className="card">
            <div className="header"><h1>Estado</h1></div>
            <div className="grid" style={{ gridTemplateColumns:'1fr 1fr 1fr' }}>
              <div><div className="label">t [s]</div><div>{state.t.toFixed(2)}</div></div>
              <div><div className="label">h [m]</div><div>{state.h.toFixed(3)}</div></div>
              <div><div className="label">i [A]</div><div>{state.i.toFixed(3)}</div></div>
            </div>
          </div>
        </div>
        <div className="right">
          <Charts series={series} />
          <ControlPanel
            mode={state.mode}
            onMode={setMode}
            sp={state.sp}
            onSP={setSP}
            pid={{Kp:8,Ki:0.5,Kd:2}}
            onPID={setPID}
            iManual={iManual}
            onManual={(v)=>{ setIManual(v); setManual(v) }}
            running={running}
            onStart={start}
            onStop={stop}
            onReset={()=>{ setIManual(0); setManual(0); reset(0) }}
            onExport={()=> downloadCSV('sim_tanque.csv', toCSV(data()))}
          />
        </div>
      </div>
      <div className="footer">© {new Date().getFullYear()} – Proyecto base modular. Puedes reutilizar <code>src/core/</code> y <code>src/hooks/</code> para otras plantas.</div>
    </div>
  )
}