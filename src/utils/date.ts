export default function formatDate(date: Date) {
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function formatDateNumbers(date: Date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
