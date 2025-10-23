import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement, LinearScale, PointElement,
  Legend, Tooltip, TimeScale, CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(LineElement, LinearScale, PointElement, Legend, Tooltip, TimeScale, CategoryScale)

/**
 * Plugin para pintar el área de la gráfica (chartArea) con fondo blanco.
 * Cumple Issue #1: Fondo blanco del área de gráfico sin tocar la tarjeta contenedora.
 */
const chartAreaBackground: Plugin = {
  id: 'chartAreaBackground',
  beforeDraw: (chart, _args, opts: any) => {
    const { ctx, chartArea } = chart
    if (!chartArea) return
    const { left, top, width, height } = chartArea
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = (opts && opts.color) || '#ffffff'
    ctx.fillRect(left, top, width, height)
    ctx.restore()
  },
}
ChartJS.register(chartAreaBackground as any)

interface Props{
  series: { t:number[]; i:number[]; h:number[]; sp:number[] }
}

/**
 * Opciones compartidas de Chart.js
 * (OJO: No cambiamos colores de ticks/leyenda aquí para no invadir el Issue #3)
 */
const common = {
  responsive: true,
  animation: false,
  plugins: {
    legend: { display: true }, // contraste y tipografía se ajustan en Issue #3
    tooltip: { enabled: true },
    // activamos el plugin de fondo blanco en el área de la gráfica
    chartAreaBackground: { color: '#ffffff' }
  },
  scales: {
    x: { grid: { display: true } },
    y: { grid: { display: true } }
  }
}

export default function Charts({ series }: Props){
  // Issue #2: Colores fijos por serie (rojo, azul, verde)
  const dataI = useMemo(() => ({
    labels: series.t,
    datasets: [
      {
        label: 'Corriente i(t) [A]',
        data: series.i,
        borderWidth: 2,
        borderColor: '#ef4444',          // ROJO
        pointBackgroundColor: '#ef4444',
        pointRadius: 1.5,
        fill: false,
      },
    ]
  }), [series])

  const dataH = useMemo(() => ({
    labels: series.t,
    datasets: [
      {
        label: 'Nivel h(t) [m]',
        data: series.h,
        borderWidth: 2,
        borderColor: '#3b82f6',          // AZUL
        pointBackgroundColor: '#3b82f6',
        pointRadius: 1.5,
        fill: false,
      },
      {
        label: 'Setpoint [m]',
        data: series.sp,
        borderWidth: 2,
        borderColor: '#10b981',          // VERDE
        borderDash: [6, 6],
        pointRadius: 0,
        fill: false,
      }
    ]
  }), [series])

  return (
    <div className="grid" style={{ gridTemplateColumns:'1fr 1fr' }}>
      <div className="card">
        <div className="header"><h1>Señal de control</h1></div>
        <Line data={dataI} options={common as any}/>
      </div>
      <div className="card">
        <div className="header"><h1>Variable de proceso</h1></div>
        <Line data={dataH} options={common as any}/>
      </div>
    </div>
  )
}
