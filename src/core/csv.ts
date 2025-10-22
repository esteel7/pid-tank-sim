import type { Sample } from './types'

export function toCSV(rows: Sample[]): string{
  const header = ['t_s','i_A','h_m','sp_m','u_A','e_m'].join(',')
  const body = rows.map(r => [r.t, r.i, r.h, r.sp, r.u, r.e].join(',')).join('\n')
  return header + '\n' + body
}

export function downloadCSV(filename: string, csv: string){
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
