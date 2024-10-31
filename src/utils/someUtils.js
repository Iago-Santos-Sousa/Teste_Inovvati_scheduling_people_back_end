const formatedSchedulingDateSearch = (scheduling_date) => {
  // Separando a data e a hora
  const [data, hora] = scheduling_date.split(" ");
  // Separando as partes da hora
  const [horas, minutos, segundos] = hora.split(":");
  const formatedSchedulingDateSearch = `${data} ${horas}:${minutos}`;
  const existingSchedule = formatedSchedulingDateSearch;
  return existingSchedule;
};

module.exports = {
  formatedSchedulingDateSearch,
};
