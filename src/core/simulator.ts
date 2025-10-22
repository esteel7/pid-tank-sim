import { PIDController } from './pid'
import { TankPlant } from './plant'
import type { PIDParams, Limits, Mode, Sample } from './types'

export interface SimConfig {
  dt: number // paso de simulación [s]
  limits: Limits
}

export class Simulator {
  plant: TankPlant
  pid: PIDController
  cfg: SimConfig
  mode: Mode = 'MANUAL_PUMP'
  sp = 0
  iManual = 0
  t = 0
  running = false
  data: Sample[] = []

  constructor(plant: TankPlant, pidParams: PIDParams, cfg: SimConfig){
    this.plant = plant
    this.pid = new PIDController(pidParams)
    this.cfg = cfg
  }

  setPIDParams(p: PIDParams){ this.pid.params = p }
  setMode(m: Mode){ this.mode = m }
  setSP(sp: number){ this.sp = Math.max(0, sp) }
  setManualCurrent(i: number){ this.iManual = i }
  reset(h0 = 0){
    this.plant.h = Math.max(0, h0)
    this.pid.reset()
    this.t = 0
    this.data = []
  }

  tick(){
    const { dt, limits } = this.cfg
    const h = this.plant.h
    const e = this.sp - h

    // decide control
    let u = this.iManual
    if(this.mode === 'PID'){
      u = this.pid.step(e, dt, limits)
    }

    // saturación explícita
    u = Math.min(Math.max(u, limits.iMin), limits.iMax)

    // avanzar planta
    const hNext = this.plant.step(u, dt)
    this.t += dt

    // registrar
    this.data.push({ t: this.t, i: u, h: hNext, sp: this.sp, e, u })
    return { t: this.t, i: u, h: hNext, sp: this.sp, e }
  }
}