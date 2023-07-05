export function dateParser() {
  const newDate = new Date();
  const day = newDate.getUTCDate();
  const month = newDate.getUTCMonth() < 10 ? `0${newDate.getUTCMonth() + 1}` : newDate.getUTCMonth() + 1;
  const year = newDate.getUTCFullYear();
  return `${day}.${month}.${year}`;
};
