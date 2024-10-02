export const formatDate = (createdAt) => {
  const date = new Date(createdAt);

  // Get day, month, and year
  const day = date.getDate();
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
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Get day suffix (st, nd, rd, th)
  const daySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // For 11-20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return `${day}${daySuffix(day)} ${month} ${year}`;
};
