export function formatDate(
  inputDate: Date,
  options?: Intl.DateTimeFormatOptions
) {
  const date = new Date(inputDate);

  const dateString = date.toLocaleString(
    "en-US",
    options || {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
  return dateString;
}
