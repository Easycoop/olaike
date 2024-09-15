export default function truncateDescription(description, maxLength) {
  if (description.length <= maxLength) {
    return description;
  } else {
    return description.substring(0, maxLength) + '...'; // Adds ellipsis if truncated
  }
}
