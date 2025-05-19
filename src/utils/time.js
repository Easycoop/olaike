export const formDateFormat = (dateString) => {
    return dateString?.split("T")[0] || "";
}

export const ngDateFormat = (timestamp) => {
    // const timestamp = '2025-03-09 18:16:32.959+01';
    const date = new Date(timestamp);

    // Format to dd/mm/yyyy
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    const formatted = `${day}/${month}/${year}`

    return formatted
}

export const ngDateTimeFormat = (timestamp) => {
    // const timestamp = '2025-03-09 18:16:32.959+01';
    const date = new Date(timestamp);

    // Format to dd/mm/yyyy
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    // Get hour and minute
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Final format: dd/mm/yyyy hh:mm
    const formatted = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formatted
}

export const formatUnixToHtmlDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp); // Make sure it's in milliseconds
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  export const  formatDateStringToHtmlDate = (dateString) => {
    const date = new Date(dateString); // "Apr 01, 2025"
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`; // e.g. "2025-04-01"
  }

  export const formatUnixToDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  
    return date.toLocaleDateString('en-US', {
      month: 'short',  // e.g., "Apr"
      day: '2-digit',  // e.g., "25"
      year: 'numeric'  // e.g., "2025"
    });
  }

  export const formatUnixToDateTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  
    return date.toLocaleString('en-US', {
      month: 'short',  // e.g., "Apr"
      day: '2-digit',  // e.g., "25"
      year: 'numeric',  // e.g., "2025"
      hour: '2-digit',  // e.g., "12"
      minute: '2-digit',  // e.g., "30"
      hour12: true  // Use 12-hour format
    });
  }