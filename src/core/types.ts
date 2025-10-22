export type Mode = 'MANUAL_PUMP' | 'PID';

export interface PlantParams {
  A: number;        // Área del tanque [m^2]
  R: number;        // Constante de descarga [s/m^2] (q_out = h/R)
  Kb: number;       // Constante bomba [m^3/(s·A)]  (qin = Kb * i)
  hMax: number;     // Nivel máximo para la visual [m]
}

export interface PIDParams { Kp: number; Ki: number; Kd: number; }

export interface SimState {
  t: number;   // tiempo [s]
  h: number;   // nivel [m]
  i: number;   // corriente a la bomba [A]
  sp: number;  // consigna [m]
  mode: Mode;
  pidOn: boolean; // redundante al modo para indicadores
}

export interface Limits {
  iMin: number; iMax: number; // saturación corriente
}

export interface Sample {
  t: number; i: number; h: number; sp: number; u: number; e: number;
}
