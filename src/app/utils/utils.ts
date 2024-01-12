export const formatDate = function(seconds: number) {
  return new Intl.DateTimeFormat('en-CA', {
    weekday: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(seconds));
}