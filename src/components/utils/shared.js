export const formatDate = date => {
  if (!date) return;
  const year = date.getFullYear();
  const month = date.getMonth();
  const d = date.getDate();

  return `${year}-${month}-${d}`;
};
