const NL_MONTHS: Record<string, string> = {
  januari: '01', februari: '02', maart: '03', april: '04', mei: '05', juni: '06',
  juli: '07', augustus: '08', september: '09', oktober: '10', november: '11', december: '12',
}

/** Parses "14 juni 2026" style strings into an ISO date. Returns undefined if unparseable. */
export function parseDutchDate(value: string | undefined): string | undefined {
  if (!value) return undefined
  const match = value.trim().match(/^(\d{1,2})\s+([a-zà-ÿ]+)\s+(\d{4})$/i)
  if (!match) return undefined
  const [, day, monthName, year] = match
  const month = NL_MONTHS[monthName.toLowerCase()]
  if (!month) return undefined
  return `${year}-${month}-${day.padStart(2, '0')}`
}
