export default function truncateDescription(description, maxLength) {
  if (description.length <= maxLength) {
    return description;
  } else {
    return description.substring(0, maxLength) + '...'; // Adds ellipsis if truncated
  }
}


export const toFixedDown = (num, decimals=2) => {
  const factor = Math.pow(10, decimals);
  return parseFloat((Math.floor(num * factor) / factor).toFixed(decimals));
}