import { useEffect, useRef, useState } from 'react'
import { Simulator } from '@core/simulator'
import { TankPlant } from '@core/plant'
import type { PIDParams, Mode } from '@core/types'

export interface UseSimOptions {
  dt?: number
  A?: number
  R?: number
  Kb?: number
  hMax?: number
  limits?: { iMin:number; iMax:number }
  pid?: PIDParams
}

export function useSimulation(opts?: UseSimOptions){
  const {
    dt = 0.02,
    A = 1.0,
    R = 20.0,
    Kb = 0.02,
    hMax = 2.0,
    limits = { iMin: 0, iMax: 10 },
    pid = { Kp: 8, Ki: 0.5, Kd: 2 }
  } = opts || {}

  const simRef = useRef<Simulator>()
  const rafRef = useRef<number>()
  const [state, setState] = useState({ t:0, h:0, i:0, sp:1.0, mode: 'MANUAL_PUMP' as Mode })
  const [running, setRunning] = useState(false)

  // init
  useEffect(() => {
    const plant = new TankPlant({ A, R, Kb, hMax }, 0)
    simRef.current = new Simulator(plant, pid, { dt, limits })
    simRef.current.setSP(1.0)
    setState(s => ({ ...s, sp: 1.0 }))
    return () => cancelAnimationFrame(rafRef.current!)
  }, [])

  const loop = () => {
    const sim = simRef.current!
    const s = sim.tick()
    setState({ t: s.t, h: s.h, i: s.i, sp: sim.sp, mode: sim.mode })
    rafRef.current = requestAnimationFrame(loop)
  }

  const start = () => { if(!running){ setRunning(true); rafRef.current = requestAnimationFrame(loop) } }
  const stop  = () => { setRunning(false); cancelAnimationFrame(rafRef.current!) }
  const reset = (h0=0) => { simRef.current!.reset(h0); setState(s => ({...s, t:0, h:h0 })) }

  // setters
  const setSP = (sp:number) => { simRef.current!.setSP(sp); setState(s=>({...s, sp })) }
  const setPID = (p:PIDParams) => { simRef.current!.setPIDParams(p) }
  const setMode = (m:Mode) => { simRef.current!.setMode(m); setState(s=>({...s, mode:m })) }
  const setManual = (i:number) => { simRef.current!.setManualCurrent(i) }

  return {
    state, running,
    start, stop, reset,
    setSP, setPID, setMode, setManual,
    hMax,
    data: () => (simRef.current ? simRef.current.data : [])
  }
}