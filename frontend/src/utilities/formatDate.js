export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthIndex = date.getMonth();
  const day = date.getDate().toString();
  const year = date.getFullYear().toString();

  const formattedDate = `${monthNames[monthIndex]} ${day}, ${year}`;
  return formattedDate;
};
