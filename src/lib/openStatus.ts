export interface OpenStatus {
  open: boolean
  type: 'openLabel' | 'openSoon' | 'opensAt' | 'opensTomorrow' | 'opensOn'
  hour?: number
  mins?: string
  dayIndex?: number
}

interface DaySchedule {
  open: number
  close: number
}

// Sunday (0) is closed — no entry.
const SCHEDULE: Record<number, DaySchedule | undefined> = {
  1: { open: 13, close: 17.5 },   // Monday
  2: { open: 9.5, close: 17.5 },  // Tuesday
  3: { open: 9.5, close: 17.5 },  // Wednesday
  4: { open: 9.5, close: 17.5 },  // Thursday
  5: { open: 9.5, close: 20 },    // Friday
  6: { open: 9.5, close: 17 },    // Saturday
}

function splitTime(value: number) {
  const hour = Math.floor(value)
  const mins = Math.round((value - hour) * 60).toString().padStart(2, '0')
  return { hour, mins }
}

export function getOpenStatus(): OpenStatus {
  const now = new Date()
  const today = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  const todayHours = SCHEDULE[today]

  if (todayHours && hour >= todayHours.open && hour < todayHours.close) {
    const remaining = todayHours.close - hour
    if (remaining <= 1) {
      return { open: true, type: 'openSoon', mins: Math.round(remaining * 60).toString() }
    }
    const { hour: h, mins } = splitTime(todayHours.close)
    return { open: true, type: 'openLabel', hour: h, mins }
  }

  if (todayHours && hour < todayHours.open) {
    const { hour: h, mins } = splitTime(todayHours.open)
    return { open: false, type: 'opensAt', hour: h, mins }
  }

  for (let i = 1; i <= 7; i++) {
    const dayIndex = (today + i) % 7
    const sched = SCHEDULE[dayIndex]
    if (sched) {
      const { hour: h, mins } = splitTime(sched.open)
      if (i === 1) return { open: false, type: 'opensTomorrow', hour: h, mins }
      return { open: false, type: 'opensOn', hour: h, mins, dayIndex }
    }
  }

  return { open: false, type: 'opensTomorrow' }
}
