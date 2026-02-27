export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

export const truncate = (value: string, length = 120) => {
  if (value.length <= length) return value;
  return `${value.slice(0, length)}…`;
};
