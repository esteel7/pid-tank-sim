import type { PlantParams } from './types'

export class TankPlant {
  p: PlantParams
  h: number

  constructor(p: PlantParams, h0 = 0){ this.p = p; this.h = Math.max(0, h0) }

  // dinámicas: dh/dt = (qin - qout)/A ; qout = h/R ; qin = Kb * i
  deriv(i: number){
    const qin = this.p.Kb * Math.max(0, i) // no fluye hacia atrás
    const qout = this.h / this.p.R
    const dhdt = (qin - qout) / this.p.A
    return dhdt
  }

  step(i: number, dt: number){
    // Semi-implícito Euler (mejor estabilidad)
    const dh1 = this.deriv(i) * dt
    this.h = Math.max(0, this.h + dh1)
    return this.h
  }
}
