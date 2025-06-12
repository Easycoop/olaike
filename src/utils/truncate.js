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

export const towDp = (num) =>  {
  // Multiply by 100 to shift the decimal two places to the right
  // Then use Math.ceil to round up to the nearest whole number
  // Finally, divide by 100 to shift the decimal back
  return Math.ceil(num * 100) / 100;
}
