export function addDays (present_date_obj, days) {
  const date = new Date(present_date_obj.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

export function minusDays (present_date_obj, days) {
  const date = new Date(present_date_obj.valueOf())
  date.setDate(date.getDate() - days)
  return date
}
