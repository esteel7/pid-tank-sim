import type { PIDParams, Limits } from './types'

export class PIDController {
  params: PIDParams
  integral = 0
  prevError = 0
  prevU = 0

  constructor(params: PIDParams){ this.params = params }

  reset(){ this.integral = 0; this.prevError = 0; this.prevU = 0 }

  step(error: number, dt: number, limits?: Limits){
    const { Kp, Ki, Kd } = this.params
    const de = (error - this.prevError) / Math.max(dt, 1e-9)

    // Acciones
    const P = Kp * error
    const I = this.integral + Ki * error * dt
    const D = Kd * de

    // salida tent.
    let u = P + I + D

    // anti-windup simple por clamping
    if(limits){
      if(u > limits.iMax){ u = limits.iMax; }
      if(u < limits.iMin){ u = limits.iMin; }
      // si saturó, evita integrar en dirección que empeora
      const saturatedHigh = u >= limits.iMax && error > 0
      const saturatedLow  = u <= limits.iMin && error < 0
      if(!(saturatedHigh || saturatedLow)) this.integral = I
    } else {
      this.integral = I
    }

    this.prevError = error
    this.prevU = u
    return u
  }
}
