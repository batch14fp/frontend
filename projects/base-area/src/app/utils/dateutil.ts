const convertUTCToLocalDateISO = function (date: any) {
  console.log(date)
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  return newDate.toISOString().split('T')[0]
}

const convertUTCToLocalDateTimeISO = function (date: any) {
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  return newDate.toISOString()
}

const convertLocalDateTimeToUTCISO = function (date: any) {
  const newDate = new Date(date);
  return newDate.toISOString()
}

const convertLocalDateToUTCISO = function (date: any) {
  const newDate = new Date(date);
  console.log(newDate.toISOString().split('T')[0])
  return newDate.toISOString().split('T')[0]
}

export {
  convertUTCToLocalDateISO, convertUTCToLocalDateTimeISO,
  convertLocalDateTimeToUTCISO, convertLocalDateToUTCISO
}
