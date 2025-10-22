import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, LinearScale, PointElement, TimeScale, Legend, Tooltip, CategoryScale } from 'chart.js'

ChartJS.register(LineElement, LinearScale, PointElement, Legend, Tooltip, TimeScale, CategoryScale)

interface Props{
  series: { t:number[]; i:number[]; h:number[]; sp:number[] }
}

const common = {
  responsive: true,
  animation: false,
  plugins: { legend: { labels: { color: '#e5e7eb' } }, tooltip:{ enabled: true } },
  scales: {
    x: { ticks: { color:'#94a3b8' }, grid: { color:'#1f2937' } },
    y: { ticks: { color:'#94a3b8' }, grid: { color:'#1f2937' } }
  }
}

export default function Charts({ series }: Props){
  const dataI = useMemo(() => ({
    labels: series.t,
    datasets: [
      { label: 'Corriente i(t) [A]', data: series.i, borderWidth: 2, fill: false },
    ]
  }), [series])

  const dataH = useMemo(() => ({
    labels: series.t,
    datasets: [
      { label: 'Nivel h(t) [m]', data: series.h, borderWidth: 2, fill: false },
      { label: 'Setpoint [m]', data: series.sp, borderWidth: 1, borderDash: [6,6], fill: false }
    ]
  }), [series])

  return (
    <div className="grid" style={{ gridTemplateColumns:'1fr 1fr' }}>
      <div className="card"><div className="header"><h1>Señal de control</h1></div><Line data={dataI} options={common as any}/></div>
      <div className="card"><div className="header"><h1>Variable de proceso</h1></div><Line data={dataH} options={common as any}/></div>
    </div>
  )
}
