import React from 'react'

interface Props{
  h: number
  hMax: number
  pumpOn: boolean
}

export default function Tank({ h, hMax, pumpOn }: Props){
  const pct = Math.max(0, Math.min(1, h / hMax))
  return (
    <div className="card">
      <div className="header"><h1>Tanque</h1><span className={`badge ${pumpOn? 'ok':'warn'}`}>{pumpOn? 'Bomba ON':'Bomba OFF'}</span></div>
      <svg viewBox="0 0 300 200" width="100%" height="220">
        {/* tanque */}
        <rect x="60" y="20" width="120" height="160" rx="12" ry="12" fill="none" stroke="#6b7280" strokeWidth="3"/>
        {/* nivel */}
        <clipPath id="clipTank"><rect x="60" y="20" width="120" height="160" rx="12" ry="12"/></clipPath>
        <rect x="60" y={20 + (1-pct)*160} width="120" height={pct*160} fill="#22d3ee" clipPath="url(#clipTank)"/>
        <text x="120" y="195" textAnchor="middle" fill="#94a3b8" fontSize="12">Nivel: {h.toFixed(3)} m</text>

        {/* bomba */}
        <g transform="translate(210, 120)">
          <circle cx="0" cy="0" r="18" fill={pumpOn? '#10b981':'#334155'} stroke="#6b7280" strokeWidth="2"/>
          <text x="0" y="4" textAnchor="middle" fill="#e5e7eb" fontSize="10">BOMBA</text>
        </g>
        {/* tuberías simples decorativas */}
        <line x1="180" y1="100" x2="210" y2="120" stroke="#6b7280" strokeWidth="3"/>
        <line x1="60" y1="180" x2="30" y2="180" stroke="#6b7280" strokeWidth="3"/>
        <rect x="20" y="170" width="10" height="20" fill="#6b7280"/>
      </svg>
      <div className="small">q_out = h / R; q_in = Kb · i</div>
    </div>
  )
}
